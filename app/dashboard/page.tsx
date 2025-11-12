import Image from "next/image";
import DashboardStats from "../../components/DashboardStats";
import ServerAssets from "../../components/ServerAssets";

export default function DashboardPage() {
  return (
    <div>
      <div className="relative h-56">
        <Image src="/IMAGEE.jpg" alt="Dashboard banner" fill sizes="100vw" className="object-cover" priority style={{ top: 0, right: 0, bottom: 0, left: 0 }} />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold">Dashboard</h1>
        </div>
      </div>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div>
          <h2 className="font-heading text-xl font-semibold mb-4">Public Stats</h2>
          <DashboardStats />
        </div>
        <div>
          <ServerAssets />
        </div>
      </section>
    </div>
  );
}


