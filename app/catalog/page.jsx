
import CatalogPdfViewers from '@/components/CatalogPdfViewers';

const collections = [
    {
        title: "Wood Collection",
        label: "WOOD",
        image: "/wallpaper/56113-5C.jpg",
    },
    {
        title: "Stone & Marble Collection",
        label: "STONE & MARBLE",
        image: "/wallpaper/56120-2C.jpg",
    },
    {
        title: "Metal Collection",
        label: "METAL",
        image: "/wallpaper/56122-1C.jpg",
    },
    {
        title: "Fabric & Leather Collection",
        label: "FABRIC & LEATHER",
        image: "/wallpaper/56125-3C.jpg",
    },
    {
        title: "Solid Colors Collection",
        label: "SOLID COLORS",
        image: "/wallpaper/56127-3C.jpg",
    },
    {
        title: "Top Patterns",
        label: "TOP 125 PATTERNS · MOST POPULAR",
        image: "/wallpaper/56130-1C.jpg",
    },
];

export default function Catalog() {
    return (
        <div className="bg-zinc-50 min-h-screen">

            {/* Hero */}
            <div className="container py-16 text-center">
                <p className="tracking-widest text-sm text-gray-400 uppercase mb-2">Wall Cosmetics</p>
                <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Browse Our Catalog</h1>
                <p className="max-w-2xl mx-auto text-gray-500 leading-relaxed mb-10">
                    Welcome to our Catalog — your complete guide to our collection of premium interior films.
                    Browse through a wide range of colors, textures, and patterns designed to bring lasting
                    beauty and functionality to any space.
                </p>

                {/* PDF FlipBook + Spread Viewer (client-only) */}
                <p className="text-xs text-gray-400 mb-6 italic">
                    Click the page edges to flip — or use the arrows below. Use Fullscreen for the best experience.
                </p>
                <CatalogPdfViewers pdfUrl="/catalog/Bodaq-E-catalogHQ-2025.pdf" />
            </div>

            {/* Collections */}
            <div className="container pb-20">
                <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center tracking-wide uppercase">
                    Interior Film Collections
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                    {collections.map((col) => (
                        <div key={col.label} className="relative group overflow-hidden rounded-xl shadow-md cursor-pointer">
                            <img
                                src={col.image}
                                alt={col.title}
                                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-colors duration-300 flex flex-col justify-end p-4">
                                <p className="text-white/70 text-xs tracking-widest uppercase mb-1">{col.title}</p>
                                <p className="text-white font-bold text-lg leading-tight">{col.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}