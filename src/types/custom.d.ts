declare module 'customProps' {
  export namespace svgProps {
    type svg = {
      width?: string;
      height?: string;
      fill?: string;
    };
  }
}

declare module '*.jpg';
declare module '*.png';
declare module '*.svg';
