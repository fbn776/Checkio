import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: '../backend/templates'
    },
    server: {
        proxy: {
            '/': {
                target: 'http://localhost:5000', // Backend server
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''), // Optional path rewrite
            },
        },
    },
})
