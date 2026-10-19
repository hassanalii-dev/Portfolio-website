import React, { useEffect, useRef, useState } from "react";
import {
  GraduationCap,
  CheckCircle2,
} from "lucide-react";

const educationItems = [
  {
    status: "Completed",
    icon: CheckCircle2,
    title: "Intermediate ICS - Physics",
    institute:
      "Government Islamia Graduate College, Civil Lines, Lahore",
    description:
      "Successfully completed Intermediate in ICS with Physics, building a foundation in computer science and mathematics.",
    side: "left",
    completed: true,
  },
  {
    status: "Currently Studying",
    icon: GraduationCap,
    title: "BS Computer Science",
    institute: "Lahore Garrison University",
    description:
      "Currently pursuing my BSCS degree and strengthening my knowledge of computer science, programming, and software development.",
    side: "right",
    completed: false,
  },
  {
    status: "Completed",
    icon: CheckCircle2,
    title: "Full Stack Web Development",
    institute: "NexSkill - Arfa Tower, Lahore",
    description:
      "Completed Full Stack Web Development training, gaining practical experience in frontend and backend technologies, databases, and building modern, responsive web applications.",
    side: "left",
    completed: true,
  },
];

export default function Education() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLight, setIsLight] = useState(
    () => document.documentElement.dataset.theme === "light"
  );

  // Sync with the global Navbar theme toggle
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

  // Preserve the existing reveal animation
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
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const reveal = (delay = 0, distance = 15) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible
      ? "translate3d(0, 0, 0)"
      : `translate3d(0, ${distance}px, 0)`,
    transition: `opacity 500ms ease ${
      isVisible ? delay : 0
    }ms, transform 500ms ease ${
      isVisible ? delay : 0
    }ms`,
  });

  const theme = isLight
    ? {
        heading: "text-slate-900",
        description: "text-slate-600",
        timeline: "bg-slate-300/80",
        card:
          "border-slate-200 bg-white/95 shadow-[0_15px_45px_rgba(15,23,42,0.07)]",
        title: "text-slate-900 group-hover:text-indigo-600",
        institute: "text-indigo-600",
        body: "text-slate-600",
        number: "text-slate-400",
        divider: "via-slate-200",
        dotBorder: "border-white",
        cardGradient:
          "from-indigo-500/[0.025] via-transparent to-cyan-500/[0.025]",
      }
    : {
        heading: "text-white",
        description: "text-slate-400",
        timeline: "bg-white/[0.10]",
        card:
          "border-white/[0.09] bg-[#0a0f1e]/90 shadow-[0_15px_45px_rgba(0,0,0,0.18)]",
        title: "text-white group-hover:text-cyan-300",
        institute: "text-indigo-300/90",
        body: "text-slate-400",
        number: "text-slate-600",
        divider: "via-white/10",
        dotBorder: "border-[#070b19]",
        cardGradient:
          "from-indigo-500/[0.035] via-transparent to-cyan-500/[0.025]",
      };

  return (
    <section
      ref={sectionRef}
      id="education"
      className={`relative isolate overflow-hidden py-16 transition-colors duration-300 sm:py-20 md:py-24 lg:py-28 xl:py-32 ${
        isLight ? "text-slate-900" : "text-white"
      }`}
    >
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 -z-10 h-64 w-64 rounded-full bg-indigo-600/10 blur-[90px] sm:-left-40 sm:h-96 sm:w-96 sm:blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-10 -z-10 h-64 w-64 rounded-full bg-cyan-500/10 blur-[90px] sm:-right-40 sm:h-96 sm:w-96 sm:blur-[120px]"
      />

      <div className="relative mx-auto w-full max-w-[1295px] px-5 sm:px-8 lg:px-10 xl:px-14 2xl:px-16">
        {/* Heading */}
        <div
          className="mb-10 text-center sm:mb-14 md:mb-16"
          style={reveal(0)}
        >
          <span
            className={`inline-flex max-w-full items-center gap-2 rounded-full border px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[1.5px] transition-colors duration-300 sm:px-4 sm:text-xs sm:tracking-[3px] ${
              isLight
                ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                : "border-indigo-400/20 bg-indigo-400/[0.07] text-indigo-300"
            }`}
          >
            <GraduationCap size={15} />
            My Education
          </span>

          <h2
            className={`mt-4 text-3xl font-extrabold tracking-tight transition-colors duration-300 min-[420px]:text-4xl sm:text-5xl lg:text-6xl ${theme.heading}`}
          >
            Education Journey
          </h2>

          <p
            className={`mx-auto mt-4 max-w-[620px] text-sm leading-7 transition-colors duration-300 sm:text-base sm:leading-8 ${theme.description}`}
          >
            My academic background and professional learning
            journey, building a strong foundation for my
            future in technology.
          </p>

          <div className="mx-auto mt-6 h-px w-20 bg-gradient-to-r from-transparent via-indigo-400 to-transparent sm:mt-7 sm:w-24" />
        </div>

        {/* Timeline */}
        <div className="relative mx-auto w-full">
          {/* Timeline track */}
          <div
            aria-hidden="true"
            className={`absolute bottom-5 left-[15px] top-5 w-px transition-colors duration-300 sm:bottom-8 sm:left-1/2 sm:-translate-x-1/2 ${theme.timeline}`}
          />

          {/* Animated timeline progress */}
          <div
            aria-hidden="true"
            className="absolute left-[15px] top-5 w-px origin-top bg-gradient-to-b from-indigo-500 via-purple-500 to-cyan-400 transition-transform duration-[1000ms] ease-out sm:left-1/2 sm:-translate-x-1/2"
            style={{
              height: "calc(100% - 40px)",
              transform: `scaleY(${isVisible ? 1 : 0})`,
              transformOrigin: "top",
            }}
          />

          <div className="space-y-6 sm:space-y-9 lg:space-y-10">
            {educationItems.map((item, index) => {
              const Icon = item.icon;
              const isLeft = item.side === "left";

              return (
                <div
                  key={item.title}
                  className="relative grid grid-cols-[31px_minmax(0,1fr)] items-stretch sm:grid-cols-2 sm:gap-x-12 lg:gap-x-16"
                >
                  {/* Timeline dot */}
                  <div
                    aria-hidden="true"
                    className={`absolute left-[15px] top-1/2 z-20 flex h-[15px] w-[15px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 transition-all duration-300 sm:left-1/2 ${
                      item.completed
                        ? "border-white bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.55)]"
                        : `bg-indigo-400 shadow-[0_0_16px_rgba(99,102,241,0.65)] ${theme.dotBorder}`
                    } ${
                      isVisible
                        ? "scale-100 opacity-100"
                        : "scale-50 opacity-0"
                    }`}
                    style={{
                      transitionDelay: isVisible
                        ? `${150 + index * 100}ms`
                        : "0ms",
                    }}
                  >
                    <span className="h-1 w-1 rounded-full bg-white" />
                  </div>

                  {/* Card placement */}
                  <div
                    className={`col-start-2 min-w-0 ${
                      isLeft
                        ? "sm:col-start-1"
                        : "sm:col-start-2"
                    }`}
                    style={reveal(80 + index * 100, 15)}
                  >
                    <article
                      className={`education-card group relative min-w-0 overflow-hidden rounded-[22px] border p-4 backdrop-blur-xl transition-colors duration-300 sm:rounded-[26px] sm:p-5 md:p-6 ${theme.card} ${
                        isLeft
                          ? "sm:mr-5 lg:mr-8"
                          : "sm:ml-5 lg:ml-8"
                      }`}
                    >
                      {/* Subtle card lighting */}
                      <div
                        aria-hidden="true"
                        className={`pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full blur-3xl transition-colors duration-300 ${
                          item.completed
                            ? "bg-emerald-500/[0.07] group-hover:bg-emerald-400/[0.12]"
                            : "bg-indigo-500/[0.08] group-hover:bg-cyan-400/[0.10]"
                        }`}
                      />

                      <div
                        aria-hidden="true"
                        className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${theme.cardGradient}`}
                      />

                      <div className="relative z-10">
                        {/* Status and number */}
                        <div className="flex flex-wrap items-center justify-between gap-2.5">
                          <span
                            className={`inline-flex max-w-full items-center gap-2 rounded-full border px-2.5 py-1.5 text-[11px] font-semibold leading-5 transition-colors duration-300 sm:px-3 sm:text-xs ${
                              item.completed
                                ? "border-emerald-400/25 bg-emerald-400/[0.09] text-emerald-500"
                                : isLight
                                  ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                                  : "border-indigo-400/20 bg-indigo-400/[0.08] text-indigo-300"
                            }`}
                          >
                            <Icon
                              size={14}
                              className="shrink-0"
                            />
                            {item.status}
                          </span>

                          <span
                            className={`shrink-0 font-mono text-[11px] font-medium tracking-wider transition-colors duration-300 sm:text-xs ${theme.number}`}
                          >
                            0{index + 1}
                          </span>
                        </div>

                        {/* Title */}
                        <h3
                          className={`mt-4 break-words text-base font-bold leading-snug transition-colors duration-300 group-hover:text-cyan-300 sm:mt-5 sm:text-lg lg:text-xl ${theme.title}`}
                        >
                          {item.title}
                        </h3>

                        {/* Institute */}
                        <p
                          className={`mt-2 break-words text-sm font-medium leading-relaxed transition-colors duration-300 ${theme.institute}`}
                        >
                          {item.institute}
                        </p>

                        {/* Divider */}
                        <div
                          className={`my-4 h-px bg-gradient-to-r ${
                            item.completed
                              ? `from-emerald-400/30 ${theme.divider} to-transparent`
                              : `from-indigo-400/20 ${theme.divider} to-transparent`
                          }`}
                        />

                        {/* Description */}
                        <p
                          className={`text-[13px] leading-6 transition-colors duration-300 sm:text-sm sm:leading-7 ${theme.body}`}
                        >
                          {item.description}
                        </p>
                      </div>
                    </article>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Smooth hover zoom */}
      <style>{`
        .education-card {
          transform: translateZ(0) scale(1);
          transform-origin: center center;
          transition:
            transform 200ms ease,
            border-color 200ms ease,
            box-shadow 200ms ease,
            background-color 200ms ease;
          backface-visibility: hidden;
          will-change: transform;
        }

        @media (hover: hover) and (pointer: fine) {
          .education-card:hover {
            transform: translateZ(0) scale(1.015);
            border-color: rgba(129, 140, 248, 0.3);
            box-shadow: 0 12px 35px rgba(79, 70, 229, 0.1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .education-card {
            transition: none !important;
            transform: none;
            will-change: auto;
          }

          .education-card:hover {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}