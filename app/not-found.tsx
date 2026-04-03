import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="max-w-md text-center">
        <div className="text-7xl font-black text-[#F5F5F5] mb-6 select-none">
          404
        </div>
        <h2 className="text-xl font-bold text-[#0F0F0F] mb-3">
          Page not found
        </h2>
        <p className="text-gray-400 text-sm mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="bg-[#00A86B] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#007A4E] transition-colors text-sm inline-block"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
