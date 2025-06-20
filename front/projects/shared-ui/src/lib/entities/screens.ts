/** Must be the same as in tailwind screens preset */
export const SCREENS = {
  xs: '375px',
  sm: '540px',
  md: '720px',
  lg: '960px',
  xl: '1140px',
  '2xl': '1320px',
  '3xl': '1440px',
  '4xl': '1680px',
  '5xl': '1920px',
} as const;

export type Screen = typeof SCREENS[keyof typeof SCREENS];

export type MediaQueryScreen = `screen and (min-width: ${Screen})`;
