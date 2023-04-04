import {PaletteOptions, SimplePaletteColorOptions, ThemeOptions} from '@mui/material';

const COLOR_PRIMARY: SimplePaletteColorOptions = {
  main: '#64B5F6',
  contrastText: '#000000'
  // light: '#64B5F6',
  // dark: '#64B5F6',
};

const COLOR_SECONDARY: SimplePaletteColorOptions = {
  main: '#EF9A9A',
  contrastText: '#000000'
  // light: '#EF9A9A',
  // dark: '#EF9A9A',
};

export const PALETTE_COLORS: Partial<PaletteOptions> = {
  primary: COLOR_PRIMARY,
  secondary: COLOR_SECONDARY
  // error: COLOR_ERROR,
  // warning: COLOR_WARNING;
  // info: COLOR_INFO;
  // success: COLOR_SUCCESS;
};

export const DARK_THEME: ThemeOptions = {
  palette: {
    mode: 'dark',
    // background: {
    //   paper: '#424242', // Gray 800 - Background of "Paper" based component
    //   default: '#121212',
    // },
    ...PALETTE_COLORS
  }
};

export const LIGHT_THEME: ThemeOptions = {
  palette: {
    mode: 'light',
    // background: {
    //   paper: '#f5f5f5', // Gray 100 - Background of "Paper" based component
    //   default: '#FFFFFF',
    // },
    ...PALETTE_COLORS
  }
};
