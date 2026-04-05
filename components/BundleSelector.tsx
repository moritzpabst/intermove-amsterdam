"use client";

import { useState } from "react";

type BedSize = "90" | "140";
type BundleType = "standard" | "personalised";

const PRICES: Record<BundleType, Record<BedSize, number>> = {
  standard: { "90": 889, "140": 929 },
  personalised: { "90": 999, "140": 1049 },
};

const STANDARD_BENEFITS = [
  "Fully curated second-hand selection",
  "Free delivery & assembly",
  "Quality guaranteed",
  "Buy-back on move-out",
];

const PERSONALISED_BENEFITS = [
  "Choose your pre-loved pieces",
  "Interactive room planner",
  "Free delivery & assembly",
  "Buy-back on move-out",
];

function CheckIcon() {
  return (
    <span className="w-4 h-4 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
      <svg className="w-2 h-2 text-[#00A86B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

export default function BundleSelector() {
  const [selected, setSelected] = useState<BundleType>("standard");
  const [bedSizes, setBedSizes] = useState<Record<BundleType, BedSize>>({
    standard: "90",
    personalised: "90",
  });

  const scrollToPlanner = () => {
    document.getElementById("planner")?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePersonalisedClick = () => {
    setSelected("personalised");
    setTimeout(scrollToPlanner, 120);
  };

  return (
    <section id="bundles" className="py-24 bg-[#FAFAF7]">
      <div className="max-w-6xl mx-auto px-6">

        <div className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111111] tracking-tight">
            Choose your bundle
          </h2>
          <p className="text-[#888] mt-3 text-lg">
            Two options. Same pre-loved quality. Pick what suits you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-4xl">

          {/* ── Standard Bundle ── */}
          <div
            className={`bg-white rounded-2xl p-8 border-2 cursor-pointer transition-all duration-200 ${
              selected === "standard"
                ? "border-[#00A86B]"
                : "border-[#EBEBEB] hover:border-[#D0D0D0]"
            }`}
            onClick={() => setSelected("standard")}
          >
            <div className="mb-5">
              {selected === "standard" && (
                <div className="inline-flex items-center bg-green-50 text-[#00A86B] text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full mb-3">
                  Selected
                </div>
              )}
              <h3 className="text-xl font-bold text-[#111111]">Standard Bundle</h3>
            </div>

            <p className="text-sm text-[#999] leading-relaxed mb-7">
              We curate pre-loved, second-hand furniture for you. Pick your bed
              size — fast, simple, no stress.
            </p>

            {/* Bed size toggle */}
            <div className="mb-7">
              <p className="text-[10px] font-bold text-[#bbb] uppercase tracking-[0.15em] mb-3">Bed size</p>
              <div className="flex gap-2 p-1 bg-[#F5F5F2] rounded-xl">
                {(["90", "140"] as BedSize[]).map((size) => (
                  <button
                    key={size}
                    onClick={(e) => {
                      e.stopPropagation();
                      setBedSizes((prev) => ({ ...prev, standard: size }));
                    }}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      bedSizes.standard === size
                        ? "bg-white text-[#111111] shadow-sm"
                        : "text-[#bbb] hover:text-[#888]"
                    }`}
                  >
                    {size} cm
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="text-5xl font-bold text-[#111111] tracking-tight">
                €{PRICES.standard[bedSizes.standard]}
              </div>
              <div className="text-xs text-[#bbb] mt-1.5">one-time · includes delivery</div>
            </div>

            {/* Mattress highlight */}
            <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-3.5 py-2.5 mb-5">
              <svg className="w-3.5 h-3.5 text-[#00A86B] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-xs font-semibold text-[#00A86B]">
                Includes a brand new {bedSizes.standard}×200cm mattress
              </span>
            </div>

            {/* Benefits */}
            <ul className="space-y-2.5 mb-8">
              {STANDARD_BENEFITS.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-sm text-[#666]">
                  <CheckIcon />
                  {b}
                </li>
              ))}
            </ul>

            <button
              onClick={() => setSelected("standard")}
              className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                selected === "standard"
                  ? "bg-[#00A86B] text-white hover:bg-[#007A4E]"
                  : "bg-[#F5F5F2] text-[#999] hover:bg-[#EBEBEB]"
              }`}
            >
              Select Standard Bundle
            </button>
          </div>

          {/* ── Personalised Bundle (featured) ── */}
          <div
            className="bg-[#F3FBF7] rounded-2xl p-8 border-2 border-[#00A86B] cursor-pointer transition-all duration-200 hover:shadow-[0_8px_32px_rgba(0,168,107,0.12)]"
            onClick={handlePersonalisedClick}
          >
            <div className="mb-5">
              <div
                className={`inline-flex items-center text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full mb-3 transition-all ${
                  selected === "personalised"
                    ? "bg-green-100 text-[#00A86B]"
                    : "bg-[#00A86B] text-white"
                }`}
              >
                {selected === "personalised" ? "Selected" : "Most popular"}
              </div>
              <h3 className="text-xl font-bold text-[#111111]">Personalised Bundle</h3>
            </div>

            <p className="text-sm text-[#777] leading-relaxed mb-7">
              Design your room with our planner. Choose which pre-loved,
              second-hand pieces go in — more control, same simple pricing.
            </p>

            {/* Bed size toggle */}
            <div className="mb-7">
              <p className="text-[10px] font-bold text-[#bbb] uppercase tracking-[0.15em] mb-3">Bed size</p>
              <div className="flex gap-2 p-1 bg-white/60 rounded-xl">
                {(["90", "140"] as BedSize[]).map((size) => (
                  <button
                    key={size}
                    onClick={(e) => {
                      e.stopPropagation();
                      setBedSizes((prev) => ({ ...prev, personalised: size }));
                    }}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      bedSizes.personalised === size
                        ? "bg-white text-[#111111] shadow-sm"
                        : "text-[#bbb] hover:text-[#888]"
                    }`}
                  >
                    {size} cm
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="text-5xl font-bold text-[#111111] tracking-tight">
                €{PRICES.personalised[bedSizes.personalised]}
              </div>
              <div className="text-xs text-[#bbb] mt-1.5">one-time · includes delivery</div>
            </div>

            {/* Mattress highlight */}
            <div className="flex items-center gap-2 bg-white/70 border border-green-100 rounded-xl px-3.5 py-2.5 mb-5">
              <svg className="w-3.5 h-3.5 text-[#00A86B] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-xs font-semibold text-[#00A86B]">
                Includes a brand new {bedSizes.personalised}×200cm mattress
              </span>
            </div>

            {/* Benefits */}
            <ul className="space-y-2.5 mb-8">
              {PERSONALISED_BENEFITS.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-sm text-[#555]">
                  <CheckIcon />
                  {b}
                </li>
              ))}
            </ul>

            <button
              onClick={handlePersonalisedClick}
              className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                selected === "personalised"
                  ? "bg-[#00A86B] text-white hover:bg-[#007A4E]"
                  : "bg-[#00A86B] text-white hover:bg-[#007A4E]"
              }`}
            >
              Personalise My Room
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
