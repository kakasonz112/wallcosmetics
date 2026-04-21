'use client';

import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const WORKER_URL = '/pdf.worker.min.js';

export default function CatalogSpreadViewer({ pdfUrl }) {
    // defaultLayoutPlugin must be called at the top level (it registers its own hooks).
    const layoutPlugin = defaultLayoutPlugin();

    return (
        <div
            style={{
                height: '80vh',
                border: '1px solid rgba(0,0,0,0.12)',
                borderRadius: 8,
                overflow: 'hidden',
            }}
        >
            <Worker workerUrl={WORKER_URL}>
                <Viewer
                    fileUrl={pdfUrl}
                    plugins={[layoutPlugin]}
                    defaultScale={SpecialZoomLevel.PageWidth}
                    renderLoader={(percentages) => (
                        <div className="flex items-center justify-center h-full text-gray-400 text-sm gap-2">
                            <svg
                                className="animate-spin h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            Loading catalog… {Math.round(percentages)}%
                        </div>
                    )}
                />
            </Worker>
        </div>
    );
}
