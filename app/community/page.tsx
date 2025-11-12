import SocialHub from "../../components/SocialHub";
import DiscordJoin from "../../components/DiscordJoin";
import Image from "next/image";

export default function CommunityPage() {
  return (
    <div>
      <div className="relative h-56">
        <Image src="/IMAGED.jpg" alt="Community banner" fill sizes="100vw" className="object-cover" priority style={{ top: 0, right: 0, bottom: 0, left: 0 }} />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold">Community</h1>
        </div>
      </div>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SocialHub />
          <div className="mt-8 glass rounded-card p-4 border border-white/10">
            <h3 className="font-heading font-semibold">Discord Preview</h3>
            <iframe
              title="Discord Widget"
              className="mt-3 w-full h-96 rounded-md"
              src="https://discord.com/widget?id=0&theme=dark"
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            />
          </div>
        </div>
        <div>
          <DiscordJoin />
          <div className="mt-6 glass rounded-card p-4 border border-white/10">
            <h3 className="font-heading font-semibold">Teaser (copy for Discord)</h3>
            <p className="text-white/70 text-sm mt-2">
              UNMISSABLERP — Next-level GTA RP. Apply now, shape the city. https://unmissablerp.vercel.app
            </p>
          </div>
          <div className="mt-6 glass rounded-card p-4 border border-white/10">
            <h3 className="font-heading font-semibold">Web3 gating (future)</h3>
            <p className="text-white/70 text-sm mt-2">Connect a wallet to verify token/NFT whitelist. (Placeholder UI)</p>
            <button className="mt-3 px-4 py-2 rounded-pill bg-accent-blue3 text-white/90">Connect Wallet</button>
          </div>
        </div>
      </section>
    </div>
  );
}


