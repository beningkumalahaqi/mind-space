# MindSpace — Digital Wellness Prototype 🧠🌿

A mobile-first wellness prototype for **Gen Z digital well-being** and **SDG 3: Good Health and Well-being**. Built with Next.js 16, TypeScript, and Tailwind CSS v4.

> **Academic UX/UI Prototype** — No backend or database required. All data persists in your browser via localStorage.

---

## ✨ Features

| Page | Route | What it does |
|------|-------|-------------|
| **Landing** | `/` | Hero, feature highlights, CTA |
| **Dashboard** | `/dashboard` | Daily greeting, mood summary, progress, quick actions |
| **Mood Check-in** | `/mood` | 6 emoji-based moods, daily notes, history & frequency |
| **Screen Time** | `/reflection` | Track hours, select top app, reflection question, wellness insight |
| **Challenges** | `/challenge` | Digital detox challenges, streaks, daily logging |
| **Community** | `/community` | Anonymous posts, likes, replies, supportive feed |
| **Journal** | `/journal` | Distraction-free writing, entry history, delete |
| **Emergency Help** | `/help` | Crisis hotlines, self-care, meditation, breathing exercise |

---

## 🎨 Design System

**Calming pastel palette**: Lavender (`#A78BFA`), Mint (`#6EE7B7`), Peach (`#FBBF24`) on a warm cream background (`#FEFCE8`). Rounded corners, soft shadows, glass effects, and smooth framer-motion animations throughout.

---

## 📱 Mobile Preview

On **desktop** (≥1024px), the prototype renders inside a realistic phone frame (393×852px) with dynamic island, status bar, and home indicator — so you can demo the mobile experience without a device.

On **mobile/tablet**, the app fills the full screen natively.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — fully navigable and interactive.

### Build for production

```bash
npm run build
npm start
```

---

## 🏗️ Project Structure

```
src/
├── app/              # 8 routes (App Router)
├── components/
│   ├── ui/           # 8 reusable UI components
│   └── shared/       # 8 domain-specific components
├── data/             # Mock data (challenges, moods, resources, etc.)
├── hooks/            # useLocalStorage, useMoodHistory
├── lib/              # cn() utility, storage helpers
└── types/            # TypeScript interfaces
```

---

## 📄 Documentation

- [`agent/docs/mindspace-prototype.md`](./agent/docs/mindspace-prototype.md) — Full project documentation (architecture, UX decisions, design system, limitations)
- [`agent/plan/mindspace-prototype/plan.md`](./agent/plan/mindspace-prototype/plan.md) — Implementation plan
- [`agent/review/mindspace-prototype/review.md`](./agent/review/mindspace-prototype/review.md) — Architecture review

---

## ⚠️ Prototype Limitations

- **No backend** — all data is client-side only (localStorage)
- **No real authentication** — no user accounts
- **Local-only community** — posts exist only in your browser
- **Static insights** — AI-like insights are template-based, not truly personalized
- **Single-user** — no multi-user or family features

---

*Built for academic UX/UI purposes — Supporting SDG 3: Good Health and Well-being*
