"use client";

import { useState } from "react";

type RoomSize = "small" | "medium" | "large";
type BedSize = "90" | "140";
type BundleType = "standard" | "personalised";
type FurnitureId = "desk" | "wardrobe" | "bookshelf" | "chair" | "lamp";

interface FurnitureItem {
  id: string;
  label: string;
  top: string;
  left: string;
  width: string;
  height: string;
  bg: string;
  border: string;
}

const ROOM_LABELS: Record<RoomSize, string> = {
  small: "~10 m²  ·  3 × 3.3 m",
  medium: "~14 m²  ·  3.5 × 4 m",
  large: "~18 m²  ·  4 × 4.5 m",
};

const FURNITURE_TOGGLES: { id: FurnitureId; label: string }[] = [
  { id: "desk", label: "Desk" },
  { id: "wardrobe", label: "Wardrobe" },
  { id: "bookshelf", label: "Bookshelf" },
  { id: "chair", label: "Chair" },
  { id: "lamp", label: "Extra Lamp" },
];

function buildFurniture(bedSize: BedSize): FurnitureItem[] {
  const bedW = bedSize === "90" ? "36%" : "47%";
  return [
    {
      id: "bed",
      label: `Bed · ${bedSize}cm`,
      top: "54%",
      left: "4%",
      width: bedW,
      height: "38%",
      bg: "#EEF2FF",
      border: "#C7D2FE",
    },
    {
      id: "desk",
      label: "Desk",
      top: "4%",
      left: "55%",
      width: "39%",
      height: "21%",
      bg: "#F0FDF4",
      border: "#BBF7D0",
    },
    {
      id: "chair",
      label: "Chair",
      top: "28%",
      left: "63%",
      width: "19%",
      height: "17%",
      bg: "#FFF7ED",
      border: "#FED7AA",
    },
    {
      id: "wardrobe",
      label: "Wardrobe",
      top: "22%",
      left: "4%",
      width: "15%",
      height: "32%",
      bg: "#FDF4FF",
      border: "#E9D5FF",
    },
    {
      id: "bookshelf",
      label: "Bookshelf",
      top: "4%",
      left: "22%",
      width: "30%",
      height: "13%",
      bg: "#F0FDF4",
      border: "#BBF7D0",
    },
    {
      id: "lamp",
      label: "Lamp",
      top: "78%",
      left: "82%",
      width: "10%",
      height: "13%",
      bg: "#FFFBEB",
      border: "#FDE68A",
    },
  ];
}

export default function RoomPlanner() {
  const [roomSize, setRoomSize] = useState<RoomSize>("medium");
  const [bedSize, setBedSize] = useState<BedSize>("90");
  const [bundleType, setBundleType] = useState<BundleType>("standard");
  const [activeItems, setActiveItems] = useState<Set<FurnitureId>>(
    new Set<FurnitureId>(["desk", "wardrobe", "bookshelf", "chair", "lamp"])
  );

  const toggleItem = (id: FurnitureId) => {
    setActiveItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  };

  const allFurniture = buildFurniture(bedSize);
  const visibleFurniture =
    bundleType === "standard"
      ? allFurniture
      : allFurniture.filter(
          (f) => f.id === "bed" || activeItems.has(f.id as FurnitureId)
        );

  return (
    <section id="planner" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F0F0F] tracking-tight">
            Design your room before it arrives
          </h2>
          <p className="text-gray-400 mt-4 text-lg max-w-xl">
            Preview your space. Know exactly what&apos;s coming before delivery
            day.
          </p>
        </div>

        <div className="grid lg:grid-cols-[300px,1fr] gap-6">
          {/* Controls */}
          <div className="flex flex-col gap-4">
            {/* Bundle type */}
            <div className="bg-[#F5F5F5] rounded-2xl p-5">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">
                Bundle Type
              </p>
              <div className="flex flex-col gap-2">
                {(["standard", "personalised"] as BundleType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setBundleType(type)}
                    className={`py-2.5 px-4 rounded-xl text-sm font-semibold text-left transition-all duration-200 ${
                      bundleType === type
                        ? "bg-[#00A86B] text-white shadow-sm"
                        : "bg-white text-gray-500 hover:text-[#0F0F0F]"
                    }`}
                  >
                    {type === "standard" ? "Standard" : "Personalised"}
                  </button>
                ))}
              </div>
            </div>

            {/* Room size */}
            <div className="bg-[#F5F5F5] rounded-2xl p-5">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">
                Room Size
              </p>
              <div className="flex flex-col gap-2">
                {(["small", "medium", "large"] as RoomSize[]).map((size) => (
                  <button
                    key={size}
                    onClick={() => setRoomSize(size)}
                    className={`py-2.5 px-4 rounded-xl text-sm font-semibold flex justify-between items-center transition-all duration-200 ${
                      roomSize === size
                        ? "bg-[#0F0F0F] text-white"
                        : "bg-white text-gray-500 hover:text-[#0F0F0F]"
                    }`}
                  >
                    <span className="capitalize">{size}</span>
                    <span
                      className={`text-xs font-normal ${
                        roomSize === size ? "text-gray-400" : "text-gray-300"
                      }`}
                    >
                      {size === "small"
                        ? "~10 m²"
                        : size === "medium"
                        ? "~14 m²"
                        : "~18 m²"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bed size */}
            <div className="bg-[#F5F5F5] rounded-2xl p-5">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">
                Bed Size
              </p>
              <div className="flex gap-2 p-1 bg-white rounded-xl">
                {(["90", "140"] as BedSize[]).map((size) => (
                  <button
                    key={size}
                    onClick={() => setBedSize(size)}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      bedSize === size
                        ? "bg-[#0F0F0F] text-white shadow-sm"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {size} cm
                  </button>
                ))}
              </div>
            </div>

            {/* Furniture toggles — personalised only */}
            {bundleType === "personalised" && (
              <div className="bg-[#F5F5F5] rounded-2xl p-5">
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
                        className={`py-2.5 px-4 rounded-xl text-sm font-medium flex items-center justify-between transition-all duration-200 border ${
                          on
                            ? "bg-white border-[#00A86B] text-[#0F0F0F]"
                            : "bg-white border-gray-100 text-gray-400"
                        }`}
                      >
                        <span>{label}</span>
                        <span
                          className={`text-xs font-semibold ${
                            on ? "text-[#00A86B]" : "text-gray-300"
                          }`}
                        >
                          {on ? "✓ Added" : "+ Add"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Room view */}
          <div className="bg-[#F5F5F5] rounded-2xl p-6">
            {/* Room header bar */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">
                  Floor Plan
                </span>
                <span className="text-gray-200">·</span>
                <span className="text-xs text-gray-400">
                  {ROOM_LABELS[roomSize]}
                </span>
              </div>
              {bundleType === "standard" ? (
                <span className="text-[10px] bg-green-50 text-[#00A86B] font-semibold px-3 py-1.5 rounded-full">
                  We&apos;ll handle the layout
                </span>
              ) : (
                <span className="text-[10px] bg-[#0F0F0F] text-white font-semibold px-3 py-1.5 rounded-full">
                  {activeItems.size} items selected
                </span>
              )}
            </div>

            {/* Room floor plan */}
            <div className="relative bg-white border-2 border-[#0F0F0F] rounded-xl overflow-hidden aspect-[4/3]">
              {/* Window (top wall) */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 flex">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-4 h-2.5 border border-blue-100 bg-blue-50/60"
                  />
                ))}
              </div>

              {/* Door arc (bottom right) */}
              <div className="absolute bottom-0 right-10 w-8 border-t-2 border-gray-200" />
              <div
                className="absolute bottom-0 right-10 w-8 h-8 border-l-2 border-t-2 border-gray-200 rounded-tl-full"
                style={{ borderColor: "#D1D5DB" }}
              />

              {/* Scale label */}
              <div className="absolute bottom-2 left-2.5 text-[8px] text-gray-300 font-mono select-none">
                {roomSize === "small"
                  ? "3 × 3.3 m"
                  : roomSize === "medium"
                  ? "3.5 × 4 m"
                  : "4 × 4.5 m"}
              </div>

              {/* Compass */}
              <div className="absolute top-3 right-3 flex flex-col items-center select-none">
                <span className="text-[7px] font-bold text-gray-300">N</span>
                <span className="text-[8px] text-gray-300 leading-none">↑</span>
              </div>

              {/* Furniture items */}
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
                  }}
                >
                  <span className="text-[8px] md:text-[9px] font-semibold text-gray-500 text-center leading-tight px-1 select-none">
                    {item.label}
                  </span>
                </div>
              ))}

              {/* Empty state */}
              {bundleType === "personalised" &&
                visibleFurniture.length === 1 && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <p className="text-xs text-gray-300 text-center px-10 leading-relaxed">
                      Add furniture items from the panel on the left
                    </p>
                  </div>
                )}
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
              {visibleFurniture.map((item) => (
                <div key={item.id} className="flex items-center gap-1.5">
                  <div
                    className="w-3 h-3 rounded-sm border"
                    style={{
                      backgroundColor: item.bg,
                      borderColor: item.border,
                    }}
                  />
                  <span className="text-[10px] text-gray-400">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
