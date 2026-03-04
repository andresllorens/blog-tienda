const API_KEY = 'SHQTY5FE1SJ2VUH4KWLB4WXCY1DQARY7';
const BASE_URL = 'https://tecnolobbyx.com/tienda/api';

export async function getProducts() {
  // Pedimos formato JSON para que sea fácil de manejar en Astro
  const response = await fetch(`${BASE_URL}/products?display=full&output_format=JSON&ws_key=${API_KEY}`);
  const data = await response.json();
  return data.products;
}

export async function getProductById(id) {
  const response = await fetch(`${BASE_URL}/products/${id}?output_format=JSON&ws_key=${API_KEY}`);
  const data = await response.json();
  return data.product;
}