"use strict";

import { auth, db } from "./firebase-config.js";
import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const CART_KEY = "cinemart-cart";

const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");
const searchButton = document.querySelector(".icon-button");
const productCards = document.querySelectorAll(".product-card");
const addButtons = document.querySelectorAll(".add-button");
const wishlistButtons = document.querySelectorAll(".wishlist-button");
const colourOptions = document.querySelectorAll(".colour");
const colourCards = document.querySelectorAll(".colour-card");
const currentYear = document.getElementById("current-year");

// ======================================
// CART STORAGE
// ======================================

function getCart() {
    try {
        const cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
        return Array.isArray(cart) ? cart : [];
    } catch (error) {
        console.error("Could not read cart:", error);
        return [];
    }
}

function saveCart(cart) {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        window.dispatchEvent(new Event("cinemart-cart-updated"));
        updateCartCount();
        return true;
    } catch (error) {
        console.error("Could not save cart:", error);
        alert("Your cart could not be saved. Please try again.");
        return false;
    }
}

function updateCartCount() {
    const count = getCart().reduce(
        (total, item) => total + (Number(item.quantity) || 0),
        0
    );

    document.querySelectorAll(".cart-link span, #cart-count").forEach(element => {
        element.textContent = count;
    });
}

function addProductToCart(product) {
    if (!product.id || !product.name) {
        alert("This product is missing its details.");
        return false;
    }

    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity += 1;

        if (existing.price == null && product.price != null) {
            existing.price = product.price;
        }

        if (!existing.image && product.image) {
            existing.image = product.image;
        }
    } else {
        cart.push({
            id: String(product.id),
            name: product.name,
            category: product.category || "Equipment",
            price: typeof product.price === "number" ? product.price : null,
            image: product.image || "",
            quantity: 1
        });
    }

    return saveCart(cart);
}

// ======================================
// MOBILE NAVIGATION
// ======================================

if (menuToggle && navbar) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navbar.classList.toggle("show");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navbar.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", function () {
            navbar.classList.remove("show");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
        });
    });
}

// ======================================
// COPYRIGHT YEAR
// ======================================

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// ======================================
// HOMEPAGE ADD TO CART
// ======================================

function readPrice(card) {
    const element = card.querySelector(
        ".product-price, .price, [data-price]"
    );

    if (!element) return null;

    const raw = element.dataset.price || element.textContent;
    const cleaned = String(raw)
        .replace(/₦|NGN/gi, "")
        .replace(/,/g, "")
        .replace(/[^\d.]/g, "");

    if (!cleaned) return null;

    const price = Number(cleaned);
    return Number.isFinite(price) && price >= 0 ? price : null;
}

function makeProductId(card, name) {
    if (card.dataset.productId) {
        return card.dataset.productId;
    }

    const slug = name.toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    card.dataset.productId = "homepage-" + (slug || "product");
    return card.dataset.productId;
}

addButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
        const card = button.closest(".product-card");
        if (!card) return;

        const name = card.querySelector(".product-info h3, h3")
            ?.textContent.trim() || "CineMart Product";

        const category = card.querySelector(".product-category")
            ?.textContent.trim() || "Equipment";

        const image = card.querySelector("img")?.getAttribute("src") || "";

        const product = {
            id: makeProductId(card, name) || `homepage-product-${index}`,
            name,
            category,
            price: readPrice(card),
            image
        };

        if (!addProductToCart(product)) return;

        button.textContent = "Added ✓";

        setTimeout(() => {
            if (button.isConnected) {
                button.textContent = "Add to Cart";
            }
        }, 1200);
    });
});

// ======================================
// HOMEPAGE SEARCH
// ======================================

if (searchButton) {
    searchButton.addEventListener("click", function () {
        const term = prompt(
            "What equipment are you looking for?\nExample: camera, lens, accessories"
        );

        if (term === null) return;

        const value = term.trim().toLowerCase();

        if (!value) {
            alert("Please enter a product or category.");
            return;
        }

        let matches = 0;

        productCards.forEach(card => {
            const match = card.textContent.toLowerCase().includes(value);
            card.style.display = match ? "" : "none";
            if (match) matches++;
        });

        document.getElementById("shop")?.scrollIntoView({
            behavior: "smooth"
        });

        if (!matches) {
            alert("No matching products found. Try camera, lenses, or accessories.");
        }
    });
}

document.querySelectorAll('a[href="#shop"]').forEach(link => {
    link.addEventListener("click", function () {
        productCards.forEach(card => {
            card.style.display = "";
        });
    });
});

// ======================================
// WISHLIST
// ======================================

wishlistButtons.forEach(button => {
    button.setAttribute("aria-pressed", "false");

    button.addEventListener("click", function () {
        const saved = button.getAttribute("aria-pressed") === "true";
        const next = !saved;

        button.setAttribute("aria-pressed", String(next));
        button.textContent = next ? "♥" : "♡";
        button.style.color = next ? "#c05b8b" : "";

        const name = button.closest(".product-card")
            ?.querySelector("h3")?.textContent.trim() || "Product";

        alert(next
            ? name + " added to your demo wishlist."
            : name + " removed from your demo wishlist."
        );
    });
});

// ======================================
// GIRLCINEMART COLOUR OPTIONS
// ======================================

colourOptions.forEach(option => {
    const colourName = Array.from(option.classList)
        .find(name => name.startsWith("colour-") && name !== "colour-options")
        ?.replace("colour-", "");

    if (!colourName) return;

    option.setAttribute("role", "button");
    option.setAttribute("tabindex", "0");
    option.setAttribute("aria-label", "Explore " + colourName + " equipment");

    function selectColour() {
        alert(
            "You selected " + colourName +
            " equipment!\n\nThis collection is currently a preview."
        );

        document.getElementById("colour-products")?.scrollIntoView({
            behavior: "smooth"
        });
    }

    option.addEventListener("click", selectColour);

    option.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            selectColour();
        }
    });
});

colourCards.forEach(card => {
    card.addEventListener("click", function (event) {
        event.preventDefault();

        const name = card.querySelector("h3")?.textContent.trim()
            || "Colour collection";

        alert(name + "\n\nThis collection is currently a preview.");
    });
});

// ======================================
// FIREBASE CONNECTION TEST
// ======================================

console.log("CineMart Firebase initialized.");
console.log("Authentication:", auth);
console.log("Firestore:", db);

async function testProducts() {
    try {
        const snapshot = await getDocs(collection(db, "products"));
        console.log("Firestore product count:", snapshot.size);
    } catch (error) {
        console.error("Error connecting to Firestore products:", error);
    }
}

testProducts();

window.addEventListener("cinemart-cart-updated", updateCartCount);
window.addEventListener("storage", event => {
    if (event.key === CART_KEY) updateCartCount();
});

updateCartCount();