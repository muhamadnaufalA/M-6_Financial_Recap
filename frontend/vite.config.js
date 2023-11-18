import {defineConfig} from 'vite'
import reactRefresh from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
    // This changes the out put dir from dist to build
    // comment this out if that isn't relevant for your project
    serve : {
        port: 3000,
        host: '0.0.0.0',
    },
    build: {
        outDir: 'build',
    },
    plugins:[
        reactRefresh(),
        svgrPlugin({
            svgrOptions: {
                icon: true,
                //...svgr options (https://react-svgr.com/docs/options/)
            },
        }),
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            includeAssets: ['*/**'],
            devOptions: {
              enabled: true,
            },
            manifest: {
              name: 'BudgetBuddy',
              short_name: 'BudgetBuddy',
              display: 'standalone',
              background_color: '#ffffff',
              theme_color: '#007bff',
              description: 'Budget Buddy is a finance application',
              icons: [
                {
                  src: '/img/android-chrome-512x512.png',
                  sizes: '512x512',
                  type: 'image/png',
                },
                {
                  src: '/img/android-chrome-192x192.png',
                  sizes: '192x192',
                  type: 'image/png',
                },
                {
                  src: '/img/apple-touch-icon.png',
                  sizes: '180x180',
                  type: 'image/png',
                },
              ],
            },
            workbox: {
              globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
              runtimeCaching: [
                {
                  urlPattern: ({ url }) => true,
                  handler: 'NetworkFirst',
                  options: {
                    cacheName: 'api-cache',
                    cacheableResponse: {
                      statuses: [0, 200],
                    },
                  },
                },
              ],
            },
          }),
    ],
});