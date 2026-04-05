const problems = [
  "Empty room on move-in day. No bed, no desk — nowhere to start.",
  "No car, no van. Getting furniture across Amsterdam is a nightmare.",
  "Endless marketplace listings, failed meetups, and poor-quality pieces.",
];

const solutions = [
  "Curated second-hand bundles — pre-loved pieces, everything you need in one clean order.",
  "Free delivery and full assembly. We bring it to your door and set it up.",
  "Student pricing from €889. Quality second-hand furniture that actually fits a room.",
  "Buy-back on move-out. We take it all back, you get money back.",
];

export default function ProblemSolution() {
  return (
    <section className="py-24 bg-[#F5F5F5]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 max-w-xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F0F0F] tracking-tight">
            Moving in shouldn&apos;t be this hard.
          </h2>
          <p className="text-gray-400 mt-4 text-lg">
            We&apos;ve been there. Here&apos;s exactly what we fixed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Problem card */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-400 text-xs font-semibold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full mb-7">
              The Problem
            </div>
            <ul className="space-y-5">
              {problems.map((text, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-2.5 h-2.5 text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </span>
                  <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution card */}
          <div className="bg-white rounded-2xl p-8 border-2 border-[#00A86B]">
            <div className="inline-flex items-center gap-2 bg-green-50 text-[#00A86B] text-xs font-semibold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full mb-7">
              The Intermove Solution
            </div>
            <ul className="space-y-5">
              {solutions.map((text, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-2.5 h-2.5 text-[#00A86B]"
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
                  <p className="text-[#0F0F0F] text-sm leading-relaxed font-medium">
                    {text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
