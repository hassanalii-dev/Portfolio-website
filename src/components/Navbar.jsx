import React, { useEffect, useState } from "react";
import {
  Menu,
  X,
  ArrowUpRight,
  Sun,
  Moon,
} from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const [isLight, setIsLight] = useState(() => {
    try {
      return (
        document.documentElement.dataset.theme === "light" ||
        localStorage.getItem("portfolio-theme") === "light"
      );
    } catch {
      return document.documentElement.dataset.theme === "light";
    }
  });

  // Synchronize the selected theme across the portfolio.
  useEffect(() => {
    const root = document.documentElement;

    root.dataset.theme = isLight ? "light" : "dark";
    root.classList.toggle("light-mode", isLight);

    try {
      localStorage.setItem(
        "portfolio-theme",
        isLight ? "light" : "dark"
      );
    } catch {
      // Theme still works when localStorage is unavailable.
    }

    window.dispatchEvent(
      new CustomEvent("portfolio-theme-change", {
        detail: {
          theme: isLight ? "light" : "dark",
        },
      })
    );
  }, [isLight]);

  // Listen for theme changes initiated elsewhere in the app.
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

  const toggleTheme = () => {
    setIsLight((previous) => !previous);
  };

  // Track scrolling and the active section.
  useEffect(() => {
    let ticking = false;
    let animationFrameId;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      animationFrameId = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);

        const marker = 170;
        let current = "home";

        navLinks.forEach((link) => {
          const section = document.querySelector(link.href);

          if (
            section &&
            section.getBoundingClientRect().top <= marker
          ) {
            current = section.id;
          }
        });

        setActiveSection(current);
        ticking = false;
      });
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);

      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Close the mobile menu on Escape or desktop resize.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Prevent background scrolling while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  // Theme toggle matching the logo's purple-cyan branding.
  const ThemeToggle = ({ mobile = false }) => (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        isLight ? "Switch to dark mode" : "Switch to light mode"
      }
      aria-pressed={isLight}
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className={`group relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
        mobile ? "h-11 w-11" : "h-10 w-10"
      } ${
        isLight
          ? "border-indigo-200 bg-white text-indigo-600 shadow-sm shadow-indigo-100 hover:border-purple-300 hover:bg-indigo-50"
          : "border-indigo-400/20 bg-[#080b1b] text-cyan-300 shadow-[0_0_16px_rgba(139,92,246,0.10)] hover:border-cyan-400/50 hover:bg-indigo-500/10 hover:shadow-[0_0_18px_rgba(139,92,246,0.18)]"
      }`}
    >
      <span className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/[0.08] via-transparent to-cyan-400/[0.08] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <span className="relative flex h-5 w-5 items-center justify-center">
        <Sun
          size={19}
          strokeWidth={1.8}
          className={`absolute transition-all duration-500 ease-in-out ${
            isLight
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-50 opacity-0"
          }`}
        />

        <Moon
          size={19}
          strokeWidth={1.8}
          className={`absolute transition-all duration-500 ease-in-out ${
            isLight
              ? "rotate-90 scale-50 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          }`}
        />
      </span>

      <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/[0.04] transition-colors duration-300 group-hover:ring-purple-400/20" />
    </button>
  );

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ${
          isLight
            ? scrolled
              ? "border-slate-200 bg-white/95 shadow-lg shadow-slate-200/40 backdrop-blur-2xl"
              : "border-slate-200/70 bg-white/80 backdrop-blur-xl"
            : scrolled
              ? "border-white/[0.09] bg-[#050816]/95 shadow-lg shadow-black/20 backdrop-blur-2xl"
              : "border-white/[0.05] bg-[#050816]/70 backdrop-blur-xl"
        }`}
      >
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="mx-auto flex min-h-[76px] max-w-[1250px] items-center justify-between gap-3 px-5 sm:px-8">
          {/* Logo and Brand */}
          <a
            href="#home"
            onClick={closeMenu}
            aria-label="Hassan Ali home"
            className="group relative z-50 flex shrink-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            

            {/* Brand Name */}
            <span className="flex flex-col justify-center leading-none">
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-[25px] font-bold tracking-tight text-transparent transition-all duration-300 group-hover:brightness-125">
                Hassan
              </span>

              <span
                className={`mt-[7px] whitespace-nowrap text-[9px] font-semibold uppercase tracking-[2px] transition-colors duration-300 group-hover:text-cyan-400 ${
                  isLight ? "text-slate-500" : "text-slate-400"
                }`}
              >
                Freelancer &amp; Developer
              </span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-0.5 md:flex lg:gap-1"
          >
            {navLinks.map((link) => {
              const isActive =
                activeSection === link.href.slice(1);

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={isActive ? "location" : undefined}
                  className={`group relative rounded-lg px-2.5 py-2.5 text-[12px] font-medium transition-colors duration-300 lg:px-3 lg:text-[13px] ${
                    isActive
                      ? "text-cyan-500"
                      : isLight
                        ? "text-slate-600 hover:bg-slate-100 hover:text-indigo-600"
                        : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <span className="relative z-10">
                    {link.label}
                  </span>

                  <span
                    className={`absolute inset-x-2.5 bottom-1 h-[2px] origin-center rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400 transition-all duration-300 lg:inset-x-3 ${
                      isActive
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-70"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden shrink-0 items-center gap-3 md:flex">
            <ThemeToggle />

            <a
              href="#contact"
              className={`group inline-flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:text-cyan-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 lg:px-4 ${
                isLight
                  ? "border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-cyan-50"
                  : "border-indigo-400/25 bg-indigo-500/[0.08] text-indigo-200 hover:bg-cyan-400/10 hover:text-cyan-200"
              }`}
            >
              Let's Talk

              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="flex shrink-0 items-center gap-2 md:hidden">
            <ThemeToggle mobile />

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className={`relative z-50 flex h-10 w-10 items-center justify-center rounded-xl border transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                isLight
                  ? "border-slate-300 bg-white text-slate-800 hover:bg-slate-100"
                  : "border-white/10 bg-white/[0.04] text-white hover:border-indigo-400/40 hover:bg-indigo-500/10"
              }`}
              aria-label={
                menuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              <span className="relative flex items-center justify-center">
                <Menu
                  size={21}
                  className={`absolute transition-all duration-300 ${
                    menuOpen
                      ? "rotate-90 scale-75 opacity-0"
                      : "rotate-0 scale-100 opacity-100"
                  }`}
                />

                <X
                  size={21}
                  className={`transition-all duration-300 ${
                    menuOpen
                      ? "rotate-0 scale-100 opacity-100"
                      : "-rotate-90 scale-75 opacity-0"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Backdrop */}
      <button
        type="button"
        onClick={closeMenu}
        tabIndex={menuOpen ? 0 : -1}
        aria-label="Close navigation menu"
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-40 transition-opacity duration-300 md:hidden ${
          isLight ? "bg-slate-900/30" : "bg-black/60"
        } ${
          menuOpen
            ? "pointer-events-auto opacity-100 backdrop-blur-sm"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Mobile Navigation Panel */}
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        className={`fixed inset-x-0 top-[76px] z-40 border-b px-5 pb-7 pt-5 shadow-2xl backdrop-blur-2xl transition-[transform,opacity,visibility,background-color,border-color] duration-300 ease-out motion-reduce:transition-none md:hidden ${
          isLight
            ? "border-slate-200 bg-white/95 shadow-slate-300/30"
            : "border-white/10 bg-[#080b19]/[0.98] shadow-black/30"
        } ${
          menuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-[500px]">
          <div className="space-y-1">
            {navLinks.map((link, index) => {
              const isActive =
                activeSection === link.href.slice(1);

              return (
                <a
                  key={link.href}
                  href={link.href}
                  tabIndex={menuOpen ? 0 : -1}
                  onClick={closeMenu}
                  aria-current={isActive ? "location" : undefined}
                  style={{
                    transitionDelay: menuOpen
                      ? `${index * 30}ms`
                      : "0ms",
                  }}
                  className={`group flex items-center justify-between rounded-xl border px-4 py-3.5 text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                    isActive
                      ? isLight
                        ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                        : "border-indigo-400/20 bg-indigo-500/10 text-cyan-300"
                      : isLight
                        ? "border-transparent text-slate-700 hover:border-slate-200 hover:bg-slate-50 hover:text-indigo-600"
                        : "border-transparent text-slate-300 hover:border-white/10 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-cyan-400 shadow-[0_0_10px_rgba(103,232,249,0.7)]"
                          : isLight
                            ? "bg-slate-300 group-hover:bg-indigo-400"
                            : "bg-slate-700 group-hover:bg-indigo-400"
                      }`}
                    />

                    {link.label}
                  </span>

                  <ArrowUpRight
                    size={15}
                    className={`transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                      isActive
                        ? "text-cyan-500"
                        : isLight
                          ? "text-slate-400 group-hover:text-indigo-500"
                          : "text-slate-600 group-hover:text-indigo-300"
                    }`}
                  />
                </a>
              );
            })}
          </div>

          {/* Mobile CTA */}
          <a
            href="#contact"
            tabIndex={menuOpen ? 0 : -1}
            onClick={closeMenu}
            className="group mt-5 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            Let's Talk

            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </nav>
    </>
  );
}