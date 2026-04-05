"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────

type BedSize = "90" | "140";
type RoomSize = "small" | "medium" | "large";

interface FurnitureItem {
  id: string;
  label: string;
  enabled: boolean;
}

// ─── Isometric helpers ────────────────────────────────────────────────────────
// Isometric projection: x-right, y-left, z-up
// iso(x, y, z) → {sx, sy} in SVG coords (origin at room front-corner)

function iso(x: number, y: number, z: number): { sx: number; sy: number } {
  return {
    sx: (x - y) * Math.cos(Math.PI / 6),
    sy: (x + y) * Math.sin(Math.PI / 6) - z,
  };
}

function pt(x: number, y: number, z: number): string {
  const p = iso(x, y, z);
  return `${p.sx},${p.sy}`;
}

// Build a box face polygon string
function boxFace(
  x: number, y: number, z: number,
  dx: number, dy: number, dz: number,
  face: "top" | "left" | "right"
): string {
  if (face === "top") {
    return [pt(x, y, z + dz), pt(x + dx, y, z + dz), pt(x + dx, y + dy, z + dz), pt(x, y + dy, z + dz)].join(" ");
  }
  if (face === "left") {
    return [pt(x, y, z), pt(x, y + dy, z), pt(x, y + dy, z + dz), pt(x, y, z + dz)].join(" ");
  }
  // right
  return [pt(x + dx, y, z), pt(x + dx, y + dy, z), pt(x + dx, y + dy, z + dz), pt(x + dx, y, z + dz)].join(" ");
}

function frontFace(x: number, y: number, z: number, dx: number, dy: number, dz: number): string {
  return [pt(x, y + dy, z), pt(x + dx, y + dy, z), pt(x + dx, y + dy, z + dz), pt(x, y + dy, z + dz)].join(" ");
}

// ─── Isometric Box component ──────────────────────────────────────────────────

interface BoxProps {
  x: number; y: number; z: number;
  dx: number; dy: number; dz: number;
  topColor: string; leftColor: string; rightColor: string;
  stroke?: string;
}

function IsoBox({ x, y, z, dx, dy, dz, topColor, leftColor, rightColor, stroke = "#2D2D2D" }: BoxProps) {
  const sw = 0.8;
  return (
    <g>
      <polygon points={boxFace(x, y, z, dx, dy, dz, "left")} fill={leftColor} stroke={stroke} strokeWidth={sw} />
      <polygon points={frontFace(x, y, z, dx, dy, dz)} fill={rightColor} stroke={stroke} strokeWidth={sw} />
      <polygon points={boxFace(x, y, z, dx, dy, dz, "top")} fill={topColor} stroke={stroke} strokeWidth={sw} />
    </g>
  );
}

// ─── Furniture pieces ─────────────────────────────────────────────────────────

function Bed({ bedSize, active }: { bedSize: BedSize; active: boolean }) {
  const W = bedSize === "90" ? 22 : 30;
  const D = 38;
  const H = 6;
  const bx = 8, by = 18;

  const frameTop = active ? "#00A86B" : "#C8A882";
  const frameLeft = active ? "#007A4E" : "#A08060";
  const frameRight = active ? "#005C3A" : "#8B6B4A";

  return (
    <g>
      {/* Frame */}
      <IsoBox x={bx} y={by} z={0} dx={W} dy={D} dz={H} topColor={frameTop} leftColor={frameLeft} rightColor={frameRight} />
      {/* Headboard */}
      <IsoBox x={bx} y={by} z={H} dx={W} dy={3} dz={10} topColor={frameTop} leftColor={frameLeft} rightColor={frameRight} />
      {/* Mattress */}
      <IsoBox x={bx + 1} y={by + 3} z={H} dx={W - 2} dy={D - 3} dz={4} topColor="#F5F0E8" leftColor="#E8E0D0" rightColor="#D8D0C0" />
      {/* Pillow */}
      <IsoBox x={bx + 2} y={by + 4} z={H + 4} dx={W - 4} dy={8} dz={3} topColor="#FFFFFF" leftColor="#E8E8E8" rightColor="#D8D8D8" />
    </g>
  );
}

function Desk({ active }: { active: boolean }) {
  const top = active ? "#00A86B" : "#D4A96A";
  const left = active ? "#007A4E" : "#B8904E";
  const right = active ? "#005C3A" : "#A07840";
  return (
    <g>
      {/* Desktop */}
      <IsoBox x={68} y={14} z={18} dx={24} dy={18} dz={2} topColor={top} leftColor={left} rightColor={right} />
      {/* Legs */}
      <IsoBox x={68} y={14} z={0} dx={2} dy={2} dz={18} topColor={top} leftColor={left} rightColor={right} />
      <IsoBox x={90} y={14} z={0} dx={2} dy={2} dz={18} topColor={top} leftColor={left} rightColor={right} />
      <IsoBox x={68} y={30} z={0} dx={2} dy={2} dz={18} topColor={top} leftColor={left} rightColor={right} />
      <IsoBox x={90} y={30} z={0} dx={2} dy={2} dz={18} topColor={top} leftColor={left} rightColor={right} />
    </g>
  );
}

function Chair({ active }: { active: boolean }) {
  const top = active ? "#00A86B" : "#A0856A";
  const left = active ? "#007A4E" : "#8A7058";
  const right = active ? "#005C3A" : "#6E5842";
  return (
    <g>
      {/* Seat */}
      <IsoBox x={72} y={36} z={12} dx={12} dy={12} dz={2} topColor={top} leftColor={left} rightColor={right} />
      {/* Back */}
      <IsoBox x={72} y={36} z={14} dx={12} dy={2} dz={12} topColor={top} leftColor={left} rightColor={right} />
      {/* Legs */}
      <IsoBox x={72} y={36} z={0} dx={1.5} dy={1.5} dz={12} topColor={top} leftColor={left} rightColor={right} />
      <IsoBox x={82} y={36} z={0} dx={1.5} dy={1.5} dz={12} topColor={top} leftColor={left} rightColor={right} />
      <IsoBox x={72} y={46} z={0} dx={1.5} dy={1.5} dz={12} topColor={top} leftColor={left} rightColor={right} />
      <IsoBox x={82} y={46} z={0} dx={1.5} dy={1.5} dz={12} topColor={top} leftColor={left} rightColor={right} />
    </g>
  );
}

function Wardrobe({ active }: { active: boolean }) {
  const top = active ? "#00A86B" : "#B8C4C8";
  const left = active ? "#007A4E" : "#9AAAB0";
  const right = active ? "#005C3A" : "#8A9AA0";
  return (
    <g>
      <IsoBox x={6} y={6} z={0} dx={20} dy={16} dz={46} topColor={top} leftColor={left} rightColor={right} />
      {/* Door line */}
      <line
        x1={iso(16, 6, 0).sx} y1={iso(16, 6, 0).sy}
        x2={iso(16, 6, 46).sx} y2={iso(16, 6, 46).sy}
        stroke="#2D2D2D" strokeWidth={0.6}
      />
      {/* Handles */}
      <circle cx={iso(14.5, 6.2, 22).sx} cy={iso(14.5, 6.2, 22).sy} r={1.2} fill="#888" />
      <circle cx={iso(17.5, 6.2, 22).sx} cy={iso(17.5, 6.2, 22).sy} r={1.2} fill="#888" />
    </g>
  );
}

function Nightstand({ active }: { active: boolean }) {
  const top = active ? "#00A86B" : "#C8A882";
  const left = active ? "#007A4E" : "#A88860";
  const right = active ? "#005C3A" : "#987848";
  return (
    <g>
      <IsoBox x={44} y={18} z={0} dx={10} dy={10} dz={14} topColor={top} leftColor={left} rightColor={right} />
      {/* Drawer line */}
      <line
        x1={iso(44, 28, 7).sx} y1={iso(44, 28, 7).sy}
        x2={iso(54, 28, 7).sx} y2={iso(54, 28, 7).sy}
        stroke="#2D2D2D" strokeWidth={0.6}
      />
      <circle cx={iso(49, 28.2, 7).sx} cy={iso(49, 28.2, 7).sy} r={1} fill="#888" />
    </g>
  );
}

function Lamp({ active }: { active: boolean }) {
  const accent = active ? "#00A86B" : "#D4A96A";
  const accentD = active ? "#007A4E" : "#B8904E";
  // Base
  const base = iso(47, 17, 14);
  const pole1 = iso(48, 17.5, 14);
  const pole2 = iso(48, 17.5, 30);
  const shade = [
    iso(44, 15, 30), iso(52, 15, 30), iso(52, 20, 30), iso(44, 20, 30)
  ];
  const shadeBottom = [
    iso(45.5, 16, 26), iso(50.5, 16, 26), iso(50.5, 19, 26), iso(45.5, 19, 26)
  ];

  return (
    <g>
      <IsoBox x={46} y={16} z={0} dx={4} dy={4} dz={2} topColor={accent} leftColor={accentD} rightColor={accentD} />
      <line x1={pole1.sx} y1={pole1.sy} x2={pole2.sx} y2={pole2.sy} stroke="#888" strokeWidth={1} />
      <polygon
        points={shade.map(p => `${p.sx},${p.sy}`).join(" ")}
        fill={accent} stroke="#2D2D2D" strokeWidth={0.7}
      />
      <polygon
        points={shadeBottom.map(p => `${p.sx},${p.sy}`).join(" ")}
        fill={active ? "#00CF85" : "#E8C080"} stroke="#2D2D2D" strokeWidth={0.7}
      />
    </g>
  );
}

// ─── Isometric Room SVG ───────────────────────────────────────────────────────

interface RoomProps {
  furniture: FurnitureItem[];
  bedSize: BedSize;
  roomSize: RoomSize;
}

const roomDims: Record<RoomSize, { W: number; D: number; H: number }> = {
  small:  { W: 70, D: 60, H: 50 },
  medium: { W: 90, D: 75, H: 55 },
  large:  { W: 110, D: 90, H: 60 },
};

function IsometricRoom({ furniture, bedSize, roomSize }: RoomProps) {
  const { W, D, H } = roomDims[roomSize];
  const isOn = (id: string) => furniture.find(f => f.id === id)?.enabled ?? false;

  // Floor corners
  const floorPts = [pt(0, 0, 0), pt(W, 0, 0), pt(W, D, 0), pt(0, D, 0)].join(" ");
  // Left wall (x=0 face)
  const leftWallPts = [pt(0, 0, 0), pt(0, D, 0), pt(0, D, H), pt(0, 0, H)].join(" ");
  // Back wall (y=0 face)
  const backWallPts = [pt(0, 0, 0), pt(W, 0, 0), pt(W, 0, H), pt(0, 0, H)].join(" ");

  // Compute SVG bounds
  const corners = [
    iso(0, 0, 0), iso(W, 0, 0), iso(W, D, 0), iso(0, D, 0),
    iso(0, 0, H), iso(W, 0, H), iso(0, D, H),
  ];
  const xs = corners.map(c => c.sx);
  const ys = corners.map(c => c.sy);
  const minX = Math.min(...xs) - 10;
  const minY = Math.min(...ys) - 10;
  const maxX = Math.max(...xs) + 10;
  const maxY = Math.max(...ys) + 10;
  const vw = maxX - minX;
  const vh = maxY - minY;

  return (
    <svg
      viewBox={`${minX} ${minY} ${vw} ${vh}`}
      className="w-full h-full"
      style={{ maxHeight: "100%" }}
    >
      {/* Floor */}
      <polygon points={floorPts} fill="#C8A882" stroke="#B09070" strokeWidth={0.5} />
      {/* Left wall */}
      <polygon points={leftWallPts} fill="#F5F5F0" stroke="#DDDDD8" strokeWidth={0.5} />
      {/* Back wall */}
      <polygon points={backWallPts} fill="#EBEBEB" stroke="#DDDDD8" strokeWidth={0.5} />

      {/* Furniture — render order matters for depth */}
      {isOn("wardrobe") && <Wardrobe active={false} />}
      {isOn("bed") && <Bed bedSize={bedSize} active={false} />}
      {isOn("nightstand") && <Nightstand active={false} />}
      {isOn("lamp") && <Lamp active={false} />}
      {isOn("desk") && <Desk active={false} />}
      {isOn("chair") && <Chair active={false} />}
    </svg>
  );
}

// ─── Toggle Switch ─────────────────────────────────────────────────────────────

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 focus:outline-none ${
        enabled ? "bg-[#00A86B]" : "bg-[#D1D5DB]"
      }`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform duration-200 ${
          enabled ? "translate-x-4" : "translate-x-1"
        }`}
      />
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const defaultFurniture: FurnitureItem[] = [
  { id: "bed",       label: "Bed",       enabled: true },
  { id: "nightstand",label: "Nightstand",enabled: true },
  { id: "wardrobe",  label: "Wardrobe",  enabled: true },
  { id: "desk",      label: "Desk",      enabled: true },
  { id: "chair",     label: "Chair",     enabled: true },
  { id: "lamp",      label: "Lamp",      enabled: false },
];

export default function RoomPlannerPage() {
  const router = useRouter();
  const [furniture, setFurniture] = useState<FurnitureItem[]>(defaultFurniture);
  const [bedSize, setBedSize] = useState<BedSize>("90");
  const [roomSize, setRoomSize] = useState<RoomSize>("medium");

  const toggle = (id: string) => {
    setFurniture(prev => prev.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
  };

  const handleConfirm = () => {
    const selected = furniture.filter(f => f.enabled).map(f => f.id);
    localStorage.setItem("intermove_bundle", JSON.stringify({ items: selected, bedSize, roomSize }));
    router.push("/#contact");
  };

  const roomLabels: Record<RoomSize, string> = { small: "Small", medium: "Medium", large: "Large" };

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Top bar */}
      <header className="h-14 border-b border-[#EBEBEB] flex items-center px-6 gap-4 flex-shrink-0">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm text-[#666] hover:text-[#111] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <div className="flex-1" />
        <span className="text-sm font-semibold text-[#111]">Room Planner</span>
        <div className="flex-1" />
        {/* spacer to center title */}
        <div className="w-16" />
      </header>

      {/* Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Canvas */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-10 bg-[#FAFAF7]">
          <div className="w-full max-w-2xl aspect-[4/3]">
            <IsometricRoom furniture={furniture} bedSize={bedSize} roomSize={roomSize} />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-72 border-l border-[#EBEBEB] bg-white flex flex-col overflow-y-auto">
          <div className="flex-1 p-5 space-y-6">

            {/* Room size */}
            <div>
              <p className="text-xs font-semibold text-[#999] uppercase tracking-wider mb-3">Room Size</p>
              <div className="flex gap-2">
                {(["small", "medium", "large"] as RoomSize[]).map(s => (
                  <button
                    key={s}
                    onClick={() => setRoomSize(s)}
                    className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                      roomSize === s
                        ? "bg-[#00A86B] text-white border-[#00A86B]"
                        : "bg-white text-[#555] border-[#EBEBEB] hover:border-[#00A86B]"
                    }`}
                  >
                    {roomLabels[s]}
                  </button>
                ))}
              </div>
            </div>

            {/* Bed size */}
            <div>
              <p className="text-xs font-semibold text-[#999] uppercase tracking-wider mb-3">Bed Size</p>
              <div className="flex gap-2">
                {(["90", "140"] as BedSize[]).map(s => (
                  <button
                    key={s}
                    onClick={() => setBedSize(s)}
                    className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                      bedSize === s
                        ? "bg-[#00A86B] text-white border-[#00A86B]"
                        : "bg-white text-[#555] border-[#EBEBEB] hover:border-[#00A86B]"
                    }`}
                  >
                    {s} cm
                  </button>
                ))}
              </div>
            </div>

            {/* Furniture toggles */}
            <div>
              <p className="text-xs font-semibold text-[#999] uppercase tracking-wider mb-3">Furniture</p>
              <div className="space-y-1">
                {furniture.map(item => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl transition-colors cursor-pointer ${
                      item.enabled ? "bg-[#F0FDF7]" : "bg-[#FAFAFA] hover:bg-[#F5F5F5]"
                    }`}
                    onClick={() => toggle(item.id)}
                  >
                    <span className={`text-sm font-medium ${item.enabled ? "text-[#111]" : "text-[#888]"}`}>
                      {item.label}
                    </span>
                    <Toggle enabled={item.enabled} onChange={() => toggle(item.id)} />
                  </div>
                ))}
              </div>
            </div>

            {/* Price estimate */}
            <div className="rounded-xl border border-[#EBEBEB] p-4">
              <p className="text-xs text-[#999] mb-1">Estimated bundle</p>
              <p className="text-2xl font-black text-[#111]">
                €{999 + furniture.filter(f => f.enabled && f.id !== "bed" && f.id !== "nightstand" && f.id !== "wardrobe" && f.id !== "desk").length * 30}
              </p>
              <p className="text-xs text-[#bbb] mt-1">incl. new mattress · delivery &amp; assembly</p>
            </div>
          </div>

          {/* Confirm button */}
          <div className="p-5 border-t border-[#EBEBEB]">
            <button
              onClick={handleConfirm}
              className="w-full py-3.5 bg-[#00A86B] text-white font-semibold rounded-xl hover:bg-[#007A4E] transition-colors text-sm"
            >
              Confirm Bundle →
            </button>
            <p className="text-xs text-center text-[#bbb] mt-2.5">Free delivery &amp; assembly included</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
