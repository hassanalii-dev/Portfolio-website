import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Layers3 } from "lucide-react";

const skillsList = [
  {
    number: "01",
    image: "https://cdn.simpleicons.org/html5/E34F26",
    title: "HTML5",
    desc: "Web Structure",
    detail: "Semantic markup",
    glow: "hover:border-orange-400/30",
  },
  {
    number: "02",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    title: "CSS3",
    desc: "Modern Styling",
    detail: "Responsive layouts",
    glow: "hover:border-blue-400/30",
  },
  {
    number: "03",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    title: "JavaScript",
    desc: "Web Interactivity",
    detail: "Dynamic interfaces",
    glow: "hover:border-yellow-400/30",
  },
  {
    number: "04",
    image: "https://cdn.simpleicons.org/react/61DAFB",
    title: "React.js",
    desc: "Frontend Development",
    detail: "Component-based UI",
    glow: "hover:border-cyan-400/30",
  },
  {
    number: "05",
    image: "https://cdn.simpleicons.org/nodedotjs/5FA04E",
    title: "Node.js",
    desc: "Backend Development",
    detail: "Server-side JavaScript",
    glow: "hover:border-green-400/30",
  },
  {
    number: "06",
    image: "https://cdn.simpleicons.org/mongodb/47A248",
    title: "MongoDB",
    desc: "Data Management",
    detail: "Database fundamentals",
    glow: "hover:border-emerald-400/30",
  },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Dark / Light mode toggle sync only
  const [isLight, setIsLight] = useState(
    () => document.documentElement.dataset.theme === "light"
  );

  useEffect(() => {
    const updateTheme = (event) => {
      const theme =
        event.detail?.theme || document.documentElement.dataset.theme;

      setIsLight(theme === "light");
    };

    window.addEventListener("portfolio-theme-change", updateTheme);

    const themeObserver = new MutationObserver(() => {
      setIsLight(document.documentElement.dataset.theme === "light");
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      window.removeEventListener("portfolio-theme-change", updateTheme);
      themeObserver.disconnect();
    };
  }, []);

  // Scroll reveal animation — unchanged
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
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

  // Original reveal animation — unchanged
  const reveal = (delay = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible
      ? "translate3d(0, 0, 0)"
      : "translate3d(0, 15px, 0)",
    transition: `
      opacity 500ms ease ${delay}ms,
      transform 500ms ease ${delay}ms
    `,
  });

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative isolate overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28"
    >
      {/* Ambient background glow — unchanged */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-20 -z-10 h-56 w-56 -translate-x-1/2 rounded-full bg-indigo-600/[0.08] blur-[90px] sm:top-24 sm:h-72 sm:w-72 sm:blur-[110px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-10 -z-10 h-52 w-52 rounded-full bg-cyan-500/[0.05] blur-[90px] sm:h-72 sm:w-72"
      />

      <div className="relative mx-auto w-full max-w-[1250px] px-5 sm:px-8">
        {/* Heading */}
        <div
          style={reveal(0)}
          className="mx-auto mb-10 max-w-2xl text-center sm:mb-14 md:mb-16"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/[0.07] px-3 py-2 text-[10px] font-semibold uppercase tracking-[2.5px] text-indigo-300 min-[420px]:px-4 sm:text-xs sm:tracking-[3px]">
            <Layers3 size={15} />
            My Skills
          </span>

          <h2
            className={`whitespace-nowrap text-[clamp(1.1rem,4.5vw,3.75rem)] font-bold tracking-tight ${
              isLight ? "text-slate-900" : "text-white"
            }`}
          >
            Technologies I Work With
          </h2>

          <p
            className={`mx-auto mt-4 max-w-xl text-sm leading-7 sm:mt-5 sm:text-base sm:leading-8 ${
              isLight ? "text-slate-600" : "text-slate-400"
            }`}
          >
            The technologies I am learning and using to build modern,
            interactive, and responsive web experiences.
          </p>

          <div className="mx-auto mt-6 h-px w-20 bg-gradient-to-r from-transparent via-indigo-400 to-transparent sm:mt-7 sm:w-24" />
        </div>

        {/* Responsive skills grid — unchanged */}
        <div className="mx-auto grid w-full max-w-[1500px] grid-cols-1 gap-4 min-[520px]:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {skillsList.map((skill, index) => (
            <article
              key={skill.title}
              style={{
                opacity: isVisible ? 1 : 0,
                translate: isVisible ? "0 0" : "0 15px",
                transition: `
                  opacity 500ms ease ${100 + index * 60}ms,
                  translate 500ms ease ${100 + index * 60}ms,
                  transform 300ms ease,
                  border-color 250ms ease,
                  background-color 250ms ease,
                  box-shadow 250ms ease
                `,
              }}
              className={`skill-card group relative isolate min-w-0 overflow-hidden rounded-2xl border p-5 backdrop-blur-xl sm:rounded-[22px] sm:p-6 ${skill.glow} ${
                isLight
                  ? "border-slate-200 bg-white/80"
                  : "border-white/[0.09] bg-slate-900/55"
              }`}
            >
              {/* Subtle corner glow — unchanged */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 -z-10 h-28 w-28 rounded-full bg-indigo-500/[0.07] blur-2xl transition-colors duration-200 group-hover:bg-cyan-400/[0.10]"
              />

              {/* Technology icon */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[20px] border border-indigo-300/10 bg-gradient-to-br from-indigo-500/20 to-cyan-400/10 shadow-inner transition-all duration-300 group-hover:scale-105 group-hover:border-indigo-300/30">
                  <img
                    src={skill.image}
                    alt={`${skill.title} logo`}
                    width="38"
                    height="38"
                    loading="lazy"
                    className="h-9 w-9 object-contain transition-transform duration-300 group-hover:scale-110"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                </div>

                <span
                  className={`pt-1 font-mono text-[11px] tracking-widest transition-colors duration-200 group-hover:text-indigo-400 sm:text-xs ${
                    isLight ? "text-slate-400" : "text-slate-600 group-hover:text-indigo-300"
                  }`}
                >
                  {skill.number}
                </span>
              </div>

              {/* Card content */}
              <div className="mt-5 sm:mt-6">
                <h3
                  className={`break-words text-lg font-semibold transition-colors duration-200 group-hover:text-cyan-500 sm:text-xl ${
                    isLight
                      ? "text-slate-900"
                      : "text-white group-hover:text-cyan-200"
                  }`}
                >
                  {skill.title}
                </h3>

                <p
                  className={`mt-1 text-sm leading-6 ${
                    isLight ? "text-slate-600" : "text-slate-400"
                  }`}
                >
                  {skill.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Hover animation and accessibility — unchanged except theme background */}
      <style>{`
        #skills .skill-card {
          transform: translate3d(0, 0, 0) scale(1);
          transform-origin: center;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transition:
            transform 300ms ease,
            border-color 250ms ease,
            background-color 250ms ease,
            box-shadow 250ms ease;
        }

        @media (hover: hover) and (pointer: fine) {
          #skills .skill-card:hover {
            transform: translate3d(0, -2px, 0) scale(1.015);
            border-color: rgba(129, 140, 248, 0.3);
            background-color: ${
              isLight
                ? "rgba(255, 255, 255, 0.96)"
                : "rgba(15, 23, 42, 0.8)"
            };
            box-shadow: 0 15px 40px ${
              isLight
                ? "rgba(99, 102, 241, 0.10)"
                : "rgba(0, 0, 0, 0.14)"
            };
          }
        }

        #skills .skill-card:focus-within {
          border-color: rgba(129, 140, 248, 0.3);
        }

        @media (prefers-reduced-motion: reduce) {
          #skills .skill-card,
          #skills .skill-card * {
            transition: none !important;
            animation: none !important;
          }

          #skills .skill-card:hover {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}