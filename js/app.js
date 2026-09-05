// ==========================================
// DATA DEFAULTS & INITIALIZATION (LOCALSTORAGE)
// ==========================================
const DEFAULT_PRODUCTS = [
    { id: 1, name: "Headphone Wireless Premium", category: "Elektronik", price: 750000, stock: 12, rating: 4.8, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500", description: "Suara berkualitas tinggi dengan fitur Active Noise Cancellation dan daya tahan baterai 30 jam." },
    { id: 2, name: "Smartwatch Sport Series", category: "Gadget", price: 1200000, stock: 8, rating: 4.9, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500", description: "Layar AMOLED jernih, pemantau detak jantung 24/7, dan tahan air hingga kedalaman 50 meter." },
    { id: 3, name: "Kaos Polo Casual Modern", category: "Fashion", price: 150000, stock: 25, rating: 4.6, image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500", description: "Bahan katun bersirkulasi udara tinggi, nyaman digunakan untuk acara santai maupun formal." },
    { id: 4, name: "Kacamata Hitam Elegant", category: "Aksesoris", price: 250000, stock: 15, rating: 4.7, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500", description: "Lensa terpolarisasi anti UV400 dengan bingkai titanium yang ringan dan kokoh." },
    { id: 5, name: "Mouse Gaming RGB", category: "Elektronik", price: 350000, stock: 18, rating: 4.8, image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500", description: "Sensor presisi tinggi 16.000 DPI, pencahayaan RGB yang dapat disesuaikan, dan switch tahan lama." },
    { id: 6, name: "Ransel Laptop Anti Air", category: "Fashion", price: 400000, stock: 10, rating: 4.9, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500", description: "Kapasitas besar 25 Liter dengan port pengisi daya USB terintegrasi dan material anti-air." }
];

// Load global state dari LocalStorage
let products = JSON.parse(localStorage.getItem("rizki_products")) || DEFAULT_PRODUCTS;
let cart = JSON.parse(localStorage.getItem("rizki_cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("rizki_wishlist")) || [];
let orders = JSON.parse(localStorage.getItem("rizki_orders")) || [];

// Simpan data default jika belum ada di storage
if (!localStorage.getItem("rizki_products")) {
    localStorage.setItem("rizki_products", JSON.stringify(products));
}

// ==========================================
// HELPER & UTILITY FUNCTIONS
// ==========================================
function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
}

// Modern Custom Toast Notification (Orange Theme)
function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-orange-500' : type === 'warning' ? 'bg-amber-500' : 'bg-rose-500';
    const icon = type === 'success' ? 'fa-circle-check' : type === 'warning' ? 'fa-triangle-exclamation' : 'fa-circle-xmark';

    toast.className = `${bgColor} text-white px-5 py-3.5 rounded-2xl shadow-xl shadow-orange-500/10 flex items-center gap-3 transition-all duration-300 transform translate-y-5 opacity-0 pointer-events-auto text-sm font-medium z-50 border border-white/20`;
    toast.innerHTML = `<i class="fa-solid ${icon} text-lg"></i> <span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('translate-y-5', 'opacity-0');
    }, 10);

    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// Save Helpers
function saveProducts() {
    localStorage.setItem("rizki_products", JSON.stringify(products));
}

function saveCart() {
    localStorage.setItem("rizki_cart", JSON.stringify(cart));
    updateCartCount();
}

function saveWishlist() {
    localStorage.setItem("rizki_wishlist", JSON.stringify(wishlist));
    updateWishlistCount();
}

function saveOrders() {
    localStorage.setItem("rizki_orders", JSON.stringify(orders));
}

// Badge Counter Updater
function updateCartCount() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll("#cart-count").forEach(el => {
        el.textContent = totalCount;
        el.className = totalCount > 0 
            ? "absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm" 
            : "hidden";
    });
}

function updateWishlistCount() {
    document.querySelectorAll("#wishlist-count").forEach(el => {
        el.textContent = wishlist.length;
        el.className = wishlist.length > 0 
            ? "absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm" 
            : "hidden";
    });
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.remove();
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modals = ['product-detail-modal', 'checkout-modal', 'admin-product-modal'];
        modals.forEach(id => closeModal(id));
    }
});

// Setup Minimalist Dynamic Navbar Behavior
function setupMinimalistNavbar() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    // Tambahkan class dasar untuk gaya minimalis oranye-putih
    nav.classList.add('sticky', 'top-0', 'z-40', 'bg-white/90', 'backdrop-blur-md', 'border-b', 'border-slate-100', 'transition-all', 'duration-200');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            nav.classList.add('shadow-sm');
        } else {
            nav.classList.remove('shadow-sm');
        }
    });
}

// ==========================================
// FITUR PEMBELI (BUYER FUNCTIONS)
// ==========================================

// Tambah/Hapus Wishlist
function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    if (index === -1) {
        wishlist.push(productId);
        showToast("Produk ditambahkan ke favorit");
    } else {
        wishlist.splice(index, 1);
        showToast("Produk dihapus dari favorit", "warning");
    }
    saveWishlist();

    // Re-render katalog produk jika sedang berada di halaman katalog
    if (document.getElementById("all-products")) {
        const activeSearch = document.getElementById("search-input")?.value || "";
        const activeCategory = document.getElementById("category-filter")?.value || "all";
        const activeSort = document.getElementById("sort-filter")?.value || "default";
        filterAndRenderProducts(activeSearch, activeCategory, activeSort);
    }

    // Re-render halaman favorit jika sedang berada di halaman wishlist
    if (document.getElementById("wishlist-products")) {
        renderWishlistPage();
    }
}

// Tambah ke Keranjang
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (product.stock <= 0) {
        showToast("Stok produk habis!", "error");
        return;
    }

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        if (existingItem.quantity >= product.stock) {
            showToast("Kuantitas melebihi stok yang tersedia", "warning");
            return;
        }
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    showToast(`"${product.name}" berhasil masuk keranjang!`);

    // Jikalau sedang di halaman keranjang, perbarui tampilan
    if (document.getElementById("cart-items-container")) {
        renderCartPage();
    }
}

// Modal Detail Produk (Quick View)
function openProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let modal = document.getElementById("product-detail-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "product-detail-modal";
        document.body.appendChild(modal);
    }

    const isWishlisted = wishlist.includes(product.id);

    modal.className = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300";
    modal.onclick = (e) => { if (e.target === modal) closeModal('product-detail-modal'); };

    modal.innerHTML = `
        <div class="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-white/40 relative transform transition-all scale-100 animate-fade-in">
            <button onclick="closeModal('product-detail-modal')" class="absolute top-5 right-5 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full w-9 h-9 flex items-center justify-center transition">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div class="overflow-hidden rounded-2xl bg-slate-50 relative">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover">
                    <button onclick="toggleWishlist(${product.id}); openProductDetail(${product.id});" class="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-400 hover:text-orange-500 shadow-sm transition">
                        <i class="${isWishlisted ? 'fa-solid text-orange-500' : 'fa-regular'} fa-heart"></i>
                    </button>
                </div>
                <div>
                    <span class="text-xs font-semibold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">${product.category}</span>
                    <h2 class="text-2xl font-bold text-slate-800 mt-3">${product.name}</h2>
                    <div class="flex items-center gap-2 mt-2">
                        <div class="text-amber-400 text-sm"><i class="fa-solid fa-star"></i> <span class="text-slate-700 font-semibold">${product.rating || '4.8'}</span></div>
                        <span class="text-slate-300">•</span>
                        <span class="text-sm text-slate-500">Stok: ${product.stock} pcs</span>
                    </div>
                    <p class="text-slate-600 text-sm mt-3 leading-relaxed">${product.description || 'Produk berkualitas tinggi yang siap menemani aktivitas harian Anda dengan kenyamanan maksimal.'}</p>
                    <p class="text-2xl font-extrabold text-orange-600 mt-4">${formatRupiah(product.price)}</p>
                    <div class="flex gap-3 mt-6">
                        <button onclick="addToCart(${product.id}); closeModal('product-detail-modal');" class="flex-1 bg-orange-500 text-white font-semibold py-3 px-4 rounded-xl shadow-md shadow-orange-500/20 hover:bg-orange-600 transition flex items-center justify-center gap-2">
                            <i class="fa-solid fa-cart-plus"></i> Tambah Keranjang
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Render Produk (Katalog Pembeli / Featured)
function renderProducts(items, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!items || items.length === 0) {
        container.innerHTML = `
            <div class="col-span-full py-16 text-center">
                <div class="w-20 h-20 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                    <i class="fa-solid fa-box-open"></i>
                </div>
                <h3 class="text-lg font-semibold text-slate-700">Produk Tidak Ditemukan</h3>
                <p class="text-slate-500 text-sm mt-1">Coba kata kunci lain atau ubah filter kategori Anda.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = items.map(product => {
        const isWishlisted = wishlist.includes(product.id);
        return `
            <div class="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden relative">
                <!-- Wishlist Button -->
                <button onclick="toggleWishlist(${product.id})" class="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-400 hover:text-orange-500 shadow-sm transition">
                    <i class="${isWishlisted ? 'fa-solid text-orange-500' : 'fa-regular'} fa-heart"></i>
                </button>

                <!-- Image & Tag -->
                <div class="relative overflow-hidden bg-slate-50 h-52 cursor-pointer" onclick="openProductDetail(${product.id})">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                    <span class="absolute bottom-3 left-3 text-[11px] font-bold tracking-wide uppercase text-orange-600 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-orange-100">
                        ${product.category}
                    </span>
                </div>

                <!-- Info -->
                <div class="p-5 flex flex-col flex-grow">
                    <div class="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span><i class="fa-solid fa-star text-amber-400"></i> ${product.rating || '4.8'}</span>
                        <span>Stok: ${product.stock}</span>
                    </div>
                    <h3 onclick="openProductDetail(${product.id})" class="font-semibold text-slate-800 text-base mb-2 group-hover:text-orange-600 transition cursor-pointer line-clamp-1">
                        ${product.name}
                    </h3>
                    <div class="mt-auto pt-3 flex items-center justify-between border-t border-slate-50">
                        <div>
                            <span class="text-xs text-slate-400 block">Harga</span>
                            <span class="text-lg font-bold text-slate-900">${formatRupiah(product.price)}</span>
                        </div>
                        <button onclick="addToCart(${product.id})" class="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 hover:bg-orange-500 hover:text-white transition flex items-center justify-center shadow-sm">
                            <i class="fa-solid fa-cart-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join("");
}

// Render Halaman Wishlist
function renderWishlistPage() {
    const container = document.getElementById("wishlist-products");
    if (!container) return;

    const wishlistItems = products.filter(p => wishlist.includes(p.id));

    if (wishlistItems.length === 0) {
        container.innerHTML = `
            <div class="col-span-full py-16 text-center bg-white rounded-3xl border border-slate-100">
                <div class="w-20 h-20 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                    <i class="fa-solid fa-heart-crack"></i>
                </div>
                <h3 class="text-xl font-bold text-slate-800">Favorit Anda Masih Kosong</h3>
                <p class="text-slate-500 text-sm mt-2 mb-6">Tandai barang impian Anda dengan menekan ikon hati.</p>
                <a href="products.html" class="inline-flex items-center gap-2 bg-orange-500 text-white font-semibold px-6 py-3 rounded-2xl hover:bg-orange-600 transition shadow-md shadow-orange-500/20">
                    <i class="fa-solid fa-bag-shopping"></i> Eksplor Produk
                </a>
            </div>
        `;
        return;
    }

    renderProducts(wishlistItems, "wishlist-products");
}

// Render Halaman Keranjang Belanja
function renderCartPage() {
    const container = document.getElementById("cart-items-container");
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="bg-white/80 backdrop-blur-md p-10 rounded-3xl text-center border border-slate-100 shadow-sm">
                <div class="w-20 h-20 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                    <i class="fa-solid fa-basket-shopping"></i>
                </div>
                <h3 class="text-xl font-bold text-slate-800">Keranjang Anda Masih Kosong</h3>
                <p class="text-slate-500 text-sm mt-2 mb-6">Jelajahi produk impian Anda dan tambahkan ke sini!</p>
                <a href="products.html" class="inline-flex items-center gap-2 bg-orange-500 text-white font-semibold px-6 py-3 rounded-2xl hover:bg-orange-600 transition shadow-md shadow-orange-500/20">
                    <i class="fa-solid fa-bag-shopping"></i> Mulai Belanja
                </a>
            </div>
        `;
        if (document.getElementById("cart-total")) document.getElementById("cart-total").textContent = formatRupiah(0);
        if (document.getElementById("shipping-cost")) document.getElementById("shipping-cost").textContent = formatRupiah(0);
        if (document.getElementById("cart-grand-total")) document.getElementById("cart-grand-total").textContent = formatRupiah(0);
        return;
    }

    let subtotal = 0;
    container.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        return `
            <div class="bg-white p-4 sm:p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 transition hover:shadow-md">
                <div class="flex items-center gap-4 w-full sm:w-auto">
                    <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-2xl bg-slate-50">
                    <div>
                        <span class="text-xs font-medium text-slate-400 uppercase tracking-wider">${item.category}</span>
                        <h3 class="font-bold text-slate-800 text-base line-clamp-1">${item.name}</h3>
                        <p class="text-orange-600 font-bold text-sm mt-1">${formatRupiah(item.price)}</p>
                    </div>
                </div>

                <div class="flex items-center justify-between w-full sm:w-auto gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                    <div class="flex items-center border border-slate-200 rounded-2xl bg-slate-50/50 p-1">
                        <button onclick="changeQuantity(${item.id}, -1)" class="w-8 h-8 rounded-xl bg-white text-slate-600 hover:bg-slate-100 shadow-sm transition flex items-center justify-center font-bold text-sm">-</button>
                        <span class="px-4 font-semibold text-slate-800 text-sm">${item.quantity}</span>
                        <button onclick="changeQuantity(${item.id}, 1)" class="w-8 h-8 rounded-xl bg-white text-slate-600 hover:bg-slate-100 shadow-sm transition flex items-center justify-center font-bold text-sm">+</button>
                    </div>

                    <div class="text-right min-w-[100px]">
                        <span class="text-xs text-slate-400 block">Subtotal</span>
                        <span class="font-bold text-slate-800">${formatRupiah(itemTotal)}</span>
                    </div>

                    <button onclick="removeFromCart(${item.id})" class="w-9 h-9 rounded-2xl text-rose-500 hover:bg-rose-50 transition flex items-center justify-center">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </div>
        `;
    }).join("");

    const shippingCost = subtotal > 500000 ? 0 : 20000;
    const grandTotal = subtotal + shippingCost;

    if (document.getElementById("cart-total")) document.getElementById("cart-total").textContent = formatRupiah(subtotal);
    if (document.getElementById("shipping-cost")) document.getElementById("shipping-cost").textContent = shippingCost === 0 ? "GRATIS" : formatRupiah(shippingCost);
    if (document.getElementById("cart-grand-total")) document.getElementById("cart-grand-total").textContent = formatRupiah(grandTotal);
}

function changeQuantity(id, change) {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    const product = products.find(p => p.id === id);
    if (change > 0 && product && item.quantity >= product.stock) {
        showToast("Stok maksimum tercapai", "warning");
        return;
    }

    item.quantity += change;
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== id);
    }
    saveCart();
    renderCartPage();
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    renderCartPage();
    showToast("Item berhasil dihapus dari keranjang", "warning");
}

// Modal Form Checkout Lengkap
function openCheckoutModal() {
    if (cart.length === 0) {
        showToast("Keranjang Anda masih kosong!", "error");
        return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 500000 ? 0 : 20000;
    const grandTotal = subtotal + shipping;

    let modal = document.getElementById("checkout-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "checkout-modal";
        document.body.appendChild(modal);
    }

    modal.className = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm";
    modal.onclick = (e) => { if (e.target === modal) closeModal('checkout-modal'); };

    modal.innerHTML = `
        <div class="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-fade-in border border-slate-100">
            <button onclick="closeModal('checkout-modal')" class="absolute top-5 right-5 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full w-9 h-9 flex items-center justify-center">
                <i class="fa-solid fa-xmark"></i>
            </button>
            
            <h2 class="text-2xl font-bold text-slate-800 mb-1">Pengiriman & Pembayaran</h2>
            <p class="text-sm text-slate-500 mb-6">Isi formulir berikut untuk menyelesaikan pesanan Anda.</p>

            <form onsubmit="processCheckout(event)" class="space-y-4">
                <div>
                    <label class="block text-xs font-semibold uppercase text-slate-600 mb-1">Nama Lengkap</label>
                    <input type="text" id="buyer-name" required placeholder="Contoh: Rizki Ramadhan" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm">
                </div>
                <div>
                    <label class="block text-xs font-semibold uppercase text-slate-600 mb-1">Alamat Lengkap</label>
                    <textarea id="buyer-address" required rows="2" placeholder="Jl. Merdeka No. 123, Jakarta Selatan" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm"></textarea>
                </div>
                <div>
                    <label class="block text-xs font-semibold uppercase text-slate-600 mb-1">Metode Pembayaran</label>
                    <select id="payment-method" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm bg-white">
                        <option value="QRIS / Transfer Bank">QRIS / Transfer Bank (Otomatis)</option>
                        <option value="COD (Bayar di Tempat)">COD (Bayar di Tempat)</option>
                        <option value="E-Wallet (Gopay/OVO/Dana)">E-Wallet (Gopay/OVO/Dana)</option>
                    </select>
                </div>

                <div class="bg-orange-50/60 p-4 rounded-2xl border border-orange-100 space-y-2 text-sm mt-4">
                    <div class="flex justify-between text-slate-600"><span>Total Tagihan:</span> <span class="font-bold text-orange-600 text-base">${formatRupiah(grandTotal)}</span></div>
                </div>

                <button type="submit" class="w-full mt-4 bg-orange-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition">
                    Konfirmasi & Bayar Pesanan
                </button>
            </form>
        </div>
    `;
}

function processCheckout(event) {
    event.preventDefault();
    const name = document.getElementById("buyer-name").value;
    const address = document.getElementById("buyer-address").value;
    const payment = document.getElementById("payment-method").value;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 500000 ? 0 : 20000;
    
    // Buat objek pesanan baru
    const newOrder = {
        id: "RZX-" + Math.floor(100000 + Math.random() * 900000),
        date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' }),
        customer: name,
        address: address,
        paymentMethod: payment,
        items: [...cart],
        totalAmount: subtotal + shipping,
        status: "Diproses"
    };

    // Kurangi stok produk
    cart.forEach(cartItem => {
        const prod = products.find(p => p.id === cartItem.id);
        if (prod) prod.stock = Math.max(0, prod.stock - cartItem.quantity);
    });

    orders.unshift(newOrder);
    saveProducts();
    saveOrders();

    cart = [];
    saveCart();
    closeModal('checkout-modal');
    renderCartPage();

    showToast("Pesanan Anda berhasil dibuat!");
}

function checkout() {
    openCheckoutModal();
}

// ==========================================
// FITUR ADMIN (ADMIN FUNCTIONS)
// ==========================================

// Render Statistik Admin
function renderAdminStats() {
    const totalProductsEl = document.getElementById("stat-products");
    const totalOrdersEl = document.getElementById("stat-orders");
    const totalRevenueEl = document.getElementById("stat-revenue");

    if (totalProductsEl) totalProductsEl.textContent = products.length;
    if (totalOrdersEl) totalOrdersEl.textContent = orders.length;
    if (totalRevenueEl) {
        const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
        totalRevenueEl.textContent = formatRupiah(totalRevenue);
    }
}

// Render Tabel Manajemen Produk Admin
function renderAdminProducts() {
    const tableBody = document.getElementById("admin-products-table");
    if (!tableBody) return;

    if (products.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" class="text-center py-8 text-slate-400">Belum ada data produk.</td></tr>`;
        return;
    }

    tableBody.innerHTML = products.map(p => `
        <tr class="border-b border-slate-100 hover:bg-orange-50/30 transition">
            <td class="py-3 px-4 font-medium text-slate-800">#${p.id}</td>
            <td class="py-3 px-4">
                <div class="flex items-center gap-3">
                    <img src="${p.image}" class="w-10 h-10 rounded-xl object-cover bg-slate-100">
                    <span class="font-semibold text-slate-800 text-sm">${p.name}</span>
                </div>
            </td>
            <td class="py-3 px-4 text-xs"><span class="bg-orange-50 text-orange-600 border border-orange-100 px-2.5 py-1 rounded-full font-medium">${p.category}</span></td>
            <td class="py-3 px-4 font-bold text-slate-700 text-sm">${formatRupiah(p.price)}</td>
            <td class="py-3 px-4 text-sm">${p.stock} pcs</td>
            <td class="py-3 px-4">
                <div class="flex items-center gap-2">
                    <button onclick="openProductFormModal(${p.id})" class="p-2 text-orange-600 hover:bg-orange-50 rounded-xl transition" title="Edit">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button onclick="deleteProductByAdmin(${p.id})" class="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition" title="Hapus">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join("");
}

// Form Modal Tambah/Edit Produk oleh Admin
function openProductFormModal(productId = null) {
    const isEdit = productId !== null;
    const product = isEdit ? products.find(p => p.id === productId) : { name: "", category: "Elektronik", price: "", stock: "", image: "", description: "" };

    let modal = document.getElementById("admin-product-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "admin-product-modal";
        document.body.appendChild(modal);
    }

    modal.className = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm";
    modal.onclick = (e) => { if (e.target === modal) closeModal('admin-product-modal'); };

    modal.innerHTML = `
        <div class="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-fade-in border border-slate-100">
            <button onclick="closeModal('admin-product-modal')" class="absolute top-5 right-5 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full w-9 h-9 flex items-center justify-center">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <h2 class="text-xl font-bold text-slate-800 mb-4">${isEdit ? 'Edit Produk' : 'Tambah Produk Baru'}</h2>

            <form onsubmit="saveProductByAdmin(event, ${productId})" class="space-y-3 text-sm">
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1">Nama Produk</label>
                    <input type="text" id="admin-p-name" required value="${product.name}" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-500">
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1">Kategori</label>
                        <select id="admin-p-category" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-500 bg-white">
                            <option value="Elektronik" ${product.category === 'Elektronik' ? 'selected' : ''}>Elektronik</option>
                            <option value="Gadget" ${product.category === 'Gadget' ? 'selected' : ''}>Gadget</option>
                            <option value="Fashion" ${product.category === 'Fashion' ? 'selected' : ''}>Fashion</option>
                            <option value="Aksesoris" ${product.category === 'Aksesoris' ? 'selected' : ''}>Aksesoris</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1">Stok</label>
                        <input type="number" id="admin-p-stock" required value="${product.stock}" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-500">
                    </div>
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1">Harga (Rp)</label>
                    <input type="number" id="admin-p-price" required value="${product.price}" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-500">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1">URL Gambar</label>
                    <input type="url" id="admin-p-image" required value="${product.image}" placeholder="https://..." class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-500">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1">Deskripsi</label>
                    <textarea id="admin-p-desc" rows="2" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-500">${product.description || ''}</textarea>
                </div>
                <button type="submit" class="w-full mt-2 bg-orange-500 text-white font-semibold py-3 rounded-xl hover:bg-orange-600 shadow-md shadow-orange-500/20 transition">
                    ${isEdit ? 'Simpan Perubahan' : 'Tambah Produk'}
                </button>
            </form>
        </div>
    `;
}

function saveProductByAdmin(event, productId) {
    event.preventDefault();
    const name = document.getElementById("admin-p-name").value;
    const category = document.getElementById("admin-p-category").value;
    const price = parseInt(document.getElementById("admin-p-price").value);
    const stock = parseInt(document.getElementById("admin-p-stock").value);
    const image = document.getElementById("admin-p-image").value;
    const description = document.getElementById("admin-p-desc").value;

    if (productId !== null) {
        const index = products.findIndex(p => p.id === productId);
        if (index !== -1) {
            products[index] = { ...products[index], name, category, price, stock, image, description };
            showToast("Produk berhasil diperbarui!");
        }
    } else {
        const newProduct = {
            id: Date.now(),
            name,
            category,
            price,
            stock,
            rating: 5.0,
            image,
            description
        };
        products.push(newProduct);
        showToast("Produk baru berhasil ditambahkan!");
    }

    saveProducts();
    closeModal('admin-product-modal');
    renderAdminProducts();
    renderAdminStats();
}

function deleteProductByAdmin(productId) {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
        products = products.filter(p => p.id !== productId);
        saveProducts();
        renderAdminProducts();
        renderAdminStats();
        showToast("Produk berhasil dihapus", "warning");
    }
}

// Render Manajemen Pesanan Admin
function renderAdminOrders() {
    const container = document.getElementById("admin-orders-container");
    if (!container) return;

    if (orders.length === 0) {
        container.innerHTML = `<div class="p-8 text-center text-slate-400 bg-white rounded-3xl border border-slate-100">Belum ada pesanan dari pembeli.</div>`;
        return;
    }

    container.innerHTML = orders.map(order => `
        <div class="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3">
            <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                    <span class="font-bold text-slate-800">${order.id}</span>
                    <span class="text-xs text-slate-400 ml-2">${order.date}</span>
                </div>
                <span class="px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'Selesai' ? 'bg-orange-50 text-orange-600 border border-orange-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}">
                    ${order.status}
                </span>
            </div>
            <div class="text-sm text-slate-600 space-y-1">
                <p><strong>Pembeli:</strong> ${order.customer}</p>
                <p><strong>Alamat:</strong> ${order.address}</p>
                <p><strong>Metode:</strong> ${order.paymentMethod}</p>
                <div class="mt-2 text-xs text-slate-500 bg-orange-50/40 p-2.5 rounded-xl border border-orange-100/50">
                    <strong>Detail Item:</strong> ${order.items ? order.items.map(i => `${i.name} (${i.quantity}x)`).join(", ") : '-'}
                </div>
            </div>
            <div class="flex items-center justify-between pt-2">
                <span class="font-bold text-slate-900">${formatRupiah(order.totalAmount)}</span>
                ${order.status !== 'Selesai' ? `
                    <button onclick="completeOrderStatus('${order.id}')" class="bg-orange-50 text-orange-600 text-xs font-bold px-4 py-2 rounded-xl hover:bg-orange-500 hover:text-white transition">
                        Tandai Selesai
                    </button>
                ` : ''}
            </div>
        </div>
    `).join("");
}

function completeOrderStatus(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = "Selesai";
        saveOrders();
        renderAdminOrders();
        renderAdminStats();
        showToast("Status pesanan diperbarui!");
    }
}

// ==========================================
// EVENT HANDLERS & INITIALIZATION
// ==========================================

function filterAndRenderProducts(query = "", category = "all", sort = "default") {
    let filtered = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = category === "all" || p.category.toLowerCase() === category.toLowerCase();
        return matchesSearch && matchesCategory;
    });

    // Handle Urutan (Sorting)
    if (sort === "price-low") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    if (document.getElementById("all-products")) {
        renderProducts(filtered, "all-products");
    }
}

function handleContactSubmit(event) {
    event.preventDefault();
    showToast("Pesan Anda telah dikirim! Tim kami akan merespons segera.");
    event.target.reset();
}

// Baca Parameter URL (e.g., ?category=Gadget atau ?search=headphone)
function parseUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    const searchParam = urlParams.get('search');

    const searchInput = document.getElementById("search-input");
    const categoryFilter = document.getElementById("category-filter");

    if (categoryParam && categoryFilter) {
        categoryFilter.value = categoryParam;
    }

    if (searchParam && searchInput) {
        searchInput.value = searchParam;
    }
}

// Init saat halaman siap
document.addEventListener("DOMContentLoaded", () => {
    setupMinimalistNavbar();
    updateCartCount();
    updateWishlistCount();

    // Render Produk Unggulan di Halaman Utama (Max 4)
    if (document.getElementById("featured-products")) {
        renderProducts(products.slice(0, 4), "featured-products");
    }

    // Render Halaman Produk + Pencarian, Filter Kategori, & Sort
    if (document.getElementById("all-products")) {
        parseUrlParameters();

        const searchInput = document.getElementById("search-input");
        const categoryFilter = document.getElementById("category-filter");
        const sortFilter = document.getElementById("sort-filter");

        const applyFilter = () => {
            filterAndRenderProducts(
                searchInput?.value || "",
                categoryFilter?.value || "all",
                sortFilter?.value || "default"
            );
        };

        applyFilter();

        searchInput?.addEventListener("input", applyFilter);
        categoryFilter?.addEventListener("change", applyFilter);
        sortFilter?.addEventListener("change", applyFilter);
    }

    // Render Halaman Wishlist
    if (document.getElementById("wishlist-products")) {
        renderWishlistPage();
    }

    // Render Halaman Keranjang
    if (document.getElementById("cart-items-container")) {
        renderCartPage();
    }

    // Render Dashboard Admin
    renderAdminProducts();
    renderAdminOrders();
    renderAdminStats();
});