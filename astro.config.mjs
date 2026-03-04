import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://tecnolobbyx.com',
  base: '/blog', // Crucial: Esto ajusta todas las rutas internas
  output: 'static' // Asegura que se generen archivos HTML puros
});
