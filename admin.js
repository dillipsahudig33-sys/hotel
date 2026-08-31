/**
 * HOTEL SPANDAN - MANAGER ADMIN ENGINE
 * Comprehensive Management System for Table Reservations, Food Orders & Inquiries
 */

// ==========================================
// 1. DATA REPOSITORY & SEED DATA INITIALIZATION
// ==========================================
const DEFAULT_AUTH = {
  username: "admin",
  password: "spandan123",
  restaurantName: "Hotel Spandan (ହୋଟେଲ ସ୍ପନ୍ଦନ)",
  whatsappPhone: "919876543210"
};

const SEED_RESERVATIONS = [
  {
    id: "SPANDAN-TBL-8921",
    name: "Soumya Ranjan Dash",
    phone: "9861234567",
    date: new Date().toISOString().split("T")[0],
    time: "07:30 PM",
    guests: "4 Guests (Family Table)",
    occasion: "Family Dinner",
    notes: "Please arrange Royal Odia Pakhala Thali and quiet table.",
    status: "confirmed",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: "SPANDAN-TBL-7452",
    name: "Dr. Alok Kumar Nayak",
    phone: "9437123890",
    date: new Date().toISOString().split("T")[0],
    time: "08:30 PM",
    guests: "6 Guests (Large Table)",
    occasion: "Executive Dining",
    notes: "Requires high chair and Spandan Special Handi Curry pre-booked.",
    status: "pending",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: "SPANDAN-TBL-6204",
    name: "Manaswini Tripathy",
    phone: "9778012345",
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    time: "01:30 PM",
    guests: "4 Guests (Family Table)",
    occasion: "Lunch Meal",
    notes: "Pure vegetarian setup requested.",
    status: "confirmed",
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString()
  }
];

const SEED_ORDERS = [
  {
    id: "ORD-9412",
    customerName: "Pritam Patnaik",
    phone: "9853214567",
    type: "Takeaway / Parcel",
    items: [
      { name: "Royal Odia Pakhala Thali", qty: 2, price: 280 },
      { name: "Spandan Special Handi Curry", qty: 1, price: 340 },
      { name: "Butter Garlic Naan", qty: 3, price: 65 }
    ],
    total: 1095,
    status: "preparing",
    createdAt: new Date(Date.now() - 1800000).toISOString()
  },
  {
    id: "ORD-8831",
    customerName: "Rakesh Mohanty",
    phone: "9438901234",
    type: "Dine-in Order",
    items: [
      { name: "Spiced Tandoori Chicken Crunch", qty: 1, price: 320 },
      { name: "Royal Dum Handi Biryani", qty: 2, price: 290 },
      { name: "Mango Saffron Cooler", qty: 2, price: 120 }
    ],
    total: 1140,
    status: "ready",
    createdAt: new Date(Date.now() - 3600000).toISOString()
  }
];

const SEED_INQUIRIES = [
  {
    id: "INQ-4102",
    name: "Subrat Panda",
    phone: "9937890123",
    email: "subrat.panda@gmail.com",
    subject: "Bulk Food Order / Takeaway",
    message: "Need 25 packs of Royal Odia Pakhala Thali for a family function this Sunday afternoon. Please share bulk discount quote.",
    status: "new",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: "INQ-3891",
    name: "Archana Mohanty",
    phone: "9861009876",
    email: "archana.m@yahoo.com",
    subject: "Table Reservation",
    message: "Would like to book a 6-guest family dinner table for tomorrow 8 PM.",
    status: "replied",
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
  }
];

// Initialize Storage Databases
function initDatabase() {
  if (!localStorage.getItem("spandan_auth")) {
    localStorage.setItem("spandan_auth", JSON.stringify(DEFAULT_AUTH));
  }
  if (!localStorage.getItem("spandan_reservations")) {
    localStorage.setItem("spandan_reservations", JSON.stringify(SEED_RESERVATIONS));
  }
  if (!localStorage.getItem("spandan_orders")) {
    localStorage.setItem("spandan_orders", JSON.stringify(SEED_ORDERS));
  }
  if (!localStorage.getItem("spandan_inquiries")) {
    localStorage.setItem("spandan_inquiries", JSON.stringify(SEED_INQUIRIES));
  }
}

// Getters and Setters
function getAuth() {
  return JSON.parse(localStorage.getItem("spandan_auth") || JSON.stringify(DEFAULT_AUTH));
}
function getReservations() {
  return JSON.parse(localStorage.getItem("spandan_reservations") || "[]");
}
function saveReservations(data) {
  localStorage.setItem("spandan_reservations", JSON.stringify(data));
}
function getOrders() {
  return JSON.parse(localStorage.getItem("spandan_orders") || "[]");
}
function saveOrders(data) {
  localStorage.setItem("spandan_orders", JSON.stringify(data));
}
function getInquiries() {
  return JSON.parse(localStorage.getItem("spandan_inquiries") || "[]");
}
function saveInquiries(data) {
  localStorage.setItem("spandan_inquiries", JSON.stringify(data));
}

// ==========================================
// 2. AUTHENTICATION CONTROLLER
// ==========================================
function checkAuth() {
  const isLogged = sessionStorage.getItem("spandan_admin_logged") === "true";
  const authWrapper = document.getElementById("authWrapper");
  const adminApp = document.getElementById("adminApp");

  if (isLogged) {
    if (authWrapper) authWrapper.style.display = "none";
    if (adminApp) adminApp.style.display = "flex";
    loadDashboard();
  } else {
    if (authWrapper) authWrapper.style.display = "flex";
    if (adminApp) adminApp.style.display = "none";
  }
}

function handleLogin(e) {
  e.preventDefault();
  const usernameInput = document.getElementById("adminUsername")?.value.trim();
  const passwordInput = document.getElementById("adminPassword")?.value.trim();
  const errorMsg = document.getElementById("authErrorMsg");

  const currentAuth = getAuth();

  if (usernameInput === currentAuth.username && passwordInput === currentAuth.password) {
    sessionStorage.setItem("spandan_admin_logged", "true");
    if (errorMsg) errorMsg.style.display = "none";
    checkAuth();
  } else {
    if (errorMsg) {
      errorMsg.textContent = "Invalid username or password. Please try again.";
      errorMsg.style.display = "block";
    }
  }
}

function handleLogout() {
  if (confirm("Are you sure you want to log out from Hotel Spandan Admin?")) {
    sessionStorage.removeItem("spandan_admin_logged");
    checkAuth();
  }
}

// ==========================================
// 3. TAB NAVIGATION
// ==========================================
let currentTab = "dashboard";

function switchTab(tabId) {
  currentTab = tabId;

  // Update navigation items
  document.querySelectorAll(".nav-item-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tabId);
  });

  // Update views
  document.querySelectorAll(".tab-content-view").forEach(view => {
    view.classList.toggle("active", view.id === `view-${tabId}`);
  });

  // Update topbar page title
  const pageTitle = document.getElementById("topbarPageTitle");
  const titles = {
    dashboard: "Live Dashboard & Overview",
    reservations: "Table Reservations Manager",
    orders: "Food Orders & Kitchen Queue",
    inquiries: "Customer Inquiries & Messages",
    menu: "Digital Menu & Price Catalog",
    settings: "System & Manager Settings"
  };
  if (pageTitle) pageTitle.textContent = titles[tabId] || "Admin Dashboard";

  // Refresh tab content
  if (tabId === "dashboard") loadDashboard();
  if (tabId === "reservations") renderReservationsTable();
  if (tabId === "orders") renderOrdersTable();
  if (tabId === "inquiries") renderInquiriesTable();
  if (tabId === "menu") renderMenuCatalog();
  if (tabId === "settings") loadSettings();

  // Close mobile sidebar if open
  const sidebar = document.querySelector(".admin-sidebar");
  if (sidebar && window.innerWidth <= 992) {
    sidebar.classList.remove("open");
  }
}

// ==========================================
// 4. LIVE DASHBOARD OVERVIEW
// ==========================================
function loadDashboard() {
  const reservations = getReservations();
  const orders = getOrders();
  const inquiries = getInquiries();

  const todayStr = new Date().toISOString().split("T")[0];

  // 1. Calculate metrics
  const todayReservations = reservations.filter(r => r.date === todayStr);
  const activeOrders = orders.filter(o => o.status !== "completed" && o.status !== "cancelled");
  const totalRevenue = orders
    .filter(o => o.status === "completed" || o.status === "ready" || o.status === "preparing")
    .reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingInquiries = inquiries.filter(i => i.status === "new");

  // 2. Set KPI metrics
  const elBookingsCount = document.getElementById("kpiBookingsCount");
  const elOrdersCount = document.getElementById("kpiOrdersCount");
  const elRevenueAmount = document.getElementById("kpiRevenueAmount");
  const elInquiriesCount = document.getElementById("kpiInquiriesCount");

  if (elBookingsCount) elBookingsCount.textContent = todayReservations.length;
  if (elOrdersCount) elOrdersCount.textContent = activeOrders.length;
  if (elRevenueAmount) elRevenueAmount.textContent = `₹${totalRevenue.toLocaleString("en-IN")}`;
  if (elInquiriesCount) elInquiriesCount.textContent = pendingInquiries.length;

  // 3. Set badges in sidebar
  const badgeRes = document.getElementById("badgeReservations");
  const badgeOrd = document.getElementById("badgeOrders");
  const badgeInq = document.getElementById("badgeInquiries");

  if (badgeRes) badgeRes.textContent = reservations.filter(r => r.status === "pending").length;
  if (badgeOrd) badgeOrd.textContent = activeOrders.length;
  if (badgeInq) badgeInq.textContent = pendingInquiries.length;

  // 4. Render recent activity on Dashboard
  renderDashboardActivity();
}

function renderDashboardActivity() {
  const reservations = getReservations().slice(0, 5);
  const tbody = document.getElementById("dashRecentReservationsBody");
  if (!tbody) return;

  if (reservations.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6">
          <div class="empty-table-state">
            <i class="fa-solid fa-calendar-xmark"></i>
            <h4>No Recent Reservations</h4>
            <p>New bookings placed by customers on your website will appear here in real time.</p>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = reservations.map(r => `
    <tr>
      <td><strong>${r.id}</strong></td>
      <td>
        <div><strong>${r.name}</strong></div>
        <small style="color:var(--admin-text-muted);">${r.phone}</small>
      </td>
      <td>
        <div><i class="fa-regular fa-calendar text-gold"></i> ${r.date}</div>
        <small style="color:var(--admin-gold);"><i class="fa-regular fa-clock"></i> ${r.time}</small>
      </td>
      <td>
        <span class="status-pill status-info"><i class="fa-solid fa-users"></i> ${r.guests}</span>
      </td>
      <td>
        <span class="status-pill status-${r.status}">${r.status}</span>
      </td>
      <td>
        <div class="table-actions">
          <a href="https://wa.me/91${r.phone.replace(/[^0-9]/g, '')}?text=Namaste%20${encodeURIComponent(r.name)},%20Hotel%20Spandan%20confirms%20your%20table%20reservation%20(Ref:%20${r.id})%20on%20${r.date}%20at%20${r.time}.%20We%20look%20forward%20to%20welcoming%20you!" target="_blank" class="btn-icon-tbl wa-green" title="WhatsApp Customer">
            <i class="fa-brands fa-whatsapp"></i>
          </a>
          <a href="tel:${r.phone}" class="btn-icon-tbl" title="Call Customer">
            <i class="fa-solid fa-phone"></i>
          </a>
        </div>
      </td>
    </tr>
  `).join("");
}

// ==========================================
// 5. RESERVATIONS MANAGEMENT
// ==========================================
let resFilterStatus = "all";
let resSearchQuery = "";

function renderReservationsTable() {
  const reservations = getReservations();
  const tbody = document.getElementById("reservationsTableBody");
  if (!tbody) return;

  let filtered = reservations.filter(r => {
    const matchStatus = resFilterStatus === "all" || r.status === resFilterStatus;
    const matchSearch = !resSearchQuery || 
      r.name.toLowerCase().includes(resSearchQuery.toLowerCase()) ||
      r.phone.includes(resSearchQuery) ||
      r.id.toLowerCase().includes(resSearchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7">
          <div class="empty-table-state">
            <i class="fa-solid fa-chair"></i>
            <h4>No Table Reservations Found</h4>
            <p>Try adjusting your search criteria or add a manual walk-in booking.</p>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(r => `
    <tr>
      <td><strong>${r.id}</strong></td>
      <td>
        <div><strong>${r.name}</strong></div>
        <small style="color:var(--admin-text-muted);"><i class="fa-solid fa-phone"></i> ${r.phone}</small>
      </td>
      <td>
        <div><i class="fa-regular fa-calendar"></i> ${r.date}</div>
        <small style="color:var(--admin-gold);"><i class="fa-regular fa-clock"></i> ${r.time}</small>
      </td>
      <td>
        <strong>${r.guests}</strong>
        <div style="font-size:0.75rem; color:var(--admin-text-dim);">${r.occasion || 'Dining'}</div>
      </td>
      <td>
        <small style="color:#cbd5e1; max-width:200px; display:block; line-height:1.3;">${r.notes || 'None'}</small>
      </td>
      <td>
        <select class="select-filter" style="font-size:0.75rem; padding:0.25rem 0.5rem;" onchange="updateReservationStatus('${r.id}', this.value)">
          <option value="pending" ${r.status === 'pending' ? 'selected' : ''}>🟡 Pending</option>
          <option value="confirmed" ${r.status === 'confirmed' ? 'selected' : ''}>🔵 Confirmed</option>
          <option value="seated" ${r.status === 'seated' ? 'selected' : ''}>🟣 Seated</option>
          <option value="completed" ${r.status === 'completed' ? 'selected' : ''}>🟢 Completed</option>
          <option value="cancelled" ${r.status === 'cancelled' ? 'selected' : ''}>🔴 Cancelled</option>
        </select>
      </td>
      <td>
        <div class="table-actions">
          <a href="https://wa.me/91${r.phone.replace(/[^0-9]/g, '')}?text=Namaste%20${encodeURIComponent(r.name)},%20Hotel%20Spandan%20confirms%20your%20table%20reservation%20(Ref:%20${r.id})%20on%20${r.date}%20at%20${r.time}.%20We%20look%20forward%20to%20welcoming%20you!" target="_blank" class="btn-icon-tbl wa-green" title="WhatsApp Customer">
            <i class="fa-brands fa-whatsapp"></i>
          </a>
          <button class="btn-icon-tbl danger" onclick="deleteReservation('${r.id}')" title="Delete Booking">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join("");
}

function updateReservationStatus(id, newStatus) {
  const reservations = getReservations();
  const item = reservations.find(r => r.id === id);
  if (item) {
    item.status = newStatus;
    saveReservations(reservations);
    renderReservationsTable();
    loadDashboard();
  }
}

function deleteReservation(id) {
  if (confirm(`Delete reservation record ${id}?`)) {
    let reservations = getReservations();
    reservations = reservations.filter(r => r.id !== id);
    saveReservations(reservations);
    renderReservationsTable();
    loadDashboard();
  }
}

function handleAddManualReservation(e) {
  e.preventDefault();
  const name = document.getElementById("mResName")?.value.trim();
  const phone = document.getElementById("mResPhone")?.value.trim();
  const date = document.getElementById("mResDate")?.value;
  const time = document.getElementById("mResTime")?.value;
  const guests = document.getElementById("mResGuests")?.value;
  const occasion = document.getElementById("mResOccasion")?.value;
  const notes = document.getElementById("mResNotes")?.value.trim();

  const newRes = {
    id: "SPANDAN-TBL-" + Math.floor(1000 + Math.random() * 9000),
    name: name,
    phone: phone,
    date: date,
    time: time,
    guests: guests,
    occasion: occasion,
    notes: notes || "Walk-in / Direct Call Reservation",
    status: "confirmed",
    createdAt: new Date().toISOString()
  };

  const reservations = getReservations();
  reservations.unshift(newRes);
  saveReservations(reservations);

  closeModal("modalNewReservation");
  document.getElementById("formManualReservation")?.reset();
  renderReservationsTable();
  loadDashboard();
}

// ==========================================
// 6. FOOD ORDERS & KOT QUEUE
// ==========================================
let orderFilterStatus = "all";
let orderSearchQuery = "";

function renderOrdersTable() {
  const orders = getOrders();
  const tbody = document.getElementById("ordersTableBody");
  if (!tbody) return;

  let filtered = orders.filter(o => {
    const matchStatus = orderFilterStatus === "all" || o.status === orderFilterStatus;
    const matchSearch = !orderSearchQuery ||
      o.id.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      o.phone.includes(orderSearchQuery);
    return matchStatus && matchSearch;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7">
          <div class="empty-table-state">
            <i class="fa-solid fa-utensils"></i>
            <h4>No Food Orders Found</h4>
            <p>Customer cart checkout orders will appear here automatically.</p>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(o => {
    const dishesSummary = o.items.map(i => `${i.name} (x${i.qty})`).join(", ");
    return `
      <tr>
        <td><strong>${o.id}</strong></td>
        <td>
          <div><strong>${o.customerName}</strong></div>
          <small style="color:var(--admin-text-muted);">${o.phone}</small>
        </td>
        <td>
          <span class="status-pill status-info">${o.type || 'Takeaway'}</span>
        </td>
        <td style="max-width:260px;">
          <div style="font-size:0.85rem; color:#f1f5f9; line-height:1.35;">${dishesSummary}</div>
          <small style="color:var(--admin-text-dim);">${o.items.length} unique items</small>
        </td>
        <td>
          <strong style="color:var(--admin-gold-light); font-size:1rem;">₹${(o.total || 0).toLocaleString("en-IN")}</strong>
        </td>
        <td>
          <select class="select-filter" style="font-size:0.75rem; padding:0.25rem 0.5rem;" onchange="updateOrderStatus('${o.id}', this.value)">
            <option value="received" ${o.status === 'received' ? 'selected' : ''}>📥 Received</option>
            <option value="preparing" ${o.status === 'preparing' ? 'selected' : ''}>🍳 Preparing</option>
            <option value="ready" ${o.status === 'ready' ? 'selected' : ''}>🔔 Ready</option>
            <option value="completed" ${o.status === 'completed' ? 'selected' : ''}>✅ Delivered</option>
            <option value="cancelled" ${o.status === 'cancelled' ? 'selected' : ''}>❌ Cancelled</option>
          </select>
        </td>
        <td>
          <div class="table-actions">
            <button class="btn-icon-tbl" onclick="printKOTReceipt('${o.id}')" title="Print Kitchen Receipt (KOT)">
              <i class="fa-solid fa-print"></i>
            </button>
            <button class="btn-icon-tbl danger" onclick="deleteOrder('${o.id}')" title="Delete Order">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

function updateOrderStatus(id, newStatus) {
  const orders = getOrders();
  const order = orders.find(o => o.id === id);
  if (order) {
    order.status = newStatus;
    saveOrders(orders);
    renderOrdersTable();
    loadDashboard();
  }
}

function deleteOrder(id) {
  if (confirm(`Delete food order record ${id}?`)) {
    let orders = getOrders();
    orders = orders.filter(o => o.id !== id);
    saveOrders(orders);
    renderOrdersTable();
    loadDashboard();
  }
}

function printKOTReceipt(orderId) {
  const orders = getOrders();
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  const kotBox = document.getElementById("kotReceiptBody");
  if (!kotBox) return;

  const itemsHtml = order.items.map(i => `
    <tr>
      <td>${i.name}</td>
      <td style="text-align:center;">x${i.qty}</td>
      <td style="text-align:right;">₹${i.price * i.qty}</td>
    </tr>
  `).join("");

  kotBox.innerHTML = `
    <div class="kot-receipt-card">
      <div class="kot-header">
        <h3>HOTEL SPANDAN</h3>
        <p>ହୋଟେଲ ସ୍ପନ୍ଦନ • A/C Family Restaurant</p>
        <p>KITCHEN ORDER TICKET (KOT) / BILL</p>
      </div>
      <div class="kot-info-row">
        <span><strong>Order ID:</strong> ${order.id}</span>
        <span><strong>Type:</strong> ${order.type}</span>
      </div>
      <div class="kot-info-row">
        <span><strong>Customer:</strong> ${order.customerName}</span>
        <span><strong>Phone:</strong> ${order.phone}</span>
      </div>
      <div class="kot-info-row">
        <span><strong>Time:</strong> ${new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        <span><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</span>
      </div>
      <table class="kot-items-table">
        <thead>
          <tr style="font-weight:bold; border-bottom:1px solid #000;">
            <td>Item</td>
            <td style="text-align:center;">Qty</td>
            <td style="text-align:right;">Price</td>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>
      <div class="kot-total-row">
        <span>GRAND TOTAL:</span>
        <span>₹${order.total}</span>
      </div>
      <div style="text-align:center; margin-top:1rem; font-size:0.75rem;">
        *** Thank you for dining at Hotel Spandan ***
      </div>
    </div>
  `;

  openModal("modalKOTPrint");
}

// ==========================================
// 7. CUSTOMER INQUIRIES
// ==========================================
function renderInquiriesTable() {
  const inquiries = getInquiries();
  const tbody = document.getElementById("inquiriesTableBody");
  if (!tbody) return;

  if (inquiries.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6">
          <div class="empty-table-state">
            <i class="fa-solid fa-envelope-open-text"></i>
            <h4>No Customer Inquiries</h4>
            <p>New messages submitted from the contact form will show up here.</p>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = inquiries.map(i => `
    <tr>
      <td><strong>${i.id}</strong></td>
      <td>
        <div><strong>${i.name}</strong></div>
        <small style="color:var(--admin-text-muted);"><i class="fa-solid fa-phone"></i> ${i.phone}</small>
        ${i.email !== 'N/A' ? `<br><small style="color:var(--admin-text-dim);">${i.email}</small>` : ''}
      </td>
      <td>
        <span class="status-pill status-info">${i.subject}</span>
      </td>
      <td style="max-width:320px;">
        <div style="font-size:0.85rem; color:#e2e8f0; line-height:1.4;">${i.message}</div>
      </td>
      <td>
        <select class="select-filter" style="font-size:0.75rem; padding:0.25rem 0.5rem;" onchange="updateInquiryStatus('${i.id}', this.value)">
          <option value="new" ${i.status === 'new' ? 'selected' : ''}>🟡 New</option>
          <option value="replied" ${i.status === 'replied' ? 'selected' : ''}>🔵 Replied</option>
          <option value="resolved" ${i.status === 'resolved' ? 'selected' : ''}>🟢 Resolved</option>
        </select>
      </td>
      <td>
        <div class="table-actions">
          <a href="https://wa.me/91${i.phone.replace(/[^0-9]/g, '')}?text=Namaste%20${encodeURIComponent(i.name)},%20Thank%20you%20for%20contacting%20Hotel%20Spandan.%20Regarding%20your%20inquiry%20about%20${encodeURIComponent(i.subject)}:%20" target="_blank" class="btn-icon-tbl wa-green" title="Reply on WhatsApp">
            <i class="fa-brands fa-whatsapp"></i>
          </a>
          <button class="btn-icon-tbl danger" onclick="deleteInquiry('${i.id}')" title="Delete Inquiry">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join("");
}

function updateInquiryStatus(id, newStatus) {
  const inquiries = getInquiries();
  const inq = inquiries.find(i => i.id === id);
  if (inq) {
    inq.status = newStatus;
    saveInquiries(inquiries);
    renderInquiriesTable();
    loadDashboard();
  }
}

function deleteInquiry(id) {
  if (confirm(`Delete customer inquiry ${id}?`)) {
    let inquiries = getInquiries();
    inquiries = inquiries.filter(i => i.id !== id);
    saveInquiries(inquiries);
    renderInquiriesTable();
    loadDashboard();
  }
}

// ==========================================
// 8. MENU & PRICE CATALOG VIEWER
// ==========================================
const MENU_CATALOG = [
  { name: "Royal Odia Pakhala Thali", category: "Odia Thali", diet: "Veg", price: 280 },
  { name: "Spandan Special Handi Mutton", category: "Handi Curries", diet: "Non-Veg", price: 420 },
  { name: "Spandan Special Handi Chicken", category: "Handi Curries", diet: "Non-Veg", price: 340 },
  { name: "Spiced Tandoori Chicken Crunch", category: "Tandoori Starters", diet: "Non-Veg", price: 320 },
  { name: "Paneer Malai Tikka Sizzler", category: "Tandoori Starters", diet: "Veg", price: 260 },
  { name: "Royal Dum Handi Biryani (Mutton)", category: "Biryanis & Rice", diet: "Non-Veg", price: 380 },
  { name: "Royal Dum Handi Biryani (Chicken)", category: "Biryanis & Rice", diet: "Non-Veg", price: 290 },
  { name: "Hyderabadi Veg Dum Biryani", category: "Biryanis & Rice", diet: "Veg", price: 220 },
  { name: "Butter Garlic Tandoori Naan", category: "Breads & Roti", diet: "Veg", price: 65 },
  { name: "Amritsari Stuffed Kulcha", category: "Breads & Roti", diet: "Veg", price: 80 },
  { name: "Crispy Chilli Chicken", category: "Chinese", diet: "Non-Veg", price: 260 },
  { name: "Chilli Paneer Dry", category: "Chinese", diet: "Veg", price: 230 },
  { name: "Mango Saffron Cooler", category: "Beverages", diet: "Veg", price: 120 },
  { name: "Royal Sweet Lassi in Clay Pot", category: "Beverages", diet: "Veg", price: 90 }
];

function renderMenuCatalog() {
  const tbody = document.getElementById("menuCatalogTableBody");
  if (!tbody) return;

  tbody.innerHTML = MENU_CATALOG.map((item, idx) => `
    <tr>
      <td><strong>#${idx + 1}</strong></td>
      <td><strong>${item.name}</strong></td>
      <td><span class="status-pill status-info">${item.category}</span></td>
      <td>
        <span class="status-pill ${item.diet === 'Veg' ? 'status-completed' : 'status-cancelled'}">
          ${item.diet === 'Veg' ? '🌱 Pure Veg' : '🍗 Non-Veg'}
        </span>
      </td>
      <td><strong style="color:var(--admin-gold-light); font-size:1.05rem;">₹${item.price}</strong></td>
      <td><span class="status-pill status-completed">Active on Site</span></td>
    </tr>
  `).join("");
}

// ==========================================
// 9. SETTINGS & CREDENTIALS CONTROLLER
// ==========================================
function loadSettings() {
  const auth = getAuth();
  const curUser = document.getElementById("setCurUsername");
  const waNum = document.getElementById("setWhatsAppNum");

  if (curUser) curUser.value = auth.username;
  if (waNum) waNum.value = auth.whatsappPhone || "919876543210";
}

function handleUpdateCredentials(e) {
  e.preventDefault();
  const newUsername = document.getElementById("setNewUsername")?.value.trim();
  const newPassword = document.getElementById("setNewPassword")?.value.trim();
  const confirmPassword = document.getElementById("setConfirmPassword")?.value.trim();

  if (!newUsername || !newPassword) {
    alert("Please enter both new username and password.");
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("New password and confirm password do not match!");
    return;
  }

  const auth = getAuth();
  auth.username = newUsername;
  auth.password = newPassword;
  localStorage.setItem("spandan_auth", JSON.stringify(auth));

  alert("✅ Manager credentials updated successfully! Please keep your new password safe.");
  document.getElementById("formUpdateCredentials")?.reset();
  loadSettings();
}

function exportDatabaseJSON() {
  const data = {
    reservations: getReservations(),
    orders: getOrders(),
    inquiries: getInquiries(),
    exportedAt: new Date().toISOString()
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Hotel_Spandan_Data_Backup_${new Date().toISOString().split("T")[0]}.json`;
  a.click();
}

function resetDemoData() {
  if (confirm("Reset databases to default demo seed data? Any new customer orders/bookings will be replaced with fresh samples.")) {
    localStorage.setItem("spandan_reservations", JSON.stringify(SEED_RESERVATIONS));
    localStorage.setItem("spandan_orders", JSON.stringify(SEED_ORDERS));
    localStorage.setItem("spandan_inquiries", JSON.stringify(SEED_INQUIRIES));
    alert("✅ Data reset to initial sample state.");
    loadDashboard();
    renderReservationsTable();
    renderOrdersTable();
    renderInquiriesTable();
  }
}

// ==========================================
// 10. MODAL CONTROLLERS & EVENT LISTENERS
// ==========================================
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add("active");
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove("active");
}

// Global modal triggers
window.openModal = openModal;
window.closeModal = closeModal;
window.switchTab = switchTab;
window.updateReservationStatus = updateReservationStatus;
window.deleteReservation = deleteReservation;
window.updateOrderStatus = updateOrderStatus;
window.deleteOrder = deleteOrder;
window.printKOTReceipt = printKOTReceipt;
window.updateInquiryStatus = updateInquiryStatus;
window.deleteInquiry = deleteInquiry;
window.exportDatabaseJSON = exportDatabaseJSON;
window.resetDemoData = resetDemoData;

// Clock Updater
function updateClock() {
  const clock = document.getElementById("adminLiveClock");
  if (clock) {
    const now = new Date();
    clock.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  }
}

// Initialization on DOM load
document.addEventListener("DOMContentLoaded", () => {
  initDatabase();
  checkAuth();

  // Clock
  setInterval(updateClock, 1000);
  updateClock();

  // Auth Form
  const authForm = document.getElementById("authLoginForm");
  if (authForm) authForm.addEventListener("submit", handleLogin);

  // Logout Buttons
  document.querySelectorAll(".btn-logout").forEach(btn => {
    btn.addEventListener("click", handleLogout);
  });

  // Tab buttons
  document.querySelectorAll(".nav-item-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;
      if (tab) switchTab(tab);
    });
  });

  // Mobile Sidebar Toggle
  const sidebarToggle = document.getElementById("sidebarToggleBtn");
  const sidebar = document.querySelector(".admin-sidebar");
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }

  // Reservation Filters
  const resStatusSelect = document.getElementById("resFilterStatus");
  if (resStatusSelect) {
    resStatusSelect.addEventListener("change", (e) => {
      resFilterStatus = e.target.value;
      renderReservationsTable();
    });
  }

  const resSearchInput = document.getElementById("resSearchInput");
  if (resSearchInput) {
    resSearchInput.addEventListener("input", (e) => {
      resSearchQuery = e.target.value;
      renderReservationsTable();
    });
  }

  // Order Filters
  const orderStatusSelect = document.getElementById("orderFilterStatus");
  if (orderStatusSelect) {
    orderStatusSelect.addEventListener("change", (e) => {
      orderFilterStatus = e.target.value;
      renderOrdersTable();
    });
  }

  const orderSearchInput = document.getElementById("orderSearchInput");
  if (orderSearchInput) {
    orderSearchInput.addEventListener("input", (e) => {
      orderSearchQuery = e.target.value;
      renderOrdersTable();
    });
  }

  // Forms
  const formManualRes = document.getElementById("formManualReservation");
  if (formManualRes) formManualRes.addEventListener("submit", handleAddManualReservation);

  const formCreds = document.getElementById("formUpdateCredentials");
  if (formCreds) formCreds.addEventListener("submit", handleUpdateCredentials);

  // Cross-tab storage synchronization
  window.addEventListener("storage", (e) => {
    if (e.key === "spandan_reservations" || e.key === "spandan_orders" || e.key === "spandan_inquiries") {
      loadDashboard();
      if (currentTab === "reservations") renderReservationsTable();
      if (currentTab === "orders") renderOrdersTable();
      if (currentTab === "inquiries") renderInquiriesTable();
    }
  });

  // Default date in manual modal
  const mDate = document.getElementById("mResDate");
  if (mDate) mDate.value = new Date().toISOString().split("T")[0];
});
