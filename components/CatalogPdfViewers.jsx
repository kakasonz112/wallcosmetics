'use client';

import dynamic from 'next/dynamic';

const CatalogFlipBook     = dynamic(() => import('@/components/CatalogFlipBook'),     { ssr: false });
const CatalogSpreadViewer = dynamic(() => import('@/components/CatalogSpreadViewer'), { ssr: false });

export default function CatalogPdfViewers({ pdfUrl }) {
    return (
        <>
            <div className="w-full py-6 bg-zinc-100 rounded-2xl shadow-inner">
                <CatalogFlipBook pdfUrl={pdfUrl} />
            </div>

            <div className="mt-6">
                <a
                    href={pdfUrl}
                    download
                    className="inline-block px-8 py-3 bg-gray-950 text-white rounded-full hover:bg-gray-700 transition-colors shadow-md"
                >
                    Download Catalog 2025
                </a>
            </div>

            <div className="mt-16">
                <p className="tracking-widest text-sm text-gray-400 uppercase mb-2">Full Catalog Viewer</p>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Browse &amp; Search</h2>
                <p className="text-xs text-gray-400 mb-4 italic">
                    Search text, navigate pages, adjust zoom, and view thumbnails — use the toolbar above the document.
                </p>
                <CatalogSpreadViewer pdfUrl={pdfUrl} />
            </div>
        </>
    );
}
