import {
  theme,
  eyesMap,
  eyebrowsMap,
  mouthsMap,
  hairMap,
  facialHairMap,
  clothingMap,
  accessoryMap,
  graphicsMap,
  hatMap,
  bodyMap,
} from '@bigheads/core';
import colors from 'tailwindcss/colors';
import { ALL_COLORS, Color } from '../../types';

function selectRandomKey<T extends Record<string, unknown>>(object: T) {
  return (Object.keys(object) as Array<keyof typeof object>)[
    Math.floor(Math.random() * Object.keys(object).length)
  ];
}

export function getRandomOptions() {
  const skinTone = selectRandomKey(theme.colors.skin);
  const eyes = selectRandomKey(eyesMap);
  const eyebrows = selectRandomKey(eyebrowsMap);
  const mouth = selectRandomKey(mouthsMap);
  const hair = selectRandomKey(hairMap);
  const facialHair = selectRandomKey(facialHairMap);
  const clothing = selectRandomKey(clothingMap);
  const accessory = selectRandomKey(accessoryMap);
  const graphic = selectRandomKey(graphicsMap);
  const hat = selectRandomKey(hatMap);
  const body = selectRandomKey(bodyMap);

  const hairColor = selectRandomKey(theme.colors.hair);
  const clothingColor = selectRandomKey(theme.colors.clothing);
  const circleColor = selectRandomKey(theme.colors.bgColors);
  const lipColor = selectRandomKey(theme.colors.lipColors);
  const hatColor = selectRandomKey(theme.colors.clothing);
  const faceMaskColor = selectRandomKey(theme.colors.clothing);

  const mask = false;
  const faceMask = false;
  const lashes = Math.random() > 0.5;

  return {
    skinTone,
    eyes,
    eyebrows,
    mouth,
    hair,
    facialHair,
    clothing,
    accessory,
    graphic,
    hat,
    body,
    hairColor,
    clothingColor,
    circleColor,
    lipColor,
    hatColor,
    faceMaskColor,
    mask,
    faceMask,
    lashes,
  };
}

export function colorToHex(color: Color): string {
  switch (color) {
    case 'GRAY':
      return colors.zinc[300];
    case 'RED':
      return colors.red[400];
    case 'ORANGE':
      return colors.orange[400];
    case 'YELLOW':
      return colors.amber[400];
    case 'GREEN':
      return colors.emerald[400];
    case 'BLUE':
      return colors.sky[500];
    case 'PURPLE':
      return colors.indigo[400];
    case 'PINK':
      return colors.pink[400];
  }
}

function getRandomColor(): Color {
  const randomIndex = Math.floor(Math.random() * ALL_COLORS.length);
  return ALL_COLORS[randomIndex] as Color;
}

export function newUser() {
  return {
    username: '',
    password: '',
    email: '',
    avatar: JSON.stringify(getRandomOptions()),
  };
}

export function newProject() {
  return {
    title: '',
    description: '',
    tags: [],
    backgroundColor: colorToHex(getRandomColor()),
  };
}
