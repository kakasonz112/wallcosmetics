'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import * as pdfjs from 'pdfjs-dist';

if (typeof window !== 'undefined') {
    pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
}

const FLIP_THRESHOLD = 0.25;
const RENDER_WIDTH = 1200;
const ZOOM_STEP     = 0.25;
const ZOOM_MIN      = 0.5;
const ZOOM_MAX      = 3.0;

export default function CatalogFlipBook({ pdfUrl }) {
    const [pageImages, setPageImages] = useState({});
    const [numPages, setNumPages]     = useState(0);
    const [progress, setProgress]     = useState(0);
    const [page, setPage]             = useState(1);
    const [pageWidth, setPageWidth]   = useState(600);
    const [pageAspect, setPageAspect] = useState(1.414);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [flipState, setFlipState]   = useState(null);
    // flipState: { phase: 'drag'|'complete'|'cancel', dir: 'next'|'prev', angle: number }
    const [zoom, setZoom]             = useState(1);
    const [loadError, setLoadError]   = useState(null);

    const containerRef = useRef(null);
    const dragStartX   = useRef(null);
    const dragDirRef   = useRef(null);
    const isDragging   = useRef(false);
    const flipStateRef = useRef(null);
    const pageWidthRef = useRef(600);
    const pageRef      = useRef(1);
    const numPagesRef  = useRef(0);

    useEffect(() => { flipStateRef.current = flipState; }, [flipState]);
    useEffect(() => { pageWidthRef.current = pageWidth; }, [pageWidth]);
    useEffect(() => { pageRef.current      = page;      }, [page]);
    useEffect(() => { numPagesRef.current  = numPages;  }, [numPages]);

    const pinchDistRef = useRef(null);
    const pinchZoomRef = useRef(null);

    // Ctrl + scroll to zoom
    useEffect(() => {
        function onWheel(e) {
            if (!e.ctrlKey) return;
            e.preventDefault();
            setZoom(z => e.deltaY < 0 ? Math.min(z + ZOOM_STEP, ZOOM_MAX) : Math.max(z - ZOOM_STEP, ZOOM_MIN));
        }
        const el = containerRef.current;
        if (!el) return;
        el.addEventListener('wheel', onWheel, { passive: false });
        return () => el.removeEventListener('wheel', onWheel);
    }, []);

    // ── Page width ────────────────────────────────────────────────────────
    useEffect(() => {
        function calcWidth() {
            if (!containerRef.current) return;
            if (document.fullscreenElement) {
                const maxH = window.innerHeight - 100;
                setPageWidth(Math.min(Math.round(maxH / 1.414), window.innerWidth - 32));
            } else {
                setPageWidth(Math.min(containerRef.current.offsetWidth - 32, 750));
            }
        }
        calcWidth();
        window.addEventListener('resize', calcWidth);
        return () => window.removeEventListener('resize', calcWidth);
    }, [isFullscreen]);

    useEffect(() => {
        const handler = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handler);
        return () => document.removeEventListener('fullscreenchange', handler);
    }, []);

    // ── Trim white margins from a rendered canvas ────────────────────────
    function trimCanvas(canvas) {
        try {
            const ctx  = canvas.getContext('2d', { willReadFrequently: true });
            const w    = canvas.width;
            const h    = canvas.height;
            const data = ctx.getImageData(0, 0, w, h).data;
            const WHITE = 245;

            function isWhiteRow(y) {
                const base = y * w * 4;
                for (let x = 0; x < w; x++) {
                    const i = base + x * 4;
                    if (data[i+3] < 10) continue;
                    if (data[i] < WHITE || data[i+1] < WHITE || data[i+2] < WHITE) return false;
                }
                return true;
            }
            function isWhiteCol(x) {
                for (let y = 0; y < h; y++) {
                    const i = (y * w + x) * 4;
                    if (data[i+3] < 10) continue;
                    if (data[i] < WHITE || data[i+1] < WHITE || data[i+2] < WHITE) return false;
                }
                return true;
            }

            let top = 0, bottom = h - 1, left = 0, right = w - 1;
            while (top    < bottom && isWhiteRow(top))    top++;
            while (bottom > top    && isWhiteRow(bottom)) bottom--;
            while (left   < right  && isWhiteCol(left))   left++;
            while (right  > left   && isWhiteCol(right))  right--;

            const cw = Math.max(1, right - left + 1);
            const ch = Math.max(1, bottom - top + 1);
            const imageData = ctx.getImageData(left, top, cw, ch);
            const out = document.createElement('canvas');
            out.width  = cw;
            out.height = ch;
            out.getContext('2d').putImageData(imageData, 0, 0);
            return out;
        } catch (_) {
            // Fall back to original canvas if trimming fails (e.g. tainted canvas)
            return canvas;
        }
    }

    // ── Pre-render pages to JPEG images ──────────────────────────────────
    useEffect(() => {
        let cancelled = false;
        async function loadPdf() {
            const pdfDoc = await pdfjs.getDocument(pdfUrl).promise;
            if (cancelled) return;
            const total = pdfDoc.numPages;
            setNumPages(total);
            for (let i = 1; i <= total; i++) {
                if (cancelled) break;
                const pdfPage  = await pdfDoc.getPage(i);
                const vp0      = pdfPage.getViewport({ scale: 1 });
                const scale    = RENDER_WIDTH / vp0.width;
                const viewport = pdfPage.getViewport({ scale });
                const canvas   = document.createElement('canvas');
                canvas.width   = Math.round(viewport.width);
                canvas.height  = Math.round(viewport.height);
                await pdfPage.render({ canvasContext: canvas.getContext('2d', { willReadFrequently: true }), viewport }).promise;
                if (cancelled) break;
                const trimmed  = trimCanvas(canvas);
                canvas.width = canvas.height = 0;
                if (i === 1) setPageAspect(trimmed.height / trimmed.width);
                const dataUrl  = trimmed.toDataURL('image/jpeg', 0.92);
                trimmed.width = trimmed.height = 0;
                setPageImages(prev => ({ ...prev, [i]: dataUrl }));
                setProgress(Math.round((i / total) * 100));
            }
        }
        loadPdf().catch(err => {
            console.error('PDF load error:', err);
            setLoadError(err?.message || String(err));
        });
        return () => { cancelled = true; };
    }, [pdfUrl]);

    // ── Drag logic ────────────────────────────────────────────────────────
    const moveDrag = useCallback((clientX) => {
        if (!isDragging.current || dragStartX.current === null) return;
        const dx = clientX - dragStartX.current;
        if (!dragDirRef.current) {
            if (Math.abs(dx) < 8) return;
            const dir = dx < 0 ? 'next' : 'prev';
            if (dir === 'next' && pageRef.current >= numPagesRef.current) { isDragging.current = false; return; }
            if (dir === 'prev' && pageRef.current <= 1)                   { isDragging.current = false; return; }
            dragDirRef.current = dir;
        }
        const dir   = dragDirRef.current;
        const raw   = (dx / pageWidthRef.current) * 180;
        const angle = dir === 'next'
            ? Math.max(-180, Math.min(0, raw))
            : Math.max(0,    Math.min(180, raw));
        setFlipState({ phase: 'drag', dir, angle });
    }, []);

    const endDrag = useCallback((clientX) => {
        if (!isDragging.current) return;
        isDragging.current = false;
        const f   = flipStateRef.current;
        const dir = dragDirRef.current;
        dragStartX.current = null;
        dragDirRef.current = null;
        if (!f || !dir) { setFlipState(null); return; }
        const pct = Math.abs(f.angle) / 180;
        setFlipState(pct > FLIP_THRESHOLD
            ? { phase: 'complete', dir, angle: dir === 'next' ? -180 : 180 }
            : { phase: 'cancel',   dir, angle: 0 });
    }, []);

    useEffect(() => {
        const mm = (e) => moveDrag(e.clientX);
        const mu = (e) => endDrag(e.clientX);
        document.addEventListener('mousemove', mm);
        document.addEventListener('mouseup',   mu);
        return () => { document.removeEventListener('mousemove', mm); document.removeEventListener('mouseup', mu); };
    }, [moveDrag, endDrag]);

    function startDrag(clientX) {
        if (flipStateRef.current || zoom > 1) return;
        dragStartX.current = clientX;
        dragDirRef.current = null;
        isDragging.current = true;
    }

    function navigateButton(dir) {
        if (flipStateRef.current) return;
        if (dir === 'next' && page >= numPages) return;
        if (dir === 'prev' && page <= 1) return;
        setFlipState({ phase: 'complete', dir, angle: dir === 'next' ? -180 : 180 });
    }

    function onTransitionEnd(e) {
        if (e.propertyName !== 'transform') return;
        const f = flipStateRef.current;
        if (!f) return;
        if (f.phase === 'complete') setPage(p => f.dir === 'next' ? p + 1 : p - 1);
        setFlipState(null);
    }

    function toggleFullscreen() {
        if (!document.fullscreenElement) containerRef.current?.requestFullscreen();
        else document.exitFullscreen();
    }

    function zoomIn()    { setZoom(z => Math.min(z + ZOOM_STEP, ZOOM_MAX)); }
    function zoomOut()   { setZoom(z => Math.max(z - ZOOM_STEP, ZOOM_MIN)); }
    function zoomReset() { setZoom(1); }

    // ── Derived flip values ───────────────────────────────────────────────
    const angle          = flipState?.angle ?? 0;
    const withTransition = flipState?.phase === 'complete' || flipState?.phase === 'cancel';
    const flipDir        = flipState?.dir ?? null;
    const destPage       = flipDir === 'next' ? page + 1 : flipDir === 'prev' ? page - 1 : null;
    // Pivot at the leading edge of the turn
    const transformOrigin = flipDir === 'next' ? 'left center' : 'right center';
    // Shadow intensity: 0 at rest → stronger at 90°
    const progress90     = flipState ? Math.sin((Math.abs(angle) / 180) * Math.PI) : 0;
    const imgStyle       = { width: '100%', display: 'block' };
    const pageHeight     = Math.round(pageWidth * pageAspect);

    return (
        <div
            ref={containerRef}
            tabIndex={0}
            className={`w-full flex flex-col items-center outline-none select-none
                ${isFullscreen ? 'bg-zinc-900 min-h-screen justify-center py-4' : ''}`}
            onKeyDown={(e) => {
                if (e.key === 'ArrowRight') navigateButton('next');
                if (e.key === 'ArrowLeft')  navigateButton('prev');
                if (e.key === '+' || e.key === '=') zoomIn();
                if (e.key === '-')           zoomOut();
                if (e.key === '0')           zoomReset();
            }}
        >
            {/* Loading states */}
            {loadError && (
                <div className="py-20 text-red-500 text-sm text-center px-4">
                    <p className="font-semibold mb-1">Failed to load PDF</p>
                    <p className="text-xs text-red-400 break-all">{loadError}</p>
                </div>
            )}
            {!loadError && numPages === 0 && (
                <div className="py-20 text-gray-400 text-sm">Loading catalog…</div>
            )}
            {!loadError && numPages > 0 && !pageImages[page] && (
                <div className="py-20 text-gray-400 text-sm">Preparing pages… {progress}%</div>
            )}

            {numPages > 0 && pageImages[page] && (
                <>
                    {/* Background render progress bar */}
                    {progress < 100 && (
                        <div className="w-full mb-3 bg-gray-200 rounded-full h-1.5" style={{ maxWidth: pageWidth }}>
                            <div className="bg-gray-500 h-1.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                        </div>
                    )}

                    {/* ── Book stage ── */}
                    <div style={{
                        transform: `scale(${zoom})`,
                        transformOrigin: 'top center',
                        transition: flipState ? 'none' : 'transform 0.15s ease',
                        display: 'inline-block',
                    }}>
                    <div
                        style={{
                            width: pageWidth,
                            height: pageHeight,
                            position: 'relative',
                            perspective: '2500px',
                            cursor: zoom > 1 ? 'default' : 'grab',
                        }}
                        onMouseDown={(e) => { e.preventDefault(); startDrag(e.clientX); }}
                        onTouchStart={(e) => {
                            if (e.touches.length === 2) {
                                pinchDistRef.current = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
                                pinchZoomRef.current = zoom;
                            } else { startDrag(e.touches[0].clientX); }
                        }}
                        onTouchMove={(e) => {
                            e.preventDefault();
                            if (e.touches.length === 2 && pinchDistRef.current !== null) {
                                const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
                                setZoom(Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, pinchZoomRef.current * (d / pinchDistRef.current))));
                            } else { moveDrag(e.touches[0].clientX); }
                        }}
                        onTouchEnd={(e) => {
                            if (pinchDistRef.current !== null) { pinchDistRef.current = null; pinchZoomRef.current = null; }
                            else { endDrag(e.changedTouches[0].clientX); }
                        }}
                    >
                        {/* ── Layer 1: Destination page (static, underneath) ── */}
                        {destPage && pageImages[destPage] && (
                            <div style={{
                                position: 'absolute', inset: 0,
                                borderRadius: 2,
                                overflow: 'hidden',
                                boxShadow: '0 25px 60px -12px rgba(0,0,0,0.4)',
                            }}>
                                <img src={pageImages[destPage]} alt="" style={imgStyle} draggable={false} />
                            </div>
                        )}

                        {/* ── Layer 2: Turning page (pivots from its leading edge) ── */}
                        <div
                            style={{
                                position: 'absolute', inset: 0,
                                transformStyle: 'preserve-3d',
                                transformOrigin: flipState ? transformOrigin : '50% 50%',
                                transform: `rotateY(${angle}deg)`,
                                transition: withTransition
                                    ? 'transform 450ms cubic-bezier(0.165, 0.84, 0.44, 1)'
                                    : 'none',
                            }}
                            onTransitionEnd={onTransitionEnd}
                        >
                            {/* Front face: current page */}
                            <div style={{
                                position: 'absolute', inset: 0,
                                backfaceVisibility: 'hidden',
                                WebkitBackfaceVisibility: 'hidden',
                                borderRadius: 2,
                                overflow: 'hidden',
                                boxShadow: '0 25px 60px -12px rgba(0,0,0,0.4)',
                            }}>
                                <img src={pageImages[page]} alt={`Page ${page}`} style={imgStyle} draggable={false} />
                                {/* Fold shadow: darkens the leading edge as it turns */}
                                {flipState && (
                                    <div style={{
                                        position: 'absolute', inset: 0,
                                        background: flipDir === 'next'
                                            ? `linear-gradient(to left, rgba(0,0,0,${progress90 * 0.55}) 0%, transparent 50%)`
                                            : `linear-gradient(to right, rgba(0,0,0,${progress90 * 0.55}) 0%, transparent 50%)`,
                                        pointerEvents: 'none',
                                    }} />
                                )}
                            </div>

                            {/* Back face: destination page (appears after the page passes 90°) */}
                            {destPage && pageImages[destPage] && (
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    backfaceVisibility: 'hidden',
                                    WebkitBackfaceVisibility: 'hidden',
                                    // rotateY(180deg) counter-rotates so the image isn't mirrored
                                    transform: 'rotateY(180deg)',
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    boxShadow: '0 25px 60px -12px rgba(0,0,0,0.4)',
                                }}>
                                    <img src={pageImages[destPage]} alt={`Page ${destPage}`} style={imgStyle} draggable={false} />
                                    {/* Fold shadow on back face: fades as it fully opens */}
                                    <div style={{
                                        position: 'absolute', inset: 0,
                                        background: flipDir === 'next'
                                            ? `linear-gradient(to right, rgba(0,0,0,${(1 - progress90) * 0.4}) 0%, transparent 50%)`
                                            : `linear-gradient(to left, rgba(0,0,0,${(1 - progress90) * 0.4}) 0%, transparent 50%)`,
                                        pointerEvents: 'none',
                                    }} />
                                </div>
                            )}
                        </div>

                        {/* ── Layer 3: Cast shadow on destination page underneath ── */}
                        {flipState && (
                            <div style={{
                                position: 'absolute', inset: 0,
                                pointerEvents: 'none',
                                zIndex: 20,
                                background: flipDir === 'next'
                                    ? `linear-gradient(to right, rgba(0,0,0,${progress90 * 0.35}) 0%, transparent 35%)`
                                    : `linear-gradient(to left, rgba(0,0,0,${progress90 * 0.35}) 0%, transparent 35%)`,
                            }} />
                        )}
                    </div>
                    </div>{/* end zoom wrapper */}

                    {/* Controls */}
                    <div className="flex items-center gap-3 mt-5 flex-wrap justify-center">
                        <button onClick={() => navigateButton('prev')} disabled={page <= 1 || !!flipState}
                            className="px-5 py-2 rounded-full bg-gray-900 text-white text-sm disabled:opacity-30 hover:bg-gray-700 transition-colors">
                            ← Prev
                        </button>
                        <span className={`text-sm min-w-[80px] text-center ${isFullscreen ? 'text-gray-300' : 'text-gray-500'}`}>
                            {page} / {numPages}
                        </span>
                        <button onClick={() => navigateButton('next')} disabled={page >= numPages || !!flipState}
                            className="px-5 py-2 rounded-full bg-gray-900 text-white text-sm disabled:opacity-30 hover:bg-gray-700 transition-colors">
                            Next →
                        </button>
                        {/* Zoom controls */}
                        <div className={`flex items-center rounded-full overflow-hidden border text-sm
                            ${isFullscreen ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'}`}>
                            <button onClick={zoomOut} disabled={zoom <= ZOOM_MIN}
                                className="px-3 py-2 hover:bg-gray-100 disabled:opacity-30 transition-colors">−</button>
                            <button onClick={zoomReset}
                                className="px-2 py-2 hover:bg-gray-100 transition-colors min-w-[52px] text-center tabular-nums text-xs">
                                {Math.round(zoom * 100)}%
                            </button>
                            <button onClick={zoomIn} disabled={zoom >= ZOOM_MAX}
                                className="px-3 py-2 hover:bg-gray-100 disabled:opacity-30 transition-colors">+</button>
                        </div>
                        <button onClick={toggleFullscreen}
                            className={`px-4 py-2 rounded-full border text-sm transition-colors
                                ${isFullscreen ? 'border-gray-500 text-gray-300 hover:bg-zinc-700' : 'border-gray-300 text-gray-600 hover:bg-gray-100'}`}>
                            {isFullscreen ? '⛶ Exit Fullscreen' : '⛶ Fullscreen'}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

