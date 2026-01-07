# Clinequal Frontend

Marketing website and demo platform for Clinequal - AI-powered clinical trial bias detection.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Font:** Inter (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/
│   ├── (marketing)/          # Marketing pages (/, /demo, /privacy-policy, etc.)
│   │   ├── page.tsx          # Homepage
│   │   ├── demo/             # Demo page (coming soon)
│   │   ├── privacy-policy/
│   │   └── terms-and-conditions/
│   ├── globals.css           # Design system & Tailwind config
│   └── layout.tsx            # Root layout
├── components/
│   ├── layout/               # Header, Footer
│   ├── sections/             # Page sections (Hero, Problem, Solution, etc.)
│   └── ui/                   # Primitives (Button, Container, Section)
public/
├── team/                     # Team headshots
├── academic_logos/           # University/institution logos
├── Logo.svg                  # Clinequal logo
└── Payoff.svg                # Clinequal icon
```

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Design System

Colors and tokens are defined in `src/app/globals.css`:

- **Primary:** #2F80ED (Clinequal blue)
- **Neutrals:** Slate scale
- **Font:** Inter

## Adding Content

### Team Members
Edit `src/components/sections/TeamSection.tsx` - update the `team` array.

### Academic Collaborators
Edit `src/components/sections/TrustSection.tsx` - update the `collaborators` array.

### Achievements
Edit `src/components/sections/TrustSection.tsx` - update the `achievements` array.
