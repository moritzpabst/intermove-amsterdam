const footerLinks: Record<string, { label: string; href: string }[]> = {
  Product: [
    { label: "How it works", href: "#how-it-works" },
    { label: "Bundles", href: "#bundles" },
    { label: "Room Planner", href: "#planner" },
    { label: "Buy-back", href: "#" },
  ],
  Company: [
    { label: "About us", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
  ],
  Support: [
    { label: "FAQ", href: "#" },
    { label: "Contact", href: "#contact" },
    { label: "Sell to us", href: "#sell" },
    { label: "Terms & Privacy", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0F0F0F] text-white">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <div className="grid md:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <div>
            <div className="text-xl font-bold mb-3 tracking-tight">
              Intermove
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              Turn empty rooms into homes. Furniture bundles for students in
              Amsterdam.
            </p>
            <div className="flex gap-2">
              {["in", "ig", "tw"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 bg-white/8 border border-white/10 rounded-lg flex items-center justify-center text-[10px] font-bold text-gray-500 hover:text-white hover:border-white/30 transition-all"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, items]) => (
            <div key={category}>
              <div className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.15em] mb-4">
                {category}
              </div>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-gray-500 hover:text-white transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-600">
            © 2026 Intermove B.V. · Amsterdam, Netherlands
          </p>
          <p className="text-xs text-gray-700">
            Designed for students, built for the planet.
          </p>
        </div>
      </div>
    </footer>
  );
}
