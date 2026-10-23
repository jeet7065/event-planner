import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, Award, Star, Compass, ChevronDown, Play, Pause } from 'lucide-react';

const TOTAL_FRAMES = 240;

const formatFrameNum = (num) => String(num).padStart(3, '0');
const getFramePath = (num) => `/hero-frames/ezgif-frame-${formatFrameNum(num)}.jpg`;

export default function Hero() {
  const trackRef = useRef(null);
  const canvasRef = useRef(null);

  // Mobile specific refs & state
  const mobileCanvasRef = useRef(null);
  const mobileFrameRef = useRef(1);
  const [isMobilePlaying, setIsMobilePlaying] = useState(true);
  const mobileRafRef = useRef(null);

  // Loaded images cache (1-indexed for convenience)
  const imagesRef = useRef([]);
  const loadedFramesRef = useRef(new Set());

  // Animation & scroll state (Desktop)
  const currentFrameRef = useRef(1);
  const targetFrameRef = useRef(1);
  const rafIdRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentDisplayFrame, setCurrentDisplayFrame] = useState(1);
  const [loadPercent, setLoadPercent] = useState(0);

  // Bulletproof Pinning: 'top' | 'pinned' (fixed to viewport) | 'bottom' (docked to track end)
  const [pinState, setPinState] = useState('pinned');

  // ── CANVAS DRAWING ROUTINE (ZERO-FLICKER: OVERWRITE MODE) ──
  const drawFrameToCanvas = (canvas, frameIndex) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Retrieve requested image or find nearest available loaded frame
    let img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) {
      let bestDist = Infinity;
      let fallbackIndex = 1;
      for (const loadedIdx of loadedFramesRef.current) {
        const dist = Math.abs(loadedIdx - frameIndex);
        if (dist < bestDist) {
          bestDist = dist;
          fallbackIndex = loadedIdx;
        }
      }
      img = imagesRef.current[fallbackIndex];
    }

    // Never clear canvas; if no new image ready, keep existing visual
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasW = canvas.width;
    const canvasH = canvas.height;
    if (canvasW === 0 || canvasH === 0) return;

    // Aspect ratio "cover" calculation
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = canvasW / canvasH;

    let renderW, renderH, offsetX, offsetY;
    if (canvasRatio > imgRatio) {
      renderW = canvasW;
      renderH = canvasW / imgRatio;
      offsetX = 0;
      offsetY = (canvasH - renderH) / 2;
    } else {
      renderH = canvasH;
      renderW = canvasH * imgRatio;
      offsetX = (canvasW - renderW) / 2;
      offsetY = 0;
    }

    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
  };

  const drawFrame = (frameIndex) => {
    drawFrameToCanvas(canvasRef.current, frameIndex);
  };

  // ── 1. SMART TWO-STAGE PRELOADER (KEYFRAMES FIRST, THEN FILL) ──
  useEffect(() => {
    let isMounted = true;
    const images = [];
    imagesRef.current = images;

    const loadSingleFrame = (idx) => {
      return new Promise((resolve) => {
        if (images[idx] && images[idx].complete) {
          resolve(images[idx]);
          return;
        }
        const img = new Image();
        img.src = getFramePath(idx);
        img.onload = () => {
          if (!isMounted) return;
          images[idx] = img;
          loadedFramesRef.current.add(idx);
          resolve(img);
        };
        img.onerror = () => {
          resolve(null);
        };
      });
    };

    // Stage A: Load frame 1 immediately for instant display
    loadSingleFrame(1).then(() => {
      if (!isMounted) return;
      if (canvasRef.current) drawFrameToCanvas(canvasRef.current, 1);
      if (mobileCanvasRef.current) drawFrameToCanvas(mobileCanvasRef.current, 1);
    });

    // Stage B: Load keyframes across entire timeline (every 4th frame: 1, 5, 9... 240)
    const keyframes = [];
    for (let i = 1; i <= TOTAL_FRAMES; i += 4) {
      keyframes.push(i);
    }
    if (keyframes[keyframes.length - 1] !== TOTAL_FRAMES) {
      keyframes.push(TOTAL_FRAMES);
    }

    let loadedCount = 1;
    const BATCH_SIZE = 6;

    const loadBatch = async (indices) => {
      for (let i = 0; i < indices.length; i += BATCH_SIZE) {
        if (!isMounted) break;
        const chunk = indices.slice(i, i + BATCH_SIZE);
        await Promise.all(chunk.map((idx) => loadSingleFrame(idx)));
        loadedCount += chunk.length;
        setLoadPercent(Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100)));
      }
    };

    const loadAllProgressively = async () => {
      // 1. First sweep: Keyframes across the full scroll distance
      await loadBatch(keyframes);

      // 2. Second sweep: Fill in all remaining in-between frames
      const remaining = [];
      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        if (!loadedFramesRef.current.has(i)) {
          remaining.push(i);
        }
      }
      await loadBatch(remaining);
      if (isMounted) setLoadPercent(100);
    };

    loadAllProgressively();

    return () => {
      isMounted = false;
    };
  }, []);

  // ── 2. RESIZE HANDLER (DPI & CANVAS FIT) ──
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 640;
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);

      // Desktop Canvas sizing
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          canvasRef.current.width = rect.width * dpr;
          canvasRef.current.height = rect.height * dpr;
          drawFrameToCanvas(canvasRef.current, Math.round(currentFrameRef.current));
        }
      }

      // Mobile Canvas sizing (Exact 16:9)
      if (mobileCanvasRef.current) {
        const mRect = mobileCanvasRef.current.getBoundingClientRect();
        if (mRect.width > 0 && mRect.height > 0) {
          mobileCanvasRef.current.width = mRect.width * dpr;
          mobileCanvasRef.current.height = mRect.height * dpr;
          drawFrameToCanvas(mobileCanvasRef.current, mobileFrameRef.current);
        }
      }
    };

    handleResize();
    const timer = setTimeout(handleResize, 100);
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // ── 3. MOBILE AUTO-RUN VIDEO LOOP (25 FPS FILM SPEED WITH PAUSE CONTROL) ──
  useEffect(() => {
    let lastTimestamp = performance.now();
    const targetFps = 25;
    const frameInterval = 1000 / targetFps;

    const animateMobile = (timestamp) => {
      if (isMobilePlaying) {
        const elapsed = timestamp - lastTimestamp;
        if (elapsed >= frameInterval) {
          lastTimestamp = timestamp - (elapsed % frameInterval);

          let next = mobileFrameRef.current + 1;
          if (next > TOTAL_FRAMES) {
            next = 1;
          }
          mobileFrameRef.current = next;

          if (mobileCanvasRef.current) {
            drawFrameToCanvas(mobileCanvasRef.current, next);
          }
        }
      } else {
        lastTimestamp = timestamp;
      }

      mobileRafRef.current = requestAnimationFrame(animateMobile);
    };

    mobileRafRef.current = requestAnimationFrame(animateMobile);

    return () => {
      if (mobileRafRef.current) cancelAnimationFrame(mobileRafRef.current);
    };
  }, [isMobilePlaying]);

  // ── 4. DESKTOP BULLETPROOF SCROLL PINNING & FRAME SCRUBBING ──
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 640) return; // Only active on desktop

      const track = trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const totalScrollable = track.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);
      setScrollProgress(progress);

      const target = 1 + progress * (TOTAL_FRAMES - 1);
      targetFrameRef.current = target;

      // Unbreakable position pinning:
      if (rect.top > 0) {
        setPinState('top');
      } else if (rect.bottom <= window.innerHeight) {
        setPinState('bottom');
      } else {
        setPinState('pinned');
      }
    };

    let lastRenderedFrame = -1;
    const animate = () => {
      if (window.innerWidth >= 640) {
        const diff = targetFrameRef.current - currentFrameRef.current;

        if (Math.abs(diff) > 0.005) {
          currentFrameRef.current += diff * 0.20;
        } else {
          currentFrameRef.current = targetFrameRef.current;
        }

        const frameToDraw = Math.min(
          Math.max(1, Math.round(currentFrameRef.current)),
          TOTAL_FRAMES
        );

        if (frameToDraw !== lastRenderedFrame) {
          lastRenderedFrame = frameToDraw;
          drawFrame(frameToDraw);
          setCurrentDisplayFrame(frameToDraw);
        }
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // Intro content smoothly fades out as scroll starts (Desktop)
  const introOpacity = Math.max(0, 1 - scrollProgress * 5);
  const introTranslateY = -(1 - introOpacity) * 24;

  return (
    <section id="home" className="relative w-full text-ivory select-none bg-black">
      {/* ─────────────────────────────────────────────────────────────
          1. MOBILE VIEW (PHONE ONLY)
          - Frame aspect ratio strictly 16:9
          - Auto run video looping continuously
          - Small button for pause / play
          - Zero empty black voids above or below
         ───────────────────────────────────────────────────────────── */}
      <div className="block sm:hidden w-full px-4 pt-24 pb-12">
        <div className="max-w-xl mx-auto flex flex-col items-center text-center">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-sand/40 text-[10px] font-semibold uppercase tracking-widest text-sand shadow-lg mb-4">
            <Sparkles className="w-3.5 h-3.5 text-sand animate-pulse" />
            <span>Couture Event Planning &amp; Scenography</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-3xl font-bold text-white leading-[1.18] tracking-tight mb-5">
            Designing Memories of <br />
            <span className="italic font-normal text-sand">Timeless Grandeur</span> &amp; Artistry
          </h1>

          {/* ── 16:9 AUTO-RUNNING VIDEO PLAYER WITH PAUSE BUTTON ── */}
          <div
            onClick={() => setIsMobilePlaying(!isMobilePlaying)}
            className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-sand/40 shadow-2xl bg-black cursor-pointer group mb-5"
          >
            {/* Underlying Poster Image */}
            <img
              src="/hero-frames/ezgif-frame-001.jpg"
              alt="Velore & Co. Grandeur Celebration"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />

            {/* Auto-running Canvas in exact 16:9 ratio */}
            <canvas
              ref={mobileCanvasRef}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />

            {/* Subtle Vignettes */}
            <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

            {/* Live Status Indicator */}
            <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-sand/30 text-[9px] font-mono text-sand tracking-wider pointer-events-none">
              <span className={`w-1.5 h-1.5 rounded-full bg-sand ${isMobilePlaying ? 'animate-ping' : ''}`} />
              <span>{isMobilePlaying ? 'PLAYING' : 'PAUSED'}</span>
            </div>

            {/* Small Pause / Play Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMobilePlaying(!isMobilePlaying);
              }}
              aria-label={isMobilePlaying ? 'Pause video' : 'Play video'}
              className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 hover:bg-black/90 active:scale-95 backdrop-blur-md border border-sand/50 text-sand shadow-lg transition-all text-xs font-medium"
            >
              {isMobilePlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-sand text-sand" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-sand text-sand translate-x-0.5" />
                  <span>Play</span>
                </>
              )}
            </button>
          </div>

          {/* Subheading */}
          <p className="text-ivory/90 text-sm font-light leading-relaxed max-w-md mx-auto mb-6">
            From majestic chateau weddings in Lake Como to summits in Manhattan, Velore &amp; Co. translates bold visions into immersive architectural reality.
          </p>

          {/* CTAs */}
          <div className="w-full flex flex-col gap-3 max-w-sm mx-auto mb-6">
            <a
              href="#contact"
              className="w-full bg-maroon hover:bg-[#521116] text-white px-7 py-3.5 rounded-full font-serif text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-xl flex items-center justify-center gap-3 border border-sand/40 active:scale-95"
            >
              <span>Plan Your Celebration</span>
              <ArrowRight className="w-4 h-4 text-sand" />
            </a>

            <a
              href="#gallery"
              className="w-full bg-white/10 hover:bg-white/20 text-ivory border-2 border-sand/60 px-7 py-3.5 rounded-full font-serif text-xs font-semibold tracking-widest uppercase transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2 shadow-lg active:scale-95"
            >
              <Compass className="w-4 h-4 text-sand" />
              <span>Explore Portfolio</span>
            </a>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col items-center gap-2 text-xs text-sand/90 font-medium">
            <div className="flex items-center gap-2">
              <div className="flex text-sand">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-sand text-sand" />
                ))}
              </div>
              <span className="font-bold text-white">5.0 Rating</span>
              <span className="text-sand/60">| 450+ Events</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-sand" />
              <span className="text-[11px]">Condé Nast Top Planner 2024–2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. DESKTOP VIEW (DESKTOP ONLY - 100% UNCHANGED)
          - Original multi-vh scroll track with 3D parallax scrub
          - Pinned full-viewport frame canvas
          - Parallax HUD scrubber with progress bar
         ───────────────────────────────────────────────────────────── */}
      <div
        id="hero-track"
        ref={trackRef}
        className="hidden sm:block relative w-full sm:h-[240vh] lg:h-[280vh]"
      >
        {/* Pinned Frame Viewport */}
        <div
          className={`w-full h-screen overflow-hidden flex items-center justify-center select-none bg-black ${
            pinState === 'top'
              ? 'absolute top-0 left-0'
              : pinState === 'bottom'
              ? 'absolute bottom-0 left-0'
              : 'fixed top-0 left-0 z-10'
          }`}
        >
          {/* ── FULL BLEED VIDEO FRAME STAGE ON DESKTOP ── */}
          <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
            {/* ── UNDERLYING POSTER IMAGE (FULL BLEED COVERAGE) ── */}
            <img
              src="/hero-frames/ezgif-frame-001.jpg"
              alt="Velore & Co. Grandeur Celebration"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />

            {/* ── BACKGROUND PARALLAX FRAME CANVAS ── */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{ willChange: 'transform' }}
            />

            {/* ── SUBTLE NEUTRAL AMBIENT VIGNETTES ── */}
            <div className="absolute top-0 inset-x-0 h-24 sm:h-36 bg-gradient-to-b from-black/70 via-black/25 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-24 sm:h-36 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
          </div>

          {/* ── HERO INTRO CONTENT ── */}
          <div
            className="absolute inset-x-0 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center lg:justify-start pt-20 sm:pt-24 lg:pt-28"
            style={{
              opacity: introOpacity,
              transform: `translateY(${introTranslateY}px)`,
              pointerEvents: introOpacity > 0.3 ? 'auto' : 'none',
              transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
            }}
          >
            <div className="max-w-2xl space-y-5 sm:space-y-6 text-center lg:text-left drop-shadow-2xl">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-sand/40 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-sand shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-sand animate-pulse" />
                <span>Couture Event Planning &amp; Scenography</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.14] tracking-tight">
                Designing Memories of <br />
                <span className="italic font-normal text-sand">Timeless Grandeur</span> &amp; Artistry
              </h1>

              {/* Subheading */}
              <p className="text-ivory/90 text-sm sm:text-base lg:text-lg max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                From majestic chateau weddings in Lake Como to summits in Manhattan, Velore &amp; Co. translates bold visions into immersive architectural reality.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <a
                  href="#contact"
                  className="w-full sm:w-auto bg-maroon hover:bg-[#521116] text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-serif text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-2xl hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-3 border border-sand/40 pointer-events-auto"
                >
                  <span>Plan Your Celebration</span>
                  <ArrowRight className="w-4 h-4 text-sand" />
                </a>

                <a
                  href="#gallery"
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-ivory border-2 border-sand/60 hover:border-sand px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-serif text-xs font-semibold tracking-widest uppercase transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2 shadow-lg active:scale-95 pointer-events-auto"
                >
                  <Compass className="w-4 h-4 text-sand" />
                  <span>Explore Portfolio</span>
                </a>
              </div>

              {/* Social Proof */}
              <div className="pt-3 sm:pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-sand/90 font-medium">
                <div className="flex items-center gap-2">
                  <div className="flex text-sand">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-sand text-sand" />
                    ))}
                  </div>
                  <span className="font-bold text-white">5.0 Rating</span>
                  <span className="text-sand/60">| 450+ Events</span>
                </div>

                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-sand" />
                  <span className="text-[11px] sm:text-xs">Condé Nast Top Planner 2024–2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── PARALLAX HUD SCRUBBER ── */}
          <div className="absolute bottom-5 sm:bottom-6 inset-x-0 z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between pointer-events-none text-xs font-mono text-sand/80">
            {/* Scroll Down Cue */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sand animate-ping" />
              <span className="tracking-widest uppercase text-[9px] sm:text-[10px]">
                Scroll To Scrub
              </span>
              <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-bounce text-sand" />
            </div>

            {/* Frame Counter & Progress Bar */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-16 sm:w-28 lg:w-32 h-1 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sand transition-all duration-75 rounded-full"
                  style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                />
              </div>
              <span className="tracking-widest tabular-nums text-[10px] sm:text-[11px]">
                {formatFrameNum(currentDisplayFrame)} / {TOTAL_FRAMES}
              </span>
            </div>
          </div>

          {/* Tiny Buffering Pill */}
          {loadPercent < 100 && (
            <div className="absolute top-20 sm:top-24 right-4 sm:right-6 z-30 px-2.5 sm:px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-sand/30 text-[9px] sm:text-[10px] font-mono text-sand/80 tracking-wider">
              Buffering: {loadPercent}%
            </div>
          )}
        </div>
      </div>

      {/* ── TRANSITION METRIC STRIP (Immediately follows the 3D scroll track) ── */}
      <div className="relative z-20 bg-ivory text-emerald py-10 sm:py-14 px-4 sm:px-6 lg:px-8 border-b border-sand/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 bg-white p-5 sm:p-8 rounded-2xl border-2 border-sand/60 shadow-sm">
            <div className="text-center p-2.5 sm:p-3 border-r border-sand/40">
              <span className="font-serif text-2xl sm:text-4xl font-bold text-emerald">480+</span>
              <p className="text-[10px] sm:text-xs uppercase tracking-wider text-maroon font-semibold mt-1">Galas &amp; Weddings</p>
              <p className="text-[10px] sm:text-[11px] text-emerald/60 mt-0.5 hidden sm:block">Executed flawlessly</p>
            </div>

            <div className="text-center p-2.5 sm:p-3 md:border-r border-sand/40">
              <span className="font-serif text-2xl sm:text-4xl font-bold text-emerald">32</span>
              <p className="text-[10px] sm:text-xs uppercase tracking-wider text-maroon font-semibold mt-1">Countries Served</p>
              <p className="text-[10px] sm:text-[11px] text-emerald/60 mt-0.5 hidden sm:block">Global destination reach</p>
            </div>

            <div className="text-center p-2.5 sm:p-3 border-r border-sand/40">
              <span className="font-serif text-2xl sm:text-4xl font-bold text-emerald">100%</span>
              <p className="text-[10px] sm:text-xs uppercase tracking-wider text-maroon font-semibold mt-1">Bespoke Design</p>
              <p className="text-[10px] sm:text-[11px] text-emerald/60 mt-0.5 hidden sm:block">Zero templated setups</p>
            </div>

            <div className="text-center p-2.5 sm:p-3">
              <span className="font-serif text-2xl sm:text-4xl font-bold text-emerald">24/7</span>
              <p className="text-[10px] sm:text-xs uppercase tracking-wider text-maroon font-semibold mt-1">VIP Concierge</p>
              <p className="text-[10px] sm:text-[11px] text-emerald/60 mt-0.5 hidden sm:block">Dedicated event lead</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

