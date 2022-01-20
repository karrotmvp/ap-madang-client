import { ColorScheme } from './color';

const landongmoColor = {
  $button: {
    primary: '#00a8ff',
  },

  $carrot50: '#FFF5F0',
  $carrot100: '#FFE2D2',
  $carrot200: '#FFD2B9',
  $carrot300: '#FFBC97',
  $carrot400: '#FF9E66',
  $carrot500: '#FFE2D2',
  $carrot600: '#FFE2D2',
  $carrot700: '#F05705',
  $carrot800: '#CC4700',
  $carrot900: '#B44104',
  $carrot950: '#A03A03',

  $red50: '#FFF3F2',
  $red200: '#FCD2CF',
  $red800: '#E81300',
  $red950: '#B61709',

  $blue50: '#EBF7FA',
  $blue200: '#C0E1EB',
  $blue800: '#0A86B7',
  $blue950: '#0F698C',

  $green50: '#E8FAF6',
  $green200: '#A1EBDD',
  $green500: '#00B493',
  $green800: '#008C72',
  $green950: '#086E5B',

  $yellow50: '#FFF7E6',
  $yellow200: '#FAD78C',
  $yellow500: '#FFC552',
  $yellow800: '#CF6400',
  $yellow950: '#8F4A06',

  $gray00: '#FFFFFF',
  $gray50: '#FFFFFF',
  $gray100: '#F2F3F6',
  $gray200: '#EAEBEE',
  $gray300: '#DCDEE3',
  $gray400: '#D1D3D8',
  $gray500: '#ADB1BA',
  $gray600: '#868B94',
  $gray700: '#4D5159',
  $gray900: '#212124',
};

export type LandongmoThemeType = {
  colors: ColorScheme;
};

export const landongmoTheme: LandongmoThemeType = {
  colors: landongmoColor,
};