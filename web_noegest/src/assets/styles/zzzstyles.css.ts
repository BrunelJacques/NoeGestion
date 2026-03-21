// styles.css.ts origine Angular, adapté pour React + Vanilla Extract

import { globalStyle, createGlobalTheme } from "@vanilla-extract/css";

// ------------------------------
// 1. CSS VARIABLES (THEME)
// ------------------------------
export const varsGlobal = createGlobalTheme(":root", {
  colors: {
    fondSoutenu: "#c5c5ff",
    fondTitre: "#e8e8e8",
    fondEcran: "whitesmoke",
    fondBlanc: "#ffffff",
    fondSombre: "#3f729b",
    fondSaumon: "navajowhite",
    fondSaisie: "rgb(232, 240, 254)",
    fondRose: "mistyrose",
    fondPrimary: "#673ab7",
    fondPrimaryClair: "#c5c5ff",
    texteClair: "cornflowerblue",
    texteSombre: "#09238D",
    texteGris: "rgba(0,0,0,0.54)",
    texteLink: "#0d6efd",
  },
  layout: {
    maxWidthField: "210px",
  },
  misc: {
    mdcFilledButtonLabelTextColor: "#09238D",
    matFilledButtonHorizontalPadding: "5px",
  }
});

// ------------------------------
// 2. MEDIA QUERIES
// ------------------------------
globalStyle(".main", {
  "@media": {
    "screen and (max-width: 800px)": {
      width: "100%",
    },
  },
});

// ------------------------------
// 3. GLOBAL ELEMENT STYLES
// ------------------------------
globalStyle("body", {
  maxWidth: "1000px",
  backgroundColor: varsGlobal.colors.fondEcran,
  fontWeight: "400",
  color: varsGlobal.colors.texteSombre,
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  fontSize: "14px",
  lineHeight: "1.1",
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
  margin: "0",
});

globalStyle("html, body", {
  height: "100%",
});

globalStyle("main", {
  margin: "10px 0 0 0",
  padding: "4px",
  width: "100%",
});

// ------------------------------
// 4. INPUTS + SELECTS
// ------------------------------
globalStyle("input, select", {
  border: "2px solid #ccc",
  borderRadius: "6px",
  transition: "border-color 1.4s ease-in-out",
  marginLeft: "1%",
  marginRight: "1%",
  padding: "5px",
  minHeight: "1.55rem",
  fontSize: "1.05rem",
  color: varsGlobal.colors.texteGris,
  backgroundColor: varsGlobal.colors.fondSaisie,
});

globalStyle("input.form-ctrl", {
  width: "132px",
  padding: "1px 1px 1px 5px",
});

globalStyle("input:focus-visible, select:focus-visible", {
  outline: "rgb(0, 98, 128)",
  outlineWidth: "5px",
  boxShadow: "0 0 10px rgba(63, 81, 181, 0.5)",
  backgroundColor: "whitesmoke",
});

// ------------------------------
// 5. LABELS
// ------------------------------
globalStyle("label", {
  margin: "7px 0px 2px 5px",
});

// ------------------------------
// 6. UTILITY CLASSES
// ------------------------------
const util = {
  bg: {
    fondEcran: varsGlobal.colors.fondEcran,
    fondSaisie: varsGlobal.colors.fondSaisie,
    fondBox: varsGlobal.colors.fondBlanc,
    fondTitre: varsGlobal.colors.fondTitre,
    fondSoutenu: varsGlobal.colors.fondSoutenu,
    fondSaumon: varsGlobal.colors.fondSaumon,
    fondRose: varsGlobal.colors.fondRose,
    fondSombre: varsGlobal.colors.fondSombre,
    fondPrimary: varsGlobal.colors.fondPrimary,
    fondPrimaryClair: varsGlobal.colors.fondPrimaryClair,
  },
  text: {
    clair: varsGlobal.colors.texteClair,
    sombre: varsGlobal.colors.texteSombre,
    gris: varsGlobal.colors.texteGris,
  },
};

// Background utilities
Object.entries(util.bg).forEach(([name, color]) => {
  globalStyle(`.fond-${name}`, {
    backgroundColor: color,
    color: name === "fondSombre" || name === "fondPrimary" ? "white" : undefined,
  });
});

// Text utilities
Object.entries(util.text).forEach(([name, color]) => {
  globalStyle(`.texte-${name}`, {
    color,
  });
});

globalStyle(".link", {
  color: varsGlobal.colors.texteLink,
  textDecoration: "underline",
});

globalStyle(".white", { color: "white" });
globalStyle(".whitesmoke", { color: "whitesmoke" });

globalStyle(".ombre", {
  boxShadow: "0 9px 6px -6px #999",
});

// ------------------------------
// 7. FLEX + LAYOUT HELPERS
// ------------------------------
globalStyle(".row", {
  display: "flex",
  flexFlow: "row wrap",
  width: "100%",
});

globalStyle(".nowrap", {
  flexWrap: "nowrap",
});

globalStyle(".app-container", {
  minHeight: "350px",
  overflow: "hidden",
});

// ------------------------------
// 8. CARD SYSTEM
// ------------------------------
globalStyle(".card-container", {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  maxWidth: "650px",
  marginLeft: "auto",
  marginRight: "auto",
});

globalStyle(".card", {
  flex: 1,
  alignContent: "flex-start",
  justifyContent: "center",
});

globalStyle(".card-body", {
  padding: "4px",
});

globalStyle(".card-small", {
  maxWidth: "280px",
  margin: "5px",
});

globalStyle(".highlight-card", {
  backgroundColor: varsGlobal.colors.fondSoutenu,
  color: "white",
  fontWeight: "600",
  border: "none",
  width: "auto",
  minWidth: "30%",
  position: "relative",
});

// ------------------------------
// 9. WIDTH / HEIGHT UTILITIES
// ------------------------------
[
  20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 240,
].forEach((px) => {
  globalStyle(`.w${px}px`, {
    width: `${px}px`,
    maxWidth: `${px}px`,
  });
});

[60, 100, 300].forEach((px) => {
  globalStyle(`.h${px}px`, {
    height: `${px}px`,
    maxHeight: `${px}px`,
  });
});

// ------------------------------
// 10. BUTTONS
// ------------------------------
globalStyle(".btn", {
  marginTop: "5px",
  minWidth: "30px",
  borderWidth: "1px",
  borderColor: varsGlobal.colors.texteLink,
});

globalStyle(".btn:focus", {
  borderWidth: "2px",
  borderColor: "whitesmoke",
  boxShadow: "0px 0px 15px white",
});

// ------------------------------
// 11. FORM ROWS
// ------------------------------
globalStyle(".form-grp", {
  display: "flex",
  flexFlow: "column wrap",
  margin: "1.3rem 1rem 2rem 0",
  width: "100%",
  gap: "4%",
});

globalStyle(".form-row", {
  display: "flex",
  flexFlow: "row wrap",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  margin: "0.5rem 0.3rem 0 0",
});

// ------------------------------
// 12. TABLES
// ------------------------------
globalStyle(".table>:not(caption)>*>*", {
  color: varsGlobal.colors.texteSombre,
  textAlign: "right",
});

globalStyle("td", {
  padding: "0.2rem",
  verticalAlign: "middle",
});

// ------------------------------
// 13. ALIGNMENT HELPERS
// ------------------------------
globalStyle(".centrer", {
  textAlign: "center",
  alignContent: "center",
  alignItems: "center",
  justifyContent: "center",
});

globalStyle(".right, .end", {
  textAlign: "right",
  justifyContent: "flex-end",
  alignItems: "flex-end",
});

globalStyle(".left, .start", {
  textAlign: "start",
  justifyContent: "flex-start",
  alignItems: "flex-end",
});

// ------------------------------
// 14. MISC
// ------------------------------
globalStyle(".no-secable", {
  whiteSpace: "nowrap",
});

globalStyle(".bi", {
  fontSize: "1rem",
});

globalStyle(".main-form", {
  paddingBottom: "10px",
  position: "relative",
});

globalStyle(".loading", {
  position: "absolute",
  top: "-10px",
  bottom: "-10px",
  left: "-10px",
  right: "-10px",
  height: "inherit",
  zIndex: 10,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

globalStyle(".error-message", {
  color: "var(--bs-form-invalid-color)",
  fontSize: "0.875em",
  textAlign: "center",
  width: "100%",
});
