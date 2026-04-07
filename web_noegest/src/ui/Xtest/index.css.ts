import { style } from "@vanilla-extract/css";

export const wrapper = style({
  display: "flex",
  alignItems: "center",
  width: "100%",
  gap: "0.5rem",
});

export const label = style({
  width: "30%",
  fontWeight: 500,
});

export const inputStyle = style({
  width: "70%",
  padding: "0.4rem 0.6rem",
  border: "1px solid #ccc",
  borderRadius: 4,
});
