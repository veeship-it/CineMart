"use strict";

import { initAuthWatcher } from "./auth.js";

const CART_KEY = "cinemart-cart";

export function updateSharedCartCount() {
    let cart = [];

    try {
        cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
        if (!Array.isArray(cart)) cart = [];
    } catch (error) {
        console.error("Could not read cart count:", error);
    }

    const count = cart.reduce(
        (total, item) => total + (Number(item.quantity) || 0),
        0
    );

    document.querySelectorAll(".cart-link span, #cart-count").forEach(element => {
        element.textContent = count;
    });
}

function initSiteUtils() {
    const yearElement = document.getElementById("current-year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    updateSharedCartCount();
    initAuthWatcher();

    const menuToggle = document.getElementById("menu-toggle");
    const navbar = document.getElementById("navbar");
    const mainHeader = document.getElementById("main-header");

    if (mainHeader) {
        window.addEventListener("scroll", () => {
            mainHeader.classList.toggle("scrolled", window.scrollY > 40);
        }, { passive: true });
    }

    if (menuToggle && navbar) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navbar.classList.toggle("show");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        navbar.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navbar.classList.remove("show");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰";
            });
        });

        // Close menu when tapping outside
        document.addEventListener("click", (event) => {
            if (navbar.classList.contains("show") && !navbar.contains(event.target) && !menuToggle.contains(event.target)) {
                navbar.classList.remove("show");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰";
            }
        });

        // Reset menu on resize to desktop
        window.addEventListener("resize", () => {
            if (window.innerWidth >= 1024 && navbar.classList.contains("show")) {
                navbar.classList.remove("show");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰";
            }
        }, { passive: true });
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSiteUtils);
} else {
    initSiteUtils();
}

window.addEventListener("cinemart-cart-updated", updateSharedCartCount);
window.addEventListener("storage", event => {
    if (event.key === CART_KEY) updateSharedCartCount();
});
