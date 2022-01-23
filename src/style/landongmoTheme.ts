import { colors } from '@karrotmarket/design-token';

import { ColorScheme } from './color';

const landongmoColor = {
  $button: {
    primary: '#41AC70',
    disable: '#DCDEE3',
  },
  $meeting: {
    notice: {
      background: '#ecf9f2',
      text: '#111111',
    },
    user: {
      shadow: '#41AC70',
    },
  },
  ...colors.light.scheme,
};

export type LandongmoThemeType = {
  colors: ColorScheme;
};

export const landongmoTheme: LandongmoThemeType = {
  colors: landongmoColor,
};
