import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: 'Point&Power',
          short_name: 'PointPower',
          description: 'Gestão Escolar e Comportamental',
          theme_color: '#4f46e5',
          icons: [
            {
              src: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=PointPower',
              sizes: '192x192',
              type: 'image/svg+xml'
            },
            {
              src: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=PointPower',
              sizes: '512x512',
              type: 'image/svg+xml'
            }
          ]
        }
      })
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
