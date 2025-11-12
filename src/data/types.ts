// ABOUTME: Core TypeScript interfaces for Final Fantasy VIII landing page data
// ABOUTME: Defines the shape of character and game detail data structures

/**
 * Represents a playable character in Final Fantasy VIII
 *
 * @interface Character
 * @property {string} id - Unique identifier for the character (e.g., "squall", "rinoa")
 * @property {string} name - Full character name (e.g., "Squall Leonhart")
 * @property {string} role - Character's role or title (e.g., "Main Protagonist", "Instructor")
 * @property {number} age - Character's age in years
 * @property {string} description - Detailed character biography and personality description
 * @property {string} imageUrl - Path to character portrait image (relative to public directory)
 * @property {string} weapon - Primary weapon used by the character
 * @property {string} limitBreak - Name of the character's limit break ability
 * @property {string} [quote] - Optional memorable quote from the character
 */
export interface Character {
  id: string;
  name: string;
  role: string;
  age: number;
  description: string;
  imageUrl: string;
  weapon: string;
  limitBreak: string;
  quote?: string;
}

/**
 * Represents a gameplay mechanic in Final Fantasy VIII
 *
 * @interface GameMechanic
 * @property {string} id - Unique identifier for the mechanic (e.g., "junction", "draw")
 * @property {string} name - Display name of the mechanic
 * @property {string} description - Detailed explanation of how the mechanic works
 * @property {string} [icon] - Optional path to icon representing the mechanic
 */
export interface GameMechanic {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

/**
 * Represents a key feature or selling point of Final Fantasy VIII
 *
 * @interface GameFeature
 * @property {string} id - Unique identifier for the feature (e.g., "junction-system", "triple-triad")
 * @property {string} title - Display title of the feature
 * @property {string} description - Detailed description of the feature and its significance
 * @property {string} [imageUrl] - Optional path to image illustrating the feature
 */
export interface GameFeature {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

/**
 * Represents comprehensive game information for Final Fantasy VIII
 *
 * @interface GameDetails
 * @property {string} title - Official game title
 * @property {string} releaseDate - Original release date in ISO format (YYYY-MM-DD)
 * @property {string[]} platforms - Array of platforms the game is available on
 * @property {string} developer - Game development company
 * @property {string} publisher - Game publishing company
 * @property {string} synopsis - Main story overview and plot summary
 * @property {string} tagline - Marketing tagline or memorable quote
 * @property {GameFeature[]} features - Array of key game features
 * @property {GameMechanic[]} mechanics - Array of core gameplay mechanics
 */
export interface GameDetails {
  title: string;
  releaseDate: string;
  platforms: string[];
  developer: string;
  publisher: string;
  synopsis: string;
  tagline: string;
  features: GameFeature[];
  mechanics: GameMechanic[];
}
