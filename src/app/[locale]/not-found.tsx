import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <div
        className="w-32 h-32 rounded-3xl flex items-center justify-center text-white text-6xl font-black mb-8 shadow-2xl"
        style={{ background: "linear-gradient(135deg, #3D1A6E, #E91E8C)" }}
      >
        404
      </div>
      <h1 className="text-4xl font-black text-center mb-4" style={{ color: "#1a0a3c" }}>
        Page Not Found
      </h1>
      <p className="text-gray-400 text-lg mb-8 text-center">
        الصفحة غير موجودة — This page doesn&apos;t exist.
      </p>
      <Link
        href="/en"
        className="px-10 py-4 rounded-3xl text-white font-black transition-all hover:scale-105 hover:shadow-xl"
        style={{ background: "linear-gradient(135deg, #3D1A6E, #E91E8C)" }}
      >
        Go Home
      </Link>
    </main>
  );
}
