// ABOUTME: Game information and details for Final Fantasy VIII
// ABOUTME: Exports typed GameDetails object with synopsis, features, and mechanics

import type { GameDetails } from './types';

/**
 * Complete game information for Final Fantasy VIII
 *
 * Includes comprehensive details about the game's story, features, mechanics,
 * release information, and platforms. This data is used throughout the landing
 * page to provide visitors with an overview of the game.
 *
 * @constant {GameDetails} gameDetails - The complete game details object
 */
export const gameDetails: GameDetails = {
  title: 'Final Fantasy VIII',
  releaseDate: '1999-02-11',
  platforms: ['PlayStation', 'PC', 'PlayStation 4', 'Xbox One', 'Nintendo Switch', 'Steam'],
  developer: 'Square (now Square Enix)',
  publisher: 'Square',
  tagline: 'The best way to avoid danger is to not get involved.',
  synopsis: `Final Fantasy VIII follows Squall Leonhart, a young SeeD mercenary who finds himself drawn into a conflict that spans time itself. As he and his companions uncover the truth about their pasts and the sorceress threat facing their world, they must confront destiny, love, and the meaning of existence.

Set in a world where nations employ mercenary forces from elite military academies, the story explores themes of fate, memory, and human connection. Squall's journey from a cold, detached soldier to someone who learns to open his heart forms the emotional core of this epic tale.

Through time compression, sorceress wars, and the bonds that transcend lifetimes, Final Fantasy VIII delivers a complex narrative that challenges players to question the nature of reality and the power of human relationships.`,

  features: [
    {
      id: 'junction-system',
      title: 'Revolutionary Junction System',
      description:
        'Customize your characters by junctioning Guardian Forces and magic to stats, creating unique builds for each battle. This innovative system replaced traditional leveling with a more strategic approach to character development.',
    },
    {
      id: 'triple-triad',
      title: 'Triple Triad Card Game',
      description:
        'An addictive card game that became a phenomenon, with hundreds of cards to collect and strategic gameplay. Challenge NPCs across the world, master regional rules, and build the ultimate deck.',
    },
    {
      id: 'realistic-characters',
      title: 'Realistic Character Design',
      description:
        'Groundbreaking character models and FMV sequences that pushed the boundaries of PlayStation hardware. The game featured more realistic proportions and detailed animations than any previous Final Fantasy title.',
    },
    {
      id: 'epic-story',
      title: 'Time-Spanning Epic',
      description:
        'A complex narrative involving time compression, sorceresses, and the bonds that transcend lifetimes. Experience a story that weaves together past, present, and future in unexpected ways.',
    },
  ],

  mechanics: [
    {
      id: 'junction',
      name: 'Junction System',
      description:
        'Draw magic from enemies and junction it to stats for customization. Guardian Forces provide abilities and stat bonuses, allowing for deep strategic character building.',
    },
    {
      id: 'gf-system',
      name: 'Guardian Force System',
      description:
        'Summon powerful Guardian Forces in battle and develop them through AP. Each GF learns unique abilities and can be customized to fit your playstyle.',
    },
    {
      id: 'limit-breaks',
      name: 'Limit Breaks',
      description:
        "Unleash devastating special attacks when HP is low. Each character has unique Limit Breaks, from Squall's Renzokuken to Selphie's unpredictable Slot ability.",
    },
    {
      id: 'level-scaling',
      name: 'Dynamic Level Scaling',
      description:
        'Enemies scale with your party level, maintaining challenge throughout the game. This unique system rewards strategic play over grinding, encouraging players to master the Junction system.',
    },
  ],
};
