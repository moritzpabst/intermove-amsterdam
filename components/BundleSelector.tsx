"use client";

import { useState } from "react";

type BedSize = "90" | "140";
type BundleType = "standard" | "personalised";

const PRICES: Record<BundleType, Record<BedSize, number>> = {
  standard: { "90": 800, "140": 850 },
  personalised: { "90": 900, "140": 950 },
};

const STANDARD_BENEFITS = [
  "Fully curated selection",
  "Free delivery & assembly",
  "Quality guaranteed",
  "Buy-back on move-out",
];

const PERSONALISED_BENEFITS = [
  "Choose your furniture items",
  "Interactive room planner",
  "Free delivery & assembly",
  "Buy-back on move-out",
];

function CheckIcon() {
  return (
    <span className="w-4 h-4 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
      <svg
        className="w-2 h-2 text-[#E8603C]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
          d="M5 13l4 4L19 7"
        />
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
    <section id="bundles" className="py-24 bg-[#F5F5F5]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F0F0F] tracking-tight">
            Choose your bundle
          </h2>
          <p className="text-gray-400 mt-4 text-lg">
            Two options. Same quality. Pick what suits you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {/* Standard Bundle */}
          <div
            className={`bg-white rounded-2xl p-8 border-2 cursor-pointer transition-all duration-200 ${
              selected === "standard"
                ? "border-[#E8603C]"
                : "border-gray-100 hover:border-gray-200"
            }`}
            onClick={() => setSelected("standard")}
          >
            <div className="flex items-start justify-between mb-5">
              <div>
                {selected === "standard" && (
                  <div className="inline-flex items-center bg-orange-50 text-[#E8603C] text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full mb-3">
                    Selected
                  </div>
                )}
                <h3 className="text-xl font-bold text-[#0F0F0F]">
                  Standard Bundle
                </h3>
              </div>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed mb-7">
              We curate everything. You just pick your bed size. Fast, simple —
              no decisions, no stress.
            </p>

            {/* Bed size toggle */}
            <div className="mb-7">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">
                Bed size
              </p>
              <div className="flex gap-2 p-1 bg-[#F5F5F5] rounded-xl">
                {(["90", "140"] as BedSize[]).map((size) => (
                  <button
                    key={size}
                    onClick={(e) => {
                      e.stopPropagation();
                      setBedSizes((prev) => ({ ...prev, standard: size }));
                    }}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      bedSizes.standard === size
                        ? "bg-white text-[#0F0F0F] shadow-sm"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {size} cm
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mb-7">
              <div className="text-5xl font-black text-[#0F0F0F] tracking-tight">
                €{PRICES.standard[bedSizes.standard]}
              </div>
              <div className="text-xs text-gray-400 mt-1.5">
                one-time bundle price · includes delivery
              </div>
            </div>

            {/* Benefits */}
            <ul className="space-y-2.5 mb-8">
              {STANDARD_BENEFITS.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-sm text-gray-600">
                  <CheckIcon />
                  {b}
                </li>
              ))}
            </ul>

            <button
              onClick={() => setSelected("standard")}
              className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                selected === "standard"
                  ? "bg-[#E8603C] text-white hover:bg-[#D4542F]"
                  : "bg-[#F5F5F5] text-gray-500 hover:bg-gray-100"
              }`}
            >
              Select Standard Bundle
            </button>
          </div>

          {/* Personalised Bundle */}
          <div
            className={`bg-white rounded-2xl p-8 border-2 cursor-pointer transition-all duration-200 ${
              selected === "personalised"
                ? "border-[#E8603C]"
                : "border-gray-100 hover:border-gray-200"
            }`}
            onClick={handlePersonalisedClick}
          >
            <div className="flex items-start justify-between mb-5">
              <div>
                <div
                  className={`inline-flex items-center text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full mb-3 transition-all ${
                    selected === "personalised"
                      ? "bg-orange-50 text-[#E8603C]"
                      : "bg-[#0F0F0F] text-white"
                  }`}
                >
                  {selected === "personalised" ? "Selected" : "Most popular"}
                </div>
                <h3 className="text-xl font-bold text-[#0F0F0F]">
                  Personalised Bundle
                </h3>
              </div>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed mb-7">
              Design your room with our planner. Choose what goes in. More
              control, same simple pricing.
            </p>

            {/* Bed size toggle */}
            <div className="mb-7">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">
                Bed size
              </p>
              <div className="flex gap-2 p-1 bg-[#F5F5F5] rounded-xl">
                {(["90", "140"] as BedSize[]).map((size) => (
                  <button
                    key={size}
                    onClick={(e) => {
                      e.stopPropagation();
                      setBedSizes((prev) => ({ ...prev, personalised: size }));
                    }}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      bedSizes.personalised === size
                        ? "bg-white text-[#0F0F0F] shadow-sm"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {size} cm
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mb-7">
              <div className="text-5xl font-black text-[#0F0F0F] tracking-tight">
                €{PRICES.personalised[bedSizes.personalised]}
              </div>
              <div className="text-xs text-gray-400 mt-1.5">
                one-time bundle price · includes delivery
              </div>
            </div>

            {/* Benefits */}
            <ul className="space-y-2.5 mb-8">
              {PERSONALISED_BENEFITS.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-sm text-gray-600">
                  <CheckIcon />
                  {b}
                </li>
              ))}
            </ul>

            <button
              onClick={handlePersonalisedClick}
              className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                selected === "personalised"
                  ? "bg-[#E8603C] text-white hover:bg-[#D4542F]"
                  : "bg-[#F5F5F5] text-gray-500 hover:bg-gray-100"
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
