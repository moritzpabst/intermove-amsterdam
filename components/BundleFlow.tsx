"use client";

import { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Step =
  | "choose"
  | "standard"
  | "standard-summary"
  | "personalised-dims"
  | "personalised-planner";
type BedSize = "90" | "140";
type FurnitureId = "bed" | "mattress" | "desk" | "chair" | "wardrobe" | "nightstand" | "lamp";

// ─── Constants ────────────────────────────────────────────────────────────────

const PRICES = {
  standard:    { "90": 889,  "140": 929  } as Record<BedSize, number>,
  personalised:{ "90": 999,  "140": 1049 } as Record<BedSize, number>,
};

const STANDARD_INCLUDES = [
  "Bed",
  "Mattress (brand new)",
  "Desk",
  "Chair",
  "Wardrobe",
  "Nightstand",
  "Lamp",
];

const FURNITURE_TOGGLES: { id: FurnitureId; label: string }[] = [
  { id: "bed",       label: "Bed" },
  { id: "mattress",  label: "Mattress" },
  { id: "desk",      label: "Desk" },
  { id: "chair",     label: "Chair" },
  { id: "wardrobe",  label: "Wardrobe" },
  { id: "nightstand",label: "Nightstand" },
  { id: "lamp",      label: "Lamp" },
];

interface FurniturePiece {
  id: string;
  label: string;
  top: string;
  left: string;
  width: string;
  height: string;
  bg: string;
  border: string;
}

// Furniture sizes are percentages of the canvas so they scale with room dimensions.
// Bed width is the only value that changes with bedSize.
function buildFurniture(bedSize: BedSize): FurniturePiece[] {
  // Bed: 90cm=18%, 140cm=28% wide · always 35% tall · left side, vertically centred
  const bedW = bedSize === "90" ? "18%" : "28%";
  // Mattress: bed minus 2% on each side
  const matW = bedSize === "90" ? "14%" : "24%";
  // Nightstand left = bedLeft(2%) + bedWidth + 2% gap
  const nsL  = bedSize === "90" ? "22%" : "32%";

  return [
    // ── Left side ──────────────────────────────────────────────────────────
    {
      id: "wardrobe",
      label: "Wardrobe",
      top: "2%", left: "2%",
      width: "20%", height: "12%",
      bg: "#FDF4FF", border: "#E9D5FF",
    },
    {
      id: "bed",
      label: `Bed · ${bedSize} cm`,
      top: "32.5%", left: "2%",     // centred: 50% - 35%/2 = 32.5%
      width: bedW, height: "35%",
      bg: "#EEF2FF", border: "#C7D2FE",
    },
    {
      id: "mattress",
      label: "Mattress",
      top: "34.5%", left: "4%",     // bed top+2%, bed left+2%
      width: matW, height: "31%",   // bed dims minus 2% each side
      bg: "#E0E7FF", border: "#A5B4FC",
    },
    {
      id: "nightstand",
      label: "Nightstand",
      top: "45.5%", left: nsL,      // vertically centred on bed: 50% - 9%/2
      width: "9%", height: "9%",
      bg: "#FFF1F2", border: "#FECDD3",
    },
    // ── Right side ─────────────────────────────────────────────────────────
    {
      id: "desk",
      label: "Desk",
      top: "2%", left: "70%",       // 100% - 28% width - 2% margin
      width: "28%", height: "14%",
      bg: "#F0FDF4", border: "#BBF7D0",
    },
    {
      id: "chair",
      label: "Chair",
      top: "18%", left: "78.5%",   // below desk (2+14+2=18%), centred under it (70+(28-11)/2)
      width: "11%", height: "11%",
      bg: "#FFF7ED", border: "#FED7AA",
    },
    {
      id: "lamp",
      label: "Lamp",
      top: "91%", left: "91%",     // bottom-right: 100% - 7% - 2%
      width: "7%", height: "7%",
      bg: "#FFFBEB", border: "#FDE68A",
    },
  ];
}

// ─── Shared sub-components ────────────────────────────────────────────────────

function ArrowRight({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function CheckMark({ size = "sm" }: { size?: "sm" | "xs" }) {
  return (
    <svg className={size === "xs" ? "w-2 h-2" : "w-2.5 h-2.5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#0F0F0F] transition-colors mb-10 group"
    >
      <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
      </svg>
      Back
    </button>
  );
}

function BedToggle({ value, onChange }: { value: BedSize; onChange: (v: BedSize) => void }) {
  return (
    <div className="flex gap-2 p-1 bg-[#F5F5F5] rounded-xl">
      {(["90", "140"] as BedSize[]).map((size) => (
        <button
          key={size}
          onClick={() => onChange(size)}
          className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
            value === size ? "bg-white text-[#0F0F0F] shadow-sm" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          {size} cm
        </button>
      ))}
    </div>
  );
}

function DimInput({
  label, value, onChange, placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string;
}) {
  return (
    <div>
      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          min={1}
          max={20}
          step={0.1}
          value={value}
          onChange={(e) => onChange(e.target.value)}
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

function RoomCanvas({
  widNum, lenNum, visibleFurniture,
}: {
  widNum: number; lenNum: number; visibleFurniture: FurniturePiece[];
}) {
  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">Floor Plan</span>
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

        {/* Furniture */}
        {visibleFurniture.map((item) => (
          <div
            key={item.id}
            className="absolute rounded-lg flex items-center justify-center transition-all duration-300"
            style={{
              top: item.top, left: item.left,
              width: item.width, height: item.height,
              backgroundColor: item.bg,
              border: `1.5px solid ${item.border}`,
            }}
          >
            <span className="text-[8px] md:text-[9px] font-semibold text-gray-500 text-center leading-tight px-1 select-none">
              {item.label}
            </span>
          </div>
        ))}

        {visibleFurniture.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-xs text-gray-300 text-center px-10 leading-relaxed">
              Enable furniture items from the panel to populate your room
            </p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
        {visibleFurniture.map((item) => (
          <div key={item.id} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm border" style={{ backgroundColor: item.bg, borderColor: item.border }} />
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
  const [roomWidth, setRoomWidth] = useState("");
  const [activeItems, setActiveItems] = useState<Set<FurnitureId>>(
    new Set<FurnitureId>(["bed", "mattress", "desk", "chair", "wardrobe", "nightstand", "lamp"])
  );
  const [ordered, setOrdered] = useState(false);

  const lenNum = parseFloat(roomLength) || 0;
  const widNum = parseFloat(roomWidth) || 0;
  const dimsValid = lenNum >= 1 && lenNum <= 20 && widNum >= 1 && widNum <= 20;
  const roomArea = Math.round(lenNum * widNum * 10) / 10;

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
      const el = document.getElementById("bundles");
      if (el) {
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
      }
    }, 40);
  };

  const allFurniture = buildFurniture(bedSize);
  const visibleFurniture = allFurniture.filter((f) => activeItems.has(f.id as FurnitureId));

  // Small room shape preview for personalised-dims step
  const previewMaxW = 160, previewMaxH = 100;
  const ratio = widNum > 0 && lenNum > 0 ? widNum / lenNum : 1;
  const pw = ratio > previewMaxW / previewMaxH ? previewMaxW : Math.round(previewMaxH * ratio);
  const ph = ratio > previewMaxW / previewMaxH ? Math.round(previewMaxW / ratio) : previewMaxH;

  return (
    <section id="bundles" className="py-24 bg-[#F5F5F5]">
      <div className="max-w-6xl mx-auto px-6">

        {/* ══ STEP 1 — CHOOSE BUNDLE ══════════════════════════════════════════ */}
        {step === "choose" && (
          <div className="animate-fade-in-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F0F0F] tracking-tight">
                Which bundle is right for you?
              </h2>
              <p className="text-gray-400 mt-4 text-lg">Choose your path. We&apos;ll guide you from there.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
              {/* Standard card */}
              <button
                onClick={() => goTo("standard")}
                className="text-left bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-[#00A86B] transition-all duration-200 group"
              >
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#00A86B] transition-colors duration-200">
                  <svg className="w-5 h-5 text-[#00A86B] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="inline-flex items-center bg-[#0F0F0F] text-white text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full mb-4">
                  Fast &amp; simple
                </div>
                <h3 className="text-2xl font-bold text-[#0F0F0F] mb-3">Standard Bundle</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-7">
                  We curate the perfect setup. Answer two quick questions — then you&apos;re done. No decisions, no stress.
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

              {/* Personalised card */}
              <button
                onClick={() => goTo("personalised-dims")}
                className="text-left bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-[#00A86B] transition-all duration-200 group"
              >
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#00A86B] transition-colors duration-200">
                  <svg className="w-5 h-5 text-[#00A86B] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <div className="inline-flex items-center bg-[#00A86B] text-white text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full mb-4">
                  Most popular
                </div>
                <h3 className="text-2xl font-bold text-[#0F0F0F] mb-3">Personalised Bundle</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-7">
                  Enter your room dimensions and design the layout with our planner. Choose exactly what goes in — same simple pricing.
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

        {/* ══ STEP 2A — STANDARD: QUESTIONS ═══════════════════════════════════ */}
        {step === "standard" && (
          <div className="animate-fade-in-up">
            <BackButton onClick={() => goTo("choose")} />
            <div className="max-w-xl mx-auto">
              <div className="mb-10">
                <div className="inline-flex items-center bg-green-50 text-[#00A86B] text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full mb-4">
                  Standard Bundle
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F0F0F] tracking-tight">
                  Two quick questions.
                  <br />
                  Then you&apos;re done.
                </h2>
              </div>

              <div className="space-y-4">
                {/* Q1: Room dimensions */}
                <div className="bg-white rounded-2xl p-7">
                  <div className="flex items-start gap-4">
                    <div className="w-7 h-7 rounded-full bg-[#00A86B] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-[#0F0F0F] mb-0.5">How big is your room?</h3>
                      <p className="text-xs text-gray-400 mb-5">Check your lease or measure wall to wall.</p>
                      <div className="grid grid-cols-2 gap-3">
                        <DimInput label="Length" value={roomLength} onChange={setRoomLength} placeholder="4.0" />
                        <DimInput label="Width"  value={roomWidth}  onChange={setRoomWidth}  placeholder="3.0" />
                      </div>
                      {dimsValid && (
                        <p className="mt-3 text-xs text-gray-400">
                          Room area: <span className="font-semibold text-[#0F0F0F]">{roomArea} m²</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Q2: Bed size */}
                <div className="bg-white rounded-2xl p-7">
                  <div className="flex items-start gap-4">
                    <div className="w-7 h-7 rounded-full bg-[#00A86B] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-[#0F0F0F] mb-0.5">What bed size do you need?</h3>
                      <p className="text-xs text-gray-400 mb-5">
                        90 cm fits most student rooms. 140 cm if you have the space.
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {(["90", "140"] as BedSize[]).map((size) => (
                          <button
                            key={size}
                            onClick={() => setBedSize(size)}
                            className={`py-4 px-4 rounded-xl border-2 transition-all duration-200 text-center ${
                              bedSize === size ? "border-[#00A86B] bg-green-50" : "border-gray-100 hover:border-gray-200"
                            }`}
                          >
                            <div className={`text-xl font-black ${bedSize === size ? "text-[#00A86B]" : "text-[#0F0F0F]"}`}>
                              {size} cm
                            </div>
                            <div className="text-xs text-gray-400 mt-0.5">
                              {size === "90" ? "Single / Studio" : "Double / Comfort"}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Continue button — enabled only when dims are valid */}
                <button
                  onClick={() => { if (dimsValid) goTo("standard-summary"); }}
                  disabled={!dimsValid}
                  className={`w-full py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
                    dimsValid
                      ? "bg-[#00A86B] text-white hover:bg-[#007A4E]"
                      : "bg-gray-100 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  {dimsValid ? <>Continue to Summary <ArrowRight /></> : "Enter your room dimensions to continue"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══ STEP 2A-SUMMARY — STANDARD: WHAT'S INCLUDED ════════════════════ */}
        {step === "standard-summary" && (
          <div className="animate-fade-in-up">
            <BackButton onClick={() => goTo("standard")} />
            <div className="max-w-xl mx-auto">
              <div className="mb-10">
                <div className="inline-flex items-center bg-green-50 text-[#00A86B] text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full mb-4">
                  Standard Bundle
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F0F0F] tracking-tight">
                  Your bundle is ready.
                </h2>
                <p className="text-gray-400 mt-3 text-base">
                  Everything selected and ready for delivery.
                </p>
              </div>

              {/* Summary card */}
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
                {/* Room + bed chips */}
                <div className="grid grid-cols-2 divide-x divide-gray-100 border-b border-gray-100">
                  <div className="px-6 py-4">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-1">Room</div>
                    <div className="text-[#0F0F0F] font-semibold text-sm">{roomLength} × {roomWidth} m · {roomArea} m²</div>
                  </div>
                  <div className="px-6 py-4">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-1">Bed</div>
                    <div className="text-[#0F0F0F] font-semibold text-sm">{bedSize} cm · {bedSize === "90" ? "Single" : "Double"}</div>
                  </div>
                </div>

                {/* Included items */}
                <div className="px-6 pt-6 pb-5">
                  <p className="text-sm font-bold text-[#0F0F0F] mb-4">What&apos;s included in your bundle:</p>
                  <ul className="space-y-3">
                    {STANDARD_INCLUDES.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 text-[#00A86B]">
                          <CheckMark size="xs" />
                        </span>
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                    <li className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 text-[#00A86B]">
                        <CheckMark size="xs" />
                      </span>
                      <span className="text-sm text-gray-700">Free delivery &amp; assembly</span>
                    </li>
                  </ul>
                </div>

                {/* Price + CTA */}
                <div className="bg-[#0F0F0F] px-6 py-6 rounded-b-2xl">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <div className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.15em] mb-1">Total price</div>
                      <div className="text-4xl font-black text-white">€{PRICES.standard[bedSize]}</div>
                      <div className="text-xs text-gray-600 mt-0.5">one-time · incl. delivery &amp; assembly</div>
                    </div>
                  </div>

                  {!ordered ? (
                    <button
                      onClick={() => setOrdered(true)}
                      className="w-full bg-[#00A86B] text-white font-semibold py-4 rounded-xl hover:bg-[#007A4E] transition-colors text-sm flex items-center justify-center gap-2"
                    >
                      Get my bundle <ArrowRight />
                    </button>
                  ) : (
                    <div className="text-center animate-fade-in-up py-2">
                      <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="text-white font-semibold text-sm mb-1">Bundle request sent!</div>
                      <div className="text-gray-500 text-xs">We&apos;ll be in touch within 24 hours to confirm your delivery date.</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══ STEP 2B — PERSONALISED: ROOM DIMENSIONS ═════════════════════════ */}
        {step === "personalised-dims" && (
          <div className="animate-fade-in-up">
            <BackButton onClick={() => goTo("choose")} />
            <div className="max-w-xl mx-auto">
              <div className="mb-10">
                <div className="inline-flex items-center bg-[#00A86B] text-white text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full mb-4">
                  Personalised Bundle
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F0F0F] tracking-tight">
                  Let&apos;s set up
                  <br />
                  your room.
                </h2>
                <p className="text-gray-400 mt-4 text-lg">
                  Enter your room dimensions. We&apos;ll build an accurate floor plan to match.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8">
                <h3 className="text-sm font-semibold text-[#0F0F0F] mb-5">Room dimensions</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <DimInput label="Length" value={roomLength} onChange={setRoomLength} placeholder="4.0" />
                  <DimInput label="Width"  value={roomWidth}  onChange={setRoomWidth}  placeholder="3.0" />
                </div>

                {/* Live room shape preview */}
                <div className="mb-6">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">Room shape preview</p>
                  <div className="flex items-center justify-center bg-[#F5F5F5] rounded-xl py-8 min-h-[140px]">
                    {dimsValid ? (
                      <div className="flex flex-col items-center gap-4">
                        <div
                          className="relative bg-white border-2 border-[#0F0F0F] rounded-lg flex items-center justify-center transition-all duration-300"
                          style={{ width: pw, height: ph }}
                        >
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
                  <span className="font-semibold text-gray-500">Tip:</span> Check your rental agreement or measure from wall to wall. Values between 1 – 20 m.
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
                  {dimsValid ? <>Continue to Room Planner <ArrowRight /></> : "Enter your room dimensions to continue"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══ STEP 3 — PERSONALISED: ROOM PLANNER ═════════════════════════════ */}
        {step === "personalised-planner" && (
          <div className="animate-fade-in-up">
            <BackButton onClick={() => goTo("personalised-dims")} />

            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <div className="inline-flex items-center bg-[#00A86B] text-white text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full mb-4">
                  Personalised Bundle
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F0F0F] tracking-tight">Design your room.</h2>
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
              {/* Controls */}
              <div className="flex flex-col gap-4">
                {/* Bed size */}
                <div className="bg-white rounded-2xl p-5">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">Bed Size</p>
                  <BedToggle
                    value={bedSize}
                    onChange={(size) => {
                      console.log("[BundleFlow] bedSize →", size);
                      setBedSize(size);
                    }}
                  />
                </div>

                {/* Furniture toggles */}
                <div className="bg-white rounded-2xl p-5">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">Furniture Items</p>
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
                  <div className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.15em] mb-1">Bundle price</div>
                  <div className="text-3xl font-black text-white mb-0.5">€{PRICES.personalised[bedSize]}</div>
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
