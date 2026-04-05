"use client";

import { useEffect, useRef, useState } from "react";

// ─── Sketch SVG illustrations ─────────────────────────────────────────────────

function SofaIllustration() {
  return (
    <svg
      viewBox="0 0 160 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
    >
      {/* Back cushions */}
      <rect x="20" y="16" width="50" height="34" rx="6" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="78" y="16" width="50" height="34" rx="6" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Cushion fold lines */}
      <path d="M22 48 C30 40 38 38 46 48" stroke="#2D2D2D" strokeWidth="0.8" strokeLinecap="round" fill="none" />
      <path d="M80 48 C88 40 96 38 104 48" stroke="#2D2D2D" strokeWidth="0.8" strokeLinecap="round" fill="none" />
      {/* Seat */}
      <rect x="14" y="48" width="132" height="28" rx="5" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Left arm */}
      <rect x="4" y="32" width="14" height="44" rx="5" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Right arm */}
      <rect x="142" y="32" width="14" height="44" rx="5" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Legs */}
      <line x1="24" y1="76" x2="22" y2="90" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="60" y1="76" x2="59" y2="90" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="100" y1="76" x2="101" y2="90" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="136" y1="76" x2="138" y2="90" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ArmchairIllustration() {
  return (
    <svg
      viewBox="0 0 120 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
    >
      {/* Back */}
      <path
        d="M22 60 Q20 22 30 18 L90 18 Q100 22 98 60"
        stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinejoin="round"
      />
      {/* Back cushion arc */}
      <path
        d="M30 60 Q30 34 60 30 Q90 34 90 60"
        stroke="#2D2D2D" strokeWidth="0.8" fill="none" strokeLinecap="round"
      />
      {/* Seat */}
      <rect x="16" y="56" width="88" height="28" rx="7" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* Seat crease */}
      <path d="M20 70 Q60 66 100 70" stroke="#2D2D2D" strokeWidth="0.8" fill="none" strokeLinecap="round" />
      {/* Left arm */}
      <path
        d="M8 40 Q6 62 16 72 L16 56 Q10 52 10 40 Q10 36 14 36"
        stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Right arm */}
      <path
        d="M112 40 Q114 62 104 72 L104 56 Q110 52 110 40 Q110 36 106 36"
        stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Legs */}
      <line x1="26" y1="84" x2="24" y2="98" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="94" y1="84" x2="96" y2="98" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="42" y1="84" x2="41" y2="97" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="78" y1="84" x2="79" y2="97" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ScrollShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;
      // 0 = section bottom just entered viewport, 1 = section top at viewport top
      const raw = (windowH - rect.top) / (windowH + rect.height * 0.5);
      setProgress(Math.max(0, Math.min(1, raw)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run on mount in case already in view
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Clamp animation to first 60% of scroll through the section
  const eased = Math.min(1, progress * 1.7);

  // Sofa: off-screen left (-120%) → resting (-8%, slightly cropped)
  const sofaX = -120 + eased * 112;
  // Armchair: off-screen right (120%) → resting (8%, slightly cropped)
  const armchairX = 120 - eased * 112;

  return (
    <section
      ref={sectionRef}
      id="bundles"
      className="relative py-28 bg-[#FAFAF7] overflow-hidden"
    >
      {/* ── Sofa — slides in from left ── */}
      <div
        className="absolute top-1/2 left-0 w-[42vw] max-w-[600px] opacity-[0.2] pointer-events-none select-none"
        style={{
          transform: `translateX(${sofaX}%) translateY(-50%)`,
          willChange: "transform",
        }}
        aria-hidden="true"
      >
        <SofaIllustration />
      </div>

      {/* ── Armchair — slides in from right ── */}
      <div
        className="absolute top-1/2 right-0 w-[30vw] max-w-[440px] opacity-[0.2] pointer-events-none select-none"
        style={{
          transform: `translateX(${armchairX}%) translateY(-50%)`,
          willChange: "transform",
        }}
        aria-hidden="true"
      >
        <ArmchairIllustration />
      </div>

      {/* ── Centre — bundle preview cards ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111111] tracking-tight">
            Choose your bundle
          </h2>
          <p className="text-[#888] mt-3 text-lg">
            Two options. Same pre-loved quality. Pick what suits you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {/* Standard */}
          <div className="bg-white rounded-2xl p-8 border-2 border-[#EBEBEB] shadow-[0_4px_32px_rgba(0,0,0,0.05)]">
            <h3 className="text-xl font-bold text-[#111111] mb-2">Standard Bundle</h3>
            <p className="text-sm text-[#999] leading-relaxed mb-6">
              Fully curated second-hand setup. We select everything — you just move in.
            </p>
            <div className="text-5xl font-black text-[#111111] tracking-tight mb-1">
              €889
            </div>
            <div className="text-xs text-[#bbb] mb-2">from · 90×200cm · incl. new mattress</div>
            <div className="flex items-center gap-1.5 text-xs text-[#00A86B] font-medium mb-7">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Free delivery &amp; assembly included
            </div>
            <a
              href="/#contact"
              className="block w-full py-3.5 rounded-xl bg-[#F5F5F2] text-[#555] font-semibold text-sm text-center hover:bg-[#EBEBEB] transition-colors"
            >
              Select Standard
            </a>
          </div>

          {/* Personalised — featured */}
          <div className="bg-[#F3FBF7] rounded-2xl p-8 border-2 border-[#00A86B] shadow-[0_4px_32px_rgba(0,168,107,0.12)]">
            <div className="inline-flex items-center bg-[#00A86B] text-white text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full mb-3">
              Most popular
            </div>
            <h3 className="text-xl font-bold text-[#111111] mb-2">Personalised Bundle</h3>
            <p className="text-sm text-[#777] leading-relaxed mb-6">
              Choose your pre-loved pieces with our interactive room planner.
            </p>
            <div className="text-5xl font-black text-[#111111] tracking-tight mb-1">
              €999
            </div>
            <div className="text-xs text-[#bbb] mb-2">from · 90×200cm · incl. new mattress</div>
            <div className="flex items-center gap-1.5 text-xs text-[#00A86B] font-medium mb-7">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Free delivery &amp; assembly included
            </div>
            <a
              href="/room-planner"
              className="block w-full py-3.5 rounded-xl bg-[#00A86B] text-white font-semibold text-sm text-center hover:bg-[#007A4E] transition-colors"
            >
              Personalise My Room
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
