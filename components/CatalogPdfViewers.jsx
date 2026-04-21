'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const CatalogFlipBook     = dynamic(() => import('@/components/CatalogFlipBook'),     { ssr: false });
const CatalogSpreadViewer = dynamic(() => import('@/components/CatalogSpreadViewer'), { ssr: false });

export default function CatalogPdfViewers({ pdfUrl }) {
    const sentinelRef = useRef(null);
    const [showSpread, setShowSpread] = useState(false);

    // Only mount the SpreadViewer when the user scrolls within 300px of it.
    // This prevents the PDF from being fetched twice simultaneously.
    useEffect(() => {
        const el = sentinelRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShowSpread(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '300px' }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

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

            <div className="mt-16" ref={sentinelRef}>
                <p className="tracking-widest text-sm text-gray-400 uppercase mb-2">Full Catalog Viewer</p>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Browse &amp; Search</h2>
                <p className="text-xs text-gray-400 mb-4 italic">
                    Search text, navigate pages, adjust zoom, and view thumbnails — use the toolbar above the document.
                </p>
                {showSpread ? (
                    <CatalogSpreadViewer pdfUrl={pdfUrl} />
                ) : (
                    <div
                        className="flex items-center justify-center text-gray-400 text-sm gap-2 rounded-lg border border-zinc-200 bg-zinc-50"
                        style={{ height: '80vh' }}
                    >
                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Scroll down to load viewer…
                    </div>
                )}
            </div>
        </>
    );
}
