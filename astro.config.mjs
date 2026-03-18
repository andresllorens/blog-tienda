import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tecnolobbyx.com',

  // Crucial: Esto ajusta todas las rutas internas
  base: '/venta',

  // Asegura que se generen archivos HTML puros
  output: 'static',

  image: {
    // Reemplaza 'tu-prestasop.com' con el dominio real de tu backend
    domains: ['https://tecnolobbyx.com'], 
  },

  integrations: [sitemap()]
});