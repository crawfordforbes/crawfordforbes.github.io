/// <reference types="vitest" />
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
          // Group React together
          if (id.includes('react')) return 'vendor-react';
          // Group everything else separately
          return 'vendor-libs';
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
    minify: 'terser', // Using terser for better compression
    terserOptions: {
      compress: {
        drop_console: true, // Clean up the main thread by removing logs
      },
    },
    chunkSizeWarningLimit: 500,
    target: 'esnext'
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
  },

  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/test/setup.ts'],
  }
})
