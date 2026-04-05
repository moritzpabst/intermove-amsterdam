"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Step =
  | "choose"
  | "standard-dims"
  | "standard-bed"
  | "standard-summary"
  | "personalised-dims"
  | "personalised-planner";

type BedSize = "90" | "140";
type FurnitureId = "mattress" | "desk" | "wardrobe" | "nightstand" | "chair" | "lamp";

// ─── Constants ────────────────────────────────────────────────────────────────

const PRICES = {
  standard:     { "90": 889,  "140": 929  } as Record<BedSize, number>,
  personalised: { "90": 999,  "140": 1049 } as Record<BedSize, number>,
};

const FURNITURE_TOGGLES: { id: FurnitureId; label: string }[] = [
  { id: "mattress",   label: "Mattress"   },
  { id: "desk",       label: "Desk"       },
  { id: "chair",      label: "Chair"      },
  { id: "wardrobe",   label: "Wardrobe"   },
  { id: "nightstand", label: "Nightstand" },
  { id: "lamp",       label: "Lamp"       },
];

function getStandardIncludes(bedSize: BedSize): string[] {
  return [
    `Bed — ${bedSize}×200cm frame`,
    "Mattress — brand new",
    "Desk",
    "Chair",
    "Wardrobe",
    "Nightstand",
    "Lamp",
  ];
}

// ─── Furniture layout ─────────────────────────────────────────────────────────

interface FurniturePiece {
  id: string;
  label: string;
  top: string;
  left: string;
  width: string;
  height: string;
  bg: string;
  border: string;
  zIndex?: number;
}

function buildFurniture(bedSize: BedSize): FurniturePiece[] {
  // Bed geometry — 90cm is visually narrower than 140cm
  const bedW  = bedSize === "90" ? 34 : 46; // %
  const bedL  = 4;                           // % from left
  const bedT  = 52;                          // % from top

  // Nightstand sits immediately right of the bed
  const nsLeft = bedL + bedW + 1;

  // Mattress is inset inside the bed graphic
  const matInset = 3;
  const matLeft  = bedL + matInset;
  const matWidth = bedW - matInset * 2;

  return [
    // ── Bed (always visible, not in toggle list) ──
    {
      id: "bed",
      label: `Bed · ${bedSize}cm`,
      top:    `${bedT}%`,
      left:   `${bedL}%`,
      width:  `${bedW}%`,
      height: "38%",
      bg:     "#EEF2FF",
      border: "#C7D2FE",
      zIndex: 1,
    },
    // ── Mattress — renders on top of bed ──
    {
      id: "mattress",
      label: "Mattress",
      top:    `${bedT + 3}%`,
      left:   `${matLeft}%`,
      width:  `${matWidth}%`,
      height: "30%",
      bg:     "#DBEAFE",
      border: "#93C5FD",
      zIndex: 2,
    },
    // ── Wardrobe ──
    {
      id: "wardrobe",
      label: "Wardrobe",
      top:    "4%",
      left:   "4%",
      width:  "14%",
      height: "44%",
      bg:     "#FDF4FF",
      border: "#E9D5FF",
      zIndex: 1,
    },
    // ── Desk ──
    {
      id: "desk",
      label: "Desk",
      top:    "4%",
      left:   "55%",
      width:  "39%",
      height: "21%",
      bg:     "#F0FDF4",
      border: "#BBF7D0",
      zIndex: 1,
    },
    // ── Chair ──
    {
      id: "chair",
      label: "Chair",
      top:    "28%",
      left:   "63%",
      width:  "19%",
      height: "17%",
      bg:     "#FFF7ED",
      border: "#FED7AA",
      zIndex: 1,
    },
    // ── Nightstand — sits right of bed, moves with bed size ──
    {
      id: "nightstand",
      label: "Nightstand",
      top:    `${bedT}%`,
      left:   `${nsLeft}%`,
      width:  "9%",
      height: "14%",
      bg:     "#FEF3C7",
      border: "#FCD34D",
      zIndex: 1,
    },
    // ── Lamp ──
    {
      id: "lamp",
      label: "Lamp",
      top:    "76%",
      left:   "82%",
      width:  "10%",
      height: "13%",
      bg:     "#FFFBEB",
      border: "#FDE68A",
      zIndex: 1,
    },
  ];
}

// ─── Shared sub-components ────────────────────────────────────────────────────

function ArrowRight({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function CheckMark({ size = "sm" }: { size?: "sm" | "xs" }) {
  return (
    <svg className={size === "xs" ? "w-2 h-2" : "w-2.5 h-2.5"} fill="none"
      stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3}
        d="M5 13l4 4L19 7" />
    </svg>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#0F0F0F] transition-colors mb-10 group">
      <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
        fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M7 16l-4-4m0 0l4-4m-4 4h18" />
      </svg>
      Back
    </button>
  );
}

function BedToggle({ value, onChange }: { value: BedSize; onChange: (v: BedSize) => void }) {
  return (
    <div className="flex gap-2 p-1 bg-[#F5F5F5] rounded-xl">
      {(["90", "140"] as BedSize[]).map((size) => (
        <button key={size} onClick={() => onChange(size)}
          className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
            value === size
              ? "bg-white text-[#0F0F0F] shadow-sm"
              : "text-gray-400 hover:text-gray-600"
          }`}>
          {size} cm
        </button>
      ))}
    </div>
  );
}

function DimInput({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string;
}) {
  return (
    <div>
      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type="number" min={1} max={20} step={0.1}
          value={value} onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-[#F5F5F5] rounded-xl px-4 py-3.5 pr-10 text-sm text-[#0F0F0F] border-2 border-transparent focus:outline-none focus:border-[#00A86B] transition-colors placeholder:text-gray-300"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium pointer-events-none">
          m
        </span>
      </div>
    </div>
  );
}

// ─── Room canvas ──────────────────────────────────────────────────────────────

function RoomCanvas({ widNum, lenNum, visibleFurniture }: {
  widNum: number; lenNum: number; visibleFurniture: FurniturePiece[];
}) {
  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">
          Floor Plan
        </span>
        <span className="text-[10px] text-gray-400">
          {widNum} × {lenNum} m · {Math.round(widNum * lenNum * 10) / 10} m²
        </span>
      </div>

      <div
        className="relative bg-[#F9F9F9] border-2 border-[#0F0F0F] rounded-xl overflow-hidden w-full"
        style={{ aspectRatio: `${widNum} / ${lenNum}` }}
      >
        {/* Window */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-2.5 border border-blue-100 bg-blue-50/60" />
          ))}
        </div>

        {/* Door arc */}
        <div className="absolute bottom-0 right-10 w-8 border-t-2 border-gray-200" />
        <div className="absolute bottom-0 right-10 w-8 h-8 border-l-2 border-t-2 border-gray-200 rounded-tl-full" />

        {/* Dimension label */}
        <div className="absolute bottom-2 left-2.5 text-[8px] text-gray-300 font-mono select-none">
          {widNum} × {lenNum} m
        </div>

        {/* Compass */}
        <div className="absolute top-3 right-3 flex flex-col items-center select-none">
          <span className="text-[7px] font-bold text-gray-300">N</span>
          <span className="text-[8px] text-gray-300 leading-none">↑</span>
        </div>

        {/* Furniture pieces */}
        {visibleFurniture.map((item) => (
          <div
            key={item.id}
            className="absolute rounded-lg flex items-center justify-center transition-all duration-300"
            style={{
              top: item.top,
              left: item.left,
              width: item.width,
              height: item.height,
              backgroundColor: item.bg,
              border: `1.5px solid ${item.border}`,
              zIndex: item.zIndex ?? 1,
            }}
          >
            <span className="text-[8px] md:text-[9px] font-semibold text-gray-500 text-center leading-tight px-1 select-none">
              {item.label}
            </span>
          </div>
        ))}

        {visibleFurniture.length === 1 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-xs text-gray-300 text-center px-10 leading-relaxed">
              Add furniture items from the panel to populate your room
            </p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
        {visibleFurniture.map((item) => (
          <div key={item.id} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm border"
              style={{ backgroundColor: item.bg, borderColor: item.border }} />
            <span className="text-[10px] text-gray-400">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function BundleFlow() {
  const [step, setStep] = useState<Step>("choose");
  const [bedSize, setBedSize] = useState<BedSize>("90");
  const [roomLength, setRoomLength] = useState("");
  const [roomWidth, setRoomWidth]   = useState("");
  const [activeItems, setActiveItems] = useState<Set<FurnitureId>>(
    new Set<FurnitureId>(["mattress", "desk", "wardrobe", "nightstand", "chair", "lamp"])
  );
  const [ordered, setOrdered] = useState(false);

  const lenNum   = parseFloat(roomLength) || 0;
  const widNum   = parseFloat(roomWidth)  || 0;
  const dimsValid = lenNum >= 1 && lenNum <= 20 && widNum >= 1 && widNum <= 20;
  const roomArea  = Math.round(lenNum * widNum * 10) / 10;

  const toggleItem = (id: FurnitureId) => {
    setActiveItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  };

  const goTo = (newStep: Step) => {
    setStep(newStep);
    setOrdered(false);
    setTimeout(() => {
      const el = document.getElementById("planner");
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 40);
  };

  const allFurniture     = buildFurniture(bedSize);
  const visibleFurniture = allFurniture.filter(
    (f) => f.id === "bed" || activeItems.has(f.id as FurnitureId)
  );

  // Room shape preview (small scaled rect for dims step)
  const previewMaxW = 160, previewMaxH = 100;
  const ratio = widNum > 0 && lenNum > 0 ? widNum / lenNum : 1;
  const pw = ratio > previewMaxW / previewMaxH ? previewMaxW : Math.round(previewMaxH * ratio);
  const ph = ratio > previewMaxW / previewMaxH ? Math.round(previewMaxW / ratio) : previewMaxH;

  return (
    <section id="planner" className="py-24 bg-[#F5F5F5]">
      <div className="max-w-6xl mx-auto px-6">

        {/* ══════════════════════════════════════════════════════════
            STEP 1 — CHOOSE BUNDLE TYPE
        ══════════════════════════════════════════════════════════ */}
        {step === "choose" && (
          <div className="animate-fade-in-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F0F0F] tracking-tight">
                Which bundle is right for you?
              </h2>
              <p className="text-gray-400 mt-4 text-lg">
                Choose your path. We&apos;ll guide you from there.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
              {/* Standard */}
              <button
                onClick={() => goTo("standard-dims")}
                className="text-left bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-[#00A86B] transition-all duration-200 group"
              >
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#00A86B] transition-colors duration-200">
                  <svg className="w-5 h-5 text-[#00A86B] group-hover:text-white transition-colors"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="inline-flex items-center bg-[#0F0F0F] text-white text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full mb-4">
                  Fast &amp; simple
                </div>
                <h3 className="text-2xl font-bold text-[#0F0F0F] mb-3">Standard Bundle</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-7">
                  We curate the perfect setup. Answer two quick questions — then
                  you&apos;re done. No decisions, no stress.
                </p>
                <ul className="space-y-2.5 mb-8">
                  {["Everything chosen for you", "Just pick your bed size", "Ready in minutes"].map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-sm text-gray-500">
                      <span className="w-4 h-4 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 text-[#00A86B]">
                        <CheckMark size="xs" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                  <span className="text-2xl font-black text-[#0F0F0F]">From €889</span>
                  <span className="flex items-center gap-1.5 text-[#00A86B] text-sm font-semibold group-hover:gap-2.5 transition-all">
                    Get started <ArrowRight />
                  </span>
                </div>
              </button>

              {/* Personalised */}
              <button
                onClick={() => goTo("personalised-dims")}
                className="text-left bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-[#00A86B] transition-all duration-200 group"
              >
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#00A86B] transition-colors duration-200">
                  <svg className="w-5 h-5 text-[#00A86B] group-hover:text-white transition-colors"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <div className="inline-flex items-center bg-[#00A86B] text-white text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full mb-4">
                  Most popular
                </div>
                <h3 className="text-2xl font-bold text-[#0F0F0F] mb-3">Personalised Bundle</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-7">
                  Enter your room dimensions and design the layout with our
                  planner. Choose exactly what goes in — same simple pricing.
                </p>
                <ul className="space-y-2.5 mb-8">
                  {["Interactive room planner", "Toggle furniture on or off", "See your room before delivery"].map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-sm text-gray-500">
                      <span className="w-4 h-4 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 text-[#00A86B]">
                        <CheckMark size="xs" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                  <span className="text-2xl font-black text-[#0F0F0F]">From €999</span>
                  <span className="flex items-center gap-1.5 text-[#00A86B] text-sm font-semibold group-hover:gap-2.5 transition-all">
                    Start planning <ArrowRight />
                  </span>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            STANDARD — STEP 2: ROOM DIMENSIONS
        ══════════════════════════════════════════════════════════ */}
        {step === "standard-dims" && (
          <div className="animate-fade-in-up">
            <BackButton onClick={() => goTo("choose")} />
            <div className="max-w-xl mx-auto">
              <div className="mb-10">
                <div className="inline-flex items-center bg-green-50 text-[#00A86B] text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full mb-4">
                  Standard Bundle · Step 1 of 3
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F0F0F] tracking-tight">
                  How big is your room?
                </h2>
                <p className="text-gray-400 mt-3 text-lg">
                  Check your lease or measure wall to wall.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <DimInput label="Length" value={roomLength} onChange={setRoomLength} placeholder="4.0" />
                  <DimInput label="Width"  value={roomWidth}  onChange={setRoomWidth}  placeholder="3.0" />
                </div>

                {/* Live room preview */}
                <div className="mb-6">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">
                    Room shape preview
                  </p>
                  <div className="flex items-center justify-center bg-[#F5F5F5] rounded-xl py-8 min-h-[140px]">
                    {dimsValid ? (
                      <div className="flex flex-col items-center gap-4">
                        <div className="relative bg-white border-2 border-[#0F0F0F] rounded-lg flex items-center justify-center transition-all duration-300"
                          style={{ width: pw, height: ph }}>
                          <div className="absolute -top-5 left-0 right-0 flex items-center justify-center gap-1">
                            <div className="flex-1 h-px bg-gray-300" />
                            <span className="text-[8px] text-gray-400 font-mono whitespace-nowrap">{roomWidth} m</span>
                            <div className="flex-1 h-px bg-gray-300" />
                          </div>
                          <div className="absolute -right-7 top-0 bottom-0 flex flex-col items-center justify-center">
                            <span className="text-[8px] text-gray-400 font-mono [writing-mode:vertical-rl] select-none">{roomLength} m</span>
                          </div>
                          <span className="text-[9px] font-semibold text-gray-400">{roomArea} m²</span>
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-300">Enter dimensions above to preview</span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                  <span className="font-semibold text-gray-500">Tip:</span>{" "}
                  Values between 1–20 m. Check your rental agreement or measure wall to wall.
                </p>

                <button
                  onClick={() => { if (dimsValid) goTo("standard-bed"); }}
                  disabled={!dimsValid}
                  className={`w-full py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
                    dimsValid
                      ? "bg-[#00A86B] text-white hover:bg-[#007A4E]"
                      : "bg-gray-100 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  Continue <ArrowRight />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            STANDARD — STEP 3: BED SIZE
        ══════════════════════════════════════════════════════════ */}
        {step === "standard-bed" && (
          <div className="animate-fade-in-up">
            <BackButton onClick={() => goTo("standard-dims")} />
            <div className="max-w-xl mx-auto">
              <div className="mb-10">
                <div className="inline-flex items-center bg-green-50 text-[#00A86B] text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full mb-4">
                  Standard Bundle · Step 2 of 3
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F0F0F] tracking-tight">
                  What bed size do you need?
                </h2>
                <p className="text-gray-400 mt-3 text-lg">
                  90 cm fits most student rooms. 140 cm if you have the space.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {(["90", "140"] as BedSize[]).map((size) => (
                    <button
                      key={size}
                      onClick={() => setBedSize(size)}
                      className={`py-6 px-4 rounded-xl border-2 transition-all duration-200 text-center ${
                        bedSize === size
                          ? "border-[#00A86B] bg-green-50"
                          : "border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      <div className={`text-3xl font-black mb-1 ${bedSize === size ? "text-[#00A86B]" : "text-[#0F0F0F]"}`}>
                        {size} cm
                      </div>
                      <div className="text-xs text-gray-400">
                        {size === "90" ? "Single / Studio" : "Double / Comfort"}
                      </div>
                      <div className="text-xs text-gray-400 mt-1 font-semibold">
                        €{PRICES.standard[size]}
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => goTo("standard-summary")}
                  className="w-full py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 bg-[#00A86B] text-white hover:bg-[#007A4E] transition-colors"
                >
                  Continue <ArrowRight />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            STANDARD — STEP 4: SUMMARY
        ══════════════════════════════════════════════════════════ */}
        {step === "standard-summary" && (
          <div className="animate-fade-in-up">
            <BackButton onClick={() => goTo("standard-bed")} />
            <div className="max-w-xl mx-auto">
              <div className="mb-10">
                <div className="inline-flex items-center bg-green-50 text-[#00A86B] text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full mb-4">
                  Standard Bundle · Step 3 of 3
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F0F0F] tracking-tight">
                  Your bundle includes
                </h2>
                <p className="text-gray-400 mt-3 text-lg">
                  Everything selected and ready to deliver.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 mb-4">
                {/* Room + bed summary chips */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  <div className="bg-[#F5F5F5] rounded-xl px-4 py-3">
                    <div className="text-[10px] text-gray-400 font-medium mb-1">Room</div>
                    <div className="text-sm font-semibold text-[#0F0F0F]">{roomLength} × {roomWidth} m</div>
                  </div>
                  <div className="bg-[#F5F5F5] rounded-xl px-4 py-3">
                    <div className="text-[10px] text-gray-400 font-medium mb-1">Bed size</div>
                    <div className="text-sm font-semibold text-[#0F0F0F]">{bedSize}×200 cm</div>
                  </div>
                </div>

                {/* Items list */}
                <div className="mb-2">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-4">
                    What&apos;s included
                  </p>
                  <ul className="space-y-3">
                    {getStandardIncludes(bedSize).map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 text-[#00A86B]">
                          <CheckMark size="xs" />
                        </span>
                        <span className="text-sm text-[#0F0F0F] font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Price + CTA */}
              <div className="bg-[#0F0F0F] rounded-2xl p-7">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <div className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.15em] mb-1">Bundle price</div>
                    <div className="text-gray-500 text-xs">one-time · incl. delivery &amp; assembly</div>
                  </div>
                  <div className="text-4xl font-black text-white">€{PRICES.standard[bedSize]}</div>
                </div>

                {!ordered ? (
                  <button
                    onClick={() => setOrdered(true)}
                    className="w-full bg-[#00A86B] text-white font-semibold py-4 rounded-xl hover:bg-[#007A4E] transition-colors text-sm flex items-center justify-center gap-2"
                  >
                    Request this bundle <ArrowRight />
                  </button>
                ) : (
                  <div className="text-center py-2 animate-fade-in-up">
                    <div className="text-green-400 text-sm font-semibold mb-1">✓ Bundle request sent!</div>
                    <div className="text-gray-600 text-xs">We&apos;ll be in touch within 24 hours to confirm your delivery date.</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            PERSONALISED — STEP 2: ROOM DIMENSIONS
        ══════════════════════════════════════════════════════════ */}
        {step === "personalised-dims" && (
          <div className="animate-fade-in-up">
            <BackButton onClick={() => goTo("choose")} />
            <div className="max-w-xl mx-auto">
              <div className="mb-10">
                <div className="inline-flex items-center bg-[#00A86B] text-white text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full mb-4">
                  Personalised Bundle
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F0F0F] tracking-tight">
                  Let&apos;s set up<br />your room.
                </h2>
                <p className="text-gray-400 mt-4 text-lg">
                  Enter your room dimensions. We&apos;ll build an accurate floor plan to match.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <DimInput label="Length" value={roomLength} onChange={setRoomLength} placeholder="4.0" />
                  <DimInput label="Width"  value={roomWidth}  onChange={setRoomWidth}  placeholder="3.0" />
                </div>

                <div className="mb-6">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">
                    Room shape preview
                  </p>
                  <div className="flex items-center justify-center bg-[#F5F5F5] rounded-xl py-8 min-h-[140px]">
                    {dimsValid ? (
                      <div className="flex flex-col items-center gap-4">
                        <div className="relative bg-white border-2 border-[#0F0F0F] rounded-lg flex items-center justify-center transition-all duration-300"
                          style={{ width: pw, height: ph }}>
                          <div className="absolute -top-5 left-0 right-0 flex items-center justify-center gap-1">
                            <div className="flex-1 h-px bg-gray-300" />
                            <span className="text-[8px] text-gray-400 font-mono whitespace-nowrap">{roomWidth} m</span>
                            <div className="flex-1 h-px bg-gray-300" />
                          </div>
                          <div className="absolute -right-7 top-0 bottom-0 flex flex-col items-center justify-center">
                            <span className="text-[8px] text-gray-400 font-mono [writing-mode:vertical-rl] select-none">{roomLength} m</span>
                          </div>
                          <span className="text-[9px] font-semibold text-gray-400">{roomArea} m²</span>
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-300">Enter dimensions above to preview</span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                  <span className="font-semibold text-gray-500">Tip:</span>{" "}
                  Check your rental agreement or measure from wall to wall. Values between 1–20 m.
                </p>

                <button
                  onClick={() => { if (dimsValid) goTo("personalised-planner"); }}
                  disabled={!dimsValid}
                  className={`w-full py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
                    dimsValid
                      ? "bg-[#00A86B] text-white hover:bg-[#007A4E]"
                      : "bg-gray-100 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  Continue to Room Planner <ArrowRight />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            PERSONALISED — STEP 3: ROOM PLANNER
        ══════════════════════════════════════════════════════════ */}
        {step === "personalised-planner" && (
          <div className="animate-fade-in-up">
            <BackButton onClick={() => goTo("personalised-dims")} />

            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <div className="inline-flex items-center bg-[#00A86B] text-white text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full mb-4">
                  Personalised Bundle
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F0F0F] tracking-tight">
                  Design your room.
                </h2>
              </div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="bg-white border border-gray-100 rounded-xl px-4 py-2 text-sm font-semibold text-[#0F0F0F]">
                  {roomWidth} × {roomLength} m
                </span>
                <span className="text-gray-300">·</span>
                <span className="text-sm text-gray-400">{roomArea} m²</span>
                <button
                  onClick={() => goTo("personalised-dims")}
                  className="text-xs text-[#00A86B] underline underline-offset-2 hover:no-underline transition-all"
                >
                  edit
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-[240px,1fr] gap-5">
              {/* Controls panel */}
              <div className="flex flex-col gap-4">
                {/* Bed size */}
                <div className="bg-white rounded-2xl p-5">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">
                    Bed Size
                  </p>
                  <BedToggle value={bedSize} onChange={setBedSize} />
                </div>

                {/* Furniture toggles */}
                <div className="bg-white rounded-2xl p-5">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">
                    Furniture Items
                  </p>
                  <div className="flex flex-col gap-2">
                    {FURNITURE_TOGGLES.map(({ id, label }) => {
                      const on = activeItems.has(id);
                      return (
                        <button
                          key={id}
                          onClick={() => toggleItem(id)}
                          className={`py-2.5 px-4 rounded-xl text-sm font-medium flex items-center justify-between transition-all duration-150 border ${
                            on
                              ? "bg-green-50 border-[#00A86B] text-[#0F0F0F]"
                              : "bg-[#F5F5F5] border-transparent text-gray-400 hover:text-gray-600"
                          }`}
                        >
                          <span>{label}</span>
                          <span className={`text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center ${
                            on ? "bg-[#00A86B] text-white" : "bg-gray-200 text-gray-400"
                          }`}>
                            {on ? "✓" : "+"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Price + CTA */}
                <div className="bg-[#0F0F0F] rounded-2xl p-5">
                  <div className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.15em] mb-1">
                    Bundle price
                  </div>
                  <div className="text-3xl font-black text-white mb-0.5">
                    €{PRICES.personalised[bedSize]}
                  </div>
                  <div className="text-xs text-gray-600 mb-5">incl. delivery &amp; assembly</div>

                  {!ordered ? (
                    <button
                      onClick={() => setOrdered(true)}
                      className="w-full bg-[#00A86B] text-white font-semibold py-3.5 rounded-xl hover:bg-[#007A4E] transition-colors text-sm flex items-center justify-center gap-2"
                    >
                      Get my bundle <ArrowRight />
                    </button>
                  ) : (
                    <div className="text-center animate-fade-in-up">
                      <div className="text-green-400 text-sm font-semibold">✓ Bundle request sent!</div>
                      <div className="text-gray-600 text-xs mt-1">We&apos;ll confirm within 24 hours.</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Room canvas */}
              <RoomCanvas widNum={widNum} lenNum={lenNum} visibleFurniture={visibleFurniture} />
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
