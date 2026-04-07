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

export async function getCategoryById(id) {
  try {
    const response = await fetch(`${BASE_URL}/categories/${id}?output_format=JSON&ws_key=${API_KEY}`);
    const data = await response.json();
    
    // PrestaShop devuelve la categoría dentro de data.category
    return data.category;
  } catch (error) {
    console.error(`Error trayendo la categoría ${id}:`, error);
    return null;
  }
}

export async function getProductFeatureValue(id) {
    // Añadimos el /id antes de los parámetros de consulta
    const response = await fetch(`${BASE_URL}/product_feature_values/${id}?output_format=JSON&ws_key=${API_KEY}`);
    const data = await response.json();
    
    // Accedemos a .product_feature_value y luego a .value
    return data.product_feature_value.value; 
}

export async function getProductFeature(id) {
    // Añadimos el /id antes de los parámetros de consulta
    const response = await fetch(`${BASE_URL}/product_features/${id}?output_format=JSON&ws_key=${API_KEY}`);
    const data = await response.json();
    
    // Devolvemos el objeto completo (que contiene id, position y name)
    return data.product_feature;
}