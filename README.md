# 💍 Luxury Sri Lankan Digital Wedding Invitation & Guest Management Web App

A modern, interactive, mobile-first Sri Lankan wedding invitation web application built with **Next.js (App Router)** and **TypeScript**, styled with **TailwindCSS** and animated with **Framer Motion** and **Canvas Confetti**.

---

## 🌟 Key Features

1. **💌 Dynamic Personalized Guest Experience (`/invite/[id]` or `/?id=[id]`)**:
   - Personalized greeting with Title and Full Name (e.g. *Dr. Amal Wijesinghe & Partner*, *Mr. Sunil Silva & Family*).
   - Specific invitation status badge (*Single - 1 Seat*, *Couple - 2 Seats*, *Family - 4 Seats*, or *Custom note*).
   - Interactive gold wax seal & digital envelope opening animation with confetti.
   - Formal invitation text with Groom & Bride introduction and Parents details.
   - Auspicious Poruwa Ceremony & wedding reception timeline with Sri Lankan nekath times.
   - Interactive embedded **Google Maps preview** of Shangri-La Hotel Colombo with 1-tap "Get Directions".
   - Live real-time countdown timer.
   - Interactive RSVP submission updating the Google Sheet in real time.
   - Floating romantic background audio controller.

2. **👑 Admin Dashboard (`/admin`)**:
   - Protected with an 8-character hardcoded security password (`Wed2026!`).
   - Real-time RSVP stats cards (Total Invites, Confirmed Attending, Pending, Declined, Total Hall Seats).
   - Guest search & filtering by status and invite type.
   - **Create / Edit Guest Modal** with conditional custom note field.
   - **Delete Guest Modal** with explicit confirmation dialog.
   - **1-Click WhatsApp Share Button** (`https://wa.me/...`) with prefilled Sri Lankan wedding message.
   - **Copy Link Button** for clean 6-character Short UUID links (`/invite/k9x2m4`).

3. **📊 Free Google Sheets Database Backend**:
   - Powered by a serverless Google Apps Script Web App (`Code.gs`).
   - Automatic fallback to LocalStorage for instant offline local testing.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the wedding card, or [http://localhost:3000/admin](http://localhost:3000/admin) for the Admin Dashboard (Password: `Wed2026!`).

---

## 📋 Google Sheets API Connection
See the complete 3-minute setup guide in [GOOGLE_SHEETS_SETUP_GUIDE.md](./GOOGLE_SHEETS_SETUP_GUIDE.md).

---

## 🌐 Netlify Deployment
1. Push this project to GitHub.
2. Link the repository to Netlify.
3. Set build command to `npm run build` and publish directory to `.next`.
4. Add environment variables in Netlify Dashboard:
   - `NEXT_PUBLIC_GOOGLE_SHEET_API_URL`
   - `NEXT_PUBLIC_ADMIN_PASSWORD`
