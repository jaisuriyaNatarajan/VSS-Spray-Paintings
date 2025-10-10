// src/theme.ts
import { DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {
  colors: {
    bg: "#0f1115",
    panel: "#141823",
    text: "#e6e6e6",
    subtle: "#a9b0c3",
    primary: "#4da3ff",
    accent: "#00d2b0",
    border: "#242a38",
    danger: "#ff6b6b",
  },
  radii: { md: "12px" },
  shadows: { sm: "0 4px 16px rgba(0,0,0,0.25)" },
};

export const lightTheme: DefaultTheme = {
  colors: {
    bg: "#f5f7fb",
    panel: "#ffffff",
    text: "#111827",
    subtle: "#6b7280",
    primary: "#2563eb",
    accent: "#059669",
    border: "#e5e7eb",
    danger: "#dc2626",
  },
  radii: { md: "12px" },
  shadows: { sm: "0 8px 24px rgba(0,0,0,0.08)" },
};

export type ThemeName = "dark" | "light";

export const getInitialTheme = (): ThemeName => {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;
  // prefer system
  const prefersLight =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches;
  return prefersLight ? "light" : "dark";
};

export const setThemeName = (name: ThemeName) => {
  localStorage.setItem("theme", name);
};
