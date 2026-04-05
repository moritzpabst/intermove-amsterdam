import Image from "next/image";

export default function Hero() {
  return (
    <section className="pt-16 min-h-screen flex items-center overflow-hidden relative">
      {/* Background image */}
      <Image
        src="/amsterdam-vintage-furniture-lamps.jpg"
        alt="Vintage furniture and lamps in Amsterdam"
        fill
        className="object-cover object-center"
        priority
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 border border-[#00A86B]/50 bg-[#00A86B]/15 text-[#00A86B] text-xs font-semibold px-4 py-1.5 rounded-full mb-8 animate-fade-in-up"
            style={{ animationDelay: "0ms", opacity: 0 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B] flex-shrink-0" />
            Amsterdam · Second-hand furniture
          </div>

          {/* Headline */}
          <h1
            className="text-5xl md:text-[72px] lg:text-[80px] font-black text-white leading-[1.0] tracking-tight mb-8 animate-fade-in-up"
            style={{ animationDelay: "80ms", opacity: 0 }}
          >
            Turn empty rooms
            <br />
            into{" "}
            <span className="text-[#00A86B]">homes.</span>
          </h1>

          {/* Sub */}
          <p
            className="text-lg md:text-xl text-gray-300 leading-relaxed mb-12 max-w-xl animate-fade-in-up"
            style={{ animationDelay: "160ms", opacity: 0 }}
          >
            Curated second-hand furniture bundles for students in Amsterdam.
            Pre-loved pieces, delivered and fully assembled.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-3 animate-fade-in-up"
            style={{ animationDelay: "240ms", opacity: 0 }}
          >
            <a
              href="#bundles"
              className="inline-flex items-center justify-center bg-[#00A86B] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[#007A4E] transition-all duration-200 text-sm"
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
              className="inline-flex items-center justify-center border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-[#0F0F0F] transition-all duration-200 text-sm"
            >
              Plan Your Room
            </a>
          </div>
        </div>

        {/* Stats */}
        <div
          className="mt-20 pt-10 border-t border-white/20 grid grid-cols-3 gap-8 max-w-sm animate-fade-in-up"
          style={{ animationDelay: "360ms", opacity: 0 }}
        >
          <div>
            <div className="text-3xl font-black text-white">€889</div>
            <div className="text-xs text-gray-400 mt-1.5 font-medium">
              Starting from
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-white">48h</div>
            <div className="text-xs text-gray-400 mt-1.5 font-medium">
              Delivery time
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-white">25%</div>
            <div className="text-xs text-gray-400 mt-1.5 font-medium">
              Buy-back value
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
