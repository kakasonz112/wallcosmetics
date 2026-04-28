'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const CatalogPdfViewers = dynamic(() => import('@/components/CatalogPdfViewers'), { ssr: false });

const CATEGORIES = [
    'All',
    'Interior Film',
    'Contemporary Wallpaper',
    'Fabric-Backed Vinyl',
    'Korean Wallpaper',
];

const catalogs = [
    {
        id: 'bodaq',
        title: 'Bodaq Interior Film 2025',
        category: 'Interior Film',
        badge: 'Interior Film',
        pdf: '/catalog/Bodaq-E-catalogHQ-2025.pdf',
        description:
            'Premium self-adhesive interior film collection featuring wood, stone, marble, fabric, leather, and solid-colour patterns. Designed for durable, stylish surface transformation for any space.',
        gradient: 'from-slate-700 to-slate-900',
        tags: ['Wood', 'Stone', 'Fabric', 'Leather', 'Solid'],
    },
    {
        id: 'artisan-walls',
        title: 'Artisan Walls',
        category: 'Contemporary Wallpaper',
        badge: 'Contemporary Wallpaper',
        pdf: '/catalog/ARTISAN%20WALLS%20e-Catalog.pdf',
        description:
            'Contemporary, neutral-toned striped patterns set in modern furniture showroom environments. Emphasizes subtle texture and minimalist aesthetics suitable for upscale residential and commercial spaces.',
        gradient: 'from-stone-500 to-stone-700',
        tags: ['Minimalist', 'Neutral Tones', 'Stripe'],
    },
    {
        id: 'aurora2',
        title: 'Aurora 2',
        category: 'Contemporary Wallpaper',
        badge: 'Contemporary Wallpaper',
        pdf: '/catalog/AURORA%202-%20E%20catalogue.pdf',
        description:
            'Comprehensive color-coordinated design lines with large palettes spanning warm, neutral, and cool tones. Fine linear and textured finishes for modern living rooms, bedrooms, and commercial spaces.',
        gradient: 'from-amber-500 to-orange-700',
        tags: ['Color Palette', 'Linear', 'Textured'],
    },
    {
        id: 'attalia',
        title: 'Attalia',
        category: 'Fabric-Backed Vinyl',
        badge: 'Fabric-Backed Vinyl',
        pdf: '/catalog/Attalia1.pdf',
        description:
            'Fabric-backed vinyl wallcoverings in multiple palettes — earth tones, neutrals, blues, teals, and warm tones. Vertical stripe and linear texture patterns versatile for residential, hospitality, and healthcare.',
        gradient: 'from-teal-600 to-cyan-800',
        tags: ['Residential', 'Hospitality', 'Healthcare'],
    },
    {
        id: 'la-villa',
        title: 'La Villa',
        category: 'Fabric-Backed Vinyl',
        badge: 'Fabric-Backed Vinyl',
        pdf: '/catalog/LA%20VILLA.pdf',
        description:
            'Commercial-grade fabric-backed vinyl wallcovering for hotels, retail, schools, and offices. Durable textile patterns with dimensional stability designed for high-traffic environments.',
        gradient: 'from-emerald-600 to-teal-800',
        tags: ['Commercial', 'Hotel', 'Office', 'School'],
    },
    {
        id: 'nova-walls',
        title: 'Nova Walls',
        category: 'Fabric-Backed Vinyl',
        badge: 'Fabric-Backed Vinyl',
        pdf: '/catalog/NOVA%20WALLS%20(1).pdf',
        description:
            '40+ colour and texture options emphasizing linear and woven patterns. 15 oz Osnaburg-backed vinyl in neutral palettes — whites, beiges, grays, and greens for contemporary commercial and residential interiors.',
        gradient: 'from-green-600 to-emerald-800',
        tags: ['40+ Colors', 'Linear', 'Woven'],
    },
    {
        id: 'zen-wall',
        title: 'Zen Wall by Durawall',
        category: 'Fabric-Backed Vinyl',
        badge: 'Fabric-Backed Vinyl',
        pdf: '/catalog/Zen%20wall%20fabric%20backed%20PDF%20.pdf',
        description:
            'Professional poly-cotton backed vinyl with unique micro-venting technology for breathability. Fire-retardant (Class A / B1), low-VOC, phthalate-free, and antimicrobial — ideal for mold-resistant applications.',
        gradient: 'from-cyan-600 to-teal-900',
        tags: ['Fire Retardant', 'Low-VOC', 'Micro-Venting'],
    },
    {
        id: 'decent',
        title: 'Decent Collection',
        category: 'Korean Wallpaper',
        badge: 'Korean Wallpaper · KCC SHD',
        pdf: '/catalog/DECENT%20(1).pdf',
        description:
            'Premium interior wallcovering emphasizing natural materials and timeless elegance. Warm neutrals with botanical and textural designs in gold, brown, blues, and greens for contemporary living spaces.',
        gradient: 'from-yellow-600 to-amber-800',
        tags: ['Botanical', 'Natural', 'Timeless'],
    },
    {
        id: 'canvas',
        title: 'Canvas Collection',
        category: 'Korean Wallpaper',
        badge: 'Korean Wallpaper · KCC SHD',
        pdf: '/catalog/CANVAS%20(1).pdf',
        description:
            'Bold geometric and abstract botanical patterns in sophisticated navy blues, gold, and cream. A design-forward collection for accent walls featuring leaf and organic motifs.',
        gradient: 'from-indigo-600 to-blue-900',
        tags: ['Geometric', 'Botanical', 'Accent Wall'],
    },
    {
        id: 'dream-world',
        title: 'Dream World Collection',
        category: 'Korean Wallpaper',
        badge: 'Korean Wallpaper · KCC SHD',
        pdf: '/catalog/Dream%20World.pdf',
        description:
            "Age-appropriate kids' wallpaper across three groups — Baby (0–5) with soft pastels and cute animals, Kids (5–10) with vibrant dinosaurs and adventure themes, Teens (10–15) with cosmic and gaming aesthetics.",
        gradient: 'from-violet-500 to-purple-800',
        tags: ['Baby', 'Kids', 'Teen'],
    },
    {
        id: 'festa',
        title: 'Festa Collection',
        category: 'Korean Wallpaper',
        badge: 'Korean Wallpaper · GAENARI',
        pdf: '/catalog/FESTA_Cat.pdf',
        description:
            'Luxury eco-premium silk wallcovering with woven textile effects — curled textures, canvas weaves, linens, and stone finishes in soft neutral hues. Four themes: Timeless, Sensuous, Evocative, and Luxurious.',
        gradient: 'from-fuchsia-500 to-pink-800',
        tags: ['Luxury', 'Silk', 'Eco-Premium'],
    },
    {
        id: 'premium-silk',
        title: 'Premium Silk Collection',
        category: 'Korean Wallpaper',
        badge: 'Korean Wallpaper · KCC SHD',
        pdf: '/catalog/Project%20unlimited_pdf%20(1).pdf',
        description:
            'Premium 106 cm × 15.6 m silk rolls. Anti-fungus, anti-virus, anti-bacterial, and OEKO-TEX® certified. 16+ design collections including noble stone, boucle, cashmere, botanical prints, and velvet finishes.',
        gradient: 'from-rose-500 to-pink-800',
        tags: ['OEKO-TEX®', 'Anti-Bacterial', 'Silk', '106 cm Roll'],
    },
    {
        id: 'tahiti',
        title: 'Tahiti Collection',
        category: 'Korean Wallpaper',
        badge: 'Korean PVC Wallpaper',
        pdf: '/catalog/TAHITI_E-CATALOG.pdf',
        description:
            '"Unique and Different" — modern, nature-inspired, and artistic patterns for premium residential interiors. PVC-coated with paper backing in 1.06 m × 15.5 m rolls. Moisture-resistant and lightly scrubbable.',
        gradient: 'from-purple-600 to-violet-900',
        tags: ['Nature-Inspired', 'Modern', 'PVC'],
    },
    {
        id: 'savoy',
        title: 'Savoy — Flow with Nature',
        category: 'Korean Wallpaper',
        badge: 'Korean PVC Wallpaper',
        pdf: '/catalog/SAVOY%20-%20E%20Cat.pdf',
        description:
            '15 distinct nature-inspired patterns in 71 colour variations. Wave, shell, linen, and stone-like organic textures in 1.06 m durable PVC rolls — organized in the SV1001 to SV1015 series.',
        gradient: 'from-sky-500 to-blue-800',
        tags: ['Wave', 'Shell', 'Organic', '71 Colors'],
    },
];

const CATEGORY_COUNT = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = cat === 'All' ? catalogs.length : catalogs.filter((c) => c.category === cat).length;
    return acc;
}, {});

export default function CatalogGrid() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [openCatalog, setOpenCatalog] = useState(null);

    const filtered =
        activeCategory === 'All' ? catalogs : catalogs.filter((c) => c.category === activeCategory);

    // Body scroll lock + Escape key when modal is open
    useEffect(() => {
        if (!openCatalog) return;
        const handleKey = (e) => {
            if (e.key === 'Escape') setOpenCatalog(null);
        };
        document.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [openCatalog]);

    return (
        <>
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2 justify-center mb-10">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                            activeCategory === cat
                                ? 'bg-gray-900 text-white shadow'
                                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        {cat}
                        <span
                            className={`ml-1.5 text-xs ${
                                activeCategory === cat ? 'text-gray-300' : 'text-gray-400'
                            }`}
                        >
                            ({CATEGORY_COUNT[cat]})
                        </span>
                    </button>
                ))}
            </div>

            {/* Catalog Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((catalog) => (
                    <div
                        key={catalog.id}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col"
                    >
                        {/* Color Banner */}
                        <div
                            className={`bg-gradient-to-br ${catalog.gradient} h-32 flex items-center justify-center px-6 shrink-0`}
                        >
                            <h3 className="text-white text-xl font-bold text-center leading-tight drop-shadow">
                                {catalog.title}
                            </h3>
                        </div>

                        {/* Card Body */}
                        <div className="p-5 flex flex-col flex-1">
                            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">
                                {catalog.badge}
                            </span>
                            <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">
                                {catalog.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5 mb-4">
                                {catalog.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="bg-gray-100 text-gray-500 text-xs px-2.5 py-0.5 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setOpenCatalog(catalog)}
                                    className="flex-1 py-2.5 bg-gray-900 text-white text-sm rounded-xl hover:bg-gray-700 transition-colors font-medium"
                                >
                                    View Catalog
                                </button>
                                <a
                                    href={catalog.pdf}
                                    download
                                    className="px-4 py-2.5 border border-gray-200 text-gray-500 text-sm rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center"
                                    title={`Download ${catalog.title}`}
                                    aria-label={`Download ${catalog.title}`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* PDF Viewer Modal */}
            {openCatalog && (
                <div className="fixed inset-0 z-50 flex flex-col bg-black/70">
                    {/* Modal Header */}
                    <div className="bg-white flex items-center justify-between px-6 py-4 shadow shrink-0">
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-widest">
                                {openCatalog.badge}
                            </p>
                            <h2 className="text-lg font-bold text-gray-800 leading-tight">
                                {openCatalog.title}
                            </h2>
                        </div>
                        <button
                            onClick={() => setOpenCatalog(null)}
                            className="w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-800 hover:bg-gray-100 transition-colors text-xl leading-none"
                            aria-label="Close"
                        >
                            ✕
                        </button>
                    </div>

                    {/* PDF Viewer Content */}
                    <div className="flex-1 overflow-y-auto bg-zinc-100 px-4 py-6">
                        <CatalogPdfViewers
                            pdfUrl={openCatalog.pdf}
                            downloadLabel={`Download ${openCatalog.title}`}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
