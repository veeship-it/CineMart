"use strict";

const CART_KEY = "cinemart-cart";
const ADMIN_ORDERS_KEY = "cinemart_admin_orders";
const ADMIN_PAYMENTS_KEY = "cinemart_admin_payments";
const USER_ORDERS_KEY = "cinemart_user_orders";
const AUTH_KEY = "cinemart_auth_user";

// DOM Elements
const cartItems = document.getElementById("cart-items");
const cartSubtotalEl = document.getElementById("cart-subtotal");
const cartShippingFeeEl = document.getElementById("cart-shipping-fee");
const cartTaxEl = document.getElementById("cart-tax");
const cartDiscountEl = document.getElementById("cart-discount");
const discountRowEl = document.getElementById("discount-row");
const cartTotalEl = document.getElementById("cart-total");
const checkoutButton = document.getElementById("checkout-button");

// Promo Coupon Elements
const promoInput = document.getElementById("promo-code-input");
const btnApplyPromo = document.getElementById("btn-apply-promo");
const promoFeedbackEl = document.getElementById("promo-feedback-msg");

// Modal Elements
const checkoutModal = document.getElementById("checkout-modal");
const btnCloseModal = document.getElementById("btn-close-modal");

// State
let activeCoupon = null;
let currentOrderDetails = null;

// =====================================================
// 1. CART STORAGE & PRICING
// =====================================================

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
        return true;
    } catch (error) {
        console.error("Could not save cart:", error);
        alert("Your cart could not be saved.");
        return false;
    }
}

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

function formatPrice(price) {
    if (typeof price !== "number" || !Number.isFinite(price)) {
        return "₦0.00";
    }

    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0
    }).format(price);
}

function updateCartCount() {
    const count = getCart().reduce(
        (total, item) => total + (Number(item.quantity) || 0),
        0
    );

    document.querySelectorAll(".cart-link span, #cart-count")
        .forEach(element => {
            element.textContent = count;
        });
}

function calculateOrderTotals() {
    const cart = getCart();
    const subtotal = cart.reduce((total, item) => {
        const price = Number(item.price) || 0;
        const qty = Number(item.quantity) || 1;
        return total + (price * qty);
    }, 0);

    // Shipping: Free if subtotal >= ₦100,000 or empty, else ₦5,000
    const shippingFee = (subtotal === 0 || subtotal >= 100000) ? 0 : 5000;

    // VAT: 7.5%
    const tax = Math.round(subtotal * 0.075);

    // Discount
    let discount = 0;
    if (activeCoupon) {
        if (activeCoupon.type === "PERCENT") {
            discount = Math.round(subtotal * (activeCoupon.value / 100));
        } else if (activeCoupon.type === "FLAT") {
            discount = activeCoupon.value;
        }
    }

    const total = Math.max(0, subtotal + shippingFee + tax - discount);

    return { subtotal, shippingFee, tax, discount, total };
}

// =====================================================
// 2. RENDER CART ITEMS & ORDER SUMMARY
// =====================================================

function renderCart() {
    updateCartCount();

    if (!cartItems || !cartTotalEl) return;

    const cart = getCart();
    const { subtotal, shippingFee, tax, discount, total } = calculateOrderTotals();

    if (checkoutButton) {
        checkoutButton.disabled = cart.length === 0;
    }

    // Update Summary Sidebar
    if (cartSubtotalEl) cartSubtotalEl.textContent = formatPrice(subtotal);
    if (cartShippingFeeEl) cartShippingFeeEl.textContent = shippingFee === 0 ? "FREE" : formatPrice(shippingFee);
    if (cartTaxEl) cartTaxEl.textContent = formatPrice(tax);

    if (discountRowEl && cartDiscountEl) {
        if (discount > 0) {
            discountRowEl.style.display = "flex";
            cartDiscountEl.textContent = `-${formatPrice(discount)} (${activeCoupon.code})`;
        } else {
            discountRowEl.style.display = "none";
        }
    }

    cartTotalEl.textContent = formatPrice(total);

    // Empty state
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty-card">
                <div style="font-size: 40px;">🎬</div>
                <h3>Your equipment cart is empty</h3>
                <p>Discover Hollywood-grade cameras, cinema lenses, rigs, and creator essentials in our handpicked store.</p>
                <a href="product.html" class="button button-gold">Explore Equipment Shop →</a>
            </div>
        `;
        return;
    }

    // Render items
    cartItems.innerHTML = cart.map(item => {
        const itemImg = item.image || "./images/cam1.png.jpg";
        const itemPrice = Number(item.price) || 0;
        const itemQty = Number(item.quantity) || 1;
        const lineTotal = itemPrice * itemQty;

        return `
            <article class="cart-item" data-id="${escapeHTML(item.id)}">
                <div class="cart-item-image-wrap">
                    <img src="${escapeHTML(itemImg)}" alt="${escapeHTML(item.name)}" class="cart-item-image" onerror="this.src='./images/cam1.png.jpg'">
                </div>

                <div class="cart-item-details">
                    <span class="cart-item-category">${escapeHTML(item.category || "CINE GEAR")}</span>
                    <h3 class="cart-item-name">${escapeHTML(item.name)}</h3>
                    <span class="cart-item-price-unit">${formatPrice(itemPrice)} each</span>

                    <div class="cart-item-controls-row">
                        <div class="cart-stepper">
                            <button type="button" data-action="decrease" data-id="${escapeHTML(item.id)}" aria-label="Decrease quantity">−</button>
                            <span>${itemQty}</span>
                            <button type="button" data-action="increase" data-id="${escapeHTML(item.id)}" aria-label="Increase quantity">+</button>
                        </div>

                        <button type="button" class="cart-remove-button" data-action="remove" data-id="${escapeHTML(item.id)}">
                            Remove
                        </button>
                    </div>
                </div>

                <div class="cart-item-total-col">
                    <span class="cart-item-total-label">Line Total</span>
                    <strong class="cart-item-total">${formatPrice(lineTotal)}</strong>
                </div>
            </article>
        `;
    }).join("");
}

// =====================================================
// 3. CART CONTROLS (DELEGATED EVENTS)
// =====================================================

if (cartItems) {
    cartItems.addEventListener("click", function (event) {
        const button = event.target.closest("button[data-action]");
        if (!button) return;

        const id = button.dataset.id;
        const action = button.dataset.action;
        const cart = getCart();
        const item = cart.find(p => String(p.id) === String(id));

        if (!item) {
            renderCart();
            return;
        }

        if (action === "increase") {
            item.quantity = (Number(item.quantity) || 1) + 1;
        } else if (action === "decrease") {
            item.quantity = (Number(item.quantity) || 1) - 1;
        } else if (action === "remove") {
            const updated = cart.filter(p => String(p.id) !== String(id));
            saveCart(updated);
            renderCart();
            return;
        }

        const filtered = cart.filter(p => (Number(p.quantity) || 0) > 0);
        if (saveCart(filtered)) {
            renderCart();
        }
    });
}

// =====================================================
// 4. PROMO CODE CONTROLLER
// =====================================================

const AVAILABLE_COUPONS = {
    "CINEMARTVIP": { code: "CINEMARTVIP", type: "PERCENT", value: 10, desc: "10% VIP Creator Discount" },
    "CINEMA8K": { code: "CINEMA8K", type: "PERCENT", value: 10, desc: "10% Cinema 8K Special" },
    "GIRLCINE15": { code: "GIRLCINE15", type: "PERCENT", value: 15, desc: "15% GirlCineMart Celebration" }
};

btnApplyPromo?.addEventListener("click", () => {
    const code = (promoInput?.value || "").trim().toUpperCase();
    if (!code) return;

    if (AVAILABLE_COUPONS[code]) {
        activeCoupon = AVAILABLE_COUPONS[code];
        if (promoFeedbackEl) {
            promoFeedbackEl.textContent = `Promo applied: ${activeCoupon.desc}!`;
            promoFeedbackEl.className = "promo-feedback success";
        }
        renderCart();
    } else {
        if (promoFeedbackEl) {
            promoFeedbackEl.textContent = "Invalid promo code. Try 'CINEMARTVIP' or 'GIRLCINE15'.";
            promoFeedbackEl.className = "promo-feedback error";
        }
    }
});

// =====================================================
// 5. DEMO BANK MODAL NAVIGATION & STEPS
// =====================================================

window.openCheckoutModal = function () {
    const cart = getCart();
    if (cart.length === 0) {
        alert("Your shopping cart is empty. Please add products before checking out.");
        return;
    }

    // Auto-populate user if signed in
    try {
        const authUser = JSON.parse(localStorage.getItem(AUTH_KEY) || "null");
        if (authUser) {
            const nameField = document.getElementById("cust-fullname");
            const emailField = document.getElementById("cust-email");
            if (nameField && !nameField.value) nameField.value = authUser.displayName || "";
            if (emailField && !emailField.value) emailField.value = authUser.email || "";
        }
    } catch (e) {}

    // Reset steps
    goToStep(1);

    if (checkoutModal) {
        checkoutModal.classList.add("open");
        checkoutModal.setAttribute("aria-hidden", "false");
    }
};

window.closeCheckoutModal = function () {
    if (checkoutModal) {
        checkoutModal.classList.remove("open");
        checkoutModal.setAttribute("aria-hidden", "true");
    }
};

checkoutButton?.addEventListener("click", window.openCheckoutModal);
btnCloseModal?.addEventListener("click", window.closeCheckoutModal);

// Close on backdrop click
checkoutModal?.addEventListener("click", (e) => {
    if (e.target === checkoutModal) window.closeCheckoutModal();
});

window.goToStep = function (stepNum) {
    const step1 = document.getElementById("checkout-step-1");
    const step2 = document.getElementById("checkout-step-2");
    const otpStep = document.getElementById("checkout-otp-step");
    const step3 = document.getElementById("checkout-step-3");
    const step4 = document.getElementById("checkout-step-4");

    const nav1 = document.getElementById("step-nav-1");
    const nav2 = document.getElementById("step-nav-2");
    const nav3 = document.getElementById("step-nav-3");

    [step1, step2, otpStep, step3, step4].forEach(el => {
        if (el) el.style.display = "none";
    });

    [nav1, nav2, nav3].forEach(el => el?.classList.remove("active"));

    if (stepNum === 1) {
        if (step1) step1.style.display = "block";
        nav1?.classList.add("active");
    } else if (stepNum === 2) {
        if (step2) step2.style.display = "block";
        nav2?.classList.add("active");
    } else if (stepNum === 2.5) {
        if (otpStep) otpStep.style.display = "block";
        nav2?.classList.add("active");
    } else if (stepNum === 3) {
        if (step3) step3.style.display = "block";
        nav2?.classList.add("active");
    } else if (stepNum === 4) {
        if (step4) step4.style.display = "block";
        nav3?.classList.add("active");
    }
};

window.goToPaymentStep = function () {
    const name = document.getElementById("cust-fullname")?.value.trim();
    const phone = document.getElementById("cust-phone")?.value.trim();
    const email = document.getElementById("cust-email")?.value.trim();
    const address = document.getElementById("cust-address")?.value.trim();
    const city = document.getElementById("cust-city")?.value.trim();
    const speed = document.getElementById("cust-delivery-speed")?.value || "STANDARD";

    if (!name || !phone || !email || !address || !city) {
        alert("Please fill in all required delivery details.");
        return;
    }

    const { total } = calculateOrderTotals();
    const extraShipping = speed === "EXPRESS" ? 15000 : 0;
    const grandTotal = total + extraShipping;

    currentOrderDetails = {
        customer: name,
        phone,
        email,
        address: `${address}, ${city}`,
        speed,
        grandTotal
    };

    // Update modal display
    const amountEl = document.getElementById("modal-payable-amount");
    if (amountEl) amountEl.textContent = formatPrice(grandTotal);

    const refEl = document.getElementById("demo-tx-ref");
    if (refEl) refEl.textContent = `CM-TX-${Math.floor(100000 + Math.random() * 900000)}`;

    updateUssdString();
    goToStep(2);
};

// =====================================================
// 6. PAYMENT METHODS TABS
// =====================================================

document.querySelectorAll(".bank-tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".bank-tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const method = btn.dataset.method;
        const boxTransfer = document.getElementById("method-transfer-box");
        const boxCard = document.getElementById("method-card-box");
        const boxUssd = document.getElementById("method-ussd-box");

        if (boxTransfer) boxTransfer.style.display = method === "TRANSFER" ? "block" : "none";
        if (boxCard) boxCard.style.display = method === "CARD" ? "block" : "none";
        if (boxUssd) boxUssd.style.display = method === "USSD" ? "block" : "none";
    });
});

window.copyDemoAccount = function () {
    const acc = document.getElementById("demo-acc-number")?.textContent || "9948201943";
    navigator.clipboard.writeText(acc).then(() => {
        alert(`Copied Demo Bank Account (${acc}) to clipboard!`);
    }).catch(() => {
        alert(`Demo Account Number: ${acc}`);
    });
};

window.fillTestCard = function (type) {
    const num = document.getElementById("card-num");
    const exp = document.getElementById("card-expiry");
    const cvv = document.getElementById("card-cvv");
    const name = document.getElementById("card-holder");

    if (type === "VISA") {
        if (num) num.value = "4084 0841 2901 4242";
        if (exp) exp.value = "12/28";
        if (cvv) cvv.value = "842";
        if (name) name.value = currentOrderDetails?.customer || "Director K. Adeyemi";
    } else {
        if (num) num.value = "5399 8320 1149 5500";
        if (exp) exp.value = "08/29";
        if (cvv) cvv.value = "219";
        if (name) name.value = currentOrderDetails?.customer || "Producer C. Okonkwo";
    }
};

window.updateUssdString = function () {
    const select = document.getElementById("ussd-bank-select");
    const display = document.getElementById("ussd-code-display");
    if (!select || !display) return;

    const bank = select.value;
    const amount = currentOrderDetails?.grandTotal || 100000;
    const prefixes = {
        "GTBank": "*737*000*",
        "Access": "*901*000*",
        "Zenith": "*966*000*",
        "FirstBank": "*894*000*",
        "UBA": "*919*000*"
    };

    const prefix = prefixes[bank] || "*737*000*";
    display.textContent = `${prefix}${amount}#`;
};

window.simulateDemoCardOtp = function () {
    goToStep(2.5);
};

// =====================================================
// 7. DEMO BANK SETTLEMENT VERIFICATION
// =====================================================

window.simulateDemoBankVerification = function (paymentMethodName) {
    goToStep(3);

    const logEl = document.getElementById("processing-logs-text");
    const logs = [
        "Connecting to Demo Central Interbank Settlement Switch...",
        "Validating sandbox account liquidity & clearing parameters...",
        "Bank transaction credit verified and matched!",
        "Finalizing CineMart equipment inventory reservation..."
    ];

    let logIndex = 0;
    const interval = setInterval(() => {
        logIndex++;
        if (logIndex < logs.length && logEl) {
            logEl.textContent = logs[logIndex];
        }
    }, 550);

    setTimeout(() => {
        clearInterval(interval);
        finalizeSuccessfulOrder(paymentMethodName);
    }, 2200);
};

function finalizeSuccessfulOrder(paymentMethodName) {
    const cart = getCart();
    const orderId = `ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const txRef = document.getElementById("demo-tx-ref")?.textContent || `CM-TX-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderDate = new Date().toISOString().substring(0, 10);
    const orderTime = new Date().toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" });

    const totalAmount = currentOrderDetails?.grandTotal || 0;
    const customerName = currentOrderDetails?.customer || "Valued Director";
    const customerEmail = currentOrderDetails?.email || "director@cinemart.ng";
    const customerPhone = currentOrderDetails?.phone || "+234 803 000 0000";
    const deliveryAddress = currentOrderDetails?.address || "Lagos, Nigeria";

    const lineItems = cart.map(item => ({
        name: item.name,
        qty: Number(item.quantity) || 1,
        price: Number(item.price) || 0
    }));

    const itemsSummary = cart.map(item => `${item.name} (x${item.quantity})`).join(", ");

    // Prepare Order Object for Admin Dashboard
    const newAdminOrder = {
        id: orderId,
        customer: customerName,
        email: customerEmail,
        phone: customerPhone,
        address: deliveryAddress,
        items: itemsSummary,
        lineItems,
        subtotal: totalAmount,
        shippingFee: currentOrderDetails?.speed === "EXPRESS" ? 15000 : 0,
        tax: Math.round(totalAmount * 0.075),
        total: totalAmount,
        date: orderDate,
        payment: "Paid",
        paymentMethod: `Demo Bank (${paymentMethodName})`,
        status: "Processing",
        trackingNumber: `DHL-NG-${Math.floor(1000000 + Math.random() * 9000000)}`,
        courier: "DHL Express",
        timeline: {
            placed: `${orderDate} ${orderTime}`,
            paid: `${orderDate} ${orderTime}`,
            dispatched: null,
            delivered: null
        }
    };

    // Save to Admin Orders in LocalStorage
    try {
        const existingAdminOrders = JSON.parse(localStorage.getItem(ADMIN_ORDERS_KEY) || "[]");
        existingAdminOrders.unshift(newAdminOrder);
        localStorage.setItem(ADMIN_ORDERS_KEY, JSON.stringify(existingAdminOrders));
    } catch (e) {
        console.error("Could not persist admin order:", e);
    }

    // Save to Admin Payments in LocalStorage
    try {
        const existingPayments = JSON.parse(localStorage.getItem(ADMIN_PAYMENTS_KEY) || "[]");
        existingPayments.unshift({
            ref: txRef,
            orderId: orderId,
            customer: customerName,
            channel: paymentMethodName,
            gateway: "Demo Commercial Bank",
            amount: totalAmount,
            status: "Settled",
            date: `${orderDate} ${orderTime}`
        });
        localStorage.setItem(ADMIN_PAYMENTS_KEY, JSON.stringify(existingPayments));
    } catch (e) {
        console.error("Could not persist admin payment:", e);
    }

    // Render Proforma Receipt
    const receiptBox = document.getElementById("order-receipt-content");
    if (receiptBox) {
        receiptBox.innerHTML = `
            <div class="receipt-header">
                <div>
                    <span style="font-size: 11px; text-transform: uppercase; color: var(--grey-muted); font-weight: 700;">PROFORMA RECEIPT</span>
                    <div class="receipt-id-tag">${orderId}</div>
                </div>
                <div style="text-align: right;">
                    <span style="font-size: 11px; color: #00D26A; font-weight: 800;">● SETTLED (DEMO BANK)</span>
                    <div style="font-size: 11.5px; color: var(--grey-muted);">${orderDate} ${orderTime}</div>
                </div>
            </div>

            <div class="receipt-row">
                <span>Client Name:</span>
                <strong>${escapeHTML(customerName)}</strong>
            </div>

            <div class="receipt-row">
                <span>Contact Email:</span>
                <span>${escapeHTML(customerEmail)}</span>
            </div>

            <div class="receipt-row">
                <span>Destination:</span>
                <span>${escapeHTML(deliveryAddress)}</span>
            </div>

            <div class="receipt-row">
                <span>Settlement Gateway:</span>
                <strong style="color: var(--gold, #F5B52B);">${escapeHTML(paymentMethodName)}</strong>
            </div>

            <div class="receipt-row">
                <span>Interbank Ref:</span>
                <span style="font-family: monospace;">${txRef}</span>
            </div>

            <div style="margin: 10px 0; padding: 10px 0; border-top: 1px dashed rgba(255,255,255,0.1); border-bottom: 1px dashed rgba(255,255,255,0.1);">
                <div style="font-size: 11.5px; font-weight: 800; color: var(--gold-light); margin-bottom: 6px;">EQUIPMENT RESERVED:</div>
                ${lineItems.map(item => `
                    <div style="display: flex; justify-content: space-between; font-size: 12.5px; margin-bottom: 4px;">
                        <span>${escapeHTML(item.name)} (x${item.qty})</span>
                        <span>${formatPrice(item.price * item.qty)}</span>
                    </div>
                `).join("")}
            </div>

            <div class="receipt-row" style="font-size: 15px; font-weight: 800; color: #fff;">
                <span>Total Amount Paid:</span>
                <span style="color: var(--gold, #F5B52B);">${formatPrice(totalAmount)}</span>
            </div>
        `;
    }

    // Clear Cart
    saveCart([]);
    renderCart();

    // Show Step 4 Confirmation
    goToStep(4);
}

window.printReceipt = function () {
    window.print();
};

// =====================================================
// 8. INITIALIZATION
// =====================================================

window.addEventListener("cinemart-cart-updated", renderCart);
window.addEventListener("storage", event => {
    if (event.key === CART_KEY) renderCart();
});

renderCart();
