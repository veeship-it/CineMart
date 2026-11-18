"use strict";

import { auth, db } from "./firebase-config.js";
import {
    doc,
    getDoc,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// =====================================================
// CINEMART OFFICIAL PRODUCT CATALOG
// Handpicked cinema gear with high-res photography
// =====================================================

export const PRODUCTS_CATALOG = [
    {
        id: "cinemart-alpha-fx",
        slug: "sony-fx3-cinema-camera",
        name: "Sony FX3 Full-Frame Cinema Camera",
        category: "CAMERAS",
        badge: "BESTSELLER",
        price: 3850000,
        rating: 4.9,
        reviewsCount: 42,
        stock: 6,
        image: "./images/cam1.png.jpg",
        images: [
            "./images/cam1.png.jpg",
            "./images/cam2.png.jpg",
            "./images/camera.png.jpg"
        ],
        shortDescription: "Compact full-frame cinema camera featuring 4K 120p, 15+ stops dynamic range, S-Cinetone, and active cooling for non-stop cinema shooting.",
        description: "Engineered for solo filmmakers and production crews alike, the Sony FX3 combines the cinematic expression of high-end cinema lines with the mobility of handheld shooting. Featuring an advanced back-illuminated 12.1MP full-frame Exmor R CMOS sensor, ultra-fast BIONZ XR processing, and breathtaking low-light sensitivity up to ISO 409,600. Includes dual card slots, XLR audio top handle unit, and 5-axis in-body image stabilization.",
        highlights: [
            "12.1MP Full-Frame Back-Illuminated Exmor R CMOS Sensor",
            "UHD 4K up to 120p / 10-Bit 4:2:2 All-Intra internal recording",
            "S-Cinetone, S-Log3, and HLG cinematic color profiles",
            "Active internal cooling fan for uninterrupted filming sessions",
            "Detachable top handle with dual XLR/TRS professional audio inputs"
        ],
        specifications: {
            "Sensor": "35mm Full-Frame (12.1 MP effective)",
            "Lens Mount": "Sony E-Mount",
            "ISO Range": "80 - 102,400 (Expandable to 409,600)",
            "Video Resolution": "4K UHD (3840 x 2160) up to 120 fps",
            "Color Science": "S-Cinetone, S-Log3, Cine EI",
            "Audio Inputs": "2x XLR/TRS combo via handle, 1x 3.5mm mic",
            "Battery Type": "NP-FZ100 Rechargeable Li-Ion",
            "Weight": "715g (Body only with battery & card)"
        }
    },
    {
        id: "cinemart-creator-cam",
        slug: "digital-creator-camera",
        name: "CineMart Digital Creator 4K Camera",
        category: "CAMERAS",
        badge: "FEATURED",
        price: 1450000,
        rating: 4.8,
        reviewsCount: 56,
        stock: 11,
        image: "./images/cam3.png.jpg",
        images: [
            "./images/cam3.png.jpg",
            "./images/cam2.png.jpg",
            "./images/cam4.png.jpg"
        ],
        shortDescription: "An all-in-one content creation and filmmaking powerhouse with crisp 4K recording, flip LCD, and lightning-fast subject autofocus.",
        description: "Designed specifically for modern visual storytellers, documentary shooters, and content creators. Delivers razor-sharp 4K video, rich color fidelity right out of camera, and intuitive touchscreen control. Equipped with a high-accuracy hybrid autofocus system with real-time eye tracking for both humans and animals.",
        highlights: [
            "Ultra-crisp 4K 60p recording with no crop factor",
            "Fully articulating vari-angle touchscreen LCD display",
            "Real-time Eye AF & subject tracking algorithms",
            "Built-in directional 3-capsule microphone with windscreen",
            "USB-C direct streaming output for live multi-camera production"
        ],
        specifications: {
            "Sensor": "APS-C Format High-Sensitivity Sensor",
            "Lens Mount": "Universal Cine E-Mount",
            "ISO Range": "100 - 32,000",
            "Stabilization": "Active SteadyShot Electronic + Optical",
            "Display": "3.0-inch 921k-Dot Touchscreen",
            "Connectivity": "Wi-Fi, Bluetooth 5.2, USB-C 3.2, Micro-HDMI",
            "Weight": "503g"
        }
    },
    {
        id: "cinemart-studio-rig",
        slug: "red-dragon-6k-studio-rig",
        name: "RED Dragon 6K Studio Cinema Rig",
        category: "CAMERAS",
        badge: "CINEMA PRO",
        price: 6800000,
        rating: 5.0,
        reviewsCount: 19,
        stock: 3,
        image: "./images/cam4.png.jpg",
        images: [
            "./images/cam4.png.jpg",
            "./images/camera.png.jpg",
            "./images/cam9.png.jpg"
        ],
        shortDescription: "Hollywood-caliber 6K Super35 digital cinema camera package outfitted with modular cage, side handle, and SDI monitor.",
        description: "A true industry standard for high-end commercials, feature films, and narrative cinema. Unrivaled dynamic range exceeding 16.5 stops, capturing every subtle highlight roll-off and shadow detail. Fully accessorized with aircraft-grade aluminum cage, top NATO rail, ARRI rosette handgrips, and V-mount battery distribution plate.",
        highlights: [
            "6K S35 sensor with proprietary REDCODE RAW codec",
            "16.5+ stops of cinematic dynamic range",
            "Modular camera cage with multiple 1/4\"-20 and 3/8\"-16 threads",
            "Integrated 12G-SDI and wireless video transmission support",
            "Dual V-Mount power distribution hot-swap plate"
        ],
        specifications: {
            "Sensor Type": "Super35 CMOS (6144 x 3160)",
            "Max Resolution": "6K at up to 75 fps, 4K at up to 120 fps",
            "Recording Format": "REDCODE RAW, Apple ProRes 422 HQ",
            "Dynamic Range": "16.5+ Stops",
            "Lens Mount": "Interchangeable PL / EF Mount",
            "Dimensions": "101.6 mm x 101.6 mm x 101.6 mm (base)",
            "Weight": "1.8 kg (rigged setup)"
        }
    },
    {
        id: "cinemart-prime-lens",
        slug: "master-cine-50mm-lens",
        name: "Master Cine 50mm T1.3 Prime Lens",
        category: "LENSES",
        badge: "NEW",
        price: 980000,
        rating: 4.9,
        reviewsCount: 28,
        stock: 8,
        image: "./images/cam2.png.jpg",
        images: [
            "./images/cam2.png.jpg",
            "./images/cam1.png.jpg",
            "./images/cam8.png.jpg"
        ],
        shortDescription: "Ultra-fast T1.3 cinema prime delivering creamy bokeh, zero focus breathing, and vintage cinema flare characteristics.",
        description: "Crafted for directors of photography who demand expressive aesthetic depth. Features 14 aperture blades for circular out-of-focus highlights, 270-degree focus rotation for millimeter precision, and standard 0.8 MOD focus and iris gearing.",
        highlights: [
            "Ultra-fast T1.3 maximum aperture for low-light mastery",
            "Zero noticeable focus breathing during rack focuses",
            "270-degree smooth manual focus throw with dual witness marks",
            "Covers full-frame and large format sensors",
            "Universal 95mm front diameter for matte box compatibility"
        ],
        specifications: {
            "Focal Length": "50mm",
            "Aperture Range": "T1.3 - T22",
            "Lens Mount": "PL / EF Interchangeable",
            "Front Outer Diameter": "95 mm",
            "Aperture Blades": "14 rounded blades",
            "Focus Rotation": "270 degrees",
            "Weight": "1,120 g"
        }
    },
    {
        id: "cinemart-street-compact",
        slug: "lumix-s5-iix-cinema-body",
        name: "Lumix S5 IIX Blackout Cinema Body",
        category: "CAMERAS",
        badge: "POPULAR",
        price: 2450000,
        rating: 4.7,
        reviewsCount: 34,
        stock: 9,
        image: "./images/cam5.png.jpg",
        images: [
            "./images/cam5.png.jpg",
            "./images/cam7.png.jpg",
            "./images/cam3.png.jpg"
        ],
        shortDescription: "Sleek all-black full-frame hybrid camera with 6K ProRes RAW recording, Phase Hybrid AF, and unlimited recording.",
        description: "Engineered for run-and-gun filmmakers, run-and-shoot docu-filmmakers, and cinematic music video productions. Offers internal ProRes 422 HQ recording directly to external SSD via USB, combined with 6.5-stop Dual I.S. stabilization.",
        highlights: [
            "24.2MP Full-Frame sensor with Dual Native ISO",
            "Phase Hybrid AF for ultra-reliable subject tracking",
            "Direct recording to external USB-SSD drives",
            "Unlimited recording time in all 4K & 6K formats",
            "Rugged magnesium alloy weather-sealed body"
        ],
        specifications: {
            "Sensor": "24.2 MP Full-Frame CMOS",
            "Lens Mount": "L-Mount",
            "Internal Recording": "6K 30p 10-Bit, C4K/4K 60p 10-Bit",
            "Stabilization": "5-axis In-Body (up to 6.5 stops Dual I.S.)",
            "Card Slots": "Dual SD UHS-II + USB-SSD Recording",
            "Weight": "740g"
        }
    },
    {
        id: "cinemart-broadcast-8k",
        slug: "ursa-mini-pro-12k",
        name: "URSA Mini Pro 12K Digital Cinema",
        category: "CAMERAS",
        badge: "FLAGSHIP",
        price: 7500000,
        rating: 4.9,
        reviewsCount: 15,
        stock: 2,
        image: "./images/cam6.png.jpg",
        images: [
            "./images/cam6.png.jpg",
            "./images/camera.png.jpg",
            "./images/cam4.png.jpg"
        ],
        shortDescription: "Revolutionary 12K Super35 sensor with Blackmagic RAW, 14 stops dynamic range, and built-in optical ND filters.",
        description: "A revolution in digital film with a 12,288 x 6480 12K Super35 sensor that lets you shoot 12K at 60 fps, 8K at 120 fps, and 4K at up to 240 fps. Features built-in motorized ND filters (Clear, 2, 4, 6 stops), interchangeable lens mount, and dual CFast / UHS-II SD recorders.",
        highlights: [
            "12,288 x 6,480 12K Super 35 Sensor",
            "14 stops of dynamic range with Generation 5 color science",
            "Internal motorized ND filters (2, 4, 6 stops)",
            "Shoots 80 megapixels per frame in Blackmagic RAW",
            "Includes DaVinci Resolve Studio activation license"
        ],
        specifications: {
            "Sensor Resolution": "12,288 x 6,480",
            "Dynamic Range": "14 Stops",
            "Built-in ND Filters": "Clear, 2-stop, 4-stop, 6-stop IR ND",
            "Audio": "2x XLR analog switchable mic/line with phantom power",
            "Outputs": "12G-SDI, 3G-SDI monitor out, headphone",
            "Weight": "2.55 kg"
        }
    },
    {
        id: "cinemart-vintage-classic",
        slug: "fujifilm-x-h2s-cine",
        name: "Fujifilm X-H2S High-Speed Cine Camera",
        category: "CAMERAS",
        badge: "NEW",
        price: 2750000,
        rating: 4.8,
        reviewsCount: 22,
        stock: 5,
        image: "./images/cam7.png.jpg",
        images: [
            "./images/cam7.png.jpg",
            "./images/cam5.png.jpg",
            "./images/cam1.png.jpg"
        ],
        shortDescription: "Stacked-layer X-Trans 5 HS sensor capable of 4K 120p, Apple ProRes internal recording, and 7 stops IBIS.",
        description: "Delivering legendary Fujifilm film simulation color science alongside professional cinema codecs. Stacked back-illuminated sensor architecture enables near-zero rolling shutter distortion and blazing 40 fps blackout-free burst.",
        highlights: [
            "26.1MP Stacked X-Trans CMOS 5 HS Sensor",
            "Internal Apple ProRes 422 HQ, LT, and Proxy",
            "F-Log2 color profile offering 14+ stops of range",
            "Full size HDMI Type-A connector and CFexpress Type B slot",
            "Film simulation modes including Classic Chrome and ETERNA"
        ],
        specifications: {
            "Sensor": "26.16MP APS-C X-Trans CMOS 5 HS",
            "Lens Mount": "Fujifilm X Mount",
            "Max Video": "6.2K 30p, 4K 120p, FHD 240p",
            "Stabilization": "7.0 Stops 5-axis IBIS",
            "Weight": "660g"
        }
    },
    {
        id: "cinemart-cine-telephoto",
        slug: "apex-cine-85mm-prime",
        name: "Apex Cine 85mm T1.5 Portrait Prime",
        category: "LENSES",
        badge: "ESSENTIAL",
        price: 1150000,
        rating: 4.9,
        reviewsCount: 41,
        stock: 7,
        image: "./images/cam8.png.jpg",
        images: [
            "./images/cam8.png.jpg",
            "./images/cam2.png.jpg",
            "./images/cam1.png.jpg"
        ],
        shortDescription: "Flattering 85mm telephoto cinema prime with exquisite skin tone rendering, 16-blade iris, and clinical sharpness.",
        description: "The premier portrait and close-up lens for narrative cinema and television. Provides breathtaking subject isolation with creamy background blur while retaining crisp micro-contrast across the entire frame.",
        highlights: [
            "85mm focal length ideal for cinema dialogue and close-ups",
            "Fast T1.5 aperture with 16 circular aperture blades",
            "Low chromatic aberration with fluorite extra-low dispersion glass",
            "Geared 0.8 MOD focus and aperture rings for follow-focus motors",
            "Full-frame 46.3mm image circle coverage"
        ],
        specifications: {
            "Focal Length": "85mm",
            "Aperture": "T1.5 - T22",
            "Image Circle": "46.3 mm (Full Frame & VistaVision)",
            "Close Focus": "0.85 m (2 ft 9 in)",
            "Front Diameter": "95 mm",
            "Weight": "1,240 g"
        }
    },
    {
        id: "cinemart-rig-stabilizer",
        slug: "carbon-fiber-gimbal-rig",
        name: "Pro Carbon Fiber Gimbal & Matte Box Rig",
        category: "ACCESSORIES",
        badge: "ACCESSORY",
        price: 850000,
        rating: 4.8,
        reviewsCount: 63,
        stock: 14,
        image: "./images/cam9.png.jpg",
        images: [
            "./images/cam9.png.jpg",
            "./images/cam4.png.jpg",
            "./images/cam2.png.jpg"
        ],
        shortDescription: "Complete stabilizing system with carbon fiber dual-handle support, wireless follow-focus ring, and carbon matte box.",
        description: "Transform shaky handheld footage into buttery cinema movements. Built with lightweight aerospace-grade carbon fiber arms, quick-release baseplate compatible with Manfrotto and Arca-Swiss, and adjustable flags to eliminate stray lens flare.",
        highlights: [
            "Ultra-light rigid carbon fiber dual grip architecture",
            "Swing-away carbon fiber matte box with dual 4x5.65 filter trays",
            "Wireless motorized follow-focus integration point",
            "Quick release V-lock battery bracket and monitor arm",
            "Max payload support up to 6.5 kg"
        ],
        specifications: {
            "Material": "Carbon Fiber + CNC Anodized Aluminum",
            "Filter Size": "4x5.65 inch standard cinema filters",
            "Rod Standard": "15mm LWS with 60mm spacing",
            "Max Payload": "6.5 kg",
            "Total Weight": "1,480 g"
        }
    },
    {
        id: "cinemart-girl-edition",
        slug: "girlcinemart-rose-quartz-camera",
        name: "GirlCineMart Rose Quartz Creator Camera",
        category: "GIRLCINEMART",
        badge: "GIRLCINEMART ♡",
        price: 1650000,
        rating: 5.0,
        reviewsCount: 89,
        stock: 8,
        image: "./images/girl.cam.png.jpg",
        images: [
            "./images/girl.cam.png.jpg",
            "./images/camera.png.jpg",
            "./images/cam3.png.jpg"
        ],
        shortDescription: "Exclusive GirlCineMart edition finished in premium pastel blush with golden accents, 4K selfie screen, and studio-grade glow filters.",
        description: "Who says professional cinema gear has to be boring black? The GirlCineMart Rose Quartz edition pairs high-end visual performance with standout aesthetic elegance. Features custom film glow profiles, skin tone beautification algorithms, built-in soft ring lighting, and instant wireless smartphone transfer.",
        highlights: [
            "Exclusive custom Rose Quartz & metallic champagne finish",
            "Built-in soft bi-color glow ring around lens for instant beauty lighting",
            "Cinematic pastel color science presets designed for creative reels",
            "Ultra-compact form factor that fits into designer bags",
            "Includes matching pastel woven wrist strap and faux-leather case"
        ],
        specifications: {
            "Colorway": "Rose Quartz & Champagne Gold",
            "Sensor": "High-Speed 4K HDR CMOS Sensor",
            "Video Output": "4K 60p HDR, 1080p 120p slow motion",
            "Lens": "24-70mm equivalent f/1.8-2.8 bright zoom lens",
            "Screen": "180-degree flip selfie touchscreen",
            "Wireless": "Instant sync with iPhone and Android via CineApp",
            "Weight": "425g"
        }
    }
];

// Compatibility aliases for URLs and homepage cards
const PRODUCT_ALIASES = {
    "cam-1": "cinemart-alpha-fx",
    "cam1": "cinemart-alpha-fx",
    "cam-2": "cinemart-prime-lens",
    "cam2": "cinemart-prime-lens",
    "cam-3": "cinemart-creator-cam",
    "cam3": "cinemart-creator-cam",
    "cam-4": "cinemart-studio-rig",
    "cam4": "cinemart-studio-rig",
    "cam-5": "cinemart-street-compact",
    "cam5": "cinemart-street-compact",
    "cam-6": "cinemart-broadcast-8k",
    "cam6": "cinemart-broadcast-8k",
    "cam-7": "cinemart-vintage-classic",
    "cam7": "cinemart-vintage-classic",
    "cam-8": "cinemart-cine-telephoto",
    "cam8": "cinemart-cine-telephoto",
    "cam-9": "cinemart-rig-stabilizer",
    "cam9": "cinemart-rig-stabilizer",
    "girl-cam": "cinemart-girl-edition",
    "girlcinemart": "cinemart-girl-edition",
    "homepage-digital-creator-camera": "cinemart-creator-cam",
    "homepage-creative-lens-collection": "cinemart-prime-lens",
    "homepage-creator-essentials": "cinemart-studio-rig"
};

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

const CART_KEY = "cinemart-cart";
const WISHLIST_KEY = "cinemart-wishlist";

export function formatPrice(price) {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0
    }).format(Number(price) || 0);
}

export function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

export function getCart() {
    try {
        const cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
        return Array.isArray(cart) ? cart : [];
    } catch {
        return [];
    }
}

export function saveCart(cart) {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        window.dispatchEvent(new Event("cinemart-cart-updated"));
        updateCartCount();
        return true;
    } catch (e) {
        console.error("Cart save error:", e);
        return false;
    }
}

export function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + (Number(item.quantity) || 0), 0);
    document.querySelectorAll(".cart-link span, #cart-count").forEach(el => {
        el.textContent = count;
    });
}

export function getWishlist() {
    try {
        const list = JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]");
        return Array.isArray(list) ? list : [];
    } catch {
        return [];
    }
}

export function toggleWishlist(productId) {
    let list = getWishlist();
    const index = list.indexOf(productId);
    const added = index === -1;
    if (added) {
        list.push(productId);
    } else {
        list.splice(index, 1);
    }
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
    return added;
}

export function showToast(message, linkText = "View Cart →", linkUrl = "cart.html") {
    const toast = document.getElementById("toast-notification");
    const toastText = document.getElementById("toast-text");
    if (!toast) return;

    if (toastText) toastText.textContent = message;
    const btn = toast.querySelector(".cinemart-toast-btn");
    if (btn) {
        btn.textContent = linkText;
        btn.href = linkUrl;
    }

    toast.classList.add("show");
    clearTimeout(window.__cinemartToastTimer);
    window.__cinemartToastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3800);
}

// Find a product in the catalog or aliases
export function findCatalogProduct(idOrSlug) {
    if (!idOrSlug) return null;
    const term = String(idOrSlug).toLowerCase().trim();

    // Check alias map
    const mappedId = PRODUCT_ALIASES[term];
    if (mappedId) {
        const found = PRODUCTS_CATALOG.find(p => p.id === mappedId);
        if (found) return found;
    }

    // Direct match by ID, slug, or normalized name
    return PRODUCTS_CATALOG.find(p =>
        p.id.toLowerCase() === term ||
        p.slug?.toLowerCase() === term ||
        p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").includes(term)
    ) || null;
}

// =====================================================
// SHOP CATALOG CONTROLLER
// =====================================================

let activeCategory = "ALL";
let activeSearchQuery = "";
let activeSort = "featured";

function initShopCatalog() {
    const searchInput = document.getElementById("shop-search-input");
    const searchClear = document.getElementById("shop-search-clear");
    const sortSelect = document.getElementById("shop-sort");
    const categoryPills = document.querySelectorAll("#category-pills .category-pill");
    const resetBtn = document.getElementById("btn-reset-filters");
    const headerSearchBtn = document.getElementById("header-search-btn");

    // Read URL params if any
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get("category");
    const searchParam = urlParams.get("search");

    if (categoryParam) {
        activeCategory = categoryParam.toUpperCase();
    }
    if (searchParam) {
        activeSearchQuery = searchParam;
        if (searchInput) searchInput.value = searchParam;
    }

    // Category pills click
    categoryPills.forEach(pill => {
        const cat = pill.dataset.category;
        if (cat === activeCategory) {
            categoryPills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
        }

        pill.addEventListener("click", () => {
            categoryPills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            activeCategory = pill.dataset.category || "ALL";
            renderShopCatalog();
        });
    });

    // Search input
    if (searchInput) {
        searchInput.addEventListener("input", () => {
            activeSearchQuery = searchInput.value.trim().toLowerCase();
            if (searchClear) searchClear.hidden = !activeSearchQuery;
            renderShopCatalog();
        });

        if (searchClear) {
            searchClear.addEventListener("click", () => {
                searchInput.value = "";
                activeSearchQuery = "";
                searchClear.hidden = true;
                searchInput.focus();
                renderShopCatalog();
            });
        }
    }

    // Sort select
    if (sortSelect) {
        sortSelect.addEventListener("change", () => {
            activeSort = sortSelect.value;
            renderShopCatalog();
        });
    }

    // Reset filters
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            activeCategory = "ALL";
            activeSearchQuery = "";
            activeSort = "featured";
            if (searchInput) {
                searchInput.value = "";
                if (searchClear) searchClear.hidden = true;
            }
            if (sortSelect) sortSelect.value = "featured";
            categoryPills.forEach(p => {
                p.classList.toggle("active", p.dataset.category === "ALL");
            });
            renderShopCatalog();
        });
    }

    // Header search shortcut
    if (headerSearchBtn) {
        headerSearchBtn.addEventListener("click", () => {
            if (document.getElementById("shop-catalog-view")?.hidden) {
                openCatalogView();
            }
            searchInput?.focus();
            searchInput?.scrollIntoView({ behavior: "smooth", block: "center" });
        });
    }

    renderShopCatalog();
}

function renderShopCatalog() {
    const grid = document.getElementById("shop-grid");
    const emptyState = document.getElementById("shop-empty-state");
    const countEl = document.getElementById("results-count");
    if (!grid) return;

    let items = [...PRODUCTS_CATALOG];

    // Filter by Category
    if (activeCategory && activeCategory !== "ALL") {
        items = items.filter(p => p.category.toUpperCase() === activeCategory);
    }

    // Filter by Search Query
    if (activeSearchQuery) {
        items = items.filter(p =>
            p.name.toLowerCase().includes(activeSearchQuery) ||
            p.category.toLowerCase().includes(activeSearchQuery) ||
            p.shortDescription?.toLowerCase().includes(activeSearchQuery) ||
            p.description?.toLowerCase().includes(activeSearchQuery)
        );
    }

    // Sort
    if (activeSort === "price-asc") {
        items.sort((a, b) => a.price - b.price);
    } else if (activeSort === "price-desc") {
        items.sort((a, b) => b.price - a.price);
    } else if (activeSort === "name-asc") {
        items.sort((a, b) => a.name.localeCompare(b.name));
    } else if (activeSort === "rating-desc") {
        items.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    // Update count indicator
    if (countEl) {
        countEl.textContent = `Showing ${items.length} ${items.length === 1 ? "product" : "products"}`;
    }

    // Empty state handling
    if (items.length === 0) {
        grid.innerHTML = "";
        if (emptyState) emptyState.hidden = false;
        return;
    }

    if (emptyState) emptyState.hidden = true;

    const wishlist = getWishlist();

    grid.innerHTML = items.map(product => {
        const isWishlisted = wishlist.includes(product.id);
        const badgeClass = product.badge === "NEW" ? "badge-new"
            : product.category === "GIRLCINEMART" ? "badge-girl"
            : product.badge === "CINEMA PRO" || product.badge === "FLAGSHIP" ? "badge-pro"
            : "";

        return `
            <article class="shop-card" data-id="${escapeHTML(product.id)}">
                <div class="shop-card-media" data-action="view-product" data-id="${escapeHTML(product.id)}">
                    ${product.badge ? `<span class="shop-card-badge ${badgeClass}">${escapeHTML(product.badge)}</span>` : ""}
                    <button type="button" class="shop-card-wishlist ${isWishlisted ? "active" : ""}"
                        data-action="wishlist"
                        data-id="${escapeHTML(product.id)}"
                        aria-label="Add ${escapeHTML(product.name)} to wishlist">
                        ${isWishlisted ? "♥" : "♡"}
                    </button>
                    <img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}" loading="lazy" onerror="this.src='./images/cam1.png.jpg'">
                </div>

                <div class="shop-card-content">
                    <div class="shop-card-meta">
                        <span class="shop-card-category">${escapeHTML(product.category)}</span>
                        <div class="shop-card-rating">
                            <span class="star-icon">★</span>
                            <span>${product.rating ? product.rating.toFixed(1) : "5.0"}</span>
                        </div>
                    </div>

                    <h3 class="shop-card-title">
                        <a href="product.html?id=${encodeURIComponent(product.id)}" data-action="view-product" data-id="${escapeHTML(product.id)}">
                            ${escapeHTML(product.name)}
                        </a>
                    </h3>

                    <p class="shop-card-desc">${escapeHTML(product.shortDescription || product.description)}</p>

                    <div class="shop-card-footer">
                        <div class="shop-card-price-wrap">
                            <span class="shop-card-price-label">Price</span>
                            <span class="shop-card-price">${formatPrice(product.price)}</span>
                        </div>

                        <div class="shop-card-buttons">
                            <button type="button" class="btn-card-view" data-action="view-product" data-id="${escapeHTML(product.id)}">
                                Details
                            </button>
                            <button type="button" class="btn-card-add" data-action="quick-add" data-id="${escapeHTML(product.id)}">
                                + Cart
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        `;
    }).join("");

    // Wire up events on the cards
    grid.querySelectorAll("[data-action='view-product']").forEach(el => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            const id = el.dataset.id;
            openProductView(id, true);
        });
    });

    grid.querySelectorAll("[data-action='quick-add']").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = btn.dataset.id;
            const product = findCatalogProduct(id);
            if (!product) return;

            const cart = getCart();
            const existing = cart.find(item => item.id === product.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    category: product.category,
                    price: product.price,
                    image: product.image,
                    quantity: 1
                });
            }

            saveCart(cart);
            showToast(`${product.name} added to cart!`);

            const originalText = btn.textContent;
            btn.textContent = "Added ✓";
            btn.style.background = "#A8D8C5";
            setTimeout(() => {
                if (btn.isConnected) {
                    btn.textContent = originalText;
                    btn.style.background = "";
                }
            }, 1200);
        });
    });

    grid.querySelectorAll("[data-action='wishlist']").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = btn.dataset.id;
            const added = toggleWishlist(id);
            btn.classList.toggle("active", added);
            btn.textContent = added ? "♥" : "♡";
            const product = findCatalogProduct(id);
            showToast(
                added ? `${product?.name || "Product"} saved to wishlist!` : "Removed from wishlist",
                "View Saved",
                "#"
            );
        });
    });
}

// =====================================================
// PRODUCT DETAILS CONTROLLER
// =====================================================

let currentProduct = null;

function renderProductDetails(product) {
    currentProduct = product;

    // Elements
    const nameEl = document.getElementById("product-name");
    const categoryEl = document.getElementById("product-category");
    const priceEl = document.getElementById("product-price");
    const descEl = document.getElementById("product-description");
    const badgeEl = document.getElementById("product-badge");
    const stockEl = document.getElementById("product-stock");
    const scoreEl = document.getElementById("product-rating-score");
    const reviewsEl = document.getElementById("product-reviews-count");
    const quantityInput = document.getElementById("product-quantity");
    const breadcrumbCat = document.getElementById("breadcrumb-category");
    const breadcrumbName = document.getElementById("breadcrumb-product-name");
    const highlightsBox = document.getElementById("product-highlights-box");
    const highlightsList = document.getElementById("product-highlights-list");

    // Populate data
    if (nameEl) nameEl.textContent = product.name;
    if (categoryEl) categoryEl.textContent = product.category;
    if (priceEl) priceEl.textContent = formatPrice(product.price);
    if (descEl) descEl.textContent = product.description || product.shortDescription;
    if (breadcrumbCat) breadcrumbCat.textContent = product.category;
    if (breadcrumbName) breadcrumbName.textContent = product.name;

    if (badgeEl) {
        if (product.badge) {
            badgeEl.textContent = product.badge;
            badgeEl.hidden = false;
        } else {
            badgeEl.hidden = true;
        }
    }

    if (scoreEl) scoreEl.textContent = product.rating ? product.rating.toFixed(1) : "5.0";
    if (reviewsEl) reviewsEl.textContent = `(${product.reviewsCount || 35} creator reviews)`;

    const stock = Number(product.stock);
    if (stockEl) {
        if (Number.isFinite(stock) && stock > 0) {
            stockEl.textContent = `In Stock (${stock} units left at CineMart HQ)`;
        } else {
            stockEl.textContent = "In Stock & Ready for Same-Day Dispatch";
        }
    }

    if (quantityInput) {
        quantityInput.value = 1;
        quantityInput.max = stock > 0 ? stock : 99;
    }

    // Highlights
    if (highlightsBox && highlightsList) {
        const highlights = Array.isArray(product.highlights) && product.highlights.length > 0
            ? product.highlights
            : [
                "Industry-standard creative equipment build quality",
                "Includes official CineMart 1-Year Comprehensive Warranty",
                "Insured nationwide door-to-door delivery across Nigeria",
                "Tested and verified by CineMart cinema engineers"
            ];

        highlightsList.innerHTML = highlights.map(item => `
            <li><span class="check-icon">✓</span> <span>${escapeHTML(item)}</span></li>
        `).join("");
        highlightsBox.hidden = false;
    }

    // Gallery images
    const images = Array.isArray(product.images) && product.images.length > 0
        ? product.images
        : [product.image].filter(Boolean);

    renderGallery(images, product.name);

    // Specifications
    renderSpecifications(product.specifications);

    // Related gear
    renderRelatedProducts(product);

    // Update document title
    document.title = `${product.name} | CineMart Store`;
}

function renderGallery(images, productName) {
    const mainImg = document.getElementById("main-product-image");
    const thumbContainer = document.getElementById("product-thumbnails");
    if (!mainImg || !thumbContainer) return;

    if (images.length === 0) {
        images = ["./images/camera.png.jpg"];
    }

    mainImg.src = images[0];
    mainImg.alt = productName;

    thumbContainer.innerHTML = "";
    images.forEach((imgSrc, index) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `product-thumbnail ${index === 0 ? "active" : ""}`;
        btn.setAttribute("aria-label", `View angle ${index + 1}`);

        const img = document.createElement("img");
        img.src = imgSrc;
        img.alt = `${productName} view ${index + 1}`;
        btn.appendChild(img);

        btn.addEventListener("click", () => {
            mainImg.src = imgSrc;
            thumbContainer.querySelectorAll(".product-thumbnail").forEach((t, i) => {
                t.classList.toggle("active", i === index);
            });
        });

        thumbContainer.appendChild(btn);
    });
}

function renderSpecifications(specifications) {
    const section = document.getElementById("specifications-section");
    const container = document.getElementById("product-specifications");
    if (!section || !container) return;

    if (!specifications || typeof specifications !== "object") {
        section.hidden = true;
        return;
    }

    const entries = Array.isArray(specifications)
        ? specifications.map(item => [item.name || item.label || "Spec", item.value || ""])
        : Object.entries(specifications);

    if (entries.length === 0) {
        section.hidden = true;
        return;
    }

    container.innerHTML = entries.map(([key, val]) => `
        <div class="spec-cell">
            <span class="spec-label">${escapeHTML(key)}</span>
            <strong class="spec-value">${escapeHTML(val)}</strong>
        </div>
    `).join("");

    section.hidden = false;
}

function renderRelatedProducts(current) {
    const section = document.getElementById("related-products-section");
    const grid = document.getElementById("related-products-grid");
    if (!section || !grid) return;

    // Pick 3 related products (same category first, excluding current)
    let related = PRODUCTS_CATALOG.filter(p => p.id !== current.id && p.category === current.category);
    if (related.length < 3) {
        const others = PRODUCTS_CATALOG.filter(p => p.id !== current.id && p.category !== current.category);
        related = [...related, ...others].slice(0, 3);
    } else {
        related = related.slice(0, 3);
    }

    if (related.length === 0) {
        section.hidden = true;
        return;
    }

    grid.innerHTML = related.map(prod => `
        <article class="shop-card">
            <div class="shop-card-media" data-action="related-view" data-id="${escapeHTML(prod.id)}">
                ${prod.badge ? `<span class="shop-card-badge">${escapeHTML(prod.badge)}</span>` : ""}
                <img src="${escapeHTML(prod.image)}" alt="${escapeHTML(prod.name)}" loading="lazy">
            </div>
            <div class="shop-card-content">
                <div class="shop-card-meta">
                    <span class="shop-card-category">${escapeHTML(prod.category)}</span>
                    <div class="shop-card-rating">★ ${prod.rating ? prod.rating.toFixed(1) : "5.0"}</div>
                </div>
                <h3 class="shop-card-title">
                    <a href="product.html?id=${encodeURIComponent(prod.id)}" data-action="related-view" data-id="${escapeHTML(prod.id)}">
                        ${escapeHTML(prod.name)}
                    </a>
                </h3>
                <div class="shop-card-footer">
                    <div class="shop-card-price-wrap">
                        <span class="shop-card-price">${formatPrice(prod.price)}</span>
                    </div>
                    <button type="button" class="btn-card-view" data-action="related-view" data-id="${escapeHTML(prod.id)}">
                        View
                    </button>
                </div>
            </div>
        </article>
    `).join("");

    grid.querySelectorAll("[data-action='related-view']").forEach(el => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            const id = el.dataset.id;
            openProductView(id, true);
        });
    });

    section.hidden = false;
}

// Fetch single product from Firestore with catalog fallback
async function fetchProduct(id) {
    // 1. Check local catalog first for instant response
    const catalogItem = findCatalogProduct(id);

    // 2. Try Firestore if online
    try {
        if (db && id) {
            const docRef = doc(db, "products", id);
            const snapshot = await getDoc(docRef);
            if (snapshot.exists()) {
                return {
                    id: snapshot.id,
                    ...snapshot.data()
                };
            }
        }
    } catch (err) {
        console.warn("Firestore lookup failed, relying on built-in catalog:", err.message);
    }

    return catalogItem;
}

// =====================================================
// VIEW SWITCHING (CATALOG vs DETAILS)
// =====================================================

export async function openProductView(productId, pushHistory = true) {
    const catalogView = document.getElementById("shop-catalog-view");
    const detailsView = document.getElementById("product-details-view");
    const loading = document.getElementById("product-loading");
    const errorEl = document.getElementById("product-error");
    const detailsLayout = document.getElementById("product-details");

    if (catalogView) catalogView.hidden = true;
    if (detailsView) detailsView.hidden = false;
    if (loading) loading.hidden = false;
    if (errorEl) errorEl.hidden = true;
    if (detailsLayout) detailsLayout.hidden = true;

    window.scrollTo({ top: 0, behavior: "smooth" });

    if (pushHistory) {
        history.pushState({ view: "product", id: productId }, "", `product.html?id=${encodeURIComponent(productId)}`);
    }

    const product = await fetchProduct(productId);

    if (loading) loading.hidden = true;

    if (!product) {
        if (errorEl) errorEl.hidden = false;
        document.title = "Product Not Found | CineMart";
        return;
    }

    if (detailsLayout) detailsLayout.hidden = false;
    renderProductDetails(product);
}

export function openCatalogView(pushHistory = true) {
    const catalogView = document.getElementById("shop-catalog-view");
    const detailsView = document.getElementById("product-details-view");

    if (detailsView) detailsView.hidden = true;
    if (catalogView) catalogView.hidden = false;

    document.title = "Equipment Shop | CineMart";

    if (pushHistory) {
        history.pushState({ view: "catalog" }, "", "product.html");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
}

// =====================================================
// PURCHASE CONTROLS & EVENT LISTENERS
// =====================================================

function initProductPageEvents() {
    const backBtn = document.getElementById("back-to-shop-btn");
    const errorBackBtn = document.getElementById("btn-error-back");
    const breadcrumbShopLink = document.getElementById("breadcrumb-shop-link");
    const decreaseBtn = document.getElementById("decrease-quantity");
    const increaseBtn = document.getElementById("increase-quantity");
    const quantityInput = document.getElementById("product-quantity");
    const addToCartBtn = document.getElementById("add-to-cart");
    const buyNowBtn = document.getElementById("buy-now");
    const feedback = document.getElementById("cart-feedback");

    // Return to shop actions
    if (backBtn) {
        backBtn.addEventListener("click", (e) => {
            e.preventDefault();
            openCatalogView(true);
        });
    }

    if (errorBackBtn) {
        errorBackBtn.addEventListener("click", (e) => {
            e.preventDefault();
            openCatalogView(true);
        });
    }

    if (breadcrumbShopLink) {
        breadcrumbShopLink.addEventListener("click", (e) => {
            e.preventDefault();
            openCatalogView(true);
        });
    }

    // Quantity controls
    if (decreaseBtn && quantityInput) {
        decreaseBtn.addEventListener("click", () => {
            const current = Math.max(1, (Number(quantityInput.value) || 1) - 1);
            quantityInput.value = current;
        });
    }

    if (increaseBtn && quantityInput) {
        increaseBtn.addEventListener("click", () => {
            const max = Number(quantityInput.max) || 99;
            const current = Math.min(max, (Number(quantityInput.value) || 1) + 1);
            quantityInput.value = current;
        });
    }

    if (quantityInput) {
        quantityInput.addEventListener("change", () => {
            let val = Math.max(1, Number(quantityInput.value) || 1);
            const max = Number(quantityInput.max) || 99;
            if (val > max) val = max;
            quantityInput.value = val;
        });
    }

    // Add to Cart button
    if (addToCartBtn) {
        addToCartBtn.addEventListener("click", () => {
            if (!currentProduct) return;

            const quantity = Math.max(1, Number(quantityInput?.value) || 1);
            const cart = getCart();
            const existing = cart.find(item => item.id === currentProduct.id);

            if (existing) {
                existing.quantity += quantity;
            } else {
                cart.push({
                    id: currentProduct.id,
                    name: currentProduct.name,
                    category: currentProduct.category,
                    price: Number(currentProduct.price) || 0,
                    image: currentProduct.image || (currentProduct.images?.[0] || ""),
                    quantity
                });
            }

            saveCart(cart);

            if (feedback) {
                feedback.textContent = `✓ ${quantity}x ${currentProduct.name} added to cart!`;
                feedback.style.color = "#24753D";
                setTimeout(() => {
                    if (feedback.isConnected) feedback.textContent = "";
                }, 4000);
            }

            showToast(`${quantity}x ${currentProduct.name} added to cart!`);
        });
    }

    // Buy Now button (adds to cart and redirects immediately to checkout/cart)
    if (buyNowBtn) {
        buyNowBtn.addEventListener("click", () => {
            if (!currentProduct) return;

            const quantity = Math.max(1, Number(quantityInput?.value) || 1);
            const cart = getCart();
            const existing = cart.find(item => item.id === currentProduct.id);

            if (existing) {
                existing.quantity += quantity;
            } else {
                cart.push({
                    id: currentProduct.id,
                    name: currentProduct.name,
                    category: currentProduct.category,
                    price: Number(currentProduct.price) || 0,
                    image: currentProduct.image || (currentProduct.images?.[0] || ""),
                    quantity
                });
            }

            saveCart(cart);
            window.location.href = "cart.html";
        });
    }

    // History popstate for smooth Back/Forward in browser
    window.addEventListener("popstate", (event) => {
        const state = event.state;
        const currentUrlId = new URLSearchParams(window.location.search).get("id");

        if (currentUrlId) {
            openProductView(currentUrlId, false);
        } else {
            openCatalogView(false);
        }
    });
}

// =====================================================
// INITIALIZATION
// =====================================================

function initProductModule() {
    updateCartCount();
    initShopCatalog();
    initProductPageEvents();

    const currentYear = document.getElementById("current-year");
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Check if URL has ?id=...
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (productId) {
        openProductView(productId, false);
    } else {
        openCatalogView(false);
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initProductModule);
} else {
    initProductModule();
}

window.addEventListener("cinemart-cart-updated", updateCartCount);
window.addEventListener("storage", (e) => {
    if (e.key === CART_KEY) updateCartCount();
});
