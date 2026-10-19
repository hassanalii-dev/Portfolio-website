import React, { useEffect, useState } from "react";
import {
  Menu,
  X,
  ArrowUpRight,
  Sun,
  Moon,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "/", section: "home" },
  { label: "About", href: "/about", section: "about" },
  { label: "Education", href: "/education", section: "education" },
  { label: "Skills", href: "/skills", section: "skills" },
  { label: "Services", href: "/services", section: "services" },
  { label: "Projects", href: "/projects", section: "projects" },
  { label: "Contact", href: "/contact", section: "contact" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

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

  // Theme synchronization.
  useEffect(() => {
    const root = document.documentElement;
    const theme = isLight ? "light" : "dark";

    root.dataset.theme = theme;
    root.classList.toggle("light-mode", isLight);

    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {
      // Theme works without localStorage.
    }

    window.dispatchEvent(
      new CustomEvent("portfolio-theme-change", {
        detail: { theme },
      })
    );
  }, [isLight]);

  // Listen for theme changes from other components.
  useEffect(() => {
    const updateTheme = (event) => {
      const theme =
        event.detail?.theme ||
        document.documentElement.dataset.theme;

      setIsLight(theme === "light");
    };

    window.addEventListener("portfolio-theme-change", updateTheme);

    const observer = new MutationObserver(() => {
      const theme =
        document.documentElement.dataset.theme === "light";

      setIsLight((previous) =>
        previous === theme ? previous : theme
      );
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      window.removeEventListener("portfolio-theme-change", updateTheme);
      observer.disconnect();
    };
  }, []);

  const toggleTheme = () => {
    setIsLight((previous) => !previous);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Navigate without adding a hash to the URL.
  const handleNavigation = (link) => {
    closeMenu();

    if (location.pathname !== link.href) {
      navigate(link.href);
    } else {
      const section = document.getElementById(link.section);

      if (section) {
        section.scrollIntoView({
          behavior: window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches
            ? "auto"
            : "smooth",
          block: "start",
        });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  // Navbar scroll effect and active section.
  useEffect(() => {
    let ticking = false;
    let frameId;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      frameId = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);

        if (location.pathname === "/") {
          const marker = 170;
          let current = "home";

          navLinks.forEach((link) => {
            const section = document.getElementById(link.section);

            if (
              section &&
              section.getBoundingClientRect().top <= marker
            ) {
              current = link.section;
            }
          });

          setActiveSection(current);
        }

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

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [location.pathname]);

  // Update the active navigation item when the URL changes.
  useEffect(() => {
    const currentLink = navLinks.find(
      (link) => link.href === location.pathname
    );

    setActiveSection(currentLink?.section || "home");
    closeMenu();
  }, [location.pathname]);

  // Close on Escape or desktop breakpoint.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeMenu();
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) closeMenu();
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

  const ThemeToggle = ({ mobile = false }) => (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        isLight ? "Switch to dark mode" : "Switch to light mode"
      }
      aria-pressed={isLight}
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
      style={{ cursor: "default" }}
      className={`group relative inline-flex shrink-0 cursor-default items-center justify-center
        overflow-hidden rounded-xl border
        transition-[background-color,border-color,color,box-shadow]
        duration-200 ease-out
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-cyan-400
        ${mobile ? "h-11 w-11" : "h-10 w-10"}
        ${
          isLight
            ? "border-indigo-200 bg-white text-indigo-600 shadow-sm shadow-indigo-100 hover:border-purple-300 hover:bg-indigo-50"
            : "border-indigo-400/20 bg-[#080b1b] text-cyan-300 shadow-[0_0_16px_rgba(139,92,246,0.10)] hover:border-cyan-400/50 hover:bg-indigo-500/10 hover:shadow-[0_0_18px_rgba(139,92,246,0.18)]"
        }`}
    >
      <span className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/[0.08] via-transparent to-cyan-400/[0.08] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

      <span className="relative flex h-5 w-5 items-center justify-center">
        <Sun
          size={19}
          strokeWidth={1.8}
          className={`absolute transition-all duration-200 ease-out ${
            isLight
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-50 opacity-0"
          }`}
        />

        <Moon
          size={19}
          strokeWidth={1.8}
          className={`absolute transition-all duration-200 ease-out ${
            isLight
              ? "rotate-90 scale-50 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          }`}
        />
      </span>
    </button>
  );

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b
          transition-[background-color,border-color,box-shadow,backdrop-filter]
          duration-200 ease-out ${
            isLight
              ? scrolled
                ? "border-slate-200 bg-white/95 shadow-lg shadow-slate-200/40 backdrop-blur-xl"
                : "border-slate-200/70 bg-white/80 backdrop-blur-lg"
              : scrolled
                ? "border-white/[0.09] bg-[#050816]/95 shadow-lg shadow-black/20 backdrop-blur-xl"
                : "border-white/[0.05] bg-[#050816]/70 backdrop-blur-lg"
          }`}
      >
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-px
            bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent
            transition-opacity duration-200 ${
              scrolled ? "opacity-100" : "opacity-0"
            }`}
        />

        <div className="mx-auto flex min-h-[76px] max-w-[1250px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavigation(navLinks[0])}
            aria-label="Hassan Ali home"
            className="group relative z-[60] flex min-w-0 shrink-0 cursor-pointer items-center gap-3 rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <span className="flex min-w-0 flex-col justify-center leading-none">
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-[23px] font-bold tracking-tight text-transparent transition-all duration-200 group-hover:brightness-125 sm:text-[25px]">
                Hassan
              </span>

              <span
                className={`mt-[7px] whitespace-nowrap text-[8px] font-semibold uppercase tracking-[1.5px] transition-colors duration-200 sm:text-[9px] sm:tracking-[2px] ${
                  isLight ? "text-slate-500" : "text-slate-400"
                }`}
              >
                Freelancer &amp; Developer
              </span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-0.5 md:flex lg:gap-1"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.section;

              return (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => handleNavigation(link)}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative cursor-pointer whitespace-nowrap rounded-lg px-2 py-2.5 text-[12px] font-medium transition-colors duration-150 lg:px-3 lg:text-[13px] ${
                    isActive
                      ? "text-cyan-500"
                      : isLight
                        ? "text-slate-600 hover:bg-slate-100 hover:text-indigo-600"
                        : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>

                  <span
                    className={`absolute inset-x-2 bottom-1 h-[2px] origin-center rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400 transition-transform duration-200 lg:inset-x-3 ${
                      isActive
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-70"
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden shrink-0 items-center gap-2 md:flex lg:gap-3">
            <ThemeToggle />

            <button
              type="button"
              onClick={() => handleNavigation(navLinks[6])}
              className={`group inline-flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 lg:px-4 ${
                isLight
                  ? "border-indigo-200 bg-indigo-50 text-indigo-700 hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-700"
                  : "border-indigo-400/25 bg-indigo-500/[0.08] text-indigo-200 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-200"
              }`}
            >
              Let's Talk
              <ArrowUpRight
                size={15}
                className="transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </button>
          </div>

          {/* Mobile / Tablet Actions */}
          <div className="flex shrink-0 items-center gap-2 md:hidden">
            <ThemeToggle mobile />

            <button
              type="button"
              onClick={() => setMenuOpen((previous) => !previous)}
              className={`group relative z-[60] flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border transition-[background-color,border-color,color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                isLight
                  ? "border-slate-300 bg-white text-slate-800 hover:border-indigo-300 hover:bg-indigo-50"
                  : "border-white/10 bg-white/[0.04] text-white hover:border-indigo-400/40 hover:bg-indigo-500/10"
              }`}
              aria-label={
                menuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              <span className="relative flex h-6 w-6 items-center justify-center">
                <Menu
                  size={22}
                  strokeWidth={1.8}
                  className={`absolute transition-[transform,opacity] duration-200 ease-out ${
                    menuOpen
                      ? "rotate-90 scale-75 opacity-0"
                      : "rotate-0 scale-100 opacity-100"
                  }`}
                />

                <X
                  size={22}
                  strokeWidth={1.8}
                  className={`absolute transition-[transform,opacity] duration-200 ease-out ${
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

      {/* Mobile backdrop */}
      <button
        type="button"
        onClick={closeMenu}
        tabIndex={menuOpen ? 0 : -1}
        aria-label="Close navigation menu"
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-40 cursor-pointer md:hidden ${
          isLight ? "bg-slate-900/30" : "bg-black/60"
        } ${
          menuOpen
            ? "pointer-events-auto visible opacity-100 backdrop-blur-sm"
            : "pointer-events-none invisible opacity-0"
        } transition-[opacity,visibility,background-color] duration-200 ease-out motion-reduce:transition-none`}
      />

      {/* Mobile Navigation Panel */}
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        className={`fixed inset-x-0 top-[76px] z-40 max-h-[calc(100dvh-76px)] overflow-y-auto overscroll-contain border-b px-4 pb-6 pt-4 shadow-2xl backdrop-blur-2xl sm:px-6 sm:pb-7 sm:pt-5 md:hidden ${
          isLight
            ? "border-slate-200 bg-white/95 shadow-slate-300/30"
            : "border-white/10 bg-[#080b19]/[0.98] shadow-black/30"
        } ${
          menuOpen
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible pointer-events-none -translate-y-2 scale-[0.99] opacity-0"
        } origin-top transition-[transform,opacity,visibility,background-color,border-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none`}
      >
        <div className="mx-auto max-w-[500px]">
          <div className="space-y-1.5">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.section;

              return (
                <button
                  key={link.href}
                  type="button"
                  tabIndex={menuOpen ? 0 : -1}
                  onClick={() => handleNavigation(link)}
                  aria-current={isActive ? "page" : undefined}
                  style={{
                    transitionDelay: menuOpen
                      ? `${40 + index * 20}ms`
                      : "0ms",
                    transform: menuOpen
                      ? "translate3d(0, 0, 0)"
                      : "translate3d(0, 6px, 0)",
                  }}
                  className={`group flex min-h-[49px] w-full cursor-pointer items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-medium transition-[transform,opacity,background-color,border-color,color] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                    menuOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-2 opacity-0"
                  } ${
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
                      className={`h-1.5 w-1.5 shrink-0 rounded-full transition-[background-color,box-shadow] duration-200 ${
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
                    size={16}
                    className={`transition-[transform,color] duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                      isActive
                        ? "text-cyan-500"
                        : isLight
                          ? "text-slate-400 group-hover:text-indigo-500"
                          : "text-slate-600 group-hover:text-indigo-300"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Mobile CTA */}
          <button
            type="button"
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => handleNavigation(navLinks[6])}
            style={{
              transitionDelay: menuOpen
                ? `${40 + navLinks.length * 20}ms`
                : "0ms",
            }}
            className={`group mt-4 flex min-h-[49px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition-[transform,opacity,box-shadow] duration-200 ease-out hover:shadow-xl hover:shadow-indigo-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 motion-reduce:transition-none ${
              menuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-2 opacity-0"
            }`}
          >
            Let's Talk
            <ArrowUpRight
              size={17}
              className="transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>
        </div>
      </nav>
    </>
  );
}