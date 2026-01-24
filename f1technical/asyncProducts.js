function fetchProducts() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          name: "Final Fantasy Collectors Booster Box",
          price: "₱30,000",
          img: "productimages/FFBooster.png",
          alt: "Final Fantasy Booster"
        },
        {
          name: "Aether Drift Collector Booster",
          price: "₱18,000",
          img: "productimages/AetherBooster.jpg",
          alt: "Aether Booster"
        },
        {
          name: "Modern Horizons Collectors Booster Box",
          price: "₱38,000",
          img: "productimages/ModernHorizonsBooster.webp",
          alt: "Modern Horizons Booster"
        }
      ]);
    }, 1400);
  });
}

async function loadProductsAsync() {
  const grid = document.querySelector('.product-grid');
  if (!grid) return;

  grid.innerHTML = '<p style="padding:16px;text-align:center;">Loading products…</p>';

  try {
    const products = await fetchProducts();
    grid.innerHTML = '';

    products.forEach(p => {
      const card = document.createElement('article');
      card.className = 'product-card';
      card.innerHTML = `
        <a class="img-wrap" href="#">
          <img src="${p.img}" alt="${p.alt}">
        </a>
        <div class="product-info">
          <p class="product-name">${p.name}</p>
          <p class="product-price">${p.price}</p>
        </div>
      `;
      grid.appendChild(card);
    });

  } catch (err) {
    grid.innerHTML = '<p style="color:red;">Failed to load products.</p>';
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', loadProductsAsync);
