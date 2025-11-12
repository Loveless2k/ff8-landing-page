// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  server: {
    port: 4321
  },
  vite: {
    resolve: {
      alias: {
        '@components': '/src/components',
        '@layouts': '/src/layouts',
        '@data': '/src/data',
        '@styles': '/src/styles',
        '@scripts': '/src/scripts',
        '@assets': '/src/assets'
      }
    }
  }
});
