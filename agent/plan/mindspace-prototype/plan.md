# MindSpace Prototype — Architecture Plan

## Overview
MindSpace is a mobile-first wellness prototype built with Next.js 16 App Router, TypeScript, and Tailwind CSS. It serves as an academic UX/UI prototype focused on Gen Z digital well-being and SDG 3: Good Health and Well-being.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + CSS custom properties
- **UI Library**: shadcn/ui-inspired component architecture
- **Icons**: lucide-react
- **Animations**: framer-motion
- **State**: React hooks + localStorage
- **Fonts**: Geist (system font stack as fallback)

## Project Structure
```
src/
├── app/
│   ├── layout.tsx            # Root layout with metadata
│   ├── page.tsx              # Landing page (/)
│   ├── globals.css           # Global styles + design tokens
│   ├── dashboard/
│   │   ├── page.tsx          # Dashboard (/dashboard)
│   │   └── layout.tsx        # Hidden: Dashboard layout wrapper
│   ├── mood/
│   │   └── page.tsx          # Mood check-in (/mood)
│   ├── reflection/
│   │   └── page.tsx          # Screen time reflection (/reflection)
│   ├── challenge/
│   │   └── page.tsx          # Digital detox challenge (/challenge)
│   ├── community/
│   │   └── page.tsx          # Safe community (/community)
│   ├── journal/
│   │   └── page.tsx          # Self reflection journal (/journal)
│   └── help/
│       └── page.tsx          # Emergency help (/help)
├── components/
│   ├── ui/                   # Base reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── ProgressRing.tsx
│   │   ├── Toast.tsx
│   │   ├── Input.tsx
│   │   └── Skeleton.tsx
│   └── shared/               # Domain-specific shared components
│       ├── BottomNav.tsx
│       ├── PageContainer.tsx
│       ├── SectionHeader.tsx
│       ├── MoodCard.tsx
│       ├── ChallengeCard.tsx
│       ├── InsightCard.tsx
│       ├── FloatingActions.tsx
│       └── BreathingExercise.tsx
├── lib/
│   ├── utils.ts              # cn() utility
│   └── storage.ts            # localStorage helpers
├── hooks/
│   ├── useLocalStorage.ts    # localStorage persistence hook
│   └── useMoodHistory.ts     # Mood data management
├── data/
│   ├── moods.ts              # Mock mood data
│   ├── challenges.ts         # Challenge data
│   ├── community.ts          # Community post data
│   ├── resources.ts          # Help resources
│   └── reflections.ts        # Reflection prompt data
└── types/
    └── index.ts              # TypeScript interfaces
```

## Routing Strategy
All pages are client components ('use client') since they require interactivity, animations, and localStorage access.

| Route | Page | Key Features |
|-------|------|-------------|
| `/` | Landing | Hero, features, CTA |
| `/dashboard` | Dashboard | Greeting, mood, progress |
| `/mood` | Mood Check-in | Emoji picker, history |
| `/reflection` | Screen Time | Input, insights |
| `/challenge` | Challenges | Cards, streaks |
| `/community` | Community | Anonymous feed |
| `/journal` | Journal | Writing, history |
| `/help` | Emergency Help | Resources, breathing |

## Component Architecture

### Design System Colors (Calming Pastel Palette)
- **Primary**: Soft lavender (#A78BFA / purple-400)
- **Secondary**: Calming mint (#6EE7B7 / emerald-300)
- **Accent**: Warm peach (#FBBF24 / amber-300)
- **Background**: Off-white cream (#FFFBEB / amber-50)
- **Surface**: White with subtle shadow
- **Text**: Charcoal (#1F2937 / gray-800)
- **Muted**: Warm gray (#9CA3AF / gray-400)
- **Success**: Soft green (#34D399 / emerald-400)
- **Error**: Soft rose (#FB7185 / rose-400)
- **Mood colors**: Various emoji-themed pastels

### Typography
- Font: Geist (system sans-serif fallback)
- Scale: text-xs (12px) → text-4xl (36px)
- Line height: relaxed (1.6) for readability
- Hierarchy: bold weights for headings, medium for body

### Spacing
- Base: 4px increments (p-4 = 16px)
- Touch targets: minimum 44px
- Section padding: py-8 (32px)
- Card padding: p-5 (20px)

### Reusable UI Components
1. **Button** — variants: primary, secondary, ghost, outline; sizes: sm, md, lg; with loading state
2. **Card** — rounded-2xl with soft shadow, glass effect option
3. **Modal** — centered overlay with backdrop blur
4. **ProgressRing** — SVG circular progress with animation
5. **Toast** — slide-in notification (auto-dismiss)
6. **Input** — rounded, soft focus ring, textarea variant
7. **Skeleton** — loading placeholder with pulse animation

### Shared Domain Components
1. **BottomNav** — 5-tab mobile nav with active state, icons
2. **PageContainer** — consistent max-width, padding, safe area
3. **SectionHeader** — title + optional subtitle/action
4. **MoodCard** — emoji + label + optional detail
5. **ChallengeCard** — challenge name, progress, streak
6. **InsightCard** — icon + insight text + color accent
7. **FloatingActions** — quick action FAB menu
8. **BreathingExercise** — animated breathing circle

## State Management Approach
- **localStorage** via `useLocalStorage<T>` hook for:
  - Mood entries (daily check-ins)
  - Journal entries
  - Challenge progress
  - Screen time reflections
  - Community posts
- **React state** for:
  - UI state (modals, toasts)
  - Form inputs
  - Animation triggers

## Data Flow
1. User interacts → triggers handler
2. Handler updates React state
3. `useLocalStorage` hook persists to localStorage
4. Components re-render from updated state
5. Mock data used as initial/fallback values

## Implementation Order
1. Foundation: globals.css, lib/utils, types, hooks
2. UI components: Button, Card, Modal, ProgressRing, Toast, Input, Skeleton
3. Shared components: BottomNav, PageContainer, SectionHeader, etc.
4. Mock data files
5. Root layout with metadata + fonts
6. Landing page
7. Dashboard page
8. Mood check-in page
9. Screen time reflection page
10. Digital detox challenge page
11. Safe community page
12. Self reflection journal page
13. Emergency help page
14. Documentation

## Responsive Strategy
- Default: mobile-first (360px-428px)
- Tablet: md: (768px+) — wider cards, multi-column grid
- Desktop: lg: (1024px+) — centered container, max-w-2xl
- Touch: all interactive elements ≥ 44px
- Safe area insets for modern mobile devices

## Animation Strategy
- Page transitions: fade + slide up (framer-motion)
- Micro-interactions: scale on tap, opacity on hover
- Progress rings: SVG stroke-dashoffset animation
- Breathing exercise: continuous scale + opacity pulse
- Skeleton loading: shimmer animation

## Prototype Limitations
- No backend or database
- No real authentication
- Data persists only in browser localStorage
- Community posts are local-only (no real sharing)
- No push notifications
- All "insights" are client-side generated
- Static mock data where user-generated data is unavailable
