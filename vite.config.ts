import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        }
    },
    server: {
        proxy: {
            '/graphql': {
                target: 'https://us-west-2.cdn.hygraph.com/content/cm41jnlks01lg07w6lpmnkr9c/master',
                changeOrigin: true, // Modifica o cabeçalho `Origin` para corresponder ao destino
                secure: false,      // Configurações para HTTPS
                rewrite: (path) => path.replace(/^\/graphql/, ''), // Remove `/graphql` do início da URL
            },
        },
    },
});

