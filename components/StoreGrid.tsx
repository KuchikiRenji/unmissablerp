import Image from "next/image";

interface Item {
  id: string;
  name: string;
  price: number;
  imageSrc: string;
  description: string;
}

const items: Item[] = [
  { id: "pass", name: "Server Priority Pass", price: 9.99, imageSrc: "/IMAGEC.jpg", description: "Queue priority during peak hours." },
  { id: "cosmetics", name: "Cosmetic Pack A", price: 6.99, imageSrc: "/IMAGEE.jpg", description: "Exclusive outfits and emotes." },
  { id: "starter", name: "Starter Bundle", price: 4.99, imageSrc: "/IMAGED.jpg", description: "Day-one essentials to hit the streets." }
];

export default function StoreGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <div key={item.id} className="glass rounded-card overflow-hidden border border-white/10">
          <div className="relative h-40">
            <Image src={item.imageSrc} alt={item.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-semibold">{item.name}</h3>
              <div className="text-brand-orange font-semibold">${item.price.toFixed(2)}</div>
            </div>
            <p className="text-white/70 text-sm mt-2">{item.description}</p>
            <button disabled className="mt-4 w-full px-4 py-2 rounded-md bg-muted/20 text-white/60 cursor-not-allowed">
              Coming soon
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}


