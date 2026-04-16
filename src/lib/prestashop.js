const API_KEY = 'SHQTY5FE1SJ2VUH4KWLB4WXCY1DQARY7';
const BASE_URL = 'https://tecnolobbyx.com/tienda/api';

const REQUEST_TIMEOUT_MS = 20000;
const MAX_RETRIES = 2;

async function fetchJsonWithRetry(url, label) {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (attempt === MAX_RETRIES) {
        console.error(`Error trayendo ${label}:`, error);
        return null;
      }

      await new Promise((resolve) => setTimeout(resolve, 300 * (attempt + 1)));
    } finally {
      clearTimeout(timeoutId);
    }
  }

  return null;
}

export async function getProducts() {
  const data = await fetchJsonWithRetry(
    `${BASE_URL}/products?display=full&output_format=JSON&ws_key=${API_KEY}`,
    "productos",
  );
  return data?.products ?? [];
}

export async function getProductById(id) {
  const data = await fetchJsonWithRetry(
    `${BASE_URL}/products/${id}?output_format=JSON&ws_key=${API_KEY}`,
    `producto ${id}`,
  );
  return data?.product ?? null;
}

export async function getCategoryById(id) {
  const data = await fetchJsonWithRetry(
    `${BASE_URL}/categories/${id}?output_format=JSON&ws_key=${API_KEY}`,
    `la categoría ${id}`,
  );
  return data?.category ?? null;
}

export async function getProductFeatureValue(id) {
  const data = await fetchJsonWithRetry(
    `${BASE_URL}/product_feature_values/${id}?output_format=JSON&ws_key=${API_KEY}`,
    `el valor de característica ${id}`,
  );
  return data?.product_feature_value?.value ?? null;
}

export async function getProductFeature(id) {
  const data = await fetchJsonWithRetry(
    `${BASE_URL}/product_features/${id}?output_format=JSON&ws_key=${API_KEY}`,
    `la característica ${id}`,
  );
  return data?.product_feature ?? null;
}

export async function getProductsByCategory(categoryId, options = {}) {
  const { activeOnly = true } = options;

  // Try to fetch all products then filter locally for robustness
  const all = await getProducts();
  if (!Array.isArray(all)) return [];

  const filtered = all.filter((p) => {
    if (!p) return false;
    // Prefer id_category_default if present
    if (p.id_category_default && Number(p.id_category_default) === Number(categoryId)) {
      return true;
    }

    // Fallback: check associations.categories array
    const cats = p.associations?.categories || [];
    for (const c of cats) {
      const cid = c?.id ?? c;
      if (cid && Number(cid) === Number(categoryId)) return true;
    }

    return false;
  });

  if (activeOnly) {
    return filtered.filter((p) => p?.active === "1" || p?.active === 1 || p?.active === true);
  }

  return filtered;
}