import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    build: {
        outDir: '../backend/templates'
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://192.168.145.20:5555/',//'http://127.0.0.1:5555/', // Backend server
                changeOrigin: true,
                rewrite: (path) => path,//path.replace(/^\/api/, ''),
            },
        },
    },
})
