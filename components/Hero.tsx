export default function Hero() {
  return (
    <section className="pt-16 min-h-screen flex items-center bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-24 w-full">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <p
            className="text-xs font-semibold text-[#E8603C] uppercase tracking-[0.2em] mb-8 animate-fade-in-up"
            style={{ animationDelay: "0ms", opacity: 0 }}
          >
            Amsterdam &middot; Student Furniture &middot; Since 2024
          </p>

          {/* Headline */}
          <h1
            className="text-5xl md:text-[72px] lg:text-[80px] font-black text-[#0F0F0F] leading-[1.0] tracking-tight mb-8 animate-fade-in-up"
            style={{ animationDelay: "80ms", opacity: 0 }}
          >
            Turn empty rooms
            <br />
            into homes.
          </h1>

          {/* Sub */}
          <p
            className="text-lg md:text-xl text-gray-400 leading-relaxed mb-12 max-w-xl animate-fade-in-up"
            style={{ animationDelay: "160ms", opacity: 0 }}
          >
            Affordable furniture bundles for students in Amsterdam. Choose,
            preview, and get it delivered — fully assembled.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-3 animate-fade-in-up"
            style={{ animationDelay: "240ms", opacity: 0 }}
          >
            <a
              href="#bundles"
              className="inline-flex items-center justify-center bg-[#E8603C] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[#D4542F] transition-all duration-200 text-sm"
            >
              See Bundles
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
            <a
              href="#bundles"
              className="inline-flex items-center justify-center border-2 border-[#0F0F0F] text-[#0F0F0F] font-semibold px-8 py-4 rounded-xl hover:bg-[#0F0F0F] hover:text-white transition-all duration-200 text-sm"
            >
              Plan Your Room
            </a>
          </div>
        </div>

        {/* Stats */}
        <div
          className="mt-20 pt-10 border-t border-gray-100 grid grid-cols-3 gap-8 max-w-sm animate-fade-in-up"
          style={{ animationDelay: "360ms", opacity: 0 }}
        >
          <div>
            <div className="text-3xl font-black text-[#0F0F0F]">€800</div>
            <div className="text-xs text-gray-400 mt-1.5 font-medium">
              Starting from
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-[#0F0F0F]">48h</div>
            <div className="text-xs text-gray-400 mt-1.5 font-medium">
              Delivery time
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-[#0F0F0F]">40%</div>
            <div className="text-xs text-gray-400 mt-1.5 font-medium">
              Buy-back value
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
