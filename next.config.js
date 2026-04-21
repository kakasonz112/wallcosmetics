/** @type {import('next').NextConfig} */
const nextConfig = {
    // Turbopack (default in Next.js 16) — alias the optional Node-only 'canvas'
    // package to an empty shim so pdfjs-dist resolves cleanly in the browser.
    turbopack: {
        resolveAlias: {
            canvas: './canvas-shim.js',
        },
    },
    // Webpack fallback for `next build --webpack`
    webpack: (config) => {
        config.resolve.alias.canvas = false;
        return config;
    },
};

module.exports = nextConfig;
