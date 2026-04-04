// assets/styles/themes.css.ts
import { createThemeContract, createTheme } from '@vanilla-extract/css';
import { colors } from './colors.css';


export const vars = createThemeContract({
  color: {
    body: '',
    cardTitle: '',
    card: '',
    text: '',
    textLower: '',
    primary: '',
    secondary:'',
    textPrimary: '',
    border: '',
  },
});
//primaryGradient: `linear-gradient(135deg, ${rawColors.blue}, ${rawColors.pink})`
// Thème clair
export const lightTheme = createTheme(vars, {
  color: {
    body: colors.bglight_body,
    cardTitle: colors.bglight_title,
    card: colors.bglight_card,
    text: colors.txt_dark,
    textLower: colors.txt_lessdark,
    primary: colors.bglight_primary,
    secondary: colors.bglight_secondary,
    textPrimary: colors.txt_light,
    border: colors.brd_dark,
  },
});

// Thème sombre
export const darkTheme = createTheme(vars, {
  color: {
    body: colors.bgdark_body,
    cardTitle: colors.bgdark_title,
    card: colors.bgdark_card,
    text: colors.txt_light,
    textLower: colors.txt_lesslight,
    primary: colors.bgdark_primary,
    secondary: colors.bgdark_secondary,
    textPrimary: colors.txt_light,
    border: colors.brd_light,
  },
});

/* 
export const lightTheme = createTheme(vars, {
  color: {
    bg: { primary: '#F0F7FF', secondary: '#E0EDFD' },
    button: { primary: '#007BFF', hover: '#0056B3' },
    input: { bg: '#FFFFFF' },
    text: { primary: '#1E293B' }
  }
});

export const darkTheme = createTheme(vars, {
  color: {
    bg: { primary: '#0B121E', secondary: '#162032' },
    button: { primary: '#3B82F6', hover: '#60A5FA' },
    input: { bg: '#1E293B' },
    text: { primary: '#F0F7FF' }
  }

  // vars.css.ts
export const vars = createThemeContract({
  color: {
    // ... vos autres variables (bg, button, input)
    text: {
      primary: null,
      secondary: null,
    }
  }
});

// theme.css.ts
export const lightTheme = createTheme(vars, {
  color: {
    // ...
    text: {
      primary: '#0F172A', 
      secondary: '#475569',
    }
  }
});

export const darkTheme = createTheme(vars, {
  color: {
    // ...
    text: {
      primary: '#F1F5F9',
      secondary: '#94A3B8',
    }
  }
});

}); */