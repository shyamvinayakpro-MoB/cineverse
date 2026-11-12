# 🎬 CineVerse – Indian Movies Discovery Platform

A modern, premium-quality Indian Movies Discovery web application inspired by Netflix, Amazon Prime Video, and IMDb, purpose-built to celebrate the cinematic richness of Indian Cinema across **Malayalam**, **Tamil**, **Telugu**, **Hindi**, and **Kannada** industries.

---

## 🌟 Key Features

### 1. Cinematic Hero Section (Main Attraction)
- **Full-screen high-definition cinematic hero slider** featuring Indian blockbuster movies (*Kalki 2898 AD*, *Manjummel Boys*, *Leo*, *Jawan*, *Aavesham*, *RRR*, *KGF Chapter 2*).
- **Smooth slide-down entrance animations** for titles, badges, and metadata using Framer Motion.
- **Ken Burns slow cinematic zoom effect** on backdrop imagery.
- **IMDb rating badges**, original language badges, genre tags, and director/music director spotlights.
- **Watch Official Trailer** button with instant HD YouTube player modal.
- Automatic slider rotation with interactive glass dot indicators and previous/next controls.

### 2. Sticky Glassmorphism Navigation Bar
- Transparent at page top, smoothly morphs into dark frosted glass (`backdrop-blur-md`) on scroll.
- **Live Regional Industry Switcher** (All, Malayalam, Tamil, Telugu, Hindi, Kannada).
- **Expandable Instant Search** with keyboard shortcut (`⌘K` / `Ctrl+K`).
- **Interactive Watchlist Drawer** with persistent `localStorage` support and live count pill.
- Responsive mobile drawer menu.

### 3. Horizontally Scrollable Category Rails (All 12 Required Categories)
1. **Trending Indian Movies**
2. **Latest Releases**
3. **Upcoming Theatrical Premieres**
4. **Top Rated Masterpieces**
5. **Malayalam Cinema (Mollywood)**
6. **Tamil Cinema (Kollywood)**
7. **Telugu Cinema (Tollywood)**
8. **Hindi Cinema (Bollywood)**
9. **Kannada Cinema (Sandalwood)**
10. **Bollywood Blockbusters**
11. **South Indian Cinema Marvels**
12. **Timeless Indian Classics**

### 4. Interactive Movie Cards & Hover Polish
- High-definition [2/3] movie posters.
- Glowing amber/crimson hover states with smooth scale transforms.
- Quick-action buttons: Direct trailer launch, full details modal, and watchlist toggle.

### 5. Detailed Movie Modal
- Large cinematic backdrop banner.
- Original native script titles (Malayalam, Tamil, Telugu, Hindi, Kannada).
- Director & Music Composer spotlights (e.g., Sushin Shyam, Anirudh Ravichander, Santhosh Narayanan, M.M. Keeravani).
- Full star cast cards with character roles.
- Box office earnings and budget stats.
- Dynamic "More Indian Movies You May Like" recommendation rail.

### 6. Dedicated Upcoming Movies Section with Live Countdowns
- Real-time countdown timer (Days, Hours, Minutes, Seconds) updating live every second.
- Interactive upcoming title picker tabs (*Pushpa 2: The Rule*, *L2: Empuraan*, *Coolie*, *Kantara Chapter 1*, *Toxic*).
- Notification alert and teaser player.

### 7. Multi-Facet Search & Dynamic Filtering
- Instant search by:
  - Movie title
  - Actor / Actress (e.g. Fahadh Faasil, Mohanlal, Thalapathy Vijay, Prabhas, Shah Rukh Khan, Yash)
  - Director (e.g. Lokesh Kanagaraj, S.S. Rajamouli, Prashanth Neel, Chidambaram)
- Filter by Language, Genre, and Release Era.
- Sort dynamically by IMDb Rating, Popularity/Votes, Release Date, and Title (A-Z).

### 8. TMDB API Integration & Fallback Layer
- Configurable `VITE_TMDB_API_KEY` in `.env`.
- Safe architecture that gracefully falls back to an ultra-rich built-in Indian cinema offline dataset if no API key is provided or if network is offline.

---

## 🛠️ Tech Stack

- **React 19**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Framer Motion**
- **Lucide React**

---

## 🚀 Getting Started

### 1. Installation
```bash
cd /Users/shyam.vinayak/.gemini/antigravity/scratch/cineverse
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

### 3. Optional: Configure TMDB API Key
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Add your TMDB API v3 key to `VITE_TMDB_API_KEY`. (If omitted, CineVerse runs in full offline mode with realistic Indian movies).

### 4. Production Build
```bash
npm run build
```
