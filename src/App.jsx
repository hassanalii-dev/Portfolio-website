
import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

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

export default function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [isLight, setIsLight] = useState(() => {
    try {
      return localStorage.getItem("portfolio-theme") === "light";
    } catch {
      return false;
    }
  });

  // Keep theme synchronized with Navbar.
  useEffect(() => {
    const syncTheme = () => {
      setIsLight(
        document.documentElement.dataset.theme === "light"
      );
    };

    syncTheme();

    window.addEventListener("portfolio-theme-change", syncTheme);

    return () => {
      window.removeEventListener("portfolio-theme-change", syncTheme);
    };
  }, []);

  // Back-to-top visibility.
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

  // Smooth scroll to top.
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleLoaderComplete = () => {
    setIsLoaded(true);
  };

  return (
    <>
      <style>{`
        html,
        body,
        #root {
          min-height: 100%;
          background-color: #080b14;
        }

        body {
          margin: 0;
        }

        /* Main application reveal. */
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
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        /* Page content entrance animation. */
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
          animation: portfolioPageReveal 950ms
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

        /* Back-to-top visibility animation. */
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

        @media (prefers-reduced-motion: reduce) {
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

      {/* Loader */}
      {!isLoaded && (
        <Loader onComplete={handleLoaderComplete} />
      )}

      {/* Main application */}
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

        {/* Page content */}
        <div
          className={`
            portfolio-page-content
            relative z-10
            ${isLoaded ? "portfolio-page-content--visible" : ""}
          `}
        >
          <main>
            <Hero pageReady={isLoaded} />
            <About />
            <Education />
            <Skills />
            <Services />
            <Projects />
            <Contact />
          </main>

          <Footer />
        </div>

        
{/* Back To Top */}
<button
  type="button"
  onClick={scrollToTop}
  aria-label="Scroll back to top"
  title="Back to top"
  tabIndex={showBackToTop ? 0 : -1}
  className={`group fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 motion-reduce:transition-none sm:bottom-7 sm:right-7 ${
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
    size={20}
    strokeWidth={2}
    className="relative transition-transform duration-300 group-hover:-translate-y-1"
  />
</button>

      </div>
    </>
  );
}
