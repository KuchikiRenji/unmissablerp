import ApplyForm from "../../components/ApplyForm";
import Image from "next/image";

export default function ApplyPage() {
  return (
    <div>
      <div className="relative h-56">
        <Image src="/IMAGEB.jpg" alt="Apply banner" fill sizes="100vw" className="object-cover" priority style={{ top: 0, right: 0, bottom: 0, left: 0 }} />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 id="apply-heading" className="font-heading text-3xl sm:text-4xl font-bold">Apply for Whitelist</h1>
        </div>
      </div>
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="glass rounded-card p-6 border border-white/10">
          <ApplyForm />
        </div>
        <p className="text-white/60 text-sm mt-4">Discord OAuth and in-game identity linking coming soon.</p>
      </section>
    </div>
  );
}


