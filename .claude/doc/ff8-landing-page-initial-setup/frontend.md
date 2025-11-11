# Presentation Layer Architecture Plan
**Agent:** @presentation-layer-architect  
**Feature:** Final Fantasy VIII Landing Page  
**Date:** 2025-11-11

---

## Constitution Analysis

**Framework:** Astro  
**UI Library:** Astro Components + Tailwind CSS  
**Animation Library:** GSAP

**Key Principles:**
- Performance First - Ship minimal JavaScript
- Component Isolation - Each section is self-contained
- Progressive Enhancement - Start with HTML/CSS, enhance with GSAP
- Mobile-First Responsive

---

## Architecture Pattern

For Astro, I will apply the **Islands Architecture** pattern:

1. **Static-First Rendering** - All components render to HTML at build time
2. **Selective Hydration** - Only interactive components load JavaScript
3. **Layout Composition** - BaseLayout wraps all pages
4. **File-Based Routing** - `src/pages/index.astro` is the entry point

---

## Implementation Plan

### 1. Base Layout

**File:** `src/layouts/BaseLayout.astro`

```astro
---
// ABOUTME: Base layout component providing HTML structure, meta tags, and global scripts
// ABOUTME: Wraps all pages with consistent head, navigation, and footer structure

interface Props {
  title?: string;
  description?: string;
  ogImage?: string;
}

const {
  title = 'Final Fantasy VIII - Official Landing Page',
  description = 'Experience the epic story of Squall Leonhart and his companions in this timeless RPG classic.',
  ogImage = '/images/og-image.jpg'
} = Astro.props;
---

<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    
    <!-- Open Graph / Social Media -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImage} />
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    
    <title>{title}</title>
  </head>
  <body class="bg-gray-900 text-white antialiased">
    <slot />
  </body>
</html>
```

### 2. Main Landing Page

**File:** `src/pages/index.astro`

```astro
---
// ABOUTME: Main landing page for Final Fantasy VIII website
// ABOUTME: Composes all section components into a single-page experience

import BaseLayout from '@layouts/BaseLayout.astro';
import HeroSection from '@components/sections/HeroSection.astro';
import CharactersSection from '@components/sections/CharactersSection.astro';
import GameDetailsSection from '@components/sections/GameDetailsSection.astro';
import Footer from '@components/sections/Footer.astro';

import { characters } from '@data/characters';
import { gameDetails } from '@data/gameDetails';
---

<BaseLayout>
  <main>
    <HeroSection />
    <CharactersSection characters={characters} />
    <GameDetailsSection gameDetails={gameDetails} />
  </main>
  <Footer />
</BaseLayout>
```

### 3. Section Components Structure

**File:** `src/components/sections/HeroSection.astro`

```astro
---
// ABOUTME: Hero section component with main title, tagline, and call-to-action
// ABOUTME: Features parallax background and GSAP entrance animations
---

<section 
  id="hero" 
  class="relative min-h-screen flex items-center justify-center overflow-hidden"
  data-section="hero"
>
  <!-- Background with parallax effect -->
  <div 
    class="absolute inset-0 z-0" 
    data-parallax-bg
  >
    <!-- Background image will be added via Astro Image component -->
  </div>
  
  <!-- Content -->
  <div class="relative z-10 container mx-auto px-4 text-center">
    <h1 
      class="text-6xl md:text-8xl font-bold mb-6 opacity-0"
      data-hero-title
    >
      Final Fantasy VIII
    </h1>
    
    <p 
      class="text-xl md:text-2xl mb-8 opacity-0"
      data-hero-tagline
    >
      The best way to avoid danger is to not get involved.
    </p>
    
    <div class="opacity-0" data-hero-cta>
      <a 
        href="#characters" 
        class="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        aria-label="Explore characters"
      >
        Explore the Story
      </a>
    </div>
  </div>
</section>

<script>
  // Animation initialization will be handled by src/scripts/animations/heroAnimations.ts
  import '@scripts/animations/heroAnimations';
</script>
```

**File:** `src/components/sections/CharactersSection.astro`

```astro
---
// ABOUTME: Characters showcase section displaying all main FF VIII characters
// ABOUTME: Uses CharacterGrid component to display character cards in responsive grid

import type { Character } from '@data/types';
import CharacterGrid from '@components/characters/CharacterGrid.astro';

interface Props {
  characters: Character[];
}

const { characters } = Astro.props;
---

<section 
  id="characters" 
  class="py-20 bg-gray-800"
  data-section="characters"
>
  <div class="container mx-auto px-4">
    <h2 
      class="text-5xl font-bold text-center mb-12 opacity-0"
      data-scroll-fade
    >
      Meet the Heroes
    </h2>
    
    <CharacterGrid characters={characters} />
  </div>
</section>

<script>
  import '@scripts/animations/scrollAnimations';
</script>
```

**File:** `src/components/sections/GameDetailsSection.astro`

```astro
---
// ABOUTME: Game details section showcasing FF VIII features and mechanics
// ABOUTME: Displays synopsis, features grid, and gameplay mechanics

import type { GameDetails } from '@data/types';
import Container from '@components/ui/Container.astro';
import Card from '@components/ui/Card.astro';

interface Props {
  gameDetails: GameDetails;
}

const { gameDetails } = Astro.props;
---

<section 
  id="game-details" 
  class="py-20 bg-gray-900"
  data-section="game-details"
>
  <Container>
    <!-- Synopsis -->
    <div class="mb-16 text-center max-w-4xl mx-auto">
      <h2 class="text-5xl font-bold mb-6" data-scroll-fade>
        {gameDetails.title}
      </h2>
      <p class="text-xl text-gray-300" data-scroll-fade>
        {gameDetails.synopsis}
      </p>
    </div>
    
    <!-- Features Grid -->
    <div class="mb-16">
      <h3 class="text-3xl font-bold mb-8 text-center" data-scroll-fade>
        Key Features
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {gameDetails.features.map((feature) => (
          <Card data-scroll-fade>
            <h4 class="text-xl font-bold mb-3">{feature.title}</h4>
            <p class="text-gray-400">{feature.description}</p>
          </Card>
        ))}
      </div>
    </div>
    
    <!-- Mechanics -->
    <div>
      <h3 class="text-3xl font-bold mb-8 text-center" data-scroll-fade>
        Gameplay Mechanics
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gameDetails.mechanics.map((mechanic) => (
          <Card data-scroll-fade>
            <h4 class="text-xl font-bold mb-3">{mechanic.name}</h4>
            <p class="text-gray-400">{mechanic.description}</p>
          </Card>
        ))}
      </div>
    </div>
  </Container>
</section>

<script>
  import '@scripts/animations/scrollAnimations';
</script>
```

**File:** `src/components/sections/Footer.astro`

```astro
---
// ABOUTME: Footer component with copyright and social links
// ABOUTME: Provides consistent bottom section for all pages
---

<footer class="bg-gray-950 py-8">
  <div class="container mx-auto px-4 text-center">
    <p class="text-gray-400">
      &copy; {new Date().getFullYear()} Square Enix. Final Fantasy VIII is a registered trademark.
    </p>
    <p class="text-gray-500 text-sm mt-2">
      This is a fan-made tribute page.
    </p>
  </div>
</footer>
```

---

## Path Aliases Configuration

**File:** `tsconfig.json` (to be updated)

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["./src/components/*"],
      "@layouts/*": ["./src/layouts/*"],
      "@data/*": ["./src/data/*"],
      "@styles/*": ["./src/styles/*"],
      "@scripts/*": ["./src/scripts/*"],
      "@assets/*": ["./src/assets/*"]
    }
  }
}
```

---

## Architecture Compliance Checklist

✅ **Principle 1 (Performance First):** All components are static by default, scripts loaded only where needed  
✅ **Principle 2 (Component Isolation):** Each section is self-contained  
✅ **Principle 4 (Progressive Enhancement):** HTML/CSS first, GSAP scripts loaded separately  
✅ **Principle 5 (Mobile-First):** All components use responsive Tailwind classes  

---

## Files to Create

1. `src/layouts/BaseLayout.astro` - Base HTML layout
2. `src/pages/index.astro` - Main landing page
3. `src/components/sections/HeroSection.astro` - Hero section
4. `src/components/sections/CharactersSection.astro` - Characters section
5. `src/components/sections/GameDetailsSection.astro` - Game details section
6. `src/components/sections/Footer.astro` - Footer

---

## Next Steps for Other Agents

- **@ui-component-architect:** Design CharacterGrid, CharacterCard, Container, Card components
- **@test-strategy-planner:** Plan E2E tests for page navigation and section rendering
- **Animation scripts:** Will be handled separately in `src/scripts/animations/`

---

**Status:** ✅ Plan Complete  
**Compliance:** 100% aligned with CLAUDE.md principles

