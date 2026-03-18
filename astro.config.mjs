import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tecnolobbyx.com',

  // Crucial: Esto ajusta todas las rutas internas
  base: '/venta',

  // Asegura que se generen archivos HTML puros
  output: 'static',

  integrations: [sitemap()]
});