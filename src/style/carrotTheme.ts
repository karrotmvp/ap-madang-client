import { ColorScheme } from './color';

const carrotColor = {
  $button: {
    primary: 'Red',
  },
  $gray300: 'Gray300',
  $gray500: 'Red',
};

export type CarrotThemeType = {
  colors: ColorScheme;
};

export const carrotTheme: CarrotThemeType = {
  colors: carrotColor,
};
