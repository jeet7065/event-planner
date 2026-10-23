import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ArrowUpRight, ArrowUp, ArrowDown, ChevronRight, Eye, Sparkles, Layers, CircleDot, MapPin, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ProjectItem {
  id?: string | number;
  title: string;
  image: string;
  href?: string;
  category?: string;
  categoryKey?: string;
  location?: string;
  guests?: string;
  description?: string;
  paletteNotes?: string;
  year?: string;
  [key: string]: unknown;
}

export interface WorksWheelProps {
  items: ProjectItem[];
  galleryLabel?: string;
  actionText?: string;
  onSelectProject?: (project: ProjectItem) => void;
  className?: string;
}

function getInitialDimensions() {
  if (typeof window === 'undefined') {
    return {
      ringRadius: 430,
      ringScale: 0.44,
      drumRadius: 480,
      cardWidth: 350,
      cardHeight: 480,
      isMobile: false,
      isTablet: false,
    };
  }
  const width = window.innerWidth;
  if (width < 640) {
    return {
      ringRadius: 180,
      ringScale: 0.28,
      drumRadius: 260,
      cardWidth: 230,
      cardHeight: 310,
      isMobile: true,
      isTablet: false,
    };
  }
  if (width < 1024) {
    return {
      ringRadius: 320,
      ringScale: 0.38,
      drumRadius: 390,
      cardWidth: 290,
      cardHeight: 400,
      isMobile: false,
      isTablet: true,
    };
  }
  return {
    ringRadius: 430,
    ringScale: 0.44,
    drumRadius: 480,
    cardWidth: 350,
    cardHeight: 480,
    isMobile: false,
    isTablet: false,
  };
}

export function WorksWheel({
  items,
  galleryLabel = 'Selected Works',
  actionText = 'View Brief',
  onSelectProject,
  className,
}: WorksWheelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Motion reduction check
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  // Mode & Transition Progress: 0 = Ring, 1 = Vertical 3D Drum
  const [targetProgress, setTargetProgress] = useState<number>(0);
  const progressRef = useRef<number>(0);
  const [displayProgress, setDisplayProgress] = useState<number>(0);

  // Rotation angles (in radians)
  const stepAngle = useMemo(() => (2 * Math.PI) / Math.max(items.length, 1), [items.length]);
  const rotationRef = useRef<number>(0);
  const targetRotationRef = useRef<number>(0);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [scrollDir, setScrollDir] = useState<'down' | 'up'>('down');

  // Responsive dimensions
  const [dimensions, setDimensions] = useState(getInitialDimensions);

  // Drag interaction refs
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const startXRef = useRef(0);
  const startRotRef = useRef(0);
  const hasMovedSignificantlyRef = useRef(false);

  // Listen for reduced motion changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Update responsive geometry on resize
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions(getInitialDimensions());
    };

    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Clamp & snap helpers
  const clampIndex = useCallback(
    (idx: number) => Math.max(0, Math.min(items.length - 1, idx)),
    [items.length]
  );

  const snapToProject = useCallback(
    (index: number) => {
      const clamped = clampIndex(index);
      setScrollDir(clamped >= activeIdx ? 'down' : 'up');
      targetRotationRef.current = clamped * stepAngle;
      setActiveIdx(clamped);
      setTargetProgress(1);
    },
    [activeIdx, clampIndex, stepAngle]
  );

  // Animation Loop (lerp rotation & progress)
  useEffect(() => {
    let lastActive = 0;

    const tick = () => {
      // Lerp progress (Ring to Drum)
      const pDiff = targetProgress - progressRef.current;
      if (Math.abs(pDiff) > 0.001) {
        progressRef.current += pDiff * 0.08;
      } else {
        progressRef.current = targetProgress;
      }
      setDisplayProgress(progressRef.current);

      // Lerp rotation
      const rDiff = targetRotationRef.current - rotationRef.current;
      if (Math.abs(rDiff) > 0.0005) {
        rotationRef.current += rDiff * 0.1;
      } else {
        rotationRef.current = targetRotationRef.current;
      }

      // Compute active index
      const rawIdx = Math.round(rotationRef.current / stepAngle);
      const normalizedIdx = ((rawIdx % items.length) + items.length) % items.length;
      if (normalizedIdx !== lastActive) {
        lastActive = normalizedIdx;
        setActiveIdx(normalizedIdx);
      }

      // Re-render 3D card transforms
      if (containerRef.current) {
        const cards = containerRef.current.querySelectorAll<HTMLDivElement>('[data-wheel-card]');
        const p = prefersReducedMotion ? targetProgress : progressRef.current;
        const currentRot = prefersReducedMotion ? targetRotationRef.current : rotationRef.current;

        cards.forEach((card, i) => {
          // 1. Drum coordinates (Active photo sits in the exact CENTER: Y=0, Z=0)
          const phi = i * stepAngle - currentRot;
          const yDrum = Math.sin(phi) * dimensions.drumRadius;
          const zDrum = Math.cos(phi) * dimensions.drumRadius - dimensions.drumRadius;
          const rotXDrum = -phi * (180 / Math.PI);
          const cosPhi = Math.cos(phi);
          const isFront = cosPhi > -0.15;

          // 2. Ring coordinates (Expanded circle ensuring clear breathing room at center)
          const alpha = (2 * Math.PI * i) / items.length - Math.PI / 2;
          const xRing = Math.cos(alpha) * dimensions.ringRadius;
          const yRing = Math.sin(alpha) * dimensions.ringRadius;
          const zRing = -50;
          const rotZRing = (alpha * 180) / Math.PI + 90;

          // 3. Interpolate between Ring and Drum
          const x = (1 - p) * xRing;
          const y = (1 - p) * yRing + p * yDrum;
          const z = (1 - p) * zRing + p * zDrum;
          const rotX = p * rotXDrum;
          const rotZ = (1 - p) * rotZRing;

          // Active / adjacent scaling (Center photo is full scale, adjacent fade into depth)
          const distanceToActive = Math.abs(phi);
          const activeScale = 1 - Math.min(distanceToActive * 0.22, 0.4);
          const scale = (1 - p) * dimensions.ringScale + p * activeScale;

          // Opacity
          const drumOpacity = Math.max(0.12, Math.min(1, (cosPhi + 0.25) / 1.25));
          const opacity = (1 - p) * 0.95 + p * drumOpacity;

          card.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px) rotateX(${rotX.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
          card.style.opacity = opacity.toFixed(2);
          card.style.zIndex = `${Math.round((z + 1000) * 10)}`;
          card.style.visibility = isFront || p < 0.5 ? 'visible' : 'hidden';
          card.style.pointerEvents = isFront || p < 0.5 ? 'auto' : 'none';
        });
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [dimensions, items.length, prefersReducedMotion, stepAngle, targetProgress]);

  // Wheel handling with directional feedback & boundary pass-through
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let wheelDebounceTimeout: number | undefined;

    const handleWheel = (e: WheelEvent) => {
      const delta = e.deltaY;
      if (Math.abs(delta) < 6) return;

      const isAtRing = targetProgress <= 0.05;
      const isAtDrum = targetProgress >= 0.95;
      const isFirstItem = activeIdx === 0;
      const isLastItem = activeIdx === items.length - 1;

      setScrollDir(delta > 0 ? 'down' : 'up');

      // When at Ring, scrolling down opens Drum
      if (isAtRing && delta > 0) {
        e.preventDefault();
        setTargetProgress(1);
        return;
      }

      // When in Drum:
      if (isAtDrum) {
        // Scrolling up at item 0 -> transition back to Ring
        if (delta < 0 && isFirstItem) {
          e.preventDefault();
          setTargetProgress(0);
          return;
        }

        // Scrolling down past last item -> allow natural page scroll
        if (delta > 0 && isLastItem) {
          return;
        }

        // Scrolling inside drum -> rotate through items with step
        e.preventDefault();
        clearTimeout(wheelDebounceTimeout);
        wheelDebounceTimeout = window.setTimeout(() => {
          const stepDirection = delta > 0 ? 1 : -1;
          const nextIndex = clampIndex(activeIdx + stepDirection);
          targetRotationRef.current = nextIndex * stepAngle;
          setActiveIdx(nextIndex);
        }, 30);
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
      clearTimeout(wheelDebounceTimeout);
    };
  }, [activeIdx, clampIndex, items.length, stepAngle, targetProgress]);

  // Pointer / Touch Drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    isDraggingRef.current = true;
    startYRef.current = e.clientY;
    startXRef.current = e.clientX;
    startRotRef.current = targetRotationRef.current;
    hasMovedSignificantlyRef.current = false;
    // Only capture pointer on desktop mouse to prevent freezing mobile page scrolling
    if (e.pointerType === 'mouse') {
      try {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      } catch {
        // Ignore
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dy = e.clientY - startYRef.current;
    const dx = e.clientX - startXRef.current;
    const totalDist = Math.abs(dy) + Math.abs(dx);

    if (totalDist > 6) {
      hasMovedSignificantlyRef.current = true;
      setScrollDir(dy < 0 ? 'down' : 'up');
    }

    if (targetProgress < 0.5 && totalDist > 16) {
      setTargetProgress(1);
    }

    const sensitivity = 0.0035;
    // On mobile touch, horizontal swipes or vertical drags rotate the wheel
    const delta = Math.abs(dx) > Math.abs(dy) ? -dx : dy;
    const newRot = startRotRef.current - delta * sensitivity;
    targetRotationRef.current = Math.max(
      -stepAngle * 0.2,
      Math.min((items.length - 1 + 0.2) * stepAngle, newRot)
    );
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (e.pointerType === 'mouse') {
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // Ignore
      }
    }

    const nearestIdx = clampIndex(Math.round(targetRotationRef.current / stepAngle));
    targetRotationRef.current = nearestIdx * stepAngle;
    setActiveIdx(nearestIdx);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      setScrollDir('down');
      setTargetProgress(1);
      const nextIdx = clampIndex(activeIdx + 1);
      snapToProject(nextIdx);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      setScrollDir('up');
      const prevIdx = clampIndex(activeIdx - 1);
      snapToProject(prevIdx);
    } else if (e.key === 'Home') {
      e.preventDefault();
      snapToProject(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      snapToProject(items.length - 1);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (items[activeIdx] && onSelectProject) {
        onSelectProject(items[activeIdx]);
      }
    }
  };

  const activeProject = items[activeIdx] || items[0];

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="3D Rotating Portfolio Gallery"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={cn(
        'relative w-full h-[780px] sm:h-[840px] lg:h-[890px] overflow-hidden select-none outline-none cursor-grab active:cursor-grabbing bg-ivory',
        className
      )}
      style={{
        perspective: '1350px',
        touchAction: 'pan-y',
      }}
    >
      {/* Background Ambience Radial Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--color-sand)/25_0%,_transparent_75%)]" />

      {/* TOP HEADER CONTROLS */}
      <div className="absolute top-6 left-6 right-6 z-40 flex items-center justify-between pointer-events-auto">
        {/* Label Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-sand shadow-sm text-xs font-semibold uppercase tracking-widest text-maroon">
          <Sparkles className="w-3.5 h-3.5 text-maroon" />
          <span>{galleryLabel}</span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/95 backdrop-blur-md border border-sand/80 shadow-sm text-xs">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setTargetProgress(0);
            }}
            className={cn(
              'px-4 py-1.5 rounded-full font-semibold transition-all duration-300 flex items-center gap-1.5',
              displayProgress < 0.5
                ? 'bg-maroon text-white shadow-sm'
                : 'text-emerald hover:text-maroon'
            )}
            title="View Circular Ring Layout"
          >
            <CircleDot className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Circular Ring</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setTargetProgress(1);
            }}
            className={cn(
              'px-4 py-1.5 rounded-full font-semibold transition-all duration-300 flex items-center gap-1.5',
              displayProgress >= 0.5
                ? 'bg-maroon text-white shadow-sm'
                : 'text-emerald hover:text-maroon'
            )}
            title="View 3D Rotating Drum"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">3D Drum</span>
          </button>
        </div>
      </div>

      {/* 1. CENTER TEXT (RING MODE) - FULLY CLEAR & VISIBLE WITH BROAD CLEARANCE */}
      <div
        className={cn(
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none transition-all duration-500 z-30 max-w-[290px] sm:max-w-lg px-4 sm:px-6',
          displayProgress > 0.4 ? 'opacity-0 scale-90 -translate-y-12 pointer-events-none' : 'opacity-100 scale-100'
        )}
      >
        <div className="bg-white/85 backdrop-blur-md border-2 border-sand rounded-3xl p-6 sm:p-8 shadow-xl space-y-3">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-maroon block">
            Interactive Scenography
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald leading-tight">
            The Curated <br />
            <span className="italic font-normal text-maroon">Masterpieces</span>
          </h2>
          <p className="text-xs sm:text-sm text-emerald/80 font-sans max-w-sm mx-auto leading-relaxed">
            Scroll or drag vertically to rotate the 3D couture drum and explore individual venue briefs.
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setTargetProgress(1);
              }}
              className="pointer-events-auto inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white bg-maroon hover:bg-[#521116] px-5 py-2.5 rounded-full shadow-md transition-all active:scale-95"
            >
              <span>Explore 3D Drum</span>
              <ArrowDown className="w-3.5 h-3.5 text-sand animate-bounce" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. LEFT SIDE: 3D SCROLLING EFFECT & VERTICAL REEL (DESKTOP/TABLET) */}
      <div
        className={cn(
          'hidden md:flex absolute left-4 sm:left-10 lg:left-16 top-1/2 -translate-y-1/2 z-30 items-center gap-4 transition-all duration-500 pointer-events-auto',
          displayProgress <= 0.35 ? 'opacity-0 -translate-x-10 pointer-events-none' : 'opacity-100 translate-x-0'
        )}
      >
        {/* Vertical Scroll Rail / Direction Indicator */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] font-mono text-sand-dark font-bold uppercase tracking-widest [writing-mode:vertical-lr] rotate-180">
            Scroll Reel
          </span>
          <div className="w-[2px] h-24 sm:h-32 bg-sand/40 relative rounded-full overflow-hidden">
            <div
              className="absolute left-0 w-full bg-maroon rounded-full transition-all duration-300"
              style={{
                height: '30%',
                top: `${(activeIdx / Math.max(items.length - 1, 1)) * 70}%`,
              }}
            />
          </div>
          <div className="w-6 h-6 rounded-full bg-white border border-sand flex items-center justify-center text-maroon shadow-sm">
            {scrollDir === 'down' ? (
              <ArrowDown className="w-3.5 h-3.5 animate-pulse" />
            ) : (
              <ArrowUp className="w-3.5 h-3.5 animate-pulse" />
            )}
          </div>
        </div>

        {/* 3D Vertical Rolling Title Drum Reel */}
        <div className="bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-3xl border-2 border-sand shadow-2xl max-w-[220px] sm:max-w-[260px] space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-widest text-maroon font-bold border-b border-sand/60 pb-2 flex items-center justify-between">
            <span>Active Reel</span>
            <span>
              {String(activeIdx + 1).padStart(2, '0')}/{String(items.length).padStart(2, '0')}
            </span>
          </div>

          {/* Rolling Project List */}
          <div className="space-y-1.5 py-1">
            {items.map((item, idx) => {
              const isSelected = idx === activeIdx;
              const distance = Math.abs(idx - activeIdx);

              return (
                <button
                  key={item.id || idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    snapToProject(idx);
                  }}
                  className={cn(
                    'w-full text-left px-3 py-2 rounded-xl text-xs font-sans transition-all duration-300 flex items-center justify-between gap-2 group',
                    isSelected
                      ? 'bg-maroon text-white font-bold shadow-md scale-[1.02]'
                      : 'text-emerald hover:bg-sand/30 hover:text-maroon',
                    distance > 2 && 'hidden sm:flex opacity-40'
                  )}
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <span
                      className={cn(
                        'font-mono text-[10px]',
                        isSelected ? 'text-sand font-bold' : 'text-emerald/50'
                      )}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="truncate text-[11px] sm:text-xs">{item.title}</span>
                  </div>
                  {isSelected && <ChevronRight className="w-3.5 h-3.5 text-sand shrink-0" />}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-sand/40 text-[10px] text-emerald/60 text-center font-mono">
            {scrollDir === 'down' ? 'Scrolling Downward ↓' : 'Scrolling Upward ↑'}
          </div>
        </div>
      </div>

      {/* 3. CENTER: 3D PHOTO WHEEL STAGE */}
      <div
        className="absolute top-1/2 left-1/2 w-0 h-0"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {items.map((item, index) => {
          const isActive = index === activeIdx && displayProgress >= 0.7;

          return (
            <div
              key={item.id || index}
              data-wheel-card
              onClick={(e) => {
                e.stopPropagation();
                if (hasMovedSignificantlyRef.current) return;
                if (displayProgress < 0.5) {
                  snapToProject(index);
                } else if (!isActive) {
                  snapToProject(index);
                } else if (onSelectProject) {
                  onSelectProject(item);
                }
              }}
              className={cn(
                'absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-shadow duration-300 rounded-3xl overflow-hidden bg-white border-2 will-change-transform',
                isActive
                  ? 'border-maroon shadow-2xl ring-4 ring-sand/60'
                  : 'border-sand/80 shadow-lg hover:border-sand-dark'
              )}
              style={{
                width: `${dimensions.cardWidth}px`,
                height: `${dimensions.cardHeight}px`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Card Image */}
              <div className="relative w-full h-full overflow-hidden bg-emerald">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Ambient vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald/90 via-emerald/25 to-transparent" />

                {/* Card Top Pill */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="text-[10px] font-mono tracking-widest text-sand uppercase bg-emerald/90 px-2.5 py-1 rounded-md border border-sand/40">
                    {item.guests || `${String(index + 1).padStart(2, '0')}`}
                  </span>
                  <div
                    className={cn(
                      'w-7 h-7 rounded-full flex items-center justify-center transition-all',
                      isActive ? 'bg-maroon text-white' : 'bg-white/80 text-emerald'
                    )}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Bottom Content */}
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1.5 pointer-events-none">
                  <p className="text-[11px] font-mono tracking-wider text-sand uppercase">
                    {item.location || 'Curated Commission'}
                  </p>
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-ivory leading-tight drop-shadow">
                    {item.title}
                  </h4>

                  {/* Active Card Action Pill */}
                  {isActive && (
                    <div className="pt-2 flex items-center justify-between border-t border-sand/30 pointer-events-auto">
                      <span className="text-[10px] uppercase tracking-widest text-sand font-bold">
                        {item.category}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onSelectProject) onSelectProject(item);
                        }}
                        className="bg-maroon hover:bg-[#521116] text-white px-3.5 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-all duration-200 shadow-md flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3 text-sand" />
                        <span>{actionText}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. RIGHT SIDE: ACTIVE PROJECT CURATOR'S BRIEF (DRUM MODE) */}
      <div
        className={cn(
          'absolute right-4 sm:right-10 lg:right-16 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col max-w-[280px] bg-white/95 backdrop-blur-md p-6 rounded-3xl border-2 border-sand shadow-2xl space-y-4 transition-all duration-500 pointer-events-auto',
          displayProgress <= 0.35 ? 'opacity-0 translate-x-10 pointer-events-none' : 'opacity-100 translate-x-0'
        )}
      >
        <div className="space-y-1 border-b border-sand/50 pb-3">
          <span className="text-[10px] uppercase font-mono tracking-widest text-maroon font-bold block">
            {activeProject?.category || 'Couture Commission'}
          </span>
          <h3 className="font-serif text-xl font-bold text-emerald">
            {activeProject?.title}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-emerald/70 pt-0.5">
            <MapPin className="w-3.5 h-3.5 text-maroon" />
            <span>{activeProject?.location}</span>
          </div>
        </div>

        <p className="text-xs text-emerald/80 leading-relaxed font-sans line-clamp-4">
          {activeProject?.description}
        </p>

        <div className="pt-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onSelectProject) onSelectProject(activeProject);
            }}
            className="w-full bg-maroon hover:bg-[#521116] text-white py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5 text-sand" />
            <span>{actionText}</span>
          </button>
        </div>
      </div>

      {/* BOTTOM CONTROLS DOCK */}
      <div className="absolute bottom-6 left-6 right-6 z-40 flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-auto">
        {/* Navigation Step Arrows */}
        <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-sand shadow-sm text-xs font-semibold">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              snapToProject(clampIndex(activeIdx - 1));
            }}
            disabled={activeIdx === 0}
            className="p-1.5 rounded-full hover:bg-sand/40 disabled:opacity-30 disabled:pointer-events-none text-emerald transition-colors"
            title="Previous Project (Arrow Up)"
          >
            <ArrowUp className="w-4 h-4 text-maroon" />
          </button>

          <span className="font-mono text-[11px] text-emerald font-bold px-2">
            {String(activeIdx + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              snapToProject(clampIndex(activeIdx + 1));
            }}
            disabled={activeIdx === items.length - 1}
            className="p-1.5 rounded-full hover:bg-sand/40 disabled:opacity-30 disabled:pointer-events-none text-emerald transition-colors"
            title="Next Project (Arrow Down)"
          >
            <ArrowDown className="w-4 h-4 text-maroon" />
          </button>
        </div>

        {/* Active Project Button */}
        {activeProject && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onSelectProject) onSelectProject(activeProject);
              }}
              className="bg-maroon hover:bg-[#521116] text-white px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 flex items-center gap-2 border border-maroon"
            >
              <span>{actionText}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-sand" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default WorksWheel;
