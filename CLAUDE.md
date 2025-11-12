#

# 🔴 =================================================================

# 🔴 STRATEGIC SECTION (The "Constitution")

# 🔴 =================================================================

# This section is filled by @meta-architect and approved by @project-coordinator.

# It defines the "What", "How", and "Who" of the project.

# It MUST be read by all agents before any work.

#

[project_metadata]
name: "Final Fantasy VIII Landing Page"
objective: "To create a visually striking, single-page website dedicated to Final Fantasy VIII featuring modern animations (smooth scrolling, fade-ins, hover effects, parallax), responsive design, character profiles, and comprehensive game details."

[stack]
language: "TypeScript"
framework: "Astro"
ui_library: "Astro Components + Tailwind CSS"
animation_library: "GSAP (GreenSock Animation Platform)"
additional_tools: "Astro Image Optimization, PostCSS"
backend_architecture: "Static Site Generation (SSG) - No backend required"

[architecture_principles]

- "Principle 1: Performance First - Ship minimal JavaScript. Only interactive components should hydrate."
- "Principle 2: Component Isolation - Each section (Hero, Characters, Game Details) MUST be a self-contained component."
- "Principle 3: Data-Driven Content - All character and game data MUST be stored in `src/data/` as structured TypeScript/JSON files."
- "Principle 4: Progressive Enhancement - Start with semantic HTML and CSS, enhance with GSAP animations."
- "Principle 5: Mobile-First Responsive - All components MUST be designed mobile-first using Tailwind's responsive utilities."
- "Principle 6: Asset Optimization - All images MUST use Astro's Image component for automatic optimization."
- "Principle 7: Accessibility - All interactive elements MUST have proper ARIA labels and keyboard navigation."

[methodology]
workflow: "Prototype-First" # Visual design is critical for this landing page
vcs_provider: "GitHub"
validation_method: "Playwright" # For E2E testing of animations and responsive behavior

[core_team]

- "domain-logic-architect"
- "presentation-layer-architect"
- "ui-component-architect"
- "test-strategy-planner"
- "security-architect"
- "acceptance-validator"
- "implementation-test-engineer"

#

# 🔵 =================================================================

# 🔵 TECHNICAL CONTEXT SECTION

# 🔵 =================================================================

# This section defines the project-specific implementation details.

# Filled by @meta-architect, read by implementation agents.

#

## Project Architecture Layers

```
src/
  components/           # Reusable Astro/UI components
    characters/         # Character card components
      CharacterCard.astro
      CharacterGrid.astro
    sections/           # Page sections
      HeroSection.astro
      CharactersSection.astro
      GameDetailsSection.astro
      Footer.astro
    ui/                 # Base UI components
      Button.astro
      Card.astro
      Container.astro
  layouts/              # Page layouts
    BaseLayout.astro    # Main layout with head, scripts
  pages/                # Astro pages (file-based routing)
    index.astro         # Main landing page
  data/                 # Static data
    characters.ts       # Character profiles data
    gameDetails.ts      # Game information data
  styles/               # Global styles
    global.css          # Global CSS and Tailwind directives
  scripts/              # Animation scripts
    animations/
      heroAnimations.ts
      scrollAnimations.ts
      parallax.ts
  assets/               # Images, fonts, media
    images/
      characters/
      backgrounds/
    fonts/
public/                 # Static assets (favicon, etc.)
tests/                  # Playwright E2E tests
  e2e/
    landing-page.spec.ts
    animations.spec.ts
    responsive.spec.ts
```

## Path Aliases

```
"@components/*"       → ./src/components/*
"@layouts/*"          → ./src/layouts/*
"@data/*"             → ./src/data/*
"@styles/*"           → ./src/styles/*
"@scripts/*"          → ./src/scripts/*
"@assets/*"           → ./src/assets/*
```

## Environment Variables

No environment variables required for the static site.

Optional (for future enhancements):

- `PUBLIC_ANALYTICS_ID` - Google Analytics or similar (if tracking is needed)

## Development Commands

### Running the Application

```bash
npm run dev          # Start development server at localhost:4321
```

### Building

```bash
npm run build        # Build for production (outputs to dist/)
npm run preview      # Preview production build locally
```

### Testing

```bash
npm test             # Run all Playwright tests
npm run test:ui      # Run Playwright tests with UI
npm run test:debug   # Debug Playwright tests
```

### Linting

```bash
npm run lint         # Lint TypeScript and Astro files
npm run format       # Format code with Prettier
```

## API Communication Flow

Not applicable - this is a static site with no API communication.

All data is stored locally in `src/data/` and imported directly into components.

## Key Technical Details

### Animation Strategy

1. **GSAP ScrollTrigger**: Used for scroll-based animations (fade-ins, parallax effects)
2. **GSAP Timeline**: Used for complex, sequenced animations (hero section entrance)
3. **CSS Transitions**: Used for simple hover effects and micro-interactions
4. **Performance**: All animations use `transform` and `opacity` for GPU acceleration

### Responsive Breakpoints (Tailwind defaults)

- `sm`: 640px (tablet)
- `md`: 768px (tablet landscape)
- `lg`: 1024px (desktop)
- `xl`: 1280px (large desktop)
- `2xl`: 1536px (extra large desktop)

### Image Optimization

- All images use Astro's `<Image>` component
- Automatic format conversion (WebP, AVIF)
- Responsive image sizes generated automatically
- Lazy loading by default

### Content Structure

**Characters Data** (`src/data/characters.ts`):

```typescript
export interface Character {
  id: string;
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  weapon: string;
  limitBreak: string;
}
```

**Game Details Data** (`src/data/gameDetails.ts`):

```typescript
export interface GameDetails {
  title: string;
  releaseDate: string;
  platforms: string[];
  synopsis: string;
  features: Feature[];
  mechanics: Mechanic[];
}
```

## Architecture Compliance

### Critical Rules Agents MUST Follow:

1. **Data Isolation**: All character and game data MUST be stored in `src/data/` as TypeScript files with proper type definitions. Never hardcode content in components.

2. **Animation Initialization**: All GSAP animations MUST be initialized in `src/scripts/animations/` and imported into components. Never write animation code directly in Astro components.

3. **Component Purity**: Astro components MUST be pure and declarative. Complex logic should be extracted to TypeScript utilities.

4. **Image Optimization**: ALL images MUST use Astro's `<Image>` component. Never use plain `<img>` tags except for SVGs.

5. **Responsive Design**: All components MUST use Tailwind's responsive utilities. Test at all breakpoints (mobile, tablet, desktop).

6. **Accessibility**: All interactive elements MUST have:
   - Proper semantic HTML
   - ARIA labels where needed
   - Keyboard navigation support
   - Focus states

7. **Performance Budget**:
   - First Contentful Paint (FCP) < 1.5s
   - Largest Contentful Paint (LCP) < 2.5s
   - Total Blocking Time (TBT) < 200ms
   - Cumulative Layout Shift (CLS) < 0.1

8. **CSS Organization**: Use Tailwind utilities first. Only create custom CSS in `global.css` for truly global styles or complex animations.

9. **TypeScript Strictness**: All TypeScript files MUST have no `any` types. Use proper type definitions from `src/data/`.

10. **Testing Coverage**: All interactive features and animations MUST have corresponding Playwright tests.

#

# ⚪ =================================================================

# ⚪ GLOBAL RULES SECTION (The "Methodology")

# ⚪ =================================================================

# These rules are fixed for the "Universal Framework".

# They define HOW agents operate and collaborate.

#

## Sub-Agent Workflow & Rules

- After a plan mode phase you should create a `.claude/sessions/context_session_{feature_name}.md` with the definition of the plan.
- Before you do any work, MUST view files in `.claude/sessions/context_session_{feature_name}.md` file and `.claude/doc/{feature_name}/*` files to get the full context.
- `.claude/sessions/context_session_{feature_name}.md` should contain most of context of what we did, overall plan, and sub agents will continuously add context to the file.
- After you finish the work, MUST update the `.claude/sessions/context_session_{feature_name}.md` file to make sure others can get full context of what you did.
- After you finish each phase, MUST update the `.claude/sessions/context_session_{feature_name}.md` file.

## Code Writing Standards

- **Simplicity First**: Prefer simple, clean, maintainable solutions over clever ones.
- **ABOUTME Comments**: All code files MUST start with a brief 2-line comment explaining what the file does. Each line MUST start with "ABOUTME: ".
- **Minimal Changes**: Make the SMALLEST reasonable changes to achieve the desired outcome.
- **Style Matching**: MATCH the style and formatting of surrounding code.
- **Preserve Comments**: NEVER remove code comments unless provably false.
- **No Temporal Naming**: Avoid 'new', 'improved', 'enhanced' in names/comments.
- **Evergreen Documentation**: Comments describe code as it is, not its history.
- **TypeScript First**: Always use TypeScript. Leverage the type system for safety.
- **Functional Patterns**: Prefer pure functions and immutable data structures where appropriate.

## Version Control Standards

- Non-trivial edits MUST be tracked in git.
- If the project isn't in a git repo, YOU MUST STOP and ask permission to initialize one.
- If there are uncommitted changes... YOU MUST STOP and ask how to handle them.
- When starting work... YOU MUST create a WIP branch.
- YOU MUST commit frequently throughout the development process.
- Never throw away implementations without explicit permission.
- Commit messages MUST be descriptive and follow conventional commits format:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `docs:` for documentation
  - `style:` for formatting
  - `refactor:` for code restructuring
  - `test:` for adding tests
  - `chore:` for maintenance

## Testing Requirements

- **NO EXCEPTIONS POLICY**: All projects MUST have unit tests, integration tests, AND end-to-end tests.
- The only way to skip any test type is if Daniel EXPLICITLY states: "I AUTHORIZE YOU TO SKIP WRITING TESTS THIS TIME."
- Tests MUST comprehensively cover ALL implemented functionality.
- Test output MUST BE PRISTINE TO PASS.
- YOU MUST NEVER ignore system or test output - logs contain critical information.
- **For this project specifically**:
  - E2E tests MUST verify animations trigger correctly
  - E2E tests MUST verify responsive behavior at all breakpoints
  - E2E tests MUST verify accessibility (keyboard navigation, ARIA)
  - Visual regression tests are RECOMMENDED for design consistency

## Code Writing

- YOU MUST ALWAYS address me as "Daniel" in all communications.
- YOU MUST NOT change whitespace unrelated to code you're modifying.
- YOU MUST preserve existing code style and patterns.
- YOU MUST ask before making architectural changes.
- YOU MUST explain your reasoning for non-obvious decisions.

## Getting Help

- Always ask for clarification rather than making assumptions.
- Stop and ask for help when stuck, especially when human input would be valuable.
- If considering an exception to any rule, stop and get explicit permission from Daniel first.
- If you encounter conflicting requirements, stop and ask Daniel for prioritization.

## Compliance Check

- Before submitting any work, verify that you have followed ALL guidelines above.
- If you find yourself considering an exception to ANY rule, YOU MUST STOP and get explicit permission from Daniel first.
- Verify that all tests pass before considering work complete.
- Verify that the code meets the performance budget defined in Architecture Compliance.
- Verify that all accessibility requirements are met.
