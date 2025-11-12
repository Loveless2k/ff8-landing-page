// ABOUTME: Character data for all main Final Fantasy VIII characters
// ABOUTME: Exports typed array of Character objects for use in components

import type { Character } from './types';

/**
 * Array of all main playable characters in Final Fantasy VIII
 *
 * Contains complete character data for:
 * - Squall Leonhart (Main Protagonist)
 * - Rinoa Heartilly (Resistance Fighter)
 * - Quistis Trepe (Instructor)
 * - Zell Dincht (Martial Artist)
 * - Selphie Tilmitt (Messenger)
 * - Irvine Kinneas (Sharpshooter)
 *
 * Each character includes biographical information, combat stats,
 * and memorable quotes where applicable.
 */
export const characters: Character[] = [
  {
    id: 'squall',
    name: 'Squall Leonhart',
    role: 'Main Protagonist',
    age: 17,
    description:
      'A lone wolf and leader of SeeD, Squall wields a gunblade and struggles with opening up to others. As the commander of Balamb Garden, he must learn to trust his companions and confront his past.',
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
      "A passionate member of the Forest Owls resistance group who brings warmth to Squall's cold exterior. Her determination and compassion help bridge the gap between duty and emotion.",
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
      'A talented young instructor at Balamb Garden who uses Blue Magic and a whip in combat. Despite her youth, she commands respect through her intelligence and combat prowess.',
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
      'An energetic martial artist with a love for hot dogs and a fierce fighting spirit. His enthusiasm and loyalty make him an invaluable member of the team.',
    imageUrl: '/images/characters/zell.webp',
    weapon: 'Gauntlets',
    limitBreak: 'Duel',
  },
  {
    id: 'selphie',
    name: 'Selphie Tilmitt',
    role: 'Messenger',
    age: 17,
    description:
      'A cheerful and optimistic SeeD member from Trabia Garden who wields nunchaku. Her upbeat personality and hidden depths surprise those who underestimate her.',
    imageUrl: '/images/characters/selphie.webp',
    weapon: 'Nunchaku',
    limitBreak: 'Slot',
  },
  {
    id: 'irvine',
    name: 'Irvine Kinneas',
    role: 'Sharpshooter',
    age: 17,
    description:
      'A smooth-talking sniper from Galbadia Garden with a mysterious past. Behind his confident facade lies a sensitive soul burdened by memories.',
    imageUrl: '/images/characters/irvine.webp',
    weapon: 'Rifle',
    limitBreak: 'Shot',
  },
];
