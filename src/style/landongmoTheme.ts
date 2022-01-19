import { ColorScheme } from './color';

const landongmoColor = {
  $button: {
    primary: '#00a8ff',
  },
  $gray300: '#f5f5f5',
  $gray500: '#e5e5e5',
};

export type LandongmoThemeType = {
  colors: ColorScheme;
};

export const landongmoTheme: LandongmoThemeType = {
  colors: landongmoColor,
};
