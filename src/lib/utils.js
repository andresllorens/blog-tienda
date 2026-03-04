const API_KEY = 'SHQTY5FE1SJ2VUH4KWLB4WXCY1DQARY7';
const BASE_URL = 'https://tecnolobbyx.com/tienda/api';

export function getImageUrl(productId, imageId, apiKey) {
  return `${BASE_URL}/images/products/${productId}/${imageId}?ws_key=${API_KEY}`;
}
