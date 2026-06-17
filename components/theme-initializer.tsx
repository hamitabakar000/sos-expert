"use client";

import { useEffect } from "react";

const COLOR_KEY = "sos_color_theme";
const MODE_KEY = "sos_theme_mode";

export function ThemeInitializer() {
  useEffect(() => {
    const root = document.documentElement;
    const storedColor = localStorage.getItem(COLOR_KEY) ?? "blue";
    const storedMode = localStorage.getItem(MODE_KEY) ?? "light";

    root.dataset.colorTheme = storedColor;
    root.dataset.mode = storedMode;
    document.body.dataset.colorTheme = storedColor;
    document.body.dataset.mode = storedMode;
  }, []);

  return null;
}

export const themeStorageKeys = {
  color: COLOR_KEY,
  mode: MODE_KEY
};
