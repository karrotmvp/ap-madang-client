import { useEffect, useState } from 'react';

import { carrotTheme, CarrotThemeType } from '../style/carrotTheme';
import { ColorScheme } from '../style/color';
import { landongmoTheme, LandongmoThemeType } from '../style/landongmoTheme';

type ThemeType = CarrotThemeType | LandongmoThemeType;

declare module '@emotion/react' {
  export interface Theme {
    colors: ColorScheme;
  }
}

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeType>(carrotTheme);

  useEffect(() => {
    console.log(window.location.href);
    if (window.location.href.includes('daangn')) setTheme(carrotTheme);
    else setTheme(landongmoTheme);
  }, []);

  return theme;
};
