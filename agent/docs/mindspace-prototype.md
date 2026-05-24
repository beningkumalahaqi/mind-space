# MindSpace Prototype — Project Documentation

## Overview

MindSpace is a mobile-first wellness prototype built with **Next.js 16 App Router**, **TypeScript**, and **Tailwind CSS v4**. It serves as an academic UX/UI prototype focused on **Gen Z digital well-being** and **SDG 3: Good Health and Well-being**.

The prototype feels realistic, polished, emotionally calming, and fully interactive without requiring any backend or database. All data persistence is handled client-side via localStorage.

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 16 | Framework with App Router |
| TypeScript | Type safety and developer experience |
| Tailwind CSS v4 | Utility-first styling with JIT engine |
| framer-motion | Animations and micro-interactions |
| lucide-react | Icon library |
| class-variance-authority + clsx + tailwind-merge | Component styling utilities |

---

## Project Structure

```
mindspace-prototype/
├── agent/
│   ├── plan/
│   │   └── mindspace-prototype/
│   │       └── plan.md              # Architecture plan
│   └── docs/
│       └── mindspace-prototype.md   # This document
├── src/
│   ├── app/
│   │   ├── globals.css              # Global styles + design tokens
│   │   ├── layout.tsx               # Root layout with metadata + providers
│   │   ├── page.tsx                 # Landing page (/)
│   │   ├── dashboard/
│   │   │   └── page.tsx             # Dashboard (/dashboard)
│   │   ├── mood/
│   │   │   └── page.tsx             # Mood check-in (/mood)
│   │   ├── reflection/
│   │   │   └── page.tsx             # Screen time reflection (/reflection)
│   │   ├── challenge/
│   │   │   └── page.tsx             # Digital detox challenge (/challenge)
│   │   ├── community/
│   │   │   └── page.tsx             # Safe community (/community)
│   │   ├── journal/
│   │   │   └── page.tsx             # Self reflection journal (/journal)
│   │   └── help/
│   │       └── page.tsx             # Emergency help (/help)
│   ├── components/
│   │   ├── ui/                      # Base reusable UI components
│   │   │   ├── Button.tsx           # Animated button with variants
│   │   │   ├── Card.tsx             # Glassmorphism card container
│   │   │   ├── Input.tsx            # Form inputs + textareas
│   │   │   ├── Modal.tsx            # Overlay modal with backdrop blur
│   │   │   ├── ProgressRing.tsx     # SVG circular progress indicator
│   │   │   ├── Skeleton.tsx         # Loading skeleton placeholders
│   │   │   └── Toast.tsx            # Toast notification system
│   │   └── shared/                  # Domain-specific components
│   │       ├── BottomNav.tsx        # 5-tab mobile bottom navigation
│   │       ├── BreathingExercise.tsx # Guided breathing animation
│   │       ├── ChallengeCard.tsx    # Challenge display card
│   │       ├── FloatingActions.tsx  # FAB quick action menu
│   │       ├── InsightCard.tsx      # Wellness insight card
│   │       ├── MoodCard.tsx         # Emoji mood selection card
│   │       ├── PageContainer.tsx    # Consistent page wrapper
│   │       └── SectionHeader.tsx    # Section title + subtitle
│   ├── data/                        # Mock data files
│   │   ├── challenges.ts            # Challenge definitions
│   │   ├── community.ts            # Community feed posts
│   │   ├── moods.ts                # Mood options
│   │   ├── reflections.ts          # Reflection prompts + insights
│   │   └── resources.ts            # Help resources
│   ├── hooks/
│   │   ├── useLocalStorage.ts       # Generic localStorage persistence
│   │   └── useMoodHistory.ts        # Mood entry management
│   ├── lib/
│   │   ├── storage.ts              # localStorage utility helpers
│   │   └── utils.ts                # cn() class merging utility
│   └── types/
│       └── index.ts                # TypeScript interfaces
```

---

## Routing Strategy

All pages are Client Components (`'use client'`) because they require:
- Browser APIs (localStorage, window)
- Interactive event handlers (onClick, onChange)
- Animation libraries (framer-motion)
- React hooks (useState, useEffect)

| Route | File | Page |
|-------|------|------|
| `/` | `src/app/page.tsx` | Landing Page |
| `/dashboard` | `src/app/dashboard/page.tsx` | Dashboard |
| `/mood` | `src/app/mood/page.tsx` | Mood Check-in |
| `/reflection` | `src/app/reflection/page.tsx` | Screen Time Reflection |
| `/challenge` | `src/app/challenge/page.tsx` | Digital Detox Challenge |
| `/community` | `src/app/community/page.tsx` | Safe Community |
| `/journal` | `src/app/journal/page.tsx` | Self Reflection Journal |
| `/help` | `src/app/help/page.tsx` | Emergency Help |

The **BottomNav** component provides navigation across the 5 primary tabs (Home, Mood, Focus, Challenges, Community) with a spring-animated active indicator.

---

## Design System

### Color Palette

The palette was chosen to evoke calmness, warmth, and emotional safety — key principles for a digital well-being application targeting Gen Z.

| Token | Color | Hex | Usage |
|-------|-------|-----|-------|
| `primary` | Soft Lavender | `#A78BFA` | Primary actions, navigation active state |
| `secondary` | Calming Mint | `#6EE7B7` | Secondary actions, success states |
| `accent` | Warm Peach | `#FBBF24` | Accents, highlights, streaks |
| `background` | Off-white Cream | `#FEFCE8` | Page background — warm and inviting |
| `surface` | White | `#FFFFFF` | Cards, modals, elevated elements |
| `foreground` | Charcoal | `#1F2937` | Primary text |
| `muted` | Warm Gray | `#9CA3AF` | Secondary text, placeholders |

### Semantic Colors

| Token | Color | Usage |
|-------|-------|-------|
| `lavender-light` | `#EDE9FE` | Mood/lavender backgrounds |
| `mint-light` | `#D1FAE5` | Success, calm states |
| `peach-light` | `#FEF3C7` | Warm accents |
| `rose-light` | `#FFE4E6` | Emergency, error states |
| `sky-light` | `#E0F2FE` | Information, focus |

### Typography

- **Font Family**: Geist (system sans-serif fallback)
- **Scale**: 12px (xs) → 36px (4xl)
- **Weights**: 500 (medium) for body, 600 (semibold) for headings
- **Line Height**: Relaxed (1.6) for maximum readability
- **Principles**: Comfortable reading, clear hierarchy, generous spacing

### Spacing

- **Base unit**: 4px increments
- **Touch targets**: Minimum 44px (accessibility)
- **Section padding**: `py-8` (32px)
- **Card padding**: `p-5` (20px)
- **Container max-width**: `max-w-lg` (512px) — optimal for mobile reading

### Effects

- **Border radius**: `rounded-2xl` (16px) for cards, `rounded-xl` (12px) for buttons
- **Shadows**: `shadow-sm` for cards, `shadow-lg` for modals and FAB
- **Glass effect**: `backdrop-filter: blur(12px)` with semi-transparent white background
- **Gradients**: Subtle gradient overlays for featured sections

---

## UX & Emotional Design Decisions

### Calming Aesthetic
- **Pastel palette**: Soft colors reduce visual stress and create a safe, gentle atmosphere
- **Rounded corners**: Organic shapes feel more approachable and less rigid
- **Generous white space**: Reduces cognitive load and creates breathing room
- **Subtle shadows**: Adds depth without harshness

### Micro-interactions
- **Spring animations**: Buttons scale slightly on hover/tap for tactile feedback
- **Page transitions**: Fade + slide-up creates smooth navigation flow
- **Progress rings**: Animated SVG circles provide satisfying progress visualization
- **Breathing exercise**: Continuous scale pulse guides the user through breath cycles

### Emotional Safety
- **Anonymous community**: No usernames or profiles — reduces social anxiety
- **Emergency help tab**: Always accessible via FAB or navigation; warm, non-judgmental tone
- **No streaks for missed days**: Positive reinforcement only
- **Non-judgmental language**: "Reflect" instead of "improve," "check in" instead of "report"

### Mobile-First Principles
- **Bottom navigation**: Thumb-friendly reach zone
- **FAB (Floating Action Button)**: Quick access to key actions
- **Safe area insets**: Proper spacing on notched devices
- **Touch targets ≥ 44px**: Accessibility compliance
- **Responsive grid**: Graceful scaling from mobile to tablet to desktop

---

## Reusable Component Architecture

### UI Components (`src/components/ui/`)

These are generic, presentation-only components that accept props for configuration:

| Component | Props | Features |
|-----------|-------|----------|
| `Button` | variant, size, loading, disabled | 6 variants, 4 sizes, loading spinner |
| `Card` | glass, noPadding | Animated entry, glass effect option |
| `Modal` | open, onClose, title | Backdrop blur, scale animation |
| `Input` | label, error | Styled input with validation state |
| `Textarea` | label, error | Styled textarea with validation state |
| `ProgressRing` | progress, size, color | SVG animated ring |
| `Skeleton` | className | Pulse loading animation |
| `CardSkeleton` | - | Pre-configured card skeleton |
| `Toast` | message, type | Auto-dismiss notification system |

### Shared Components (`src/components/shared/`)

Domain-specific components that compose UI components:

| Component | Purpose |
|-----------|---------|
| `BottomNav` | Mobile navigation with active indicator |
| `PageContainer` | Consistent page wrapper with animations |
| `SectionHeader` | Title + subtitle + optional action |
| `MoodCard` | Emoji-based mood selection card |
| `ChallengeCard` | Challenge display with progress ring |
| `InsightCard` | Wellness insight with icon |
| `FloatingActions` | FAB menu with quick actions |
| `BreathingExercise` | Guided breathing animation |

### Component Patterns
- All components use the `cn()` utility for class merging
- Animation variants are defined at the component level
- Components accept `className` for external styling overrides
- Components use `forwardRef` where appropriate
- Toast system uses React Context for global access

---

## localStorage Persistence Approach

Data persistence is handled entirely on the client side using a custom `useLocalStorage` hook:

```typescript
const [value, setValue, remove] = useLocalStorage<T>(key, initialValue);
```

### Stored Data

| Key | Type | Content |
|-----|------|---------|
| `mindspace_mood_history` | `MoodEntry[]` | Mood check-in history |
| `mindspace_reflections` | `ScreenTimeEntry[]` | Screen time reflections |
| `mindspace_challenges` | `Challenge[]` | Challenge state and progress |
| `mindspace_community_posts` | `CommunityPost[]` | User-created community posts |
| `mindspace_journal_entries` | `JournalEntry[]` | Journal entries |

### Features
- **Tab sync**: Listens to the `storage` event for cross-tab synchronization
- **Error resilience**: Falls back gracefully if localStorage is unavailable
- **Type safety**: Generic TypeScript hook preserves types
- **Prefix namespacing**: All keys prefixed with `mindspace_` to avoid conflicts

---

## Animation Strategy

| Context | Technique | Library |
|---------|-----------|---------|
| Page transitions | Fade + slide up (opacity, y) | framer-motion |
| Button feedback | Scale on hover (1.02) + tap (0.97) | framer-motion |
| Card entries | Fade + slide up with stagger | framer-motion |
| Progress rings | SVG stroke-dashoffset animation | framer-motion |
| Breathing exercise | Continuous scale pulse | CSS keyframes |
| Modals | Scale + fade with backdrop blur | framer-motion |
| Navigation indicator | Spring-animated layoutId | framer-motion |
| Skeleton loading | Shimmer gradient animation | CSS keyframes |
| Toast notifications | Slide up + fade | framer-motion |

---

## Prototype Limitations

1. **No backend or database** — All data is client-side only. Clearing browser data will reset all information.
2. **No real authentication** — No user accounts, no server-side identity.
3. **Local-only community** — Posts are visible only to the current browser. No real sharing or social features.
4. **No push notifications** — Cannot send reminders or alerts.
5. **Static wellness insights** — All insights are randomly selected from predefined templates, not truly personalized.
6. **No media/content** — Meditation guides are descriptive only; no audio/video files.
7. **Single-user only** — There is no multi-user or family account feature.
8. **Mock emergency resources** — Hotline numbers are real but formatted for the demo; users should verify independently.

---

## Local Development Setup

### Prerequisites
- Node.js 18+ (recommended: 20+)
- npm, pnpm, or yarn

### Installation

```bash
# Navigate to the project directory
cd mindspace-prototype

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
npm start
```

### Development Notes

- The project uses **Tailwind CSS v4** with the `@tailwindcss/postcss` plugin
- No `tailwind.config.js` is needed — all theme customization is in `globals.css` using `@theme inline`
- All pages are static (SSG) — no server-side rendering needed
- The project uses Turbopack for fast development refreshes

---

## Page Guide

### Landing Page (`/`)
Hero section with gradient text, feature highlights in glass cards, and CTA to start the journey. Animated sections with staggered reveal animations.

### Dashboard (`/dashboard`)
Daily greeting (time-aware), mood summary card with today's check-in, quick action grid, progress ring showing weekly check-in rate, today's challenge preview, screen time reflection prompt, and community highlight.

### Mood Check-in (`/mood`)
Six emoji-based mood options (Amazing, Good, Okay, Down, Stressed, Tired). Optional note input. Mood history display with frequency analysis. localStorage persistence.

### Screen Time Reflection (`/reflection`)
Screen time hour input with visual category indicator (low/moderate/high). Platform selector dropdown. Random reflection question. AI-like wellness insight generation based on screen time. History log.

### Digital Detox Challenge (`/challenge`)
Six challenges with progress tracking, streak system, join/unjoin, and daily completion logging. Stats overview card (active challenges, total streak).

### Safe Community (`/community`)
Anonymous posting with random name assignment. Like and reply system. Expandable reply threads. Supportive community guidelines banner.

### Self Reflection Journal (`/journal`)
Minimal distraction writing interface. Save, view history, and delete entries. Character count. Date-stamped entries sorted by newest first.

### Emergency Help (`/help`)
Tabbed interface: Crisis Hotlines (4 real helplines with phone numbers), Self-Care Resources (grounding exercises), Meditation Recommendations (guided meditation descriptions), and Guided Breathing Exercise (animated 4-4-4-2 breathing circle).

---

## Accessibility Considerations

- All interactive elements are focusable with visible focus rings
- Touch targets are minimum 44px (WCAG 2.1 guideline)
- Color contrast ratios meet AA standards for text
- Semantic HTML structure with proper heading hierarchy
- ARIA labels on icon-only buttons
- No auto-playing media or animations that can't be paused
- Breathing exercise has pause and reset controls

---

## SDG 3 Alignment

This prototype supports **UN Sustainable Development Goal 3: Good Health and Well-being** by:

- Promoting **mental health awareness** through mood tracking and reflection
- Encouraging **healthy digital habits** through screen time awareness and detox challenges
- Providing **crisis support resources** accessible within the app
- Fostering **community support** through anonymous peer interaction
- Creating a **calming, non-judgmental space** for self-reflection and growth

---

*Documentation generated for MindSpace Prototype — Academic UX/UI Project*
