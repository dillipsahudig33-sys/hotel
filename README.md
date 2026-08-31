# 🍽️ Hotel Spandan (ହୋଟେଲ ସ୍ପନ୍ଦନ) - Official Website

> **Premium A/C Family Restaurant**  
> Authentic Odia Delicacies, Royal Pakhala Thali, Tandoori Starters, Rich Handi Curries & Indian Multi-Cuisine.

---

## ✨ Features

- 🍛 **Royal Odia Pakhala Thali & Multi-Cuisine Menu**: Interactive digital menu with Veg / Non-Veg filters, category tabs, and search.
- 🛒 **Smart Cart & WhatsApp Ordering**: Instant bill calculator with seamless 1-click WhatsApp order generation.
- 🪑 **Online Table Reservation**: Instant dining table booking modal with guest count, date, time slot, and special requests.
- 👑 **Hotel Manager Admin Portal (`/admin.html`)**: Complete back-office operations dashboard with password protection, live table reservations, food orders, WhatsApp customer outreach, Kitchen Order Tickets (KOT), and inquiry tracking.
- 📸 **Photo Gallery & Lightbox**: High-resolution dish photos and restaurant ambience gallery with zoom preview.
- 📱 **100% Responsive Design**: Optimized for mobile phones, tablets, laptops, and ultra-wide desktop screens.
- ⚡ **Zero-Dependency Fast Loading**: Pure HTML5, modern Vanilla CSS with glassmorphism & rich animations, and modular Vanilla JS.

---

## 👑 Manager Admin Portal

Access the Manager Dashboard at **`/admin.html`**:
- **Default Username:** `admin`
- **Default Password:** `spandan123`
- **Capabilities:**
  - Track & update live Table Reservations (Pending, Confirmed, Seated, Completed).
  - Manage Food Orders & Print Kitchen Order Tickets (KOT).
  - 1-click WhatsApp customer confirmation messaging.
  - Review & reply to customer inquiries.
  - Change username & password inside Settings.
  - Export full JSON database backups.

---

## 🚀 One-Click Deploy to Vercel

This repository is pre-configured with `vercel.json` for zero-config Vercel deployment:

1. Import this repository into [Vercel](https://vercel.com/new).
2. Framework Preset: **Other / Static** (Root directory: `./`).
3. Click **Deploy**!

---

## 💻 Running Locally

### Option 1: Using the Built-in PowerShell Server (No Node.js needed!)
```powershell
powershell -ExecutionPolicy Bypass -File .\server.ps1
```
Open [http://localhost:5173](http://localhost:5173) on your computer, or access via your local Wi-Fi IP on your mobile phone.
Open [http://localhost:5173/admin.html](http://localhost:5173/admin.html) for the Manager Admin Portal.

### Option 2: Using Any Static Server
```bash
npx serve .
# or
python -m http.server 5173
```

---

## 📂 Project Structure

```text
├── index.html          # Customer landing page & structured layout
├── admin.html          # Manager operations portal & live dashboard
├── vercel.json         # Vercel deployment & URL rewrite configuration
├── package.json        # Project metadata
├── .gitignore          # Git ignore rules
├── server.ps1          # High-performance local dev server
├── public/
│   └── images/         # High-resolution dish & ambience photos
└── src/
    ├── style.css       # Customer-facing design system & animations
    ├── main.js         # Customer interactive engine & localStorage sync
    ├── admin.css       # Manager portal luxury dark styling & KOT print styles
    └── admin.js        # Manager authentication, CRUD operations & live sync
```

---

## 📞 Contact & Inquiries
- **Hotel Spandan - A/C Family Restaurant**
- **Phone:** +91 98765 43210
- **Hours:** 11:30 AM – 11:00 PM (All 7 Days)
