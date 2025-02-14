import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    build: {
        outDir: '../backend/templates'
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000', // Backend server
                changeOrigin: true,
                rewrite: (path) => path//path.replace(/^\/api/, ''), // Optional path rewrite
            },
        },
    },
})
