import React, { useEffect, useRef, useState } from "react";
import {
  Code2,
  Send,
  LaptopMinimal,
  Download,
} from "lucide-react";

const words = [
  "Freelancer & Developer",
  "Full Stack Web Developer",
  "BSCS Student",
  "Web Developer",
];

const technologies = [
  {
    name: "React.js",
    color: "border-cyan-400/15 bg-cyan-400/[0.06] text-cyan-200",
  },
  {
    name: "MongoDB",
    color: "border-rose-400/15 bg-rose-400/[0.06] text-rose-200",
  },
  {
    name: "JavaScript",
    color: "border-yellow-400/15 bg-yellow-400/[0.06] text-yellow-200",
  },
  {
    name: "Node.js",
    color: "border-emerald-400/15 bg-emerald-400/[0.06] text-emerald-200",
  },
  {
    name: "Tailwind CSS",
    color: "border-indigo-400/15 bg-indigo-400/[0.06] text-indigo-200",
  },
];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const [isLight, setIsLight] = useState(
    () => document.documentElement.dataset.theme === "light"
  );

  const sectionRef = useRef(null);

  // Global theme synchronization
  useEffect(() => {
    const updateTheme = (event) => {
      const theme =
        event.detail?.theme ||
        document.documentElement.dataset.theme;

      setIsLight(theme === "light");
    };

    window.addEventListener("portfolio-theme-change", updateTheme);

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

  // Entrance animation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
      reduceMotion ||
      !("IntersectionObserver" in window)
    ) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Typing animation
  useEffect(() => {
    const currentWord = words[wordIndex];

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setText(currentWord);
      return;
    }

    const delay = isDeleting
      ? 30
      : text === currentWord
        ? 1200
        : 60;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (text === currentWord) {
          setIsDeleting(true);
        } else {
          setText(currentWord.slice(0, text.length + 1));
        }
      } else if (text.length === 0) {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      } else {
        setText(currentWord.slice(0, text.length - 1));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex]);

  // Lightweight 3D tilt for fine-pointer devices
  const handlePointerMove = (event) => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();

    if (!rect.width || !rect.height) return;

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    setTilt({
      x: (0.5 - y) * 2,
      y: (x - 0.5) * 2,
    });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  const theme = isLight
    ? {
        greeting: "text-slate-900",
        subtitle: "text-slate-700",
        paragraph: "text-slate-600",
        card: "border-slate-200 bg-white/95 shadow-[0_25px_80px_rgba(15,23,42,0.10)]",
        cardTitle: "text-slate-900",
        cardSubtitle: "text-indigo-600",
        muted: "text-slate-500",
        secondaryButton:
          "border-slate-200 bg-white/80 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 focus-visible:ring-offset-white",
        photoBorder: "border-white",
        photoBackground: "bg-white",
        divider: "via-slate-200",
        location: "border-slate-200 bg-slate-50 text-slate-600",
        techLabel: "text-slate-500",
        techSubLabel: "text-slate-500",
        gridOpacity: "opacity-[0.025]",
      }
    : {
        greeting: "text-white",
        subtitle: "text-slate-300",
        paragraph: "text-slate-400",
        card: "border-white/[0.11] bg-[#0a0f1e]/95 shadow-[0_25px_80px_rgba(0,0,0,0.35)]",
        cardTitle: "text-white",
        cardSubtitle: "text-indigo-300",
        muted: "text-slate-500",
        secondaryButton:
          "border-white/10 bg-white/[0.035] text-slate-200 hover:border-indigo-400/40 hover:bg-indigo-500/10 focus-visible:ring-offset-[#070b19]",
        photoBorder: "border-[#0a0f1e]",
        photoBackground: "bg-[#070b19]",
        divider: "via-white/[0.12]",
        location: "border-white/[0.07] bg-white/[0.025] text-slate-400",
        techLabel: "text-slate-500",
        techSubLabel: "text-slate-500",
        gridOpacity: "opacity-[0.035]",
      };

  return (
    <section
      id="home"
      ref={sectionRef}
      className={`relative isolate flex min-h-screen items-center overflow-hidden pb-12 pt-28 transition-colors duration-300 sm:pb-16 sm:pt-32 lg:py-24 xl:py-28 ${
        isLight ? "text-slate-900" : "text-white"
      }`}
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="hero-orb absolute -left-32 top-[12%] h-64 w-64 rounded-full bg-indigo-600/20 blur-[90px] sm:-left-40 sm:h-[28rem] sm:w-[28rem] sm:blur-[110px]" />

        <div className="hero-orb hero-orb-delay absolute -right-32 top-[35%] h-64 w-64 rounded-full bg-cyan-500/10 blur-[90px] sm:-right-40 sm:h-[28rem] sm:w-[28rem] sm:blur-[110px]" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.08),transparent_55%)]" />

        <div
          className={`absolute inset-0 ${theme.gridOpacity}`}
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.6) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* Responsive main layout */}
      <div className="relative mx-auto grid w-full max-w-[1300px] grid-cols-1 items-center gap-10 px-5 sm:px-8 md:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-10 lg:px-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] xl:gap-14 xl:px-14 2xl:gap-20 2xl:px-16">
        {/* Left: Hero content */}
        <div
          className={`relative z-10 min-w-0 transition-all duration-500 ease-out motion-reduce:transition-none ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-5 opacity-0"
          }`}
        >
          {/* Availability badge */}
          <div
            className={`mb-4 inline-flex max-w-full items-center gap-2.5 rounded-full border px-3.5 py-2.5 text-xs font-medium shadow-lg backdrop-blur-md transition-colors duration-300 sm:mb-6 sm:px-4 sm:text-sm ${
              isLight
                ? "border-indigo-200 bg-indigo-50 text-indigo-700 shadow-indigo-100/40"
                : "border-indigo-400/20 bg-indigo-400/[0.07] text-indigo-200 shadow-indigo-950/10"
            }`}
          >
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>

            <span>Available for Learning &amp; Opportunities</span>
          </div>

          <h1
            className={`text-4xl font-black leading-[1.1] tracking-tight min-[420px]:text-5xl sm:text-6xl xl:text-7xl 2xl:text-[5rem] ${theme.greeting}`}
          >
            <span className="inline-block">Hi, I&apos;m</span>

            <span className="hero-gradient-text mt-1 block bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text pb-1 text-transparent">
              Hassan Ali
            </span>
          </h1>

          {/* Typing text */}
          <div
            className={`mt-2.5 flex min-h-[32px] flex-wrap items-center gap-x-2 text-lg font-semibold leading-normal min-[420px]:text-xl sm:mt-5 sm:min-h-[42px] sm:text-2xl xl:text-[1.65rem] ${theme.subtitle}`}
          >
            <span>I&apos;m a</span>

            <span
              className={`inline-flex min-w-0 items-center ${
                isLight ? "text-indigo-500" : "text-indigo-400"
              }`}
            >
              <span>{text}</span>

              <span
                aria-hidden="true"
                className="ml-1 inline-block h-5 w-[2px] shrink-0 animate-pulse bg-cyan-400 sm:h-7 motion-reduce:animate-none"
              />
            </span>
          </div>

          <p
            className={`mt-2.5 max-w-[620px] text-sm leading-6 transition-colors duration-300 sm:mt-6 sm:text-base sm:leading-8 ${theme.paragraph}`}
          >
            BSCS student at Lahore Garrison University and Full Stack Web
            Developer trained at NexSkill, Arfa Tower Lahore. I specialize
            in building modern, responsive, and interactive web experiences.
          </p>

          {/* Action buttons */}
          <div className="mt-6 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap sm:mt-8 sm:gap-4">
            <a
              href="#projects"
              className="group inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 motion-reduce:transform-none sm:px-6"
            >
              <Code2 size={18} />
              View My Work
            </a>

            <a
              href="#contact"
              className={`group inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-xl border px-5 py-3.5 text-sm font-semibold backdrop-blur-md transition duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 motion-reduce:transform-none sm:px-6 ${theme.secondaryButton}`}
            >
              <Send size={15} />
              Contact Me
            </a>

            {/* Download CV */}
            <a
  href="/Hassan-Ali-CV.pdf"
  download="Hassan-Ali-CV.pdf"
  className={`group inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-xl border px-5 py-3.5 text-sm font-semibold backdrop-blur-md transition duration-200 hover:-translate-y-0.5 hover:border-indigo-400/50 hover:bg-indigo-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 motion-reduce:transform-none sm:px-6 ${theme.secondaryButton}`}
>

              <Download
                size={18}
              />
              Download CV
            </a>
          </div>
        </div>

        {/* Right: Floating profile card */}
        <div
          className={`hero-card-float relative mx-auto w-full min-w-0 max-w-[460px] sm:max-w-[480px] lg:max-w-none ${
            isVisible ? "hero-card-visible" : "hero-card-hidden"
          }`}
        >
          {/* Outer glow */}
          <div className="pointer-events-none absolute -inset-3 rounded-[30px] bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-cyan-400/15 blur-2xl sm:-inset-4 sm:rounded-[36px]" />

          <div
            onPointerMove={handlePointerMove}
            onPointerLeave={resetTilt}
            className={`group relative isolate overflow-hidden rounded-[26px] border p-4 backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:border-indigo-400/40 hover:shadow-[0_25px_80px_rgba(79,70,229,0.12)] sm:rounded-[32px] sm:p-6 xl:p-7 ${theme.card}`}
            style={{
              transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transitionProperty: "transform, border-color, box-shadow",
              transitionDuration: "180ms",
              transitionTimingFunction: "ease-out",
              willChange: "transform",
            }}
          >
            {/* Card background decoration */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-indigo-500/[0.10] blur-3xl" />

            <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-cyan-500/[0.06] blur-3xl" />

            <div
              className={`pointer-events-none absolute inset-0 ${theme.gridOpacity}`}
              style={{
                backgroundImage:
                  "linear-gradient(rgba(148,163,184,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.7) 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />

            {/* Card header */}
            <div className="relative z-10 flex items-center justify-between gap-2 sm:gap-3">
              <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-400/[0.08] sm:h-10 sm:w-10">
                  <LaptopMinimal size={19} className="text-indigo-400" />
                </div>

                <div className="min-w-0">
                  <p
                    className={`text-[9px] font-bold uppercase tracking-[0.16em] sm:text-[10px] sm:tracking-[0.18em] ${theme.muted}`}
                  >
                    PORTFOLIO
                  </p>

                  <p
                    className={`mt-1 text-xs font-semibold sm:text-sm ${theme.cardTitle}`}
                  >
                    Developer Profile
                  </p>
                </div>
              </div>

              <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-2.5 py-1.5 sm:gap-2 sm:px-3 sm:py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />

                <span className="text-[9px] font-semibold text-emerald-500 sm:text-[11px]">
                  Available
                </span>
              </div>
            </div>

            {/* Profile photo */}
            <div className="relative z-10 mt-6 flex justify-center sm:mt-7">
              <div className="relative">
                <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-indigo-500/25 via-purple-500/15 to-cyan-400/20 opacity-70 blur-xl transition-opacity duration-300 group-hover:opacity-100 sm:-inset-4" />

                <div className="relative h-44 w-44 rounded-full bg-gradient-to-br from-indigo-400 via-purple-500 to-cyan-400 p-[3px] shadow-[0_0_35px_rgba(99,102,241,0.15)] transition-transform duration-300 group-hover:scale-[1.025] min-[420px]:h-48 min-[420px]:w-48 sm:h-52 sm:w-52 xl:h-56 xl:w-56">
                  <div
                    className={`h-full w-full overflow-hidden rounded-full border-[3px] ${theme.photoBorder} ${theme.photoBackground}`}
                  >
                    <img
                      src="/image copy.png"
                      alt="Hassan Ali - Full Stack Web Developer"
                      className="h-full w-full object-cover object-[center_25%]"
                      loading="eager"
                      fetchPriority="high"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Identity */}
            <div className="relative z-10 mt-5 text-center sm:mt-6">
              <h2
                className={`text-2xl font-bold tracking-tight sm:text-3xl ${theme.cardTitle}`}
              >
                Hassan Ali
              </h2>

              <p
                className={`mt-2 text-sm font-medium sm:text-base ${theme.cardSubtitle}`}
              >
                Full Stack Web Developer
              </p>

              <p
                className={`mt-3 inline-flex max-w-full items-center gap-2 rounded-full border px-3 py-2 text-xs transition-colors duration-300 ${theme.location}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="h-4 w-4 shrink-0 opacity-70"
                  aria-hidden="true"
                >
                  <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>

                Lahore, Pakistan
              </p>
            </div>

            {/* Divider */}
            <div
              className={`relative z-10 my-5 h-px bg-gradient-to-r from-transparent ${theme.divider} to-transparent sm:my-6`}
            />

            {/* Tech stack */}
            <div className="relative z-10">
              <div className="mb-4 flex items-center justify-between gap-2">
                <p className={`text-[10px] sm:text-xs ${theme.techLabel}`}>
                  TECH STACK
                </p>

                <span
                  className={`text-[10px] sm:text-xs ${theme.techSubLabel}`}
                >
                  Core technologies
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
                {technologies.map((tech) => (
                  <span
                    key={tech.name}
                    className={`inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-lg border px-3 py-2.5 text-[11px] font-medium transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-400/40 hover:bg-indigo-400/[0.08] sm:px-3.5 sm:py-2.5 sm:text-xs ${
                      isLight
                        ? tech.color.replace(
                            /text-(cyan|rose|yellow|emerald|indigo)-200/,
                            "text-black"
                          )
                        : tech.color
                    }`}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom accent */}
            <div className="pointer-events-none absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent" />
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        .hero-orb {
          animation: heroOrbFloat 12s ease-in-out infinite alternate;
          will-change: transform;
        }

        .hero-orb-delay {
          animation-delay: -5s;
        }

        .hero-gradient-text {
          background-size: 200% auto;
          animation: heroGradient 8s ease-in-out infinite alternate;
        }

        .hero-card-float {
  opacity: 0;
  transform: translate3d(0, 20px, 0);
  transition:
    opacity 500ms ease-out,
    transform 500ms ease-out;
}

.hero-card-float.hero-card-visible {
  opacity: 1;
  transform: translate3d(0, 0, 0);
  animation: heroCardFloat 7s ease-in-out infinite;
}

.hero-card-float.hero-card-hidden {
  opacity: 0;
  transform: translate3d(0, 20px, 0);
  animation: none;
}

@keyframes heroCardFloat {
  0%, 100% {
    transform: translate3d(0, 0, 0);
  }

  50% {
    transform: translate3d(0, -12px, 0);
  }
}

        @keyframes heroOrbFloat {
          from {
            transform: translate3d(0, 0, 0) scale(1);
          }

          to {
            transform: translate3d(16px, -18px, 0) scale(1.06);
          }
        }

        @keyframes heroGradient {
          from {
            background-position: 0% center;
          }

          to {
            background-position: 100% center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-orb,
          .hero-gradient-text,
          .hero-card-float {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}