
import CatalogGrid from '@/components/CatalogGrid';

export const metadata = {
    title: 'Catalog',
    description:
        'Browse our full catalog of premium interior films, Korean wallpapers, and fabric-backed vinyl wallcoverings — organized by collection.',
};

export default function Catalog() {
    return (
        <div className="bg-zinc-50 min-h-screen">

            {/* Hero */}
            <div className="container py-16 text-center">
                <p className="tracking-widest text-sm text-gray-400 uppercase mb-2">Wall Cosmetics</p>
                <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Our Catalog</h1>
                <p className="max-w-2xl mx-auto text-gray-500 leading-relaxed">
                    Explore our complete range of premium interior films, Korean wallpapers, and
                    fabric-backed vinyl wallcoverings. Filter by category and click any catalog to
                    browse or download.
                </p>
            </div>

            {/* Catalog Grid with Filter */}
            <div className="container pb-24">
                <CatalogGrid />
            </div>

        </div>
    );
}

