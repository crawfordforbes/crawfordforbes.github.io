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
    // Generate source maps for production debugging (disabled for better performance)
    sourcemap: false,
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
    
    // Increase chunk size warning limit (default is 500kb)
    chunkSizeWarningLimit: 500,
    // Target modern browsers for smaller bundles; legacy plugin provides older bundle
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
