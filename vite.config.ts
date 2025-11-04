import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/', // Replace 'crawfordforbes' with your actual repository name
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
  // Performance optimizations
  build: {
    // Generate source maps for production debugging (disabled for better performance)
    sourcemap: false,
    
    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Group React-related libraries
          'react-vendor': ['react', 'react-dom', 'react-router'],
          
          // Group FontAwesome icons separately (they tend to be large)
          'fontawesome': ['@fortawesome/fontawesome-svg-core', '@fortawesome/free-solid-svg-icons', '@fortawesome/free-brands-svg-icons'],
          
          // Group utility libraries
          'utils': ['@splidejs/react-splide']
        },
        
        // Optimize asset naming for better caching
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
    
    // Optimize for smaller bundle size
    minify: 'esbuild', // Using esbuild for faster builds
    
    // Increase chunk size warning limit (default is 500kb)
    chunkSizeWarningLimit: 1000,
    
    // Target modern browsers for smaller bundles
    target: 'esnext'
  },
  
  // Development server optimizations
  server: {
    // Optimize dependency pre-bundling
    hmr: {
      overlay: true
    }
  },
  
  // Dependency optimization
  optimizeDeps: {
    include: [
  'react',
  'react-dom',
  'react-router',
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/free-brands-svg-icons',
      '@splidejs/react-splide'
    ]
  },
  
  // Preview server config (for production preview)
  preview: {
    port: 4173,
    strictPort: true,
  }
})
