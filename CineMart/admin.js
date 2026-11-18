/**
 * CINE MART — EXECUTIVE ADMIN PORTAL CONTROLLER
 * Full Suite: Products, Orders, Order Details, Payments, Shipping, Coupons,
 * Returns, Customers, Reviews, Support, Notifications, Staff, Activity Logs,
 * Reports & Exports, Settings.
 */

// =====================================================
// 1. APPLICATION DATA STATE (SAMPLE MOCK READY)
// =====================================================

let catalogState = [
  {
    id: "prod-1",
    name: "RED V-Raptor ST 8K VV Camera",
    category: "Cameras",
    price: 8900000,
    stock: 3,
    availability: "In Stock",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
    description: "8K Large Format Cinema Camera System with multi-format sensor and 120fps at 8K.",
    featured: true
  },
  {
    id: "prod-2",
    name: "ARRI Alexa Mini LF Body",
    category: "Cameras",
    price: 12500000,
    stock: 1,
    availability: "Low Stock",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    description: "Large format cine sensor with ARRI color science and motorized full-spectrum ND.",
    featured: true
  },
  {
    id: "prod-3",
    name: "Cooke Anamorphic 50mm T2.3 Lens",
    category: "Lenses",
    price: 4200000,
    stock: 4,
    availability: "In Stock",
    image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=800&q=80",
    description: "Classic anamorphic look with oval bokeh and authentic Cooke /i technology.",
    featured: false
  },
  {
    id: "prod-4",
    name: "Aputure 600d Pro Daylight LED",
    category: "Lighting",
    price: 1350000,
    stock: 0,
    availability: "Out of Stock",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80",
    description: "High output Bowens mount LED light with weather resistance and Sidus Link.",
    featured: false
  },
  {
    id: "prod-5",
    name: "Sony FX3 Full-Frame Cinema Camera",
    category: "Cameras",
    price: 3850000,
    stock: 6,
    availability: "In Stock",
    image: "./images/cam1.png.jpg",
    description: "Compact full-frame 4K 120p with 15+ stops dynamic range and active internal fan.",
    featured: true
  },
  {
    id: "prod-6",
    name: "Master Cine 50mm T1.3 Prime Lens",
    category: "Lenses",
    price: 980000,
    stock: 5,
    availability: "In Stock",
    image: "./images/cam2.png.jpg",
    description: "Ultra-fast T1.3 cinema prime delivering creamy bokeh and zero focus breathing.",
    featured: false
  },
  {
    id: "prod-7",
    name: "Pro Carbon Fiber Gimbal & Matte Box",
    category: "Accessories",
    price: 850000,
    stock: 2,
    availability: "In Stock",
    image: "./images/cam9.png.jpg",
    description: "Complete stabilizing system with carbon fiber dual handles and swing-away matte box.",
    featured: false
  },
  {
    id: "prod-8",
    name: "GirlCineMart Rose Quartz Creator Camera",
    category: "GirlCineMart",
    price: 1650000,
    stock: 8,
    availability: "In Stock",
    image: "./images/girl.cam.png.jpg",
    description: "Exclusive pastel blush edition with golden accents and 4K articulating selfie screen.",
    featured: true
  }
];

let categoriesState = [
  { id: "cat-1", name: "Cameras", desc: "Digital cine bodies, 8K systems and Super35 film cameras", count: 3, image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80" },
  { id: "cat-2", name: "Lenses", desc: "Anamorphic, spherical prime and high-speed cinema glass", count: 2, image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=400&q=80" },
  { id: "cat-3", name: "Lighting", desc: "High-output LED fixtures, softboxes and studio modifiers", count: 1, image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=400&q=80" },
  { id: "cat-4", name: "Accessories", desc: "Monitors, wireless video transmitters, rigs and matte boxes", count: 1, image: "https://images.unsplash.com/photo-1500634245200-e5245c7e74ef?auto=format&fit=crop&w=400&q=80" },
  { id: "cat-5", name: "GirlCineMart", desc: "Vibrant and expressive colorful cinematography gear", count: 1, image: "./images/girl.cam.png.jpg" }
];

let savedAdminOrders = [];
try {
  savedAdminOrders = JSON.parse(localStorage.getItem("cinemart_admin_orders") || "[]");
} catch(e) {}

let ordersState = [
  ...savedAdminOrders,
  {
    id: "ORD-9402",
    customer: "Chibueze O.",
    email: "chibueze@cinemart.ng",
    phone: "+234 803 241 8890",
    address: "14 Admiralty Way, Lekki Phase 1, Lagos",
    items: "RED V-Raptor ST 8K VV",
    lineItems: [
      { name: "RED V-Raptor ST 8K VV", qty: 1, price: 8900000 }
    ],
    subtotal: 8900000,
    shippingFee: 0,
    tax: 667500,
    total: 9567500,
    date: "2026-03-12",
    payment: "Paid",
    paymentMethod: "Paystack (Visa •••• 4242)",
    status: "Delivered",
    trackingNumber: "DHL-NG-8890214",
    courier: "DHL Express",
    timeline: { placed: "2026-03-12 09:20", paid: "2026-03-12 09:22", dispatched: "2026-03-13 14:00", delivered: "2026-03-14 11:30" }
  },
  {
    id: "ORD-9403",
    customer: "Rhoda F.",
    email: "rhoda@cinemart.ng",
    phone: "+234 812 555 1902",
    address: "7 Agodi GRA, Ibadan, Oyo State",
    items: "Cooke Anamorphic 50mm",
    lineItems: [
      { name: "Cooke Anamorphic 50mm T2.3", qty: 1, price: 4200000 }
    ],
    subtotal: 4200000,
    shippingFee: 0,
    tax: 315000,
    total: 4515000,
    date: "2026-03-14",
    payment: "Paid",
    paymentMethod: "Flutterwave Card",
    status: "Processing",
    trackingNumber: "GIG-IBD-5501",
    courier: "GIG Logistics",
    timeline: { placed: "2026-03-14 14:15", paid: "2026-03-14 14:16", dispatched: null, delivered: null }
  },
  {
    id: "ORD-9404",
    customer: "Emeka K.",
    email: "emeka.k@filmcraft.ng",
    phone: "+234 705 112 3490",
    address: "Plot 120 Trans-Amadi Industrial Layout, Port Harcourt",
    items: "Sony FX3 + Carbon Gimbal",
    lineItems: [
      { name: "Sony FX3 Full-Frame Cinema Camera", qty: 1, price: 3850000 },
      { name: "Pro Carbon Fiber Gimbal & Matte Box", qty: 1, price: 850000 }
    ],
    subtotal: 4700000,
    shippingFee: 0,
    tax: 352500,
    total: 5052500,
    date: "2026-03-15",
    payment: "Paid",
    paymentMethod: "Direct Corporate Wire",
    status: "Shipped",
    trackingNumber: "RED-PHC-9012",
    courier: "Red Star Express",
    timeline: { placed: "2026-03-15 10:00", paid: "2026-03-15 11:30", dispatched: "2026-03-16 08:45", delivered: null }
  }
];

let savedAdminPayments = [];
try {
  savedAdminPayments = JSON.parse(localStorage.getItem("cinemart_admin_payments") || "[]");
} catch(e) {}

let paymentsState = [
  ...savedAdminPayments,
  { ref: "TRX-774102", orderId: "ORD-9402", customer: "Chibueze O.", channel: "Visa Card", amount: 9567500, gateway: "Paystack", status: "Settled", date: "2026-03-12 09:22" },
  { ref: "TRX-774103", orderId: "ORD-9403", customer: "Rhoda F.", channel: "Mastercard", amount: 4515000, gateway: "Flutterwave", status: "Settled", date: "2026-03-14 14:16" },
  { ref: "TRX-774104", orderId: "ORD-9404", customer: "Emeka K.", channel: "Bank Wire", amount: 5052500, gateway: "Bank Transfer", status: "Verified", date: "2026-03-15 11:30" }
];

let shippingState = [
  { tracking: "DHL-NG-8890214", orderId: "ORD-9402", destination: "Lekki, Lagos", courier: "DHL Express", eta: "Delivered (Mar 14)", status: "Delivered" },
  { tracking: "GIG-IBD-5501", orderId: "ORD-9403", destination: "Agodi, Ibadan", courier: "GIG Logistics", eta: "Mar 18, 2026", status: "In Transit" },
  { tracking: "RED-PHC-9012", orderId: "ORD-9404", destination: "Port Harcourt, Rivers", courier: "Red Star Express", eta: "Mar 19, 2026", status: "Dispatched" }
];

let couponsState = [
  { code: "CINEMA8K", discount: "10% OFF", type: "PERCENT", value: 10, redemptions: 42, minOrder: 5000000, expiry: "2026-06-30", active: true },
  { code: "GIRLCINE15", discount: "15% OFF", type: "PERCENT", value: 15, redemptions: 28, minOrder: 1000000, expiry: "2026-05-15", active: true },
  { code: "PRODIRECTOR", discount: "₦250,000 Flat", type: "FLAT", value: 250000, redemptions: 14, minOrder: 3000000, expiry: "2026-04-30", active: true },
  { code: "EXPO2026", discount: "5% OFF", type: "PERCENT", value: 5, redemptions: 5, minOrder: 500000, expiry: "2026-03-31", active: false }
];

let returnsState = [
  { rma: "RMA-2026-01", orderId: "ORD-9390", customer: "Tunde B.", reason: "Mount incompatible with legacy rig", condition: "Factory Sealed", amount: 980000, status: "Approved" },
  { rma: "RMA-2026-02", orderId: "ORD-9398", customer: "Faith A.", reason: "Client cancelled production shoot", condition: "Inspected / Pristine", amount: 1650000, status: "Pending" }
];

let customersState = [
  { name: "Chibueze O.", email: "chibueze@cinemart.ng", phone: "+234 803 241 8890", location: "Lekki, Lagos", orders: 3, spend: 14200000, tier: "VIP Director", joined: "2026-01-15", studio: "FilmCity Studios Lagos" },
  { name: "Rhoda F.", email: "rhoda@cinemart.ng", phone: "+234 812 555 1902", location: "Ibadan, Oyo", orders: 1, spend: 4200000, tier: "Pro Studio", joined: "2026-02-01", studio: "SilverFrame Pictures" },
  { name: "Emeka K.", email: "emeka.k@filmcraft.ng", phone: "+234 705 112 3490", location: "Port Harcourt", orders: 2, spend: 8900000, tier: "VIP Director", joined: "2026-02-18", studio: "Delta Visionaries" }
];

let reviewsState = [
  { product: "RED V-Raptor ST 8K VV", customer: "Chibueze O.", rating: 5, review: "Astounding dynamic range and skin tone colorimetry. Handled a 14-hour set under tropical heat without a flinch.", date: "2026-03-14", status: "Approved" },
  { product: "Master Cine 50mm T1.3", customer: "Tunde B.", rating: 5, review: "Razor-sharp wide open at T1.3. The contrast rendering holds up beautifully against high-end European glass.", date: "2026-03-11", status: "Featured" },
  { product: "GirlCineMart Rose Quartz Creator Cam", customer: "Aisha M.", rating: 5, review: "Incredible design that turns heads on commercial shoots. Clean HDMI output and instant autofocus.", date: "2026-03-10", status: "Approved" }
];

let supportState = [
  { id: "TKT-301", client: "Chibueze O.", subject: "RED 8K ProRes RAW firmware compatibility", priority: "Normal", staff: "Kolawole V.", status: "Resolved", date: "2026-03-13" },
  { id: "TKT-302", client: "Rhoda F.", subject: "Expedited courier delivery to Ibadan Studio", priority: "Urgent", staff: "Amina S.", status: "Open", date: "2026-03-15" },
  { id: "TKT-303", client: "Emeka K.", subject: "Invoice VAT breakdown certificate requested", priority: "High", staff: "Tolu B.", status: "In Progress", date: "2026-03-16" }
];

let notificationsState = [
  { id: "nt-1", category: "STOCK", title: "Low Stock Warning", text: "ARRI Alexa Mini LF Body floor stock has reached 1 unit.", time: "10 mins ago", unread: true },
  { id: "nt-2", category: "ORDER", title: "New Enterprise Order Dispatched", text: "Order ORD-9404 for Emeka K. has been handed to Red Star Express.", time: "1 hour ago", unread: true },
  { id: "nt-3", category: "SECURITY", title: "Administrative Session Authenticated", text: "Executive Portal logged in from IP 102.89.44.12 (Lagos, NG).", time: "3 hours ago", unread: false }
];

let staffState = [
  { name: "Kolawole V.", role: "Super Administrator", email: "admin@cinemart.ng", twoFactor: "Active (Hardware Key)", lastActive: "Just now", permissions: "Full Access" },
  { name: "Amina S.", role: "Fulfillment & Logistics Lead", email: "amina.s@cinemart.ng", twoFactor: "Active (App OTP)", lastActive: "15 mins ago", permissions: "Orders, Shipping, Returns" },
  { name: "Tolu B.", role: "Catalog & Optical Manager", email: "tolu.b@cinemart.ng", twoFactor: "Active (SMS)", lastActive: "2 hours ago", permissions: "Products, Categories, Inventory" }
];

let activityLogsState = [
  { time: "2026-03-16 11:24", staff: "Kolawole V.", action: "Updated stock for RED V-Raptor ST 8K from 2 to 3 units", resource: "prod-1", ip: "102.89.44.12", status: "Success" },
  { time: "2026-03-16 09:15", staff: "Amina S.", action: "Marked order ORD-9404 fulfillment as Shipped (Waybill RED-PHC-9012)", resource: "ORD-9404", ip: "197.210.8.44", status: "Success" },
  { time: "2026-03-15 16:40", staff: "Tolu B.", action: "Created new promotional campaign coupon code CINEMA8K", resource: "coupons", ip: "105.112.98.2", status: "Success" }
];

// =====================================================
// 2. INITIALIZATION
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initFormListeners();
  initSearchAndFilters();
  initModalListeners();
  initGlobalSearch();
  initHashRouting();
  renderAllViews();
});

// =====================================================
// 3. NAVIGATION & ROUTING CONTROLLER
// =====================================================

function initNavigation() {
  const navBtns = document.querySelectorAll('.nav-item[data-view]');
  const sidebar = document.getElementById('admin-sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const backdrop = document.getElementById('sidebar-backdrop');

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetView = btn.getAttribute('data-view');
      window.switchAdminView(targetView);
      if (window.innerWidth <= 991 && sidebar) {
        sidebar.classList.remove('open');
        if (backdrop) backdrop.classList.remove('active');
      }
    });
  });

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      if (backdrop) backdrop.classList.toggle('active');
    });
  }

  if (backdrop && sidebar) {
    backdrop.addEventListener('click', () => {
      sidebar.classList.remove('open');
      backdrop.classList.remove('active');
    });
  }
}

function initHashRouting() {
  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById(hash)) {
    window.switchAdminView(hash);
  }
}

window.switchAdminView = function(viewId) {
  const views = document.querySelectorAll('.admin-view');
  const navBtns = document.querySelectorAll('.nav-item[data-view]');
  const pageTitle = document.getElementById('admin-page-title');
  const breadcrumb = document.getElementById('admin-breadcrumb');

  views.forEach(v => v.classList.remove('active'));
  navBtns.forEach(b => b.classList.remove('active'));

  const activeView = document.getElementById(viewId);
  const activeNav = document.querySelector(`.nav-item[data-view="${viewId}"]`);

  if (activeView) activeView.classList.add('active');
  if (activeNav) activeNav.classList.add('active');

  const viewTitles = {
    'overview-view': 'Dashboard Overview',
    'products-view': 'Equipment Catalog',
    'add-product-view': 'Manage Product Form',
    'categories-view': 'Gear Categories',
    'inventory-view': 'Stock Control',
    'orders-view': 'Orders Fulfillment',
    'order-details-view': 'Order Dossier & Invoice',
    'payments-view': 'Settlements & Transactions',
    'shipping-view': 'Shipping & Delivery Tracking',
    'coupons-view': 'Discounts & Promo Codes',
    'returns-view': 'Returns & RMA Management',
    'customers-view': 'Client Directory',
    'customer-details-view': 'Client Profile Dossier',
    'reviews-view': 'Reviews & Ratings Moderation',
    'support-view': 'Filmmaker Support Desk',
    'notifications-view': 'Executive Alerts & Notifications',
    'staff-view': 'Staff & Access Controls',
    'activity-logs-view': 'System Activity Audit Trail',
    'reports-view': 'Reports & Data Exports',
    'settings-view': 'Portal & Store Settings'
  };

  const title = viewTitles[viewId] || 'Console';
  if (pageTitle) pageTitle.textContent = title;
  if (breadcrumb) breadcrumb.textContent = `Console / ${title}`;

  window.location.hash = viewId;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// =====================================================
// 4. RENDER PIPELINE
// =====================================================

function renderAllViews() {
  renderOverviewTable();
  renderProductsTable();
  renderOrdersTable();
  renderCustomersTable();
  renderCategoriesGrid();
  renderInventoryTable();
  renderPaymentsTable();
  renderShippingTable();
  renderCouponsTable();
  renderReturnsTable();
  renderReviewsTable();
  renderSupportTable();
  renderNotificationsList();
  renderStaffTable();
  renderActivityLogsTable();
  updateStatsCounters();
}

function updateStatsCounters() {
  const totalProdEl = document.getElementById('stat-total-products');
  if (totalProdEl) totalProdEl.textContent = catalogState.length;

  const lowStockCount = catalogState.filter(p => p.stock > 0 && p.stock < 3).length;
  const invBadge = document.getElementById('sidebar-inventory-badge');
  if (invBadge) invBadge.textContent = `${lowStockCount} Low`;

  const pendingOrders = ordersState.filter(o => o.status !== 'Delivered').length;
  const ordersBadge = document.getElementById('sidebar-orders-badge');
  if (ordersBadge) ordersBadge.textContent = pendingOrders;

  const unreadNotifs = notificationsState.filter(n => n.unread).length;
  const notifBadge = document.getElementById('sidebar-notif-badge');
  if (notifBadge) notifBadge.textContent = unreadNotifs;
}

// -----------------------------------------------------
// Overview Table
// -----------------------------------------------------
function renderOverviewTable() {
  const tbody = document.getElementById('overview-orders-table');
  if (!tbody) return;

  tbody.innerHTML = ordersState.slice(0, 5).map(ord => `
    <tr>
      <td><strong>${ord.id}</strong></td>
      <td>${ord.customer}</td>
      <td>${ord.date}</td>
      <td>₦${ord.total.toLocaleString()}</td>
      <td><span class="badge badge-success">${ord.payment}</span></td>
      <td><span class="badge ${ord.status === 'Delivered' ? 'badge-success' : 'badge-info'}">${ord.status}</span></td>
      <td><button class="btn-sm" onclick="viewOrderDetails('${ord.id}')">Inspect</button></td>
    </tr>
  `).join('');
}

// -----------------------------------------------------
// Products Table
// -----------------------------------------------------
function renderProductsTable(items = catalogState) {
  const tbody = document.getElementById('products-table-body');
  if (!tbody) return;

  if (items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center py-4" style="color: #8C7B75;">No matching equipment found.</td></tr>`;
    return;
  }

  tbody.innerHTML = items.map(prod => `
    <tr>
      <td><img src="${prod.image}" alt="${prod.name}" class="table-thumb" onerror="this.src='./images/cam1.png.jpg'"></td>
      <td><strong>${prod.name}</strong></td>
      <td><span class="category-tag">${prod.category}</span></td>
      <td>₦${prod.price.toLocaleString()}</td>
      <td>${prod.stock} units</td>
      <td><span class="badge ${prod.stock === 0 ? 'badge-danger' : prod.stock < 2 ? 'badge-warning' : 'badge-success'}">${prod.availability}</span></td>
      <td>
        <button class="btn-action edit" onclick="editProduct('${prod.id}')">Edit</button>
        <button class="btn-action delete" onclick="deleteProduct('${prod.id}')">Delete</button>
      </td>
    </tr>
  `).join('');
}

// -----------------------------------------------------
// Orders Table
// -----------------------------------------------------
function renderOrdersTable(items = ordersState) {
  const tbody = document.getElementById('full-orders-table');
  if (!tbody) return;

  tbody.innerHTML = items.map(ord => `
    <tr>
      <td><strong>${ord.id}</strong></td>
      <td>${ord.customer}</td>
      <td>${ord.items}</td>
      <td>₦${ord.total.toLocaleString()}</td>
      <td>${ord.date}</td>
      <td><span class="badge badge-success">${ord.payment}</span></td>
      <td><span class="badge ${ord.status === 'Delivered' ? 'badge-success' : ord.status === 'Cancelled' ? 'badge-danger' : 'badge-info'}">${ord.status}</span></td>
      <td>
        <button class="btn-sm" onclick="viewOrderDetails('${ord.id}')">Inspect Dossier</button>
      </td>
    </tr>
  `).join('');
}

// -----------------------------------------------------
// Order Details View & Modal
// -----------------------------------------------------
window.viewOrderDetails = function(orderId) {
  const ord = ordersState.find(o => o.id === orderId) || ordersState[0];
  const container = document.getElementById('order-details-content-container');
  if (!container) return;

  container.innerHTML = `
    <div class="order-detail-header">
      <div>
        <h3 style="font-family: 'Playfair Display', serif; font-size: 24px; color: #FFF9EF;">Order Reference: ${ord.id}</h3>
        <p style="font-size: 12px; color: #8C7B75;">Placed on ${ord.date} &nbsp;·&nbsp; ${ord.paymentMethod}</p>
      </div>
      <div style="display: flex; gap: 10px; align-items: center;">
        <span class="badge ${ord.status === 'Delivered' ? 'badge-success' : 'badge-info'}" style="font-size: 13px; padding: 6px 14px;">${ord.status}</span>
        <select onchange="updateOrderStatus('${ord.id}', this.value)" class="table-select">
          <option value="Processing" ${ord.status === 'Processing' ? 'selected' : ''}>Processing</option>
          <option value="Shipped" ${ord.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
          <option value="Delivered" ${ord.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
          <option value="Cancelled" ${ord.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
        </select>
      </div>
    </div>

    <!-- Timeline -->
    <div class="order-timeline">
      <div class="timeline-step completed">
        <div class="timeline-dot">✓</div>
        <div class="timeline-title">Order Placed</div>
        <div class="timeline-date">${ord.timeline.placed || 'Verified'}</div>
      </div>
      <div class="timeline-step ${ord.timeline.paid ? 'completed' : 'current'}">
        <div class="timeline-dot">₦</div>
        <div class="timeline-title">Payment Cleared</div>
        <div class="timeline-date">${ord.timeline.paid || 'Pending'}</div>
      </div>
      <div class="timeline-step ${ord.status === 'Shipped' || ord.status === 'Delivered' ? 'completed' : ord.status === 'Processing' ? 'current' : ''}">
        <div class="timeline-dot">✈</div>
        <div class="timeline-title">Dispatched (DHL)</div>
        <div class="timeline-date">${ord.timeline.dispatched || 'Awaiting Pickup'}</div>
      </div>
      <div class="timeline-step ${ord.status === 'Delivered' ? 'completed' : ''}">
        <div class="timeline-dot">★</div>
        <div class="timeline-title">Client Delivery</div>
        <div class="timeline-date">${ord.timeline.delivered || 'In Transit'}</div>
      </div>
    </div>

    <!-- Two-column Client & Delivery Details -->
    <div class="detail-grid-2">
      <div class="detail-card">
        <h4>Client Identification</h4>
        <div class="detail-row"><span class="detail-label">Name</span><span class="detail-val">${ord.customer}</span></div>
        <div class="detail-row"><span class="detail-label">Email</span><span class="detail-val">${ord.email}</span></div>
        <div class="detail-row"><span class="detail-label">Phone</span><span class="detail-val">${ord.phone}</span></div>
      </div>

      <div class="detail-card">
        <h4>Shipping &amp; Logistics</h4>
        <div class="detail-row"><span class="detail-label">Carrier</span><span class="detail-val">${ord.courier}</span></div>
        <div class="detail-row"><span class="detail-label">Tracking Number</span><span class="detail-val" style="color:#F5B52B; font-family:monospace;">${ord.trackingNumber}</span></div>
        <div class="detail-row"><span class="detail-label">Delivery Address</span><span class="detail-val">${ord.address}</span></div>
      </div>
    </div>

    <!-- Order Items Table -->
    <div class="table-responsive" style="margin-bottom: 24px;">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Item Description</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${ord.lineItems.map(item => `
            <tr>
              <td><strong>${item.name}</strong></td>
              <td>${item.qty}</td>
              <td>₦${item.price.toLocaleString()}</td>
              <td>₦${(item.price * item.qty).toLocaleString()}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <!-- Order Summary Cards -->
    <div style="max-width: 380px; margin-left: auto;">
      <div class="detail-card">
        <div class="detail-row"><span class="detail-label">Subtotal</span><span class="detail-val">₦${ord.subtotal.toLocaleString()}</span></div>
        <div class="detail-row"><span class="detail-label">Insured Logistics</span><span class="detail-val">${ord.shippingFee === 0 ? 'Complimentary' : '₦' + ord.shippingFee.toLocaleString()}</span></div>
        <div class="detail-row"><span class="detail-label">VAT (7.5%)</span><span class="detail-val">₦${ord.tax.toLocaleString()}</span></div>
        <div class="detail-row" style="padding-top: 10px; border-top: 1px solid rgba(245,181,43,0.3);"><strong style="color:#FFE6A0; font-size:15px;">Total Settled</strong><strong style="color:#F5B52B; font-size:18px;">₦${ord.total.toLocaleString()}</strong></div>
      </div>
    </div>
  `;

  window.switchAdminView('order-details-view');
};

window.updateOrderStatus = function(orderId, newStatus) {
  const ord = ordersState.find(o => o.id === orderId);
  if (!ord) return;
  ord.status = newStatus;
  if (newStatus === 'Shipped' && !ord.timeline.dispatched) {
    ord.timeline.dispatched = new Date().toISOString().replace('T', ' ').substring(0, 16);
  }
  if (newStatus === 'Delivered' && !ord.timeline.delivered) {
    ord.timeline.delivered = new Date().toISOString().replace('T', ' ').substring(0, 16);
  }
  renderOrdersTable();
  renderOverviewTable();
  updateStatsCounters();
  window.viewOrderDetails(orderId);
  logActivity(`Order ${orderId} status updated to ${newStatus}`, orderId);
};

// -----------------------------------------------------
// Payments Table
// -----------------------------------------------------
function renderPaymentsTable(items = paymentsState) {
  const tbody = document.getElementById('payments-table-body');
  if (!tbody) return;

  tbody.innerHTML = items.map(p => `
    <tr>
      <td><strong style="font-family: monospace; color:#FFE6A0;">${p.ref}</strong></td>
      <td><a href="javascript:void(0)" onclick="viewOrderDetails('${p.orderId}')" style="color:#F5B52B; text-decoration:underline;">${p.orderId}</a></td>
      <td>${p.customer}</td>
      <td><span class="badge badge-gold">${p.channel} (${p.gateway})</span></td>
      <td>₦${p.amount.toLocaleString()}</td>
      <td><span class="badge badge-success">${p.status}</span></td>
      <td>${p.date}</td>
      <td>
        <button class="btn-sm" onclick="issueRefund('${p.ref}', ${p.amount})">Refund</button>
      </td>
    </tr>
  `).join('');
}

window.issueRefund = function(trxRef, amount) {
  if (confirm(`Authorize full refund of ₦${amount.toLocaleString()} for transaction ${trxRef}?`)) {
    alert(`Refund protocol initialized via Gateway API for reference ${trxRef}. Reversal receipt generated.`);
    logActivity(`Authorized refund protocol for ${trxRef} (₦${amount.toLocaleString()})`, trxRef);
  }
};

// -----------------------------------------------------
// Shipping Table
// -----------------------------------------------------
function renderShippingTable() {
  const tbody = document.getElementById('shipping-table-body');
  if (!tbody) return;

  tbody.innerHTML = shippingState.map(s => `
    <tr>
      <td><strong style="font-family: monospace; color:#F5B52B;">${s.tracking}</strong></td>
      <td>${s.orderId}</td>
      <td>${s.destination}</td>
      <td>${s.courier}</td>
      <td>${s.eta}</td>
      <td><span class="badge ${s.status === 'Delivered' ? 'badge-success' : 'badge-info'}">${s.status}</span></td>
      <td>
        <button class="btn-sm" onclick="alert('Viewing live courier telemetry for waybill ${s.tracking} (${s.courier})')">Track GPS</button>
      </td>
    </tr>
  `).join('');
}

// -----------------------------------------------------
// Coupons Table
// -----------------------------------------------------
function renderCouponsTable() {
  const tbody = document.getElementById('coupons-table-body');
  if (!tbody) return;

  tbody.innerHTML = couponsState.map((c, idx) => `
    <tr>
      <td><span class="coupon-code-badge">${c.code}</span></td>
      <td><strong>${c.discount}</strong></td>
      <td>${c.redemptions} times</td>
      <td>₦${c.minOrder.toLocaleString()}</td>
      <td>${c.expiry}</td>
      <td><span class="badge ${c.active ? 'badge-success' : 'badge-danger'}">${c.active ? 'Active' : 'Disabled'}</span></td>
      <td>
        <button class="btn-sm" onclick="toggleCoupon(${idx})">${c.active ? 'Deactivate' : 'Activate'}</button>
        <button class="btn-action delete" onclick="deleteCoupon(${idx})">Delete</button>
      </td>
    </tr>
  `).join('');
}

window.toggleCoupon = function(idx) {
  couponsState[idx].active = !couponsState[idx].active;
  renderCouponsTable();
  logActivity(`Toggled promotional coupon ${couponsState[idx].code} to ${couponsState[idx].active ? 'Active' : 'Disabled'}`, 'coupons');
};

window.deleteCoupon = function(idx) {
  const code = couponsState[idx].code;
  if (confirm(`Permanently remove promo code ${code}?`)) {
    couponsState.splice(idx, 1);
    renderCouponsTable();
    logActivity(`Deleted promotional coupon code ${code}`, 'coupons');
  }
};

// -----------------------------------------------------
// Returns Table
// -----------------------------------------------------
function renderReturnsTable(items = returnsState) {
  const tbody = document.getElementById('returns-table-body');
  if (!tbody) return;

  tbody.innerHTML = items.map(r => `
    <tr>
      <td><strong style="color:#FFE6A0; font-family:monospace;">${r.rma}</strong></td>
      <td>${r.orderId}</td>
      <td>${r.customer}</td>
      <td>${r.reason}</td>
      <td><span class="badge badge-gold">${r.condition}</span></td>
      <td>₦${r.amount.toLocaleString()}</td>
      <td><span class="badge ${r.status === 'Approved' ? 'badge-success' : 'badge-warning'}">${r.status}</span></td>
      <td>
        ${r.status === 'Pending' ? `
          <button class="btn-sm" style="color:#4cd97b;" onclick="updateRMA('${r.rma}', 'Approved')">Approve</button>
          <button class="btn-sm text-danger" onclick="updateRMA('${r.rma}', 'Rejected')">Reject</button>
        ` : `<span style="font-size:11px; color:#8C7B75;">Processed</span>`}
      </td>
    </tr>
  `).join('');
}

window.updateRMA = function(rmaId, status) {
  const r = returnsState.find(item => item.rma === rmaId);
  if (!r) return;
  r.status = status;
  renderReturnsTable();
  alert(`RMA request ${rmaId} marked as ${status}. Client notified.`);
  logActivity(`RMA request ${rmaId} marked as ${status}`, rmaId);
};

// -----------------------------------------------------
// Customers Table & Dossier
// -----------------------------------------------------
function renderCustomersTable(items = customersState) {
  const tbody = document.getElementById('customers-table');
  if (!tbody) return;

  tbody.innerHTML = items.map(c => `
    <tr>
      <td><strong>${c.name}</strong></td>
      <td>${c.email}</td>
      <td>${c.location}</td>
      <td>${c.orders} orders</td>
      <td>₦${c.spend.toLocaleString()}</td>
      <td><span class="badge badge-gold">${c.tier}</span></td>
      <td><button class="btn-sm" onclick="viewCustomerDetails('${c.email}')">View Dossier</button></td>
    </tr>
  `).join('');
}

window.viewCustomerDetails = function(email) {
  const c = customersState.find(item => item.email === email) || customersState[0];
  const container = document.getElementById('customer-details-container');
  if (!container) return;

  const clientOrders = ordersState.filter(o => o.email === c.email);

  container.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 24px; padding-bottom: 18px; border-bottom: 1px solid rgba(245,181,43,0.15);">
      <div style="display:flex; align-items:center; gap: 16px;">
        <div style="width:60px; height:60px; border-radius:50%; background:linear-gradient(135deg, #711D0D, #F5B52B); display:grid; place-items:center; font-size:24px; font-weight:800; color:#FFF9EF;">${c.name[0]}</div>
        <div>
          <h3 style="font-family:'Playfair Display', serif; font-size:22px; color:#FFF9EF;">${c.name}</h3>
          <p style="font-size:12px; color:#8C7B75;">${c.studio} &nbsp;·&nbsp; Member since ${c.joined}</p>
        </div>
      </div>
      <div>
        <span class="badge badge-gold" style="font-size:13px; padding:6px 14px;">${c.tier}</span>
      </div>
    </div>

    <div class="stats-grid" style="margin-bottom: 24px;">
      <div class="stat-card" style="padding:16px 20px;">
        <span class="stat-title">Lifetime Value</span>
        <div class="stat-value" style="font-size:22px;">₦${c.spend.toLocaleString()}</div>
      </div>
      <div class="stat-card" style="padding:16px 20px;">
        <span class="stat-title">Total Orders</span>
        <div class="stat-value" style="font-size:22px;">${c.orders}</div>
      </div>
      <div class="stat-card" style="padding:16px 20px;">
        <span class="stat-title">Preferred Format</span>
        <div class="stat-value" style="font-size:22px;">Large Format 8K</div>
      </div>
    </div>

    <div class="detail-grid-2">
      <div class="detail-card">
        <h4>Direct Contact</h4>
        <div class="detail-row"><span class="detail-label">Email</span><span class="detail-val">${c.email}</span></div>
        <div class="detail-row"><span class="detail-label">Direct Phone</span><span class="detail-val">${c.phone}</span></div>
        <div class="detail-row"><span class="detail-label">Production Base</span><span class="detail-val">${c.location}</span></div>
      </div>
      <div class="detail-card">
        <h4>Executive Notes</h4>
        <p style="font-size:12.5px; color:#E2D7D0; line-height:1.6;">Tier 1 enterprise filmmaking client with frequent gear upgrades. High-priority dispatch and 24/7 dedicated cinema optical support privileges enabled.</p>
      </div>
    </div>

    <h4 style="font-family:'Playfair Display', serif; font-size:18px; color:#FFF9EF; margin: 24px 0 12px;">Client Order History</h4>
    <div class="table-responsive">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Order Ref</th>
            <th>Equipment Package</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${clientOrders.length > 0 ? clientOrders.map(o => `
            <tr>
              <td><strong>${o.id}</strong></td>
              <td>${o.items}</td>
              <td>${o.date}</td>
              <td>₦${o.total.toLocaleString()}</td>
              <td><span class="badge ${o.status === 'Delivered' ? 'badge-success' : 'badge-info'}">${o.status}</span></td>
            </tr>
          `).join('') : `<tr><td colspan="5" class="text-center py-4">No historical orders logged yet.</td></tr>`}
        </tbody>
      </table>
    </div>
  `;

  window.switchAdminView('customer-details-view');
};

// -----------------------------------------------------
// Reviews Table
// -----------------------------------------------------
function renderReviewsTable() {
  const tbody = document.getElementById('reviews-table-body');
  if (!tbody) return;

  tbody.innerHTML = reviewsState.map((rev, idx) => `
    <tr>
      <td><strong>${rev.product}</strong></td>
      <td>${rev.customer}</td>
      <td><span class="stars-display">${'★'.repeat(rev.rating)}</span></td>
      <td style="max-width: 300px; font-size: 12px; color: #E2D7D0;">"${rev.review}"</td>
      <td>${rev.date}</td>
      <td><span class="badge ${rev.status === 'Featured' ? 'badge-gold' : 'badge-success'}">${rev.status}</span></td>
      <td>
        <button class="btn-sm" onclick="toggleFeatureReview(${idx})">${rev.status === 'Featured' ? 'Unfeature' : 'Feature'}</button>
      </td>
    </tr>
  `).join('');
}

window.toggleFeatureReview = function(idx) {
  reviewsState[idx].status = reviewsState[idx].status === 'Featured' ? 'Approved' : 'Featured';
  renderReviewsTable();
};

// -----------------------------------------------------
// Support Table
// -----------------------------------------------------
function renderSupportTable(items = supportState) {
  const tbody = document.getElementById('support-table-body');
  if (!tbody) return;

  tbody.innerHTML = items.map(t => `
    <tr>
      <td><strong style="color:#FFE6A0; font-family:monospace;">${t.id}</strong></td>
      <td>${t.client}</td>
      <td>${t.subject}</td>
      <td><span class="priority-badge priority-${t.priority.toLowerCase()}">${t.priority}</span></td>
      <td>${t.staff}</td>
      <td><span class="badge ${t.status === 'Resolved' ? 'badge-success' : 'badge-warning'}">${t.status}</span></td>
      <td>
        <button class="btn-sm" onclick="openTicketModal('${t.id}')">Inspect &amp; Reply</button>
      </td>
    </tr>
  `).join('');
}

window.openTicketModal = function(ticketId) {
  const t = supportState.find(item => item.id === ticketId);
  if (!t) return;

  openModal(`Support Consultation: ${t.id}`, `
    <div style="margin-bottom:16px;">
      <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
        <strong>Client: ${t.client}</strong>
        <span class="priority-badge priority-${t.priority.toLowerCase()}">${t.priority}</span>
      </div>
      <p style="color:#FFE6A0; font-size:14px; font-weight:600; margin-bottom:10px;">Subject: ${t.subject}</p>
      <div style="background:#0C0504; padding:14px; border-radius:10px; border:1px solid rgba(245,181,43,0.15); margin-bottom:16px; font-size:12.5px; color:#E2D7D0;">
        "Hello CineMart team, we are mounting Cooke Anamorphic glass on a secondary gimbal setup for tomorrow's production shoot. Could your engineering team confirm torque specs and adapter clearance?"
      </div>
      <div class="form-group">
        <label>Reply to Client</label>
        <textarea id="support-reply-textarea" rows="3" placeholder="Type engineering feedback or dispatch resolution..." style="width:100%;"></textarea>
      </div>
      <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:16px;">
        <button class="button-outline" onclick="closeModal()">Close</button>
        <button class="button-gold" onclick="resolveTicket('${t.id}')">Send &amp; Mark Resolved</button>
      </div>
    </div>
  `);
};

window.resolveTicket = function(ticketId) {
  const t = supportState.find(item => item.id === ticketId);
  if (t) {
    t.status = "Resolved";
    renderSupportTable();
    closeModal();
    alert(`Response dispatched to ${t.client}. Ticket ${ticketId} resolved.`);
    logActivity(`Resolved support consultation ticket ${ticketId}`, ticketId);
  }
};

// -----------------------------------------------------
// Notifications List
// -----------------------------------------------------
function renderNotificationsList(category = 'ALL') {
  const container = document.getElementById('notifications-list-container');
  if (!container) return;

  let items = notificationsState;
  if (category !== 'ALL') items = notificationsState.filter(n => n.category === category);

  if (items.length === 0) {
    container.innerHTML = `<div class="text-center py-4" style="color:#8C7B75;">No notifications under this category.</div>`;
    return;
  }

  container.innerHTML = items.map(n => `
    <div class="notification-card ${n.unread ? 'unread' : ''}">
      <div class="notification-icon-box">
        ${n.category === 'STOCK' ? '⚠' : n.category === 'ORDER' ? '✈' : '🔒'}
      </div>
      <div class="notification-body">
        <div class="notification-title">${n.title}</div>
        <div class="notification-text">${n.text}</div>
        <div class="notification-time">${n.time}</div>
      </div>
    </div>
  `).join('');
}

window.markAllNotificationsRead = function() {
  notificationsState.forEach(n => n.unread = false);
  renderNotificationsList();
  updateStatsCounters();
};

// -----------------------------------------------------
// Staff Table
// -----------------------------------------------------
function renderStaffTable() {
  const tbody = document.getElementById('staff-table-body');
  if (!tbody) return;

  tbody.innerHTML = staffState.map(s => `
    <tr>
      <td><strong>${s.name}</strong></td>
      <td><span class="badge badge-gold">${s.role}</span></td>
      <td>${s.email}</td>
      <td><span class="badge badge-success">${s.twoFactor}</span></td>
      <td>${s.lastActive}</td>
      <td style="font-size:12px; color:#FFE6A0;">${s.permissions}</td>
      <td>
        <button class="btn-sm" onclick="alert('Managing security authorization parameters for ${s.name}')">Permissions</button>
      </td>
    </tr>
  `).join('');
}

// -----------------------------------------------------
// Activity Logs Table
// -----------------------------------------------------
function renderActivityLogsTable() {
  const tbody = document.getElementById('activity-logs-table-body');
  if (!tbody) return;

  tbody.innerHTML = activityLogsState.map(l => `
    <tr>
      <td style="font-family:monospace; font-size:11.5px; color:#FFE6A0;">${l.time}</td>
      <td><strong>${l.staff}</strong></td>
      <td>${l.action}</td>
      <td><span class="category-tag">${l.resource}</span></td>
      <td style="font-family:monospace; font-size:11.5px;">${l.ip}</td>
      <td><span class="badge badge-success">${l.status}</span></td>
    </tr>
  `).join('');
}

function logActivity(action, resource) {
  const time = new Date().toISOString().replace('T', ' ').substring(0, 16);
  activityLogsState.unshift({
    time,
    staff: "Kolawole V.",
    action,
    resource,
    ip: "102.89.44.12",
    status: "Success"
  });
  renderActivityLogsTable();
}

// -----------------------------------------------------
// Categories Grid
// -----------------------------------------------------
function renderCategoriesGrid() {
  const container = document.getElementById('categories-cards-grid');
  if (!container) return;

  container.innerHTML = categoriesState.map(cat => `
    <div class="category-admin-card">
      <img src="${cat.image}" alt="${cat.name}" class="category-admin-img" onerror="this.src='./images/cam1.png.jpg'">
      <div class="category-admin-body">
        <h3>${cat.name}</h3>
        <p>${cat.desc}</p>
        <span class="cat-count">${cat.count} Linked Products</span>
        <div class="card-actions-row">
          <button class="btn-sm" onclick="editCategoryModal('${cat.id}')">Edit</button>
          <button class="btn-sm text-danger" onclick="deleteCategory('${cat.id}')">Delete</button>
        </div>
      </div>
    </div>
  `).join('');
}

// -----------------------------------------------------
// Inventory Table
// -----------------------------------------------------
function renderInventoryTable(filter = 'ALL') {
  const tbody = document.getElementById('inventory-table');
  if (!tbody) return;

  let filtered = catalogState;
  if (filter === 'LOW') filtered = catalogState.filter(p => p.stock > 0 && p.stock < 3);
  if (filter === 'OUT') filtered = catalogState.filter(p => p.stock === 0);

  tbody.innerHTML = filtered.map(p => `
    <tr>
      <td><strong>${p.name}</strong></td>
      <td><span class="category-tag">${p.category}</span></td>
      <td><strong>${p.stock} units</strong></td>
      <td><span class="badge ${p.stock === 0 ? 'badge-danger' : p.stock < 3 ? 'badge-warning' : 'badge-success'}">${p.stock === 0 ? 'Out of Stock' : p.stock < 3 ? 'Low Stock' : 'Optimal'}</span></td>
      <td>
        <button class="btn-sm" onclick="adjustStock('${p.id}', 1)">+1</button>
        <button class="btn-sm" onclick="adjustStock('${p.id}', -1)">-1</button>
      </td>
    </tr>
  `).join('');
}

window.adjustStock = function(prodId, change) {
  const p = catalogState.find(item => item.id === prodId);
  if (!p) return;
  p.stock = Math.max(0, p.stock + change);
  p.availability = p.stock === 0 ? 'Out of Stock' : p.stock < 3 ? 'Low Stock' : 'In Stock';
  renderInventoryTable(document.getElementById('inventory-filter-select')?.value || 'ALL');
  renderProductsTable();
  updateStatsCounters();
  logActivity(`Adjusted inventory for ${p.name} by ${change > 0 ? '+' + change : change} (New stock: ${p.stock})`, prodId);
};

// =====================================================
// 5. SEARCH & FILTER CONTROLLER
// =====================================================

function initSearchAndFilters() {
  // Product Search & Filter
  const pSearch = document.getElementById('product-search-input');
  const pCat = document.getElementById('product-category-filter');
  const pSort = document.getElementById('product-sort-select');

  function filterProducts() {
    const term = (pSearch?.value || '').toLowerCase();
    const cat = pCat?.value || 'ALL';
    const sort = pSort?.value || 'DEFAULT';

    let res = catalogState.filter(p => {
      const matchText = p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term);
      const matchCat = cat === 'ALL' || p.category === cat;
      return matchText && matchCat;
    });

    if (sort === 'PRICE_DESC') res.sort((a, b) => b.price - a.price);
    if (sort === 'PRICE_ASC') res.sort((a, b) => a.price - b.price);
    if (sort === 'STOCK_DESC') res.sort((a, b) => b.stock - a.stock);

    renderProductsTable(res);
  }

  pSearch?.addEventListener('input', filterProducts);
  pCat?.addEventListener('change', filterProducts);
  pSort?.addEventListener('change', filterProducts);

  // Orders Search & Filter
  const ordSearch = document.getElementById('order-search-input');
  const ordStatus = document.getElementById('order-status-filter');

  function filterOrders() {
    const term = (ordSearch?.value || '').toLowerCase();
    const status = ordStatus?.value || 'ALL';

    const res = ordersState.filter(o => {
      const matchText = o.id.toLowerCase().includes(term) || o.customer.toLowerCase().includes(term) || o.email.toLowerCase().includes(term);
      const matchStatus = status === 'ALL' || o.status === status;
      return matchText && matchStatus;
    });

    renderOrdersTable(res);
  }

  ordSearch?.addEventListener('input', filterOrders);
  ordStatus?.addEventListener('change', filterOrders);

  // Customers Search
  const custSearch = document.getElementById('customer-search-input');
  custSearch?.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const res = customersState.filter(c => c.name.toLowerCase().includes(term) || c.email.toLowerCase().includes(term) || c.location.toLowerCase().includes(term));
    renderCustomersTable(res);
  });

  // Inventory Filter
  const invFilter = document.getElementById('inventory-filter-select');
  invFilter?.addEventListener('change', (e) => {
    renderInventoryTable(e.target.value);
  });

  // Notifications Filter Tabs
  document.querySelectorAll('#notif-filter-tabs .filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#notif-filter-tabs .filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderNotificationsList(tab.dataset.notifFilter);
    });
  });

  // Support Priority Filter
  document.getElementById('support-priority-filter')?.addEventListener('change', (e) => {
    const val = e.target.value;
    const res = val === 'ALL' ? supportState : supportState.filter(t => t.priority === val);
    renderSupportTable(res);
  });
}

function initGlobalSearch() {
  const globalInput = document.getElementById('global-admin-search');
  globalInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const term = globalInput.value.trim().toLowerCase();
      if (!term) return;

      // Check if product matches
      const hasProd = catalogState.some(p => p.name.toLowerCase().includes(term));
      if (hasProd) {
        window.switchAdminView('products-view');
        const pSearch = document.getElementById('product-search-input');
        if (pSearch) { pSearch.value = term; pSearch.dispatchEvent(new Event('input')); }
        return;
      }

      // Check if order matches
      const hasOrder = ordersState.some(o => o.id.toLowerCase().includes(term) || o.customer.toLowerCase().includes(term));
      if (hasOrder) {
        window.switchAdminView('orders-view');
        const oSearch = document.getElementById('order-search-input');
        if (oSearch) { oSearch.value = term; oSearch.dispatchEvent(new Event('input')); }
        return;
      }

      // Check if customer matches
      const hasCust = customersState.some(c => c.name.toLowerCase().includes(term) || c.email.toLowerCase().includes(term));
      if (hasCust) {
        window.switchAdminView('customers-view');
        const cSearch = document.getElementById('customer-search-input');
        if (cSearch) { cSearch.value = term; cSearch.dispatchEvent(new Event('input')); }
        return;
      }

      alert(`No direct matches across products, orders, or clients for "${term}".`);
    }
  });
}

// =====================================================
// 6. PRODUCT CRUD CONTROLLER
// =====================================================

window.prepareAddProductView = function() {
  const form = document.getElementById('product-crud-form');
  if (form) form.reset();
  document.getElementById('form-product-id').value = '';
  document.getElementById('form-view-heading').textContent = 'Add New Cine Gear';
  document.getElementById('image-preview-tag').classList.add('hidden');
  window.switchAdminView('add-product-view');
};

window.editProduct = function(prodId) {
  const prod = catalogState.find(p => p.id === prodId);
  if (!prod) return;

  document.getElementById('form-product-id').value = prod.id;
  document.getElementById('form-product-name').value = prod.name;
  document.getElementById('form-product-category').value = prod.category;
  document.getElementById('form-product-price').value = prod.price;
  document.getElementById('form-product-stock').value = prod.stock;
  document.getElementById('form-product-availability').value = prod.availability;
  document.getElementById('form-product-image').value = prod.image;
  document.getElementById('form-product-description').value = prod.description || '';
  document.getElementById('form-product-featured').checked = !!prod.featured;

  const previewTag = document.getElementById('image-preview-tag');
  if (previewTag) {
    previewTag.src = prod.image;
    previewTag.classList.remove('hidden');
  }

  document.getElementById('form-view-heading').textContent = `Edit Gear: ${prod.name}`;
  window.switchAdminView('add-product-view');
};

window.deleteProduct = function(prodId) {
  const prod = catalogState.find(p => p.id === prodId);
  if (!prod) return;
  if (confirm(`Are you certain you wish to remove "${prod.name}" from the active catalog?`)) {
    catalogState = catalogState.filter(p => p.id !== prodId);
    renderProductsTable();
    renderInventoryTable();
    updateStatsCounters();
    logActivity(`Removed product from catalog: ${prod.name}`, prodId);
  }
};

function initFormListeners() {
  // Image URL preview listener
  const imgInput = document.getElementById('form-product-image');
  const previewTag = document.getElementById('image-preview-tag');

  imgInput?.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    if (val && previewTag) {
      previewTag.src = val;
      previewTag.classList.remove('hidden');
    } else if (previewTag) {
      previewTag.classList.add('hidden');
    }
  });

  // Product CRUD Form Submission
  const form = document.getElementById('product-crud-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('form-product-id').value;
    const name = document.getElementById('form-product-name').value.trim();
    const category = document.getElementById('form-product-category').value;
    const price = Number(document.getElementById('form-product-price').value);
    const stock = Number(document.getElementById('form-product-stock').value);
    const availability = document.getElementById('form-product-availability').value;
    const image = document.getElementById('form-product-image').value.trim();
    const description = document.getElementById('form-product-description').value.trim();
    const featured = document.getElementById('form-product-featured').checked;

    if (id) {
      // Update existing
      const existing = catalogState.find(p => p.id === id);
      if (existing) {
        Object.assign(existing, { name, category, price, stock, availability, image, description, featured });
        logActivity(`Updated specs for product ${name}`, id);
      }
    } else {
      // Create new
      const newId = `prod-${Date.now().toString().slice(-4)}`;
      catalogState.unshift({ id: newId, name, category, price, stock, availability, image, description, featured });
      logActivity(`Created new catalog item ${name}`, newId);
    }

    renderProductsTable();
    renderInventoryTable();
    updateStatsCounters();

    const msg = document.getElementById('form-feedback-msg');
    if (msg) {
      msg.textContent = 'Product saved successfully!';
      msg.className = 'feedback-msg success';
      setTimeout(() => {
        msg.textContent = '';
        window.switchAdminView('products-view');
      }, 800);
    }
  });

  // Store Settings Form Submission
  document.getElementById('store-settings-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const feedback = document.getElementById('settings-feedback-msg');
    if (feedback) {
      feedback.textContent = 'Preferences saved successfully and cached across regional clusters.';
      feedback.className = 'feedback-msg success';
      setTimeout(() => { feedback.textContent = ''; }, 3000);
    }
    logActivity('Updated Global Store Preferences', 'settings');
  });
}

// =====================================================
// 7. MODALS INFRASTRUCTURE
// =====================================================

function initModalListeners() {
  const overlay = document.getElementById('admin-modal-overlay');
  const closeBtn = document.getElementById('modal-close-btn');

  closeBtn?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
}

window.openModal = function(title, htmlContent) {
  const overlay = document.getElementById('admin-modal-overlay');
  const titleEl = document.getElementById('modal-title');
  const bodyEl = document.getElementById('modal-body-content');

  if (titleEl) titleEl.textContent = title;
  if (bodyEl) bodyEl.innerHTML = htmlContent;
  if (overlay) overlay.classList.remove('hidden');
};

window.closeModal = function() {
  const overlay = document.getElementById('admin-modal-overlay');
  if (overlay) overlay.classList.add('hidden');
};

// -----------------------------------------------------
// Modal Dialogues
// -----------------------------------------------------
window.openCategoryModal = function() {
  openModal('Create New Gear Category', `
    <form id="create-cat-form" onsubmit="handleCreateCategory(event)" class="admin-form">
      <div class="form-group">
        <label>Category Title *</label>
        <input type="text" id="modal-cat-name" required placeholder="e.g. Audio &amp; Sound Recording">
      </div>
      <div class="form-group">
        <label>Category Tagline *</label>
        <input type="text" id="modal-cat-desc" required placeholder="e.g. Shotgun mics, wireless lavaliers, field recorders">
      </div>
      <div class="form-group">
        <label>Cover Image URL *</label>
        <input type="url" id="modal-cat-img" required value="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=400&q=80">
      </div>
      <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:16px;">
        <button type="button" class="button-outline" onclick="closeModal()">Cancel</button>
        <button type="submit" class="button-gold">Create Category</button>
      </div>
    </form>
  `);
};

window.handleCreateCategory = function(e) {
  e.preventDefault();
  const name = document.getElementById('modal-cat-name').value.trim();
  const desc = document.getElementById('modal-cat-desc').value.trim();
  const image = document.getElementById('modal-cat-img').value.trim();
  const id = `cat-${categoriesState.length + 1}`;

  categoriesState.push({ id, name, desc, count: 0, image });
  renderCategoriesGrid();
  closeModal();
  logActivity(`Created new gear category: ${name}`, id);
};

window.editCategoryModal = function(catId) {
  const c = categoriesState.find(item => item.id === catId);
  if (!c) return;

  openModal(`Edit Category: ${c.name}`, `
    <form id="edit-cat-form" onsubmit="handleEditCategory(event, '${c.id}')" class="admin-form">
      <div class="form-group">
        <label>Category Title *</label>
        <input type="text" id="modal-edit-cat-name" required value="${c.name}">
      </div>
      <div class="form-group">
        <label>Category Tagline *</label>
        <input type="text" id="modal-edit-cat-desc" required value="${c.desc}">
      </div>
      <div class="form-group">
        <label>Cover Image URL *</label>
        <input type="url" id="modal-edit-cat-img" required value="${c.image}">
      </div>
      <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:16px;">
        <button type="button" class="button-outline" onclick="closeModal()">Cancel</button>
        <button type="submit" class="button-gold">Save Changes</button>
      </div>
    </form>
  `);
};

window.handleEditCategory = function(e, catId) {
  e.preventDefault();
  const c = categoriesState.find(item => item.id === catId);
  if (!c) return;

  c.name = document.getElementById('modal-edit-cat-name').value.trim();
  c.desc = document.getElementById('modal-edit-cat-desc').value.trim();
  c.image = document.getElementById('modal-edit-cat-img').value.trim();

  renderCategoriesGrid();
  closeModal();
  logActivity(`Updated category: ${c.name}`, catId);
};

window.deleteCategory = function(catId) {
  const c = categoriesState.find(item => item.id === catId);
  if (!c) return;
  if (confirm(`Delete category "${c.name}"?`)) {
    categoriesState = categoriesState.filter(item => item.id !== catId);
    renderCategoriesGrid();
    logActivity(`Deleted category: ${c.name}`, catId);
  }
};

window.openCouponModal = function() {
  openModal('Generate Promotional Coupon Code', `
    <form onsubmit="handleCreateCoupon(event)" class="admin-form">
      <div class="form-group">
        <label>Promo Code Tag (All Caps) *</label>
        <input type="text" id="modal-coupon-code" required placeholder="e.g. CINEMARTVIP" style="text-transform:uppercase;">
      </div>
      <div class="form-grid-2">
        <div class="form-group">
          <label>Discount Type</label>
          <select id="modal-coupon-type">
            <option value="PERCENT">Percentage (%)</option>
            <option value="FLAT">Flat NGN (₦)</option>
          </select>
        </div>
        <div class="form-group">
          <label>Value *</label>
          <input type="number" id="modal-coupon-val" required placeholder="10 or 150000">
        </div>
      </div>
      <div class="form-grid-2">
        <div class="form-group">
          <label>Minimum Order (₦)</label>
          <input type="number" id="modal-coupon-min" value="500000">
        </div>
        <div class="form-group">
          <label>Expiry Date *</label>
          <input type="date" id="modal-coupon-expiry" required value="2026-06-30">
        </div>
      </div>
      <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:16px;">
        <button type="button" class="button-outline" onclick="closeModal()">Cancel</button>
        <button type="submit" class="button-gold">Activate Promo Code</button>
      </div>
    </form>
  `);
};

window.handleCreateCoupon = function(e) {
  e.preventDefault();
  const code = document.getElementById('modal-coupon-code').value.trim().toUpperCase();
  const type = document.getElementById('modal-coupon-type').value;
  const val = Number(document.getElementById('modal-coupon-val').value);
  const minOrder = Number(document.getElementById('modal-coupon-min').value);
  const expiry = document.getElementById('modal-coupon-expiry').value;

  const discount = type === 'PERCENT' ? `${val}% OFF` : `₦${val.toLocaleString()} Flat`;

  couponsState.unshift({ code, discount, type, value: val, redemptions: 0, minOrder, expiry, active: true });
  renderCouponsTable();
  closeModal();
  logActivity(`Activated new promo coupon code ${code}`, 'coupons');
};

window.openStaffModal = function() {
  openModal('Grant Administrative Access', `
    <form onsubmit="handleCreateStaff(event)" class="admin-form">
      <div class="form-group">
        <label>Full Name *</label>
        <input type="text" id="modal-staff-name" required placeholder="e.g. Folake Adeyemi">
      </div>
      <div class="form-group">
        <label>Official Email *</label>
        <input type="email" id="modal-staff-email" required placeholder="folake@cinemart.ng">
      </div>
      <div class="form-group">
        <label>Portal Role</label>
        <select id="modal-staff-role">
          <option value="Fulfillment Officer">Fulfillment Officer</option>
          <option value="Catalog Manager">Catalog Manager</option>
          <option value="Support Specialist">Support Specialist</option>
          <option value="Executive Administrator">Executive Administrator</option>
        </select>
      </div>
      <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:16px;">
        <button type="button" class="button-outline" onclick="closeModal()">Cancel</button>
        <button type="submit" class="button-gold">Dispatch Invitation</button>
      </div>
    </form>
  `);
};

window.handleCreateStaff = function(e) {
  e.preventDefault();
  const name = document.getElementById('modal-staff-name').value.trim();
  const email = document.getElementById('modal-staff-email').value.trim();
  const role = document.getElementById('modal-staff-role').value;

  staffState.push({
    name,
    role,
    email,
    twoFactor: "Invited (Pending 2FA)",
    lastActive: "Invited",
    permissions: role === 'Executive Administrator' ? 'Full Access' : 'Scoped Operations'
  });

  renderStaffTable();
  closeModal();
  alert(`Invitation dispatched to ${email}. Staff member registered.`);
  logActivity(`Dispatched administrative invitation to ${email} as ${role}`, 'staff');
};

window.openCreateShipmentModal = function() {
  openModal('Dispatch Consignment Waybill', `
    <form onsubmit="handleCreateShipment(event)" class="admin-form">
      <div class="form-group">
        <label>Associated Order ID *</label>
        <select id="modal-ship-order">
          ${ordersState.map(o => `<option value="${o.id}">${o.id} - ${o.customer}</option>`).join('')}
        </select>
      </div>
      <div class="form-grid-2">
        <div class="form-group">
          <label>Courier Carrier</label>
          <select id="modal-ship-courier">
            <option value="DHL Express">DHL Express</option>
            <option value="GIG Logistics">GIG Logistics</option>
            <option value="Red Star Express">Red Star Express</option>
          </select>
        </div>
        <div class="form-group">
          <label>Waybill Tracking Number *</label>
          <input type="text" id="modal-ship-tracking" required placeholder="e.g. DHL-NG-99011">
        </div>
      </div>
      <div class="form-group">
        <label>Destination City *</label>
        <input type="text" id="modal-ship-dest" required placeholder="e.g. Ikeja, Lagos">
      </div>
      <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:16px;">
        <button type="button" class="button-outline" onclick="closeModal()">Cancel</button>
        <button type="submit" class="button-gold">Confirm Dispatch</button>
      </div>
    </form>
  `);
};

window.handleCreateShipment = function(e) {
  e.preventDefault();
  const orderId = document.getElementById('modal-ship-order').value;
  const courier = document.getElementById('modal-ship-courier').value;
  const tracking = document.getElementById('modal-ship-tracking').value.trim();
  const destination = document.getElementById('modal-ship-dest').value.trim();

  shippingState.unshift({
    tracking,
    orderId,
    destination,
    courier,
    eta: "In Transit (2-3 Business Days)",
    status: "Dispatched"
  });

  renderShippingTable();
  closeModal();
  alert(`Consignment waybill ${tracking} recorded. Real-time courier webhooks established.`);
  logActivity(`Created shipment dispatch waybill ${tracking} for ${orderId}`, 'shipping');
};

window.printOrderInvoice = function() {
  window.print();
};

// =====================================================
// 8. DATA EXPORTS CONTROLLER (REAL FILE DOWNLOADS)
// =====================================================

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

window.exportOrdersCSV = function() {
  const headers = "Order ID,Customer,Email,Total (NGN),Payment Status,Fulfillment Status,Date\n";
  const rows = ordersState.map(o => `"${o.id}","${o.customer}","${o.email}",${o.total},"${o.payment}","${o.status}","${o.date}"`).join("\n");
  downloadFile('cinemart-orders-sales-report.csv', headers + rows, 'text/csv');
  logActivity('Exported Sales Orders CSV Report', 'reports');
};

window.exportOrdersJSON = function() {
  downloadFile('cinemart-orders-export.json', JSON.stringify(ordersState, null, 2), 'application/json');
  logActivity('Exported Sales Orders JSON Package', 'reports');
};

window.exportInventoryCSV = function() {
  const headers = "SKU,Product Name,Category,Price (NGN),Stock Units,Availability\n";
  const rows = catalogState.map(p => `"${p.id}","${p.name}","${p.category}",${p.price},${p.stock},"${p.availability}"`).join("\n");
  downloadFile('cinemart-inventory-asset-report.csv', headers + rows, 'text/csv');
  logActivity('Exported Warehouse Inventory CSV Report', 'reports');
};

window.exportInventoryJSON = function() {
  downloadFile('cinemart-catalog-export.json', JSON.stringify(catalogState, null, 2), 'application/json');
  logActivity('Exported Catalog Inventory JSON Package', 'reports');
};

window.exportPaymentsCSV = function() {
  const headers = "Transaction Ref,Order ID,Customer,Channel,Gateway,Amount (NGN),Status,Timestamp\n";
  const rows = paymentsState.map(p => `"${p.ref}","${p.orderId}","${p.customer}","${p.channel}","${p.gateway}",${p.amount},"${p.status}","${p.date}"`).join("\n");
  downloadFile('cinemart-payments-settlement-report.csv', headers + rows, 'text/csv');
  logActivity('Exported Payment Settlements CSV Report', 'reports');
};

window.exportLogsCSV = function() {
  const headers = "Timestamp,Authorized Staff,Action Taken,Resource,IP Address,Status\n";
  const rows = activityLogsState.map(l => `"${l.time}","${l.staff}","${l.action}","${l.resource}","${l.ip}","${l.status}"`).join("\n");
  downloadFile('cinemart-security-audit-trail.csv', headers + rows, 'text/csv');
};




