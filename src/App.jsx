import React, { useEffect, useState, useCallback } from "react";
import { ArrowUp } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import Loader from "./components/Loader";
import LiveBackground from "./components/LiveBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";

const routeSections = {
  "/": "home",
  "/home": "home",
  "/about": "about",
  "/education": "education",
  "/skills": "skills",
  "/services": "services",
  "/projects": "projects",
  "/contact": "contact",
};

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [isLight, setIsLight] = useState(() => {
    try {
      return (
        localStorage.getItem("portfolio-theme") === "light"
      );
    } catch {
      return false;
    }
  });

  // Keep the theme synchronized with Navbar.
  useEffect(() => {
    const syncTheme = () => {
      setIsLight(
        document.documentElement.dataset.theme === "light"
      );
    };

    const savedTheme = (() => {
      try {
        return localStorage.getItem("portfolio-theme");
      } catch {
        return null;
      }
    })();

    const theme =
      savedTheme ||
      document.documentElement.dataset.theme ||
      "dark";

    document.documentElement.dataset.theme = theme;
    setIsLight(theme === "light");

    window.addEventListener("portfolio-theme-change", syncTheme);

    return () => {
      window.removeEventListener(
        "portfolio-theme-change",
        syncTheme
      );
    };
  }, []);

  // Update Back-to-Top visibility while scrolling.
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        setShowBackToTop(window.scrollY > 500);
        ticking = false;
      });
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to the top.
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
        ? "auto"
        : "smooth",
    });
  }, []);

  // Mark the application as loaded when Loader finishes.
  const handleLoaderComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  // Navigate to a section using a clean URL without a hash.
  const navigateToSection = useCallback(
    (section) => {
      const normalizedSection = section.replace(/^\/+|\/+$/g, "");
      const path =
        normalizedSection === "" || normalizedSection === "home"
          ? "/"
          : `/${normalizedSection}`;

      if (location.pathname !== path) {
        navigate(path);
      }

      const scrollToSection = () => {
        const target = document.getElementById(
          normalizedSection || "home"
        );

        if (target) {
          target.scrollIntoView({
            behavior: window.matchMedia(
              "(prefers-reduced-motion: reduce)"
            ).matches
              ? "auto"
              : "smooth",
            block: "start",
          });
        } else {
          window.scrollTo({
            top: 0,
            behavior: "auto",
          });
        }
      };

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(scrollToSection);
      });
    },
    [location.pathname, navigate]
  );

  // Handle direct URLs and browser Back/Forward navigation.
  useEffect(() => {
    const section = routeSections[location.pathname];

    if (!section) return;

    let cancelled = false;
    let attempts = 0;
    let timeoutId;

    const scrollToRoute = () => {
      if (cancelled) return;

      const target = document.getElementById(section);

      if (target) {
        target.scrollIntoView({
          behavior: "auto",
          block: "start",
        });
        return;
      }

      // Allow the page and its sections to finish mounting.
      if (attempts < 20) {
        attempts += 1;
        timeoutId = window.setTimeout(scrollToRoute, 50);
      }
    };

    if (section === "home") {
      window.scrollTo({ top: 0, behavior: "auto" });
    } else {
      scrollToRoute();
    }

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [location.pathname, isLoaded]);

  return (
    <>
      <style>{`
        html,
        body,
        #root {
          width: 100%;
          min-height: 100%;
          background-color: #080b14;
          overflow-x: clip;
        }

        html {
          scroll-behavior: smooth;
          scroll-padding-top: 80px;
        }

        body {
          margin: 0;
        }

        .portfolio-app {
          width: 100%;
          min-width: 0;
          overflow-x: clip;
        }

        .portfolio-page-content,
        .portfolio-page-content main,
        .portfolio-page-content footer {
          min-width: 0;
          max-width: 100%;
        }

        img,
        video,
        canvas {
          max-width: 100%;
        }

        .portfolio-shell {
          min-height: 100vh;
          background-color: #080b14;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .portfolio-shell--visible {
          visibility: visible;
          opacity: 1;
          pointer-events: auto;
          animation: portfolioShellReveal 500ms
            cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes portfolioShellReveal {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .portfolio-page-content {
          opacity: 0;
          transform: translate3d(0, 18px, 0);
          filter: blur(3px);
          visibility: hidden;
          pointer-events: none;
        }

        .portfolio-page-content--visible {
          visibility: visible;
          pointer-events: auto;
          animation: portfolioPageReveal 800ms
            cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes portfolioPageReveal {
          0% {
            opacity: 0;
            transform: translate3d(0, 18px, 0);
            filter: blur(3px);
          }
          60% {
            opacity: 1;
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            filter: blur(0);
          }
        }

        .back-to-top {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transform: translate3d(0, 12px, 0) scale(0.92);
          transition:
            opacity 250ms ease,
            transform 300ms cubic-bezier(0.22, 1, 0.36, 1),
            visibility 250ms ease;
        }

        .back-to-top--visible {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transform: translate3d(0, 0, 0) scale(1);
        }

        @media (max-width: 640px) {
          html {
            scroll-padding-top: 68px;
          }

          .portfolio-shell--visible {
            animation-duration: 400ms;
          }

          .portfolio-page-content--visible {
            animation-duration: 650ms;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          .portfolio-shell,
          .portfolio-shell--visible,
          .portfolio-page-content,
          .portfolio-page-content--visible,
          .back-to-top {
            animation: none !important;
            transition: none !important;
            filter: none !important;
          }

          .portfolio-shell,
          .portfolio-shell--visible {
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
          }

          .portfolio-page-content,
          .portfolio-page-content--visible {
            opacity: 1;
            transform: none;
            visibility: visible;
            pointer-events: auto;
          }

          .back-to-top {
            transform: none;
          }
        }
      `}</style>

      {!isLoaded && (
        <Loader onComplete={handleLoaderComplete} />
      )}

      <div
        data-theme={isLight ? "light" : "dark"}
        className={`
          portfolio-app
          portfolio-shell
          ${isLoaded ? "portfolio-shell--visible" : ""}
          relative isolate min-h-screen overflow-x-clip
          selection:bg-indigo-500 selection:text-white
          transition-colors duration-300
          ${
            isLight
              ? "bg-slate-50 text-slate-900"
              : "bg-[#080b14] text-slate-100"
          }
        `}
      >
        {/* Animated background */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0"
        >
          <LiveBackground />
        </div>

        {/* Navbar */}
        <div className="relative z-50">
          <Navbar />
        </div>

        {/* All sections remain on the same page */}
        <div
          className={`
            portfolio-page-content
            relative z-10
            ${isLoaded ? "portfolio-page-content--visible" : ""}
          `}
        >
          <main>
            <section id="home" className="scroll-mt-20">
              <Hero pageReady={isLoaded} />
            </section>

            <section id="about" className="scroll-mt-20">
              <About />
            </section>

            <section id="education" className="scroll-mt-20">
              <Education />
            </section>

            <section id="skills" className="scroll-mt-20">
              <Skills />
            </section>

            <section id="services" className="scroll-mt-20">
              <Services />
            </section>

            <section id="projects" className="scroll-mt-20">
              <Projects />
            </section>

            <section id="contact" className="scroll-mt-20">
              <Contact />
            </section>
          </main>

          <Footer />
        </div>

        {/* Back to top - Same size and style across mobile & desktop */}
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          title="Back to top"
          tabIndex={showBackToTop ? 0 : -1}
          className={`group fixed bottom-[90px] right-6 z-50 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 motion-reduce:transition-none ${
            isLight
              ? "border-slate-200 bg-white/90 text-indigo-700 shadow-lg shadow-slate-300/40 hover:border-indigo-400/50 hover:bg-indigo-600 hover:text-white hover:shadow-[0_8px_30px_-8px_rgba(99,102,241,0.45)] focus-visible:ring-offset-slate-50"
              : "border-white/10 bg-slate-900/85 text-white shadow-lg shadow-black/20 hover:border-indigo-400/50 hover:bg-indigo-600 hover:shadow-[0_8px_30px_-8px_rgba(99,102,241,0.65)] focus-visible:ring-offset-[#080b14]"
          } ${
            showBackToTop
              ? "translate-y-0 scale-100 opacity-100"
              : "pointer-events-none translate-y-5 scale-75 opacity-0"
          }`}
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 -translate-y-full bg-gradient-to-b from-violet-500/30 to-transparent transition-transform duration-500 group-hover:translate-y-0"
          />

          <ArrowUp
            size={19}
            strokeWidth={2}
            className="relative transition-transform duration-300 group-hover:-translate-y-1"
          />
        </button>
        <Chatbot />
      </div>
    </>
  );
}