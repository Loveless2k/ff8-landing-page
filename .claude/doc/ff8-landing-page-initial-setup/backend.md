# Domain Logic Architecture Plan

**Agent:** @domain-logic-architect  
**Feature:** Final Fantasy VIII Landing Page  
**Date:** 2025-11-11

---

## Constitution Analysis

**Backend Architecture:** Static Site Generation (SSG) - No backend required  
**Language:** TypeScript  
**Framework:** Astro

**Key Principle:** "Data-Driven Content - All character and game data MUST be stored in `src/data/` as structured TypeScript/JSON files."

---

## Architecture Pattern

Since this is a static site with no backend API, the "domain logic" is primarily **data modeling and content structure**. I will apply a **Data-First Architecture** pattern:

1. **Type-Safe Data Models** - Define strict TypeScript interfaces
2. **Separation of Concerns** - Data files are separate from presentation
3. **Single Source of Truth** - All content comes from `src/data/`
4. **Validation at Build Time** - TypeScript ensures data integrity

---

## Implementation Plan

### 1. Data Type Definitions

**File:** `src/data/types.ts`

```typescript
// ABOUTME: Core TypeScript interfaces for Final Fantasy VIII landing page data
// ABOUTME: Defines the shape of character and game detail data structures

export interface Character {
  id: string; // Unique identifier (e.g., "squall")
  name: string; // Full character name
  role: string; // Character role/title
  age: number; // Character age
  description: string; // Character bio/description
  imageUrl: string; // Path to character image
  weapon: string; // Primary weapon
  limitBreak: string; // Limit break name
  quote?: string; // Optional character quote
}

export interface GameMechanic {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

export interface GameFeature {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export interface GameDetails {
  title: string;
  releaseDate: string; // ISO date format
  platforms: string[];
  developer: string;
  publisher: string;
  synopsis: string; // Main story overview
  tagline: string; // Marketing tagline
  features: GameFeature[];
  mechanics: GameMechanic[];
}
```

### 2. Character Data Implementation

**File:** `src/data/characters.ts`

```typescript
// ABOUTME: Character data for all main Final Fantasy VIII characters
// ABOUTME: Exports typed array of Character objects for use in components

import type { Character } from './types';

export const characters: Character[] = [
  {
    id: 'squall',
    name: 'Squall Leonhart',
    role: 'Main Protagonist',
    age: 17,
    description:
      'A lone wolf and leader of SeeD, Squall wields a gunblade and struggles with opening up to others.',
    imageUrl: '/images/characters/squall.webp',
    weapon: 'Gunblade (Revolver)',
    limitBreak: 'Renzokuken',
    quote: 'Whatever...',
  },
  {
    id: 'rinoa',
    name: 'Rinoa Heartilly',
    role: 'Resistance Fighter',
    age: 17,
    description:
      "A passionate member of the Forest Owls resistance group who brings warmth to Squall's cold exterior.",
    imageUrl: '/images/characters/rinoa.webp',
    weapon: 'Blaster Edge',
    limitBreak: 'Angel Wing',
    quote: "I'll be waiting for you.",
  },
  {
    id: 'quistis',
    name: 'Quistis Trepe',
    role: 'Instructor',
    age: 18,
    description:
      'A talented young instructor at Balamb Garden who uses Blue Magic and a whip in combat.',
    imageUrl: '/images/characters/quistis.webp',
    weapon: 'Save the Queen (Whip)',
    limitBreak: 'Blue Magic',
  },
  {
    id: 'zell',
    name: 'Zell Dincht',
    role: 'Martial Artist',
    age: 17,
    description:
      'An energetic martial artist with a love for hot dogs and a fierce fighting spirit.',
    imageUrl: '/images/characters/zell.webp',
    weapon: 'Gauntlets',
    limitBreak: 'Duel',
  },
  {
    id: 'selphie',
    name: 'Selphie Tilmitt',
    role: 'Messenger',
    age: 17,
    description: 'A cheerful and optimistic SeeD member from Trabia Garden who wields nunchaku.',
    imageUrl: '/images/characters/selphie.webp',
    weapon: 'Nunchaku',
    limitBreak: 'Slot',
  },
  {
    id: 'irvine',
    name: 'Irvine Kinneas',
    role: 'Sharpshooter',
    age: 17,
    description: 'A smooth-talking sniper from Galbadia Garden with a mysterious past.',
    imageUrl: '/images/characters/irvine.webp',
    weapon: 'Rifle',
    limitBreak: 'Shot',
  },
];
```

### 3. Game Details Data Implementation

**File:** `src/data/gameDetails.ts`

```typescript
// ABOUTME: Game information and details for Final Fantasy VIII
// ABOUTME: Exports typed GameDetails object with synopsis, features, and mechanics

import type { GameDetails } from './types';

export const gameDetails: GameDetails = {
  title: 'Final Fantasy VIII',
  releaseDate: '1999-02-11',
  platforms: ['PlayStation', 'PC', 'PlayStation 4', 'Xbox One', 'Nintendo Switch', 'Steam'],
  developer: 'Square (now Square Enix)',
  publisher: 'Square',
  tagline: 'The best way to avoid danger is to not get involved.',
  synopsis: `Final Fantasy VIII follows Squall Leonhart, a young SeeD mercenary who finds himself drawn into a conflict that spans time itself. As he and his companions uncover the truth about their pasts and the sorceress threat facing their world, they must confront destiny, love, and the meaning of existence.`,

  features: [
    {
      id: 'junction-system',
      title: 'Revolutionary Junction System',
      description:
        'Customize your characters by junctioning Guardian Forces and magic to stats, creating unique builds for each battle.',
    },
    {
      id: 'triple-triad',
      title: 'Triple Triad Card Game',
      description:
        'An addictive card game that became a phenomenon, with hundreds of cards to collect and strategic gameplay.',
    },
    {
      id: 'realistic-characters',
      title: 'Realistic Character Design',
      description:
        'Groundbreaking character models and FMV sequences that pushed the boundaries of PlayStation hardware.',
    },
    {
      id: 'epic-story',
      title: 'Time-Spanning Epic',
      description:
        'A complex narrative involving time compression, sorceresses, and the bonds that transcend lifetimes.',
    },
  ],

  mechanics: [
    {
      id: 'junction',
      name: 'Junction System',
      description:
        'Draw magic from enemies and junction it to stats for customization. Guardian Forces provide abilities and stat bonuses.',
    },
    {
      id: 'gf',
      name: 'Guardian Forces (GF)',
      description:
        'Summonable entities that provide abilities, stat junctions, and powerful attacks. Each GF can be customized through AP.',
    },
    {
      id: 'draw',
      name: 'Draw & Magic',
      description:
        'Extract magic from enemies and draw points. Magic is a consumable resource used for both casting and junctioning.',
    },
    {
      id: 'limit-breaks',
      name: 'Limit Breaks',
      description:
        'Powerful special attacks available when HP is low. Each character has unique limit break mechanics.',
    },
  ],
};
```

### 4. Data Validation Utilities

**File:** `src/data/validators.ts`

```typescript
// ABOUTME: Runtime validation utilities for data integrity
// ABOUTME: Ensures data conforms to expected shapes at build time

import type { Character, GameDetails } from './types';

export function validateCharacter(char: Character): boolean {
  return !!(
    char.id &&
    char.name &&
    char.role &&
    char.age > 0 &&
    char.description &&
    char.imageUrl &&
    char.weapon &&
    char.limitBreak
  );
}

export function validateGameDetails(details: GameDetails): boolean {
  return !!(
    details.title &&
    details.releaseDate &&
    details.platforms.length > 0 &&
    details.synopsis &&
    details.features.length > 0 &&
    details.mechanics.length > 0
  );
}
```

---

## Architecture Compliance Checklist

✅ **Principle 3 (Data-Driven Content):** All data is in `src/data/` as TypeScript files  
✅ **TypeScript Strictness:** No `any` types, all interfaces properly defined  
✅ **Component Isolation:** Data layer is completely separate from presentation  
✅ **Single Source of Truth:** All content comes from typed data files

---

## Files to Create

1. `src/data/types.ts` - TypeScript interfaces
2. `src/data/characters.ts` - Character data array
3. `src/data/gameDetails.ts` - Game information object
4. `src/data/validators.ts` - Optional validation utilities

---

## Next Steps for Other Agents

- **@presentation-layer-architect:** Import and use these data files in page components
- **@ui-component-architect:** Design components that accept these types as props
- **@test-strategy-planner:** Validate data integrity and type safety
- **@implementation-test-engineer:** Write unit tests for validators

---

**Status:** ✅ Plan Complete  
**Compliance:** 100% aligned with CLAUDE.md principles
