const steps = [
  {
    number: "01",
    title: "Choose your bundle",
    description:
      "Pick Standard for a fully curated set of pre-loved pieces, or Personalised if you want to choose which second-hand items go in your room.",
  },
  {
    number: "02",
    title: "Design your room",
    description:
      "Optional: use our room planner to preview your space before anything arrives. See exactly how it all fits.",
  },
  {
    number: "03",
    title: "Get it delivered",
    description:
      "We deliver and assemble everything in your room. You show up and it's ready to live in — same day.",
  },
  {
    number: "04",
    title: "Move out, get paid",
    description:
      "When you leave Amsterdam, we buy your furniture back. Clean exit, no hassle, money in your pocket.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F0F0F] tracking-tight">
            How it works
          </h2>
          <p className="text-gray-400 mt-4 text-lg max-w-lg">
            Four steps from empty room to home. No logistics headaches, no
            surprises.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative group">
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-[22px] left-[52px] right-0 h-px bg-gray-100" />
              )}

              {/* Step number badge */}
              <div className="relative w-11 h-11 rounded-2xl bg-[#00A86B] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-200">
                <span className="text-white text-xs font-bold tracking-wide">
                  {step.number}
                </span>
              </div>

              <h3 className="text-sm font-semibold text-[#0F0F0F] mb-2 leading-snug">
                {step.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA nudge */}
        <div className="mt-16 pt-10 border-t border-gray-100">
          <a
            href="#bundles"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#00A86B] hover:gap-3 transition-all duration-200"
          >
            See bundle options
            <svg
              className="w-4 h-4"
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
    </section>
  );
}
