import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  base: '/',
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Generate hidden source maps for production debugging (maps not served inline)
    sourcemap: 'hidden',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId 
            ? chunkInfo.facadeModuleId.split('/').pop() 
            : 'chunk';
          return `js/${facadeModuleId}-[hash].js`;
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') ?? [];
          const ext = info[info.length - 1];
          
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext ?? '')) {
            return `img/[name]-[hash][extname]`;
          }
          if (/css/i.test(ext ?? '')) {
            return `css/[name]-[hash][extname]`;
          }
          if (/woff2?|eot|ttf|otf/i.test(ext ?? '')) {
            return `fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        }
      }
    },
    minify: 'esbuild', // Using esbuild for faster builds
    
    // Chunk size warning limit set to 650kb (vs default 500kb).
    // The main chunk (~604kb uncompressed, ~210kb gzipped) contains the projects
    // data file (src/data/projects/projects.tsx) with extensive JSX-based descriptions,
    // VideoPlayer, SimpleImage, and Caption components. Since this is a single-page
    // portfolio where all routes render the same Projects component, there's no
    // opportunity for effective route-based code splitting. Dynamic imports of
    // individual project descriptions would reduce bundle size but would hurt UX
    // (slower project detail loads). The gzipped size is acceptable for a modern
    // SPA with rich media content.
    chunkSizeWarningLimit: 650,
    // Target modern browsers for smaller bundles
    target: 'es2022'
  },
  server: {
    hmr: {
      overlay: true
    }
  },
  
  // Preview server config (for production preview)
  preview: {
    port: 4173,
    strictPort: true,
  }
})
