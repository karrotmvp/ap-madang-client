import type { ColorScheme as DaangnColorSheme } from '@karrotmarket/design-token';

export const COLOR = {
  TEXT_BLACK: '#111111',
  TEXT_REAL_BLACK: '#000000',
  TEXT_GREY: '#767676',
  TEXT_WHITE: '#ffffff',
  BACKGROUND_WHITE: '#ffffff',
  MODAL_WRAPPER_BLACK: 'rgba(25,25,26, 0.75)',
  SPINNER_WRAPPER_BLACK: 'rgba(25,25,26, 0.01)',
  IMAGE_WRAPPER_BLACK: 'rgba(25,25,26, 0.1)',
  GREY_000: '#FAFAFA',
  GREY_100: '#F5F5F5',
  GREY_200: '#EDEDED',
  GREY_300: '#DFE1E3',
  GREY_400: '#CBCCCD',
  GREY_500: '#ACAEAF',
  GREY_600: '#85878A',
  GREY_700: '#5F6263',
  GREY_800: '#3C3D3E',
  GREY_900: '#19191A',
  LIGHT_GREEN: '#41AC70',
  LIGHT_GREEN_BACKGROUND: '#e0f3e9',
  DARK_GREEN: '#278651',
  ICON_GREY: '#3B3E41',
  NAV_BACKGROUND_WHITE: '#ffffff',
  NAV_BORDER_GREY: '#f1f1f1',
  DISABLE_BTN: '#DFE1E3',
  PLACEHOLDER_GREY: '#c6c9cc',
  TEXTAREA_LIGHT_GREY: '#e1e1e2',
  INPUT_BORDER_GREY: '#a6aaae',
  BACKGROUND_MEETING_CARD: 'rgba(243, 244, 245, 0.5)',
  NAVBAR_TOP_BORDER: 'rgba(0, 0, 0, 0.07)',
  SECONDARY_YELLOW: '#FFEAB4',
  BLOCK_DIVIDER_GREY: '#F5F5F5',
  NOTIFICATION_EMPTY: '#ACAEAF',
  ORANGE: '#ff5638',
  FONT_BODY_GREY: '#999999',
  PRIMARY_L1: '#ECF9F2',
  SECONDARY: '#FFDF8B',
  LIGHT_GREY: '#5C5C5C',
  LIGHT_GREEN_000: '#90D5AE',
};

export type ColorScheme = {
  $button: {
    primary: string;
    disable: string;
  };
  $meeting: {
    notice: {
      background: string;
      text: string;
    };
    user: {
      shadow: string;
    };
  };
} & DaangnColorSheme;
