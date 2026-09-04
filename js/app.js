// Data Produk
const products = [
    { id: 1, name: "Headphone Wireless Premium", category: "Elektronik", price: 750000, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" },
    { id: 2, name: "Smartwatch Sport Series", category: "Gadget", price: 1200000, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" },
    { id: 3, name: "Kaos Polo Casual Modern", category: "Fashion", price: 150000, image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500" },
    { id: 4, name: "Kacamata Hitam Elegant", category: "Aksesoris", price: 250000, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500" },
    { id: 5, name: "Mouse Gaming RGB", category: "Elektronik", price: 350000, image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500" },
    { id: 6, name: "Ransel Laptop Anti Air", category: "Fashion", price: 400000, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500" }
];

// Helper Format Rupiah
function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
}

// Global Cart State
let cart = JSON.parse(localStorage.getItem("rizki_cart")) || [];

// Update Badge Counter Navbar
function updateCartCount() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countElements = document.querySelectorAll("#cart-count");
    countElements.forEach(el => el.textContent = totalCount);
}

// Simpan Cart ke LocalStorage
function saveCart() {
    localStorage.setItem("rizki_cart", JSON.stringify(cart));
    updateCartCount();
}

// Fungsi Tambah ke Keranjang
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    alert(`${product.name} berhasil ditambahkan ke keranjang!`);
}

// Render Produk di Index/Products Page
function renderProducts(items, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";
    items.forEach(product => {
        container.innerHTML += `
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
                <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <span class="text-xs font-semibold text-indigo-600 uppercase bg-indigo-50 px-2 py-1 rounded">${product.category}</span>
                    <h3 class="font-semibold text-lg mt-2 mb-1">${product.name}</h3>
                    <p class="text-indigo-600 font-bold mb-4">${formatRupiah(product.price)}</p>
                    <button onclick="addToCart(${product.id})" class="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-2">
                        <i class="fa-solid fa-cart-plus"></i> Tambah
                    </button>
                </div>
            </div>
        `;
    });
}

// Render Halaman Keranjang
function renderCartPage() {
    const container = document.getElementById("cart-items-container");
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `<div class="bg-white p-8 rounded-xl text-center shadow-sm">Keranjang Anda masih kosong. <a href="products.html" class="text-indigo-600 font-semibold underline">Mulai Belanja</a></div>`;
        document.getElementById("cart-total").textContent = formatRupiah(0);
        document.getElementById("cart-grand-total").textContent = formatRupiah(0);
        return;
    }

    container.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        container.innerHTML += `
            <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div class="flex items-center gap-4 w-full sm:w-auto">
                    <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-lg">
                    <div>
                        <h3 class="font-semibold text-lg">${item.name}</h3>
                        <p class="text-indigo-600 font-bold">${formatRupiah(item.price)}</p>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <div class="flex items-center border rounded-lg">
                        <button onclick="changeQuantity(${item.id}, -1)" class="px-3 py-1 hover:bg-gray-100">-</button>
                        <span class="px-3 py-1 font-semibold">${item.quantity}</span>
                        <button onclick="changeQuantity(${item.id}, 1)" class="px-3 py-1 hover:bg-gray-100">+</button>
                    </div>
                    <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700 p-2">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });

    document.getElementById("cart-total").textContent = formatRupiah(total);
    document.getElementById("cart-grand-total").textContent = formatRupiah(total);
}

// Mengubah Kuantitas Barang di Keranjang
function changeQuantity(id, change) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
        saveCart();
        renderCartPage();
    }
}

// Hapus Item dari Keranjang
function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    renderCartPage();
}

// Fungsi Checkout Simulasi
function checkout() {
    if (cart.length === 0) {
        alert("Keranjang Anda kosong!");
        return;
    }
    alert("Terima kasih telah berbelanja di RizkiStore! Pesanan Anda akan segera diproses.");
    cart = [];
    saveCart();
    renderCartPage();
}

// Handlers Kontak
function handleContactSubmit(event) {
    event.preventDefault();
    alert("Pesan Anda berhasil terkirim! Tim kami akan segera menghubungi Anda.");
    event.target.reset();
}

// Initialization on Load
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();

    // Render Featured di Index
    if (document.getElementById("featured-products")) {
        renderProducts(products.slice(0, 4), "featured-products");
    }

    // Render All Products & Search Filter
    if (document.getElementById("all-products")) {
        renderProducts(products, "all-products");

        const searchInput = document.getElementById("search-input");
        const categoryFilter = document.getElementById("category-filter");

        function filterProducts() {
            const query = searchInput.value.toLowerCase();
            const category = categoryFilter.value;

            const filtered = products.filter(p => {
                const matchesSearch = p.name.toLowerCase().includes(query);
                const matchesCategory = category === "all" || p.category === category;
                return matchesSearch && matchesCategory;
            });

            renderProducts(filtered, "all-products");
        }

        searchInput?.addEventListener("input", filterProducts);
        categoryFilter?.addEventListener("change", filterProducts);
    }

    // Render Cart Page
    renderCartPage();
});