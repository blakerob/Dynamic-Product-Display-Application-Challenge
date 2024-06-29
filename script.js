// U92725213

const productListElem = document.getElementById('product-list');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const loadingElem = document.getElementById('loading');
const errorElem = document.getElementById('error');

let products = [];
let currentIndex = 0;

async function fetchProducts() {
    try {
        loadingElem.style.display = 'block';
        const response = await fetch('https://course-api.com/react-store-products');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        products = data;
        renderProducts();
    } catch (error) {
        console.error('Error fetching products:', error);
        errorElem.style.display = 'block';
    } finally {
        loadingElem.style.display = 'none';
    }
}

function renderProducts() {
    errorElem.style.display = 'none';
    productListElem.innerHTML = '';
    const product = products[currentIndex];
    const { name, image, price, description } = product;
    const productElem = `
        <div class="product">
            <img src="${image}" alt="${name}" class="product-image">
            <h3>${name}</h3>
            <p>${description}</p>
            <p>Price: $${price}</p>
        </div>
    `;
    productListElem.innerHTML = productElem;
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + products.length) % products.length;
    renderProducts();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % products.length;
    renderProducts();
});

// Initial fetch
fetchProducts();
