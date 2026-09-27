import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// Builds straight into ../public so the compiled demo is what Express
// already serves via express.static('public') — no separate deploy step.
// Entry is demo.html (not index.html) so the build never overwrites
// Lupira's existing landing page at public/index.html.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: '../public',
    emptyOutDir: false,
    rollupOptions: {
      input: resolve(import.meta.dirname, 'demo.html'),
      // Fixed names (no content hash): this is a single demo page with no
      // cache-busting needs, and it keeps rebuilds from littering public/
      // with an ever-growing trail of old hashed bundles.
      output: {
        entryFileNames: 'assets/demo.js',
        chunkFileNames: 'assets/demo-[name].js',
        assetFileNames: 'assets/demo[extname]',
      },
    },
  },
})
