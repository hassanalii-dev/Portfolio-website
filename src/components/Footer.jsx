import React, { useEffect, useState } from "react";

export default function Footer() {
  const [isLight, setIsLight] = useState(
    () => document.documentElement.dataset.theme === "light"
  );

  useEffect(() => {
    const updateTheme = (event) => {
      const theme =
        event.detail?.theme ||
        document.documentElement.dataset.theme;

      setIsLight(theme === "light");
    };

    window.addEventListener(
      "portfolio-theme-change",
      updateTheme
    );

    const themeObserver = new MutationObserver(() => {
      setIsLight(
        document.documentElement.dataset.theme === "light"
      );
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      window.removeEventListener(
        "portfolio-theme-change",
        updateTheme
      );
      themeObserver.disconnect();
    };
  }, []);

  return (
    <footer
      className={`border-t px-5 py-6 text-center transition-colors duration-300 ${
        isLight
          ? "border-slate-200 bg-slate-50"
          : "border-white/10 bg-[#080b14]"
      }`}
    >
      <p
        className={`text-sm transition-colors duration-300 ${
          isLight ? "text-slate-600" : "text-slate-400"
        }`}
      >
        © {new Date().getFullYear()} Hassan Ali. All Rights Reserved.
      </p>
    </footer>
  );
}