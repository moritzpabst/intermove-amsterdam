export default function BuyBack() {
  return (
    <section className="py-10 bg-[#FAFAF7]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-[#111111] rounded-3xl px-8 md:px-14 py-10 md:py-12 grid md:grid-cols-3 gap-8 md:gap-6 items-center">

          {/* Left — heading + subtext */}
          <div>
            <p className="text-[#666] text-[10px] font-semibold uppercase tracking-[0.18em] mb-4">
              Circular model
            </p>
            <h3 className="text-2xl md:text-[28px] font-bold text-white leading-snug mb-3">
              Move out?<br />We buy it back.
            </h3>
            <p className="text-[#777] text-sm leading-relaxed max-w-xs">
              Get up to 25% of your bundle price back when you leave Amsterdam.
              No listings, no hassle — just money in your pocket.
            </p>
          </div>

          {/* Centre — big % */}
          <div className="text-center">
            <div className="text-[88px] md:text-[100px] font-bold text-[#00A86B] leading-none">
              25%
            </div>
            <div className="text-[#555] text-xs mt-2 font-medium">average buy-back value</div>
          </div>

          {/* Right — stats + CTA */}
          <div className="flex flex-col items-start md:items-end gap-5">
            <div className="space-y-1.5 text-sm md:text-right">
              <div className="text-[#888]">
                Avg. money back:{" "}
                <span className="text-white font-semibold">€222+</span>
              </div>
              <div className="text-[#888]">
                Assessment within:{" "}
                <span className="text-white font-semibold">24 hours</span>
              </div>
              <div className="text-[#888]">
                Payment method:{" "}
                <span className="text-white font-semibold">Direct bank</span>
              </div>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#00A86B] hover:bg-[#007A4E] transition-colors text-white font-semibold text-sm px-6 py-3 rounded-xl"
            >
              Start buy-back
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
