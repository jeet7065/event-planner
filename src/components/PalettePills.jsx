import React, { useState } from 'react';
import { Palette, Copy, Check, ChevronUp, ChevronDown } from 'lucide-react';

export default function PalettePills() {
  const [copied, setCopied] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const colors = [
    { name: 'Deep Maroon', hex: '#6C171E', role: '10% Focal CTA & Accent', bg: 'bg-[#6C171E]', text: 'text-white' },
    { name: 'Deep Emerald', hex: '#0D3D3A', role: '30% Typography & Headers', bg: 'bg-[#0D3D3A]', text: 'text-[#F4DABF]' },
    { name: 'Warm Sand', hex: '#F4DABF', role: '30% Framing & Borders', bg: 'bg-[#F4DABF]', text: 'text-[#0D3D3A]' },
    { name: 'Soft Ivory', hex: '#FFFFF0', role: '60% Alternate Canvas', bg: 'bg-[#FFFFF0]', text: 'text-[#0D3D3A]' },
    { name: 'Pure White', hex: '#FFFFFF', role: '60% Base Canvas', bg: 'bg-[#FFFFFF]', text: 'text-[#0D3D3A]' },
  ];

  const handleCopy = (hex, name) => {
    navigator.clipboard.writeText(hex);
    setCopied(name);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 hidden md:block">
      <div className="bg-white/95 backdrop-blur-md border-2 border-sand rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 max-w-xs">
        
        {/* Toggle Bar */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-4 py-2.5 bg-emerald text-sand flex items-center justify-between text-xs font-semibold uppercase tracking-wider"
        >
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-sand" />
            <span>Active Color Palette</span>
          </div>
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>

        {/* Expanded Color Swatches */}
        {isExpanded && (
          <div className="p-3.5 space-y-2 text-xs bg-ivory">
            <p className="text-[10px] text-emerald/70 font-semibold uppercase tracking-wider mb-2">
              Click any token to copy HEX:
            </p>
            {colors.map((c) => (
              <div
                key={c.hex}
                onClick={() => handleCopy(c.hex, c.name)}
                className="flex items-center justify-between p-1.5 rounded-lg border border-sand/60 bg-white hover:border-maroon cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <span className={`w-5 h-5 rounded-md ${c.bg} border border-sand/40 shadow-inner shrink-0`}></span>
                  <div className="text-left">
                    <span className="font-bold text-emerald text-[11px] block leading-tight">{c.name}</span>
                    <span className="text-[9px] text-emerald/60 font-mono">{c.role}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 font-mono text-[10px] text-maroon font-semibold">
                  <span>{copied === c.name ? 'Copied!' : c.hex}</span>
                  {copied === c.name ? (
                    <Check className="w-3 h-3 text-emerald" />
                  ) : (
                    <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

