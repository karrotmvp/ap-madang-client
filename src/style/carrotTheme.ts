import { colors } from '@karrotmarket/design-token';

import { ColorScheme } from './color';

const carrotColor = {
  $button: {
    primary: '#FF7E36',
    disable: '#DCDEE3',
  },
  $meeting: {
    notice: {
      background: '#FFF7E6',
      text: '#BA5E02',
    },
    user: {
      shadow: '#FF7E36',
    },
  },
  ...colors.light.scheme,
};

export type CarrotThemeType = {
  colors: ColorScheme;
};

export const carrotTheme: CarrotThemeType = {
  colors: carrotColor,
};
