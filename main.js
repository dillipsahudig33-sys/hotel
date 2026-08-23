/**
 * HOTEL SPANDAN - INTERACTIVE ENGINE
 * Multi-cuisine A/C Family Restaurant & Banquets
 */

// ==========================================
// 1. MENU DATA REPOSITORY
// ==========================================
const MENU_ITEMS = [
  // Odia Thali Specials
  {
    id: "thali-1",
    name: "Royal Odia Pakhala Thali (ରାଜକୀୟ ପଖାଳ)",
    category: "thali",
    diet: "veg",
    chefSpecial: true,
    price: 280,
    portion: "Royal Thali (1-2 Persons)",
    desc: "Signature curd pakhala in golden brass Kansa bowls with Badi Chura, seasonal Saaga Bhaja, aloo chokha, crispy wafers, and roasted chili.",
    image: "/images/royal-pakhala-thali.jpg"
  },
  {
    id: "thali-2",
    name: "Spandan Special Odia Bhoji Thali",
    category: "thali",
    diet: "veg",
    chefSpecial: false,
    price: 310,
    portion: "Complete Meal",
    desc: "Steaming Kanika sweet pulao / steamed rice, authentic Dalma, paneer besara, dahi baigana, tomato khata, and kheer.",
    image: "/images/royal-pakhala-thali.jpg"
  },
  {
    id: "thali-3",
    name: "Royal Non-Veg Pakhala Platter",
    category: "thali",
    diet: "nonveg",
    chefSpecial: true,
    price: 380,
    portion: "Royal Thali",
    desc: "Curd Pakhala served with crispy fish fry / prawn fry, badi chura, saga bhaja, aloo bharta, and roasted chilies in brass kansa.",
    image: "/images/royal-pakhala-thali.jpg"
  },

  // Starters & Kebabs
  {
    id: "starter-1",
    name: "Spandan Crispy Kebab Crunch",
    category: "starters",
    diet: "nonveg",
    chefSpecial: true,
    price: 260,
    portion: "8 pcs / Platter",
    desc: "Crispy battered spiced kebab chunks tossed in home-ground masalas, served with fresh red onion rings and mint dip.",
    image: "/images/crispy-chicken-kebab.jpg"
  },
  {
    id: "starter-2",
    name: "Tandoori Malai Paneer Tikka",
    category: "starters",
    diet: "veg",
    chefSpecial: false,
    price: 250,
    portion: "6 large skewers",
    desc: "Creamy marinated cottage cheese cubes chargrilled in tandoor with bell peppers, onions, and royal cardamom aroma.",
    image: "/images/tandoori-platter.jpg"
  },
  {
    id: "starter-3",
    name: "Chicken Tandoori Sizzler",
    category: "starters",
    diet: "nonveg",
    chefSpecial: true,
    price: 320,
    portion: "Full / Half Platter",
    desc: "Juicy chicken roasted in clay tandoor with smoked paprika, mustard oil, yogurt, and served on sizzling iron platter.",
    image: "/images/crispy-chicken-kebab.jpg"
  },
  {
    id: "starter-4",
    name: "Crispy Golden Corn Salt & Pepper",
    category: "starters",
    diet: "veg",
    chefSpecial: false,
    price: 210,
    portion: "1 Bowl",
    desc: "Golden sweet corn kernels tossed with crunchy bell peppers, black pepper, and fresh spring onions.",
    image: "/images/crispy-chicken-kebab.jpg"
  },

  // Main Curries & Gravies
  {
    id: "curry-1",
    name: "Spandan Special Rich Handi Curry",
    category: "main-curries",
    diet: "nonveg",
    chefSpecial: true,
    price: 320,
    portion: "Serves 2-3",
    desc: "Velvety slow-simmered rich gravy infused with whole crushed spices, fresh dairy cream, and golden butter swirl.",
    image: "/images/spandan-special-curry.jpg"
  },
  {
    id: "curry-2",
    name: "Paneer Butter Masala (Royal Gravy)",
    category: "main-curries",
    diet: "veg",
    chefSpecial: false,
    price: 260,
    portion: "Serves 2",
    desc: "Soft malai paneer cubes simmered in rich creamy tomato and cashew nut gravy, garnished with kasuri methi.",
    image: "/images/spandan-special-curry.jpg"
  },
  {
    id: "curry-3",
    name: "Authentic Odia Mutton Kasa",
    category: "main-curries",
    diet: "nonveg",
    chefSpecial: true,
    price: 390,
    portion: "Serves 2",
    desc: "Tender goat meat slow-cooked in traditional mustard oil, caramelized onions, potatoes, and Odia garama masala.",
    image: "/images/spandan-special-curry.jpg"
  },
  {
    id: "curry-4",
    name: "Dal Makhani Handi Dum",
    category: "main-curries",
    diet: "veg",
    chefSpecial: false,
    price: 220,
    portion: "Serves 2",
    desc: "Black lentils slow-cooked overnight with fresh cream, white butter, and aromatic spices on low charcoal flame.",
    image: "/images/spandan-special-curry.jpg"
  },

  // Biryani & Rice
  {
    id: "biryani-1",
    name: "Royal Handi Dum Biryani",
    category: "biryani",
    diet: "nonveg",
    chefSpecial: true,
    price: 290,
    portion: "Copper Handi (Serves 2)",
    desc: "Fragrant aged basmati rice cooked on dum with saffron, fried onions, roasted cashews, served with raita & salan.",
    image: "/images/biryani-handi.jpg"
  },
  {
    id: "biryani-2",
    name: "Shahi Veg Dum Biryani",
    category: "biryani",
    diet: "veg",
    chefSpecial: false,
    price: 230,
    portion: "Copper Handi",
    desc: "Fresh garden vegetables, paneer cubes, and aromatic basmati rice layered with mint, saffron, and fried onions.",
    image: "/images/biryani-handi.jpg"
  },
  {
    id: "biryani-3",
    name: "Jeera Rice & Dal Fry Combo",
    category: "biryani",
    diet: "veg",
    chefSpecial: false,
    price: 180,
    portion: "Individual Meal",
    desc: "Ghee tossed fragrant basmati rice tempered with roasted cumin, served with garlic tadka yellow dal.",
    image: "/images/biryani-handi.jpg"
  },

  // Tandoori Breads
  {
    id: "bread-1",
    name: "Butter Garlic Tandoori Naan",
    category: "breads",
    diet: "veg",
    chefSpecial: true,
    price: 65,
    portion: "1 pc",
    desc: "Crispy yet soft leavened bread baked in clay tandoor, loaded with minced garlic, fresh coriander, and melted butter.",
    image: "/images/tandoori-platter.jpg"
  },
  {
    id: "bread-2",
    name: "Cheese Stuffed Kulcha",
    category: "breads",
    diet: "veg",
    chefSpecial: false,
    price: 90,
    portion: "1 pc",
    desc: "Tandoori bread generously stuffed with spiced cottage cheese and herbs, cut into slices with butter top.",
    image: "/images/tandoori-platter.jpg"
  },
  {
    id: "bread-3",
    name: "Tandoori Roti (Butter / Plain)",
    category: "breads",
    diet: "veg",
    chefSpecial: false,
    price: 25,
    portion: "1 pc",
    desc: "Traditional whole wheat flatbread baked crispy in clay tandoor with fresh butter glaze.",
    image: "/images/tandoori-platter.jpg"
  },

  // Chinese & Sizzlers
  {
    id: "chinese-1",
    name: "Chilli Paneer / Chicken Dry",
    category: "chinese",
    diet: "nonveg",
    chefSpecial: false,
    price: 240,
    portion: "1 Platter",
    desc: "Wok-tossed crispy chunks with crunchy capsicum, onions, dark soya, and fiery green chilies.",
    image: "/images/crispy-chicken-kebab.jpg"
  },
  {
    id: "chinese-2",
    name: "Spandan Special Hakka Noodles",
    category: "chinese",
    diet: "veg",
    chefSpecial: false,
    price: 190,
    portion: "Serves 2",
    desc: "Wok-tossed thin noodles with julienned vegetables, white pepper, and light sesame seasoning.",
    image: "/images/crispy-chicken-kebab.jpg"
  },

  // Beverages & Desserts
  {
    id: "bev-1",
    name: "Mango Saffron Royal Cooler",
    category: "beverages",
    diet: "veg",
    chefSpecial: true,
    price: 140,
    portion: "Tall Glass",
    desc: "Chilled alphonso mango nectar blended with Kashmiri saffron strands, mint, and sparkling soda.",
    image: "/images/spandan-mocktails.jpg"
  },
  {
    id: "bev-2",
    name: "Fresh Mint Mojito / Lime Soda",
    category: "beverages",
    diet: "veg",
    chefSpecial: false,
    price: 110,
    portion: "Tall Glass",
    desc: "Zesty muddled fresh lime, mint sprigs, ice crystals, and sparkling soda with sweet & salty rim.",
    image: "/images/spandan-mocktails.jpg"
  },
  {
    id: "bev-3",
    name: "Hot Gulab Jamun with Vanilla Ice Cream",
    category: "beverages",
    diet: "veg",
    chefSpecial: true,
    price: 130,
    portion: "2 Pcs with Scoop",
    desc: "Soft warm khoya gulab jamuns in cardamom sugar syrup, paired with rich velvety vanilla ice cream.",
    image: "/images/royal-pakhala-thali.jpg"
  }
];

// ==========================================
// 2. STATE MANAGEMENT
// ==========================================
let cart = {}; // { itemId: quantity }
let currentCategory = "all";
let currentDiet = "all";
let searchQuery = "";

// ==========================================
// 3. INITIALIZATION ON DOM READY
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  renderMenu();
  setupEventListeners();
  setupNavigation();
  setDefaultDates();
});

// Set default date picker values (today / tomorrow)
function setDefaultDates() {
  const today = new Date().toISOString().split("T")[0];
  const qbDate = document.getElementById("qbDate");
  const resDate = document.getElementById("resDate");
  const bDate = document.getElementById("bDate");

  if (qbDate) qbDate.value = today;
  if (resDate) resDate.value = today;
  if (bDate) bDate.value = today;
}

// ==========================================
// 4. DIGITAL MENU RENDERING & FILTERING
// ==========================================
function renderMenu() {
  const grid = document.getElementById("menuItemsGrid");
  if (!grid) return;

  const filtered = MENU_ITEMS.filter(item => {
    // Category match
    const categoryMatch = currentCategory === "all" || item.category === currentCategory;

    // Diet match
    let dietMatch = true;
    if (currentDiet === "veg") dietMatch = item.diet === "veg";
    else if (currentDiet === "nonveg") dietMatch = item.diet === "nonveg";
    else if (currentDiet === "chef") dietMatch = item.chefSpecial === true;

    // Search query match
    let searchMatch = true;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      searchMatch = item.name.toLowerCase().includes(q) || 
                    item.desc.toLowerCase().includes(q) ||
                    item.category.toLowerCase().includes(q);
    }

    return categoryMatch && dietMatch && searchMatch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-dishes-found">
        <i class="fa-solid fa-utensils"></i>
        <h3>No dishes found matching your selection</h3>
        <p>Try searching for a different dish name or reset filters.</p>
        <button class="btn btn-outline mt-2" id="resetFiltersBtn">Reset All Filters</button>
      </div>
    `;
    const resetBtn = document.getElementById("resetFiltersBtn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        currentCategory = "all";
        currentDiet = "all";
        searchQuery = "";
        const searchInput = document.getElementById("menuSearchInput");
        if (searchInput) searchInput.value = "";
        updateFilterUI();
        renderMenu();
      });
    }
    return;
  }

  grid.innerHTML = filtered.map(item => {
    const isVeg = item.diet === "veg";
    const dietIcon = isVeg 
      ? `<span class="dietary-tag veg"><span class="dot"></span> Veg</span>`
      : `<span class="dietary-tag nonveg"><span class="dot"></span> Non-Veg</span>`;

    const chefBadge = item.chefSpecial ? `<span class="mi-badge text-gold"><i class="fa-solid fa-star"></i> Chef Pick</span>` : "";

    return `
      <div class="menu-item-card">
        <div class="mi-img-wrap">
          <img src="${item.image}" alt="${item.name}" class="mi-img" loading="lazy">
          ${dietIcon}
          ${chefBadge}
        </div>
        <div class="mi-body">
          <div class="mi-header">
            <h4 class="mi-title">${item.name}</h4>
            <span class="mi-price">₹${item.price}</span>
          </div>
          <p class="mi-desc">${item.desc}</p>
          <div class="mi-footer">
            <span class="mi-portion"><i class="fa-solid fa-layer-group"></i> ${item.portion}</span>
            <button class="btn btn-primary btn-sm add-to-cart-btn" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">
              <i class="fa-solid fa-plus"></i> Add to Order
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  // Attach event listeners to new Add to Cart buttons
  attachAddToCartEvents();
}

function updateFilterUI() {
  // Category tabs
  document.querySelectorAll("#menuCategories .tab-btn").forEach(btn => {
    if (btn.dataset.category === currentCategory) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Diet filter buttons
  document.querySelectorAll(".dietary-filter-group .diet-btn").forEach(btn => {
    if (btn.dataset.diet === currentDiet) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

// ==========================================
// 5. CART & ORDER SYSTEM
// ==========================================
function attachAddToCartEvents() {
  document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const name = btn.dataset.name;
      const price = parseFloat(btn.dataset.price);

      addToCart(id, name, price);
    });
  });

  document.querySelectorAll(".quick-book-item").forEach(btn => {
    btn.addEventListener("click", () => {
      const dish = btn.dataset.dish;
      const resNotes = document.getElementById("resNotes");
      if (resNotes) resNotes.value = `Pre-requested dish: ${dish}`;
      openReservationModal();
    });
  });
}

function addToCart(id, name, price) {
  if (cart[id]) {
    cart[id].qty += 1;
  } else {
    cart[id] = { id, name, price, qty: 1 };
  }

  updateCartUI();
  showToast(`Added "${name}" to your order list!`);
}

function removeFromCart(id) {
  if (cart[id]) {
    cart[id].qty -= 1;
    if (cart[id].qty <= 0) {
      delete cart[id];
    }
  }
  updateCartUI();
}

function updateCartUI() {
  const cartCountElem = document.getElementById("cartCount");
  const cartItemsContainer = document.getElementById("cartItemsContainer");
  const cartFooter = document.getElementById("cartFooter");
  const cartEstimatedTotal = document.getElementById("cartEstimatedTotal");
  const cartDrawerSub = document.getElementById("cartDrawerSub");

  const items = Object.values(cart);
  const totalItems = items.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = items.reduce((acc, item) => acc + (item.price * item.qty), 0);

  if (cartCountElem) cartCountElem.textContent = totalItems;
  if (cartDrawerSub) cartDrawerSub.textContent = `${totalItems} dish${totalItems === 1 ? '' : 'es'} selected`;
  if (cartEstimatedTotal) cartEstimatedTotal.textContent = `₹${totalPrice}`;

  if (items.length === 0) {
    if (cartItemsContainer) {
      cartItemsContainer.innerHTML = `
        <div class="cart-empty-state">
          <i class="fa-solid fa-utensils"></i>
          <p>No dishes added yet.<br>Explore our digital menu and click <strong>"Add to Order"</strong>!</p>
        </div>
      `;
    }
    if (cartFooter) cartFooter.style.display = "none";
  } else {
    if (cartItemsContainer) {
      cartItemsContainer.innerHTML = items.map(item => `
        <div class="cart-item-row">
          <div class="cir-info">
            <h5>${item.name}</h5>
            <span>₹${item.price} each</span>
          </div>
          <div class="cir-controls">
            <button class="cir-btn" onclick="window.hotelSpandan.removeFromCart('${item.id}')">-</button>
            <span class="cir-qty">${item.qty}</span>
            <button class="cir-btn" onclick="window.hotelSpandan.addToCart('${item.id}', '${item.name}', ${item.price})">+</button>
          </div>
        </div>
      `).join("");
    }
    if (cartFooter) cartFooter.style.display = "block";
  }
}

// Format and send order on WhatsApp
function sendWhatsAppOrder() {
  const items = Object.values(cart);
  if (items.length === 0) {
    showToast("Please add items to your cart first!");
    return;
  }

  let text = `*New Food Order / Table Inquiry - Hotel Spandan*\n\n`;
  text += `*Selected Dishes:*\n`;
  let total = 0;
  items.forEach((item, index) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;
    text += `${index + 1}. ${item.name} x ${item.qty} = ₹${itemTotal}\n`;
  });
  text += `\n*Estimated Bill Total:* ₹${total}\n`;
  text += `\n*Customer Request:* Please confirm preparation time / table reservation. Thank you!`;

  const encoded = encodeURIComponent(text);
  const whatsappUrl = `https://wa.me/919876543210?text=${encoded}`;
  window.open(whatsappUrl, "_blank");
}

// ==========================================
// 6. EVENT LISTENERS SETUP
// ==========================================
function setupEventListeners() {
  // Menu Category Buttons
  const catContainer = document.getElementById("menuCategories");
  if (catContainer) {
    catContainer.querySelectorAll(".tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        currentCategory = btn.dataset.category;
        updateFilterUI();
        renderMenu();
      });
    });
  }

  // Dietary Filter Buttons
  document.querySelectorAll(".dietary-filter-group .diet-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      currentDiet = btn.dataset.diet;
      updateFilterUI();
      renderMenu();
    });
  });

  // Search input
  const searchInput = document.getElementById("menuSearchInput");
  const clearSearchBtn = document.getElementById("clearSearchBtn");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      if (clearSearchBtn) {
        clearSearchBtn.style.display = searchQuery ? "block" : "none";
      }
      renderMenu();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      searchQuery = "";
      clearSearchBtn.style.display = "none";
      renderMenu();
    });
  }

  // Cart Drawer Open/Close
  const openCartBtn = document.getElementById("openCartBtn");
  const menuViewCartBtn = document.getElementById("menuViewCartBtn");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const cartDrawer = document.getElementById("cartDrawer");
  const cartOverlay = document.getElementById("cartOverlay");

  const openDrawer = () => {
    if (cartDrawer) cartDrawer.classList.add("open");
    if (cartOverlay) cartOverlay.classList.add("active");
  };

  const closeDrawer = () => {
    if (cartDrawer) cartDrawer.classList.remove("open");
    if (cartOverlay) cartOverlay.classList.remove("active");
  };

  if (openCartBtn) openCartBtn.addEventListener("click", openDrawer);
  if (menuViewCartBtn) menuViewCartBtn.addEventListener("click", openDrawer);
  if (closeCartBtn) closeCartBtn.addEventListener("click", closeDrawer);
  if (cartOverlay) cartOverlay.addEventListener("click", closeDrawer);

  // Send WhatsApp Order
  const sendWhatsAppOrderBtn = document.getElementById("sendWhatsAppOrderBtn");
  if (sendWhatsAppOrderBtn) sendWhatsAppOrderBtn.addEventListener("click", sendWhatsAppOrder);

  // Cart -> Book Table
  const cartBookTableBtn = document.getElementById("cartBookTableBtn");
  if (cartBookTableBtn) {
    cartBookTableBtn.addEventListener("click", () => {
      closeDrawer();
      const items = Object.values(cart);
      if (items.length > 0) {
        const dishList = items.map(i => `${i.name} (x${i.qty})`).join(", ");
        const resNotes = document.getElementById("resNotes");
        if (resNotes) resNotes.value = `Pre-ordered Dishes: ${dishList}`;
      }
      openReservationModal();
    });
  }

  // Table Reservation Modal Triggers
  const resModalBtns = [
    document.getElementById("bookTableNavBtn"),
    document.getElementById("heroBookTableBtn"),
    document.getElementById("drawerBookBtn"),
    document.getElementById("menuBookTableBtn"),
    document.getElementById("footerBookBtn"),
    document.getElementById("floatBookBtn")
  ];

  resModalBtns.forEach(btn => {
    if (btn) btn.addEventListener("click", openReservationModal);
  });

  // Close Table Reservation Modal
  const closeResModalBtn = document.getElementById("closeResModalBtn");
  const cancelResModalBtn = document.getElementById("cancelResModalBtn");
  const resModal = document.getElementById("reservationModal");

  const closeReservationModal = () => {
    if (resModal) resModal.classList.remove("active");
  };

  if (closeResModalBtn) closeResModalBtn.addEventListener("click", closeReservationModal);
  if (cancelResModalBtn) cancelResModalBtn.addEventListener("click", closeReservationModal);
  if (resModal) {
    resModal.addEventListener("click", (e) => {
      if (e.target === resModal) closeReservationModal();
    });
  }

  // Quick Reservation Form in Hero Section
  const quickReservationForm = document.getElementById("quickReservationForm");
  if (quickReservationForm) {
    quickReservationForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const date = document.getElementById("qbDate")?.value;
      const time = document.getElementById("qbTime")?.value;
      const guests = document.getElementById("qbGuests")?.value;
      const occasion = document.getElementById("qbOccasion")?.value;

      // Sync into full modal
      const resDate = document.getElementById("resDate");
      const resTime = document.getElementById("resTime");
      const resGuests = document.getElementById("resGuests");
      const resOccasion = document.getElementById("resOccasion");

      if (resDate && date) resDate.value = date;
      if (resTime && time) resTime.value = time;
      if (resGuests && guests) resGuests.value = guests;
      if (resOccasion && occasion) resOccasion.value = occasion;

      openReservationModal();
    });
  }

  // Full Reservation Form Submit
  const fullReservationForm = document.getElementById("fullReservationForm");
  if (fullReservationForm) {
    fullReservationForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("resName")?.value;
      const phone = document.getElementById("resPhone")?.value;
      const date = document.getElementById("resDate")?.value;
      const time = document.getElementById("resTime")?.value;
      const guests = document.getElementById("resGuests")?.value;
      const occasion = document.getElementById("resOccasion")?.value;
      const notes = document.getElementById("resNotes")?.value;

      const refId = "SPANDAN-TBL-" + Math.floor(1000 + Math.random() * 9000);

      closeReservationModal();
      showToast(`🎉 Table Reserved! Ref #${refId} for ${name} (${guests}) on ${date} at ${time}. We will welcome you!`);

      // Prompt to send confirmation on WhatsApp
      setTimeout(() => {
        const confirmMsg = `*Table Reservation Request - Hotel Spandan*\n*Booking Ref:* ${refId}\n*Name:* ${name}\n*Phone:* ${phone}\n*Date:* ${date}\n*Time:* ${time}\n*Guests:* ${guests}\n*Occasion:* ${occasion}\n*Special Notes:* ${notes || 'None'}`;
        const openWa = confirm(`Your Table is Reserved! (Ref #${refId})\n\nWould you like to send this reservation details to Hotel Spandan's WhatsApp for instant confirmation?`);
        if (openWa) {
          window.open(`https://wa.me/919876543210?text=${encodeURIComponent(confirmMsg)}`, "_blank");
        }
      }, 500);

      fullReservationForm.reset();
      setDefaultDates();
    });
  }

  // Banquet Modal Open/Close
  const openBanquetModalBtn = document.getElementById("openBanquetModalBtn");
  const banquetModal = document.getElementById("banquetModal");
  const closeBanquetModalBtn = document.getElementById("closeBanquetModalBtn");
  const cancelBanquetModalBtn = document.getElementById("cancelBanquetModalBtn");

  const openBanquetModal = () => {
    if (banquetModal) banquetModal.classList.add("active");
  };
  const closeBanquetModal = () => {
    if (banquetModal) banquetModal.classList.remove("active");
  };

  if (openBanquetModalBtn) openBanquetModalBtn.addEventListener("click", openBanquetModal);
  if (closeBanquetModalBtn) closeBanquetModalBtn.addEventListener("click", closeBanquetModal);
  if (cancelBanquetModalBtn) cancelBanquetModalBtn.addEventListener("click", closeBanquetModal);
  if (banquetModal) {
    banquetModal.addEventListener("click", (e) => {
      if (e.target === banquetModal) closeBanquetModal();
    });
  }

  // Banquet Form Submit
  const banquetInquiryForm = document.getElementById("banquetInquiryForm");
  if (banquetInquiryForm) {
    banquetInquiryForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const bName = document.getElementById("bName")?.value;
      const bPhone = document.getElementById("bPhone")?.value;
      const bType = document.getElementById("bType")?.value;
      const bGuests = document.getElementById("bGuests")?.value;
      const bDate = document.getElementById("bDate")?.value;

      closeBanquetModal();
      showToast(`✨ Banquet inquiry submitted for ${bName} (${bType} on ${bDate})! Our event team will call you within 2 hours.`);
      banquetInquiryForm.reset();
      setDefaultDates();
    });
  }

  // Contact Form Submit
  const contactInquiryForm = document.getElementById("contactInquiryForm");
  if (contactInquiryForm) {
    contactInquiryForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("cName")?.value;
      showToast(`Thank you, ${name}! Your message has been sent to Hotel Spandan management.`);
      contactInquiryForm.reset();
    });
  }

  // Gallery Filters
  document.querySelectorAll(".gallery-filters .g-filter").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".gallery-filters .g-filter").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      document.querySelectorAll(".gallery-grid .gallery-item").forEach(item => {
        if (filter === "all" || item.dataset.category === filter) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // Lightbox Close
  const closeLightboxBtn = document.getElementById("closeLightboxBtn");
  const lightboxModal = document.getElementById("lightboxModal");
  if (closeLightboxBtn) closeLightboxBtn.addEventListener("click", closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener("click", (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }
}

function openReservationModal() {
  const modal = document.getElementById("reservationModal");
  if (modal) modal.classList.add("active");
}

// ==========================================
// 7. LIGHTBOX CONTROLLER
// ==========================================
function openLightbox(src, caption) {
  const modal = document.getElementById("lightboxModal");
  const img = document.getElementById("lightboxImg");
  const cap = document.getElementById("lightboxCaption");

  if (modal && img && cap) {
    img.src = src;
    cap.textContent = caption || "";
    modal.classList.add("active");
  }
}

function closeLightbox() {
  const modal = document.getElementById("lightboxModal");
  if (modal) modal.classList.remove("active");
}

// Expose globally for inline onclicks
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.hotelSpandan = {
  addToCart,
  removeFromCart
};

// ==========================================
// 8. TOAST NOTIFICATIONS
// ==========================================
function showToast(message) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast-msg";
  toast.innerHTML = `
    <i class="fa-solid fa-circle-check"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-30px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ==========================================
// 9. NAVIGATION & MOBILE DRAWER
// ==========================================
function setupNavigation() {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const drawerCloseBtn = document.getElementById("drawerCloseBtn");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const drawerOverlay = document.getElementById("drawerOverlay");

  const openNavDrawer = () => {
    if (mobileDrawer) mobileDrawer.classList.add("open");
    if (drawerOverlay) drawerOverlay.classList.add("active");
  };

  const closeNavDrawer = () => {
    if (mobileDrawer) mobileDrawer.classList.remove("open");
    if (drawerOverlay) drawerOverlay.classList.remove("active");
  };

  if (hamburgerBtn) hamburgerBtn.addEventListener("click", openNavDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener("click", closeNavDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener("click", closeNavDrawer);

  // Close drawer on link click
  document.querySelectorAll(".drawer-link").forEach(link => {
    link.addEventListener("click", closeNavDrawer);
  });

  // Scrollspy & Active nav links
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}
