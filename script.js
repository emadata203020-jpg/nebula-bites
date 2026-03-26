const products = [
    {
        id: 1,
        name: "Galactic Burger",
        price: 12.99,
        category: "burgers",
        image: "download (1).jfif",
        description: "A cosmic burger with space-aged cheese and meteor sauce"
    },
    {
        id: 2,
        name: "Nebula Noodles",
        price: 14.50,
        category: "asian",
        image: "download (2).jfif",
        description: "Interstellar noodles with glowing vegetables"
    },
    {
        id: 3,
        name: "Black Hole Pizza",
        price: 16.75,
        category: "pizza",
        image: "download (3).jfif",
        description: "Pizza that pulls you in with its delicious flavors"
    },
    {
        id: 4,
        name: "Cosmic Chicken Wings",
        price: 11.25,
        category: "appetizers",
        image: "download (4).jfif",
        description: "Spicy wings from another dimension"
    },
    {
        id: 5,
        name: "Stellar Salad",
        price: 9.99,
        category: "salads",
        image: "download.jfif",
        description: "Fresh greens from the garden planet"
    },
    {
        id: 6,
        name: "Milky Way Milkshake",
        price: 6.50,
        category: "drinks",
        image: "download (5).jfif",
        description: "Creamy shake with galactic sprinkles",
    },
    {
        id: 7,
        name: "Planet Pasta",
        price: 13.99,
        category: "pasta",
        image: "Spicy-Pasta-recipe-optimised-scaled.webp",
        description: "Pasta shaped like planets in alien sauce"
    },
    {
        id: 8,
        name: "Asrto Fries",
        price: 5.99,
        category: "appetizers",
        image: "download (6).jfif",
        description: "Crispy fries with space dust seasoning"
    },
    {
        id: 9,
        name: "Solar Smoothie",
        price: 7.25,
        category: "drinks",
        image: "download (7).jfif",
        description: "Energy-boosting smoothie with supernova fruits"
    },
    {
        id: 10,
        name: "Comet Combo",
        price: 18.99,
        category: "specials",
        image: "download (7).jfif",
        description: "A combination of our best interstellar dishes"
    },
    {
        id: 11,
        name: "Alien Tacos",
        price: 10.50,
        category: "mexican",
        image: "download (8).jfif",
        description: "Tacos with out-of-this-world fillings"
    },
    {
        id: 12,
        name: "Space Sundae",
        price: 8.75,
        category: "desserts",
        image: "download (9).jfif",
        description: "Ice cream with meteor chocolate chunks"
    }
];

const categories = [
    { id: "all", name: "All", icon: "fas fa-globe" },
    { id: "burgers", name: "Burgers", icon: "fas fa-hamburger" },
    { id: "pizza", name: "Pizza", icon: "fas fa-pizza-slice" },
    { id: "asian", name: "Asian", icon: "fas fa-utensils" },
    { id: "appetizers", name: "Appetizers", icon: "fas fa-pepper-hot" },
    { id: "salads", name: "Salads", icon: "fas fa-leaf" },
    { id: "drinks", name: "Drinks", icon: "fas fa-glass-whiskey" },
    { id: "pasta", name: "Pasta", icon: "fas fa-pasta" },
    { id: "specials", name: "Specials", icon: "fas fa-star" },
    { id: "mexican", name: "Mexican", icon: "fas fa-pepper-hot" },
    { id: "desserts", name: "Desserts", icon: "fas fa-ice-cream" },
];

const orders = [
    {
        id: "ORD-001",
        date: "2026-01-15",
        status: "delivered",
        items: [
            { name: "Galactic Burger", quantity: 2, price: 12.99 },
            { name: "Asrto Fries", quantity: 1, price: 5.99 }
        ],
        total: 31.97
    },
    {
        id: "ORD-002",
        date: "2026-01-14",
        status: "processing",
        items: [
            { name: "Nebula Noodles", quantity: 1, price: 14.50 },
            { name: "Solar Smoothie", quantity: 2, price: 7.25 }
        ],
        total: 29.00
    },
    {
        id: "ORD-003",
        date: "2026-01-13",
        status: "cancelled",
        items: [
            { name: "Black Hole Pizza", quantity: 1, price: 16.75 }
        ],
        total: 16.75
    }
];

const footerLinks = [
    { label: "About Us", href: "#about" },
    { label: "Contact", href: "#contact" },
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms of Service", href: "#terms" },
    { label: "FAQ", href: "#faq" },
    { label: "Careers", href: "#careers" },
];

let cart =
    JSON.parse(localStorage.getItem("nebulaCart")) || [];
let currentCategory = "all";
let searchQuery = "";

const elements = {
    cartBtn: document.getElementById("cartBtn"),
    cartCount: document.getElementById("cartCount"),
    cartSidebar: document.getElementById("cartSidebar"),
    closeCart: document.getElementById("closeCart"),
    cartItems: document.getElementById("cartItems"),
    cartTotal: document.getElementById("cartTotal"),
    checkoutBtn: document.getElementById("checkoutBtn"),
    overlay: document.getElementById("overlay"),
    productsGrid: document.getElementById("productsGrid"),
    categoryFilters: document.getElementById("categoryFilters"),
    searchInput: document.getElementById("searchInput"),
    navLinks: document.getElementById("navLinks"),
    mobileMenuBtn: document.getElementById("mobileMenuBtn"),
    orderNowBtn: document.getElementById("orderNowBtn"),
    toast: document.getElementById("toast"),
    loading: document.getElementById("loading"),
    authTabs: document.querySelectorAll(".auth-tabs"),
    authForms: document.querySelectorAll(".auth-form"),
    loginForm: document.getElementById("loginForm"),
    signupForm: document.getElementById("signupForm"),
    loginEmail: document.getElementById("loginEmail"),
    loginPassword: document.getElementById("loginPassword"),
    signupName: document.getElementById("signupName"),
    signupEmail: document.getElementById("signupEmail"),
    signupPassword: document.getElementById("signupPassword"),
    signupConfirmPassword: document.getElementById("signupConfirmPassword"),
    ordersGrid: document.getElementById("ordersGrid"),
    footerLinks: document.getElementById("footerLinks")
};


function renderCategoryFilters() {
    return categories.map(category => `
            <button class="filter-btn ${currentCategory === category.id ? "active" : ""}" 
                        data-category="${category.id}">
                    <i class="${category.icon}"></i> ${category.name}
                </button>
            `).join("");
}

function renderProducts(productsToRender) {
    if (productsToRender.length === 0) {
        return `
                    <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                        <i class="fas fa-search" style="font-size: 3rem; color: var(--gray-light); margin-bottom: 1rem;"></i>
                        <h3 style="color: var(--light); margin-bottom: 0.5rem;">No products found</h3>
                        <p style="color: #b0b7c3;">Try adjusting your search or filter</p>
                    </div>
                `;
    }

    return productsToRender.map(product => `
                <div class="product-card" data-id="${product.id}">
                    <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                    <div class="product-content">
                        <span class="product-category">${product.category}</span>
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        <div class="product-footer">
                            <div class="product-price">$${product.price.toFixed(2)}</div>
                            <button class="add-to-cart" data-id="${product.id}">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join("");
}

function renderCartItems() {
    if (cart.length === 0) {
        return `
                    <div class="empty-cart">
                        <i class="fas fa-shopping-basket"></i>
                        <h3>Your cart is empty</h3>
                        <p>Add some cosmic delights to get started!</p>
                    </div>
                `;
    }

    return cart.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.name}</h4>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <div class="cart-item-actions">
                            <button class="quantity-btn decrease" data-id="${item.id}">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn increase" data-id="${item.id}">
                                <i class="fas fa-plus"></i>
                            </button>
                            <button class="remove-item" data-id="${item.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join("");
}

function renderOrders() {
    return orders.map(order => `
                <div class="order-card">
                    <div class="order-header">
                        <div class="order-id">${order.id}</div>
                        <div class="order-date">${order.date}</div>
                        <div class="order-status status-${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</div>
                    </div>
                    <div class="order-items">
                        ${order.items.map(item => `
                            <div class="order-item">
                                <span>${item.name} x${item.quantity}</span>
                                <span>$${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        `).join("")}
                    </div>
                    <div class="order-total">
                        <span class="total-label">Total:</span>
                        <span class="total-value">$${order.total.toFixed(2)}</span>
                    </div>
                </div>
            `).join("");
}

function renderFooterLinks() {
    return footerLinks.map(link => `
                <li><a href="${link.href}" class="footer-link">${link.label}</a></li>
            `).join("");
}

// Utility Functions
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    elements.cartCount.textContent = totalItems;
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    elements.cartTotal.textContent = `$${total.toFixed(2)}`;
}

function saveCartToLocalStorage() {
    localStorage.setItem("nebulaCart", JSON.stringify(cart));
}

function showToast(message) {
    elements.toast.querySelector(".toast-message").textContent = message;
    elements.toast.classList.add("show");
    setTimeout(() => {
        elements.toast.classList.remove("show");
    }, 3000);
}

function showLoading() {
    elements.loading.classList.add("active");
}

function hideLoading() {
    elements.loading.classList.remove("active");
}

function filterProducts() {
    let filteredProducts = products;

    // Filter by category
    if (currentCategory !== "all") {
        filteredProducts = filteredProducts.filter(product => product.category === currentCategory);
    }

    // Filter by search query
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
    }

    return filteredProducts;
}

function updateProductsDisplay() {
    const filteredProducts = filterProducts();
    elements.productsGrid.innerHTML = renderProducts(filteredProducts);
    attachProductEvents();
}

function updateCartDisplay() {
    elements.cartItems.innerHTML = renderCartItems();
    updateCartCount();
    updateCartTotal();
    attachCartEvents();
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCartToLocalStorage();
    updateCartDisplay();
    showToast(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToLocalStorage();
    updateCartDisplay();
    showToast("Item removed from cart");
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCartToLocalStorage();
        updateCartDisplay();
    }
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll("section").forEach(section => {
        section.style.display = "none";
    });

    // Show selected section
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = "block";

        // Special handling for auth page
        if (sectionId === "login") {
            section.style.display = "flex";
        }
    }

    // Update active nav link
    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
        }
    });
}

// Event Handlers
function attachProductEvents() {
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (e) => {
            const productId = parseInt(e.currentTarget.dataset.id);
            addToCart(productId);
        });
    });
}

function attachCartEvents() {
    // Decrease quantity
    document.querySelectorAll(".decrease").forEach(button => {
        button.addEventListener("click", (e) => {
            const productId = parseInt(e.currentTarget.dataset.id);
            updateQuantity(productId, -1);
        });
    });

    // Increase quantity
    document.querySelectorAll(".increase").forEach(button => {
        button.addEventListener("click", (e) => {
            const productId = parseInt(e.currentTarget.dataset.id);
            updateQuantity(productId, 1);
        });
    });

    // Remove item
    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", (e) => {
            const productId = parseInt(e.currentTarget.dataset.id);
            removeFromCart(productId);
        });
    });
}

function attachFilterEvents() {
    document.querySelectorAll(".filter-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            // Update active filter
            document.querySelectorAll(".filter-btn").forEach(btn => {
                btn.classList.remove("active");
            });
            e.currentTarget.classList.add("active");

            // Update current category and re-render
            currentCategory = e.currentTarget.dataset.category;
            updateProductsDisplay();
        });
    });
}

function attachNavigationEvents() {
    // Navigation links
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute("href").substring(1);
            showSection(sectionId);

            // Close mobile menu if open
            elements.navLinks.classList.remove("active");
            elements.overlay.classList.remove("active");
        });
    });

    // Order now button
    elements.orderNowBtn.addEventListener("click", () => {
        showSection("menu");
    });

    // Mobile menu toggle
    elements.mobileMenuBtn.addEventListener("click", () => {
        elements.navLinks.classList.toggle("active");
        elements.overlay.classList.toggle("active");
    });
}

function attachCartSidebarEvents() {
    // Open cart
    elements.cartBtn.addEventListener("click", () => {
        elements.cartSidebar.classList.add("active");
        elements.overlay.classList.add("active");
    });

    // Close cart
    elements.closeCart.addEventListener("click", () => {
        elements.cartSidebar.classList.remove("active");
        elements.overlay.classList.remove("active");
    });

    // Close cart with overlay
    elements.overlay.addEventListener("click", () => {
        elements.cartSidebar.classList.remove("active");
        elements.overlay.classList.remove("active");
        elements.navLinks.classList.remove("active");
    });

    // Checkout button
    elements.checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            showToast("Your cart is empty!");
            return;
        }
        showLoading();
        setTimeout(() => {
            hideLoading();
            showToast("Checkout functionality would be implemented here!");
            elements.cartSidebar.classList.remove("active");
            elements.overlay.classList.remove("active");
        }, 1500);
    });
}

function attachSearchEvents() {
    elements.searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value;
        updateProductsDisplay();
    });
}

function attachAuthEvents() {
    // Tab switching
    elements.authTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const tabId = tab.dataset.tab;

            // Update active tab
            elements.authTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            // Show corresponding form
            elements.authForms.forEach(form => {
                form.classList.remove("active");
                if (form.id === `${tabId}Form`) {
                    form.classList.add("active");
                }
            });
        });
    });

    // Login form validation
    elements.loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let isValid = true;
        const email = elements.loginEmail.value.trim();
        const password = elements.loginPassword.value;

        // Reset errors
        document.querySelectorAll(".error-message").forEach(el => {
            el.classList.remove("show");
        });
        document.querySelectorAll(".form-input").forEach(el => {
            el.classList.remove("error");
        });

        // Email validation
        if (!email || !email.includes("@")) {
            elements.loginEmail.classList.add("error");
            document.getElementById("loginEmailError").textContent = "Please enter a valid email";
            document.getElementById("loginEmailError").classList.add("show");
            isValid = false;
        }

        // Password validation
        if (!password || password.length < 6) {
            elements.loginPassword.classList.add("error");
            document.getElementById("loginPasswordError").textContent = "Password must be at least 6 characters";
            document.getElementById("loginPasswordError").classList.add("show");
            isValid = false;
        }

        if (isValid) {
            showLoading();
            setTimeout(() => {
                hideLoading();
                showToast("Login successful! Welcome back!");
                showSection("menu");
            }, 1500);
        }
    });

    // Signup form validation
    elements.signupForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let isValid = true;
        const name = elements.signupName.value.trim();
        const email = elements.signupEmail.value.trim();
        const password = elements.signupPassword.value;
        const confirmPassword = elements.signupConfirmPassword.value;

        // Reset errors
        document.querySelectorAll(".error-message").forEach(el => {
            el.classList.remove("show");
        });
        document.querySelectorAll(".form-input").forEach(el => {
            el.classList.remove("error");
        });

        // Name validation
        if (!name || name.length < 2) {
            elements.signupName.classList.add("error");
            document.getElementById("signupNameError").textContent = "Please enter your full name";
            document.getElementById("signupNameError").classList.add("show");
            isValid = false;
        }

        // Email validation
        if (!email || !email.includes("@")) {
            elements.signupEmail.classList.add("error");
            document.getElementById("signupEmailError").textContent = "Please enter a valid email";
            document.getElementById("signupEmailError").classList.add("show");
            isValid = false;
        }

        // Password validation
        if (!password || password.length < 8) {
            elements.signupPassword.classList.add("error");
            document.getElementById("signupPasswordError").textContent = "Password must be at least 8 characters";
            document.getElementById("signupPasswordError").classList.add("show");
            isValid = false;
        }

        // Confirm password validation
        if (password !== confirmPassword) {
            elements.signupConfirmPassword.classList.add("error");
            document.getElementById("signupConfirmPasswordError").textContent = "Passwords do not match";
            document.getElementById("signupConfirmPasswordError").classList.add("show");
            isValid = false;
        }

        if (isValid) {
            showLoading();
            setTimeout(() => {
                hideLoading();
                showToast("Account created successfully! Welcome to Nebula Bites!");
                showSection("menu");
            }, 1500);
        }
    });
}

// Initialize Application
function init() {
    // Render initial content
    elements.categoryFilters.innerHTML = renderCategoryFilters();
    updateProductsDisplay();
    updateCartDisplay();
    elements.ordersGrid.innerHTML = renderOrders();
    elements.footerLinks.innerHTML = renderFooterLinks();

    // Attach event listeners
    attachFilterEvents();
    attachNavigationEvents();
    attachCartSidebarEvents();
    attachSearchEvents();
    attachAuthEvents();

    // Show home section by default
    showSection("home");

    // Simulate initial loading
    showLoading();
    setTimeout(() => {
        hideLoading();
    }, 1000);
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", init);

// Prevent default anchor behavior
document.addEventListener("click", function (event) {
    const link = event.target.closest("a[href^='#']");
    if (!link) return;
    event.preventDefault();
});
