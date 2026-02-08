import Image from "next/image";

export default function BusinessProfileLoading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="relative w-24 h-24 flex items-center justify-center animate-pulse">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
        <Image src="/gymble.png" alt="Loading..." width={120} height={120} className="object-contain relative z-10" />
      </div>
    </div>
  );
}
