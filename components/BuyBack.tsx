const benefits = [
  "No hassle — we handle pickup and all logistics.",
  "Fair assessment within 24 hours of your request.",
  "Payment sent directly to your bank account.",
  "Furniture gets cleaned and recirculated, not thrown away.",
];

export default function BuyBack() {
  return (
    <section className="py-24 bg-[#F5F5F5]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Text side */}
          <div>
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full mb-6">
              Circular Model
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F0F0F] tracking-tight mb-6">
              Moving out?
              <br />
              We buy it back.
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              When your time in Amsterdam is up, Intermove buys your furniture
              back. No listings, no strangers, no dumping it on the street. Just
              a clean exit — with money back in your pocket.
            </p>
            <ul className="space-y-3.5">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-2.5 h-2.5 text-green-600"
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
                  <span className="text-gray-500 text-sm leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats side */}
          <div className="flex flex-col gap-4">
            {/* Hero stat */}
            <div className="bg-[#0F0F0F] rounded-2xl p-10 text-center">
              <div className="text-7xl font-black text-white tracking-tight mb-2">
                25%
              </div>
              <div className="text-gray-500 text-sm font-medium">
                average buy-back value
              </div>
              <div className="text-gray-600 text-xs mt-1">
                of your original bundle price
              </div>
            </div>

            {/* Sub stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 text-center">
                <div className="text-2xl font-black text-[#0F0F0F] tracking-tight mb-1">
                  €222+
                </div>
                <div className="text-xs text-gray-400 leading-snug">
                  avg. money back
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center">
                <div className="text-2xl font-black text-[#0F0F0F] tracking-tight mb-1">
                  24h
                </div>
                <div className="text-xs text-gray-400 leading-snug">
                  assessment turnaround
                </div>
              </div>
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="bg-white rounded-2xl p-5 flex items-center justify-between group hover:border-[#00A86B] border-2 border-transparent transition-all duration-200"
            >
              <div>
                <div className="text-sm font-semibold text-[#0F0F0F]">
                  Ready to move out?
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  Start your buy-back request
                </div>
              </div>
              <svg
                className="w-5 h-5 text-gray-300 group-hover:text-[#00A86B] transition-colors"
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
          </div>
        </div>
      </div>
    </section>
  );
}
