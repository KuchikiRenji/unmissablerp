import Image from "next/image";
import StoreGrid from "../../components/StoreGrid";

export default function StorePage() {
  return (
    <div>
      <div className="relative h-56">
        <Image src="/IMAGEC.jpg" alt="Store banner" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold">Store</h1>
        </div>
      </div>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-white/70 mb-6">Support the server and get priority queue access. Choose your tier below.</p>
        <StoreGrid />
      </section>
    </div>
  );
}


