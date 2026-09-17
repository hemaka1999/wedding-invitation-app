import { HeartHandshake } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5] p-4 text-center">
      <div className="max-w-md w-full rounded-2xl border border-gold-300/80 bg-white p-8 sm:p-10 shadow-xl">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-50 border border-gold-200 text-gold-600 mb-4">
          <HeartHandshake className="w-8 h-8 text-gold-600" />
        </div>
        <span className="block font-serif text-xs uppercase tracking-widest text-gold-700 font-bold mb-1">
          404 - Not Found
        </span>
        <h1 className="font-serif text-2xl text-royal-900 font-bold mb-2">
          Invitation Not Found
        </h1>
        <p className="text-sm text-neutral-600 mb-2 leading-relaxed">
          We couldn&apos;t find an active wedding invitation for this link.
        </p>
        <p className="text-xs text-neutral-400 leading-relaxed">
          Please check the invitation URL or contact Kasun &amp; Nethmi directly.
        </p>
      </div>
    </div>
  );
}
