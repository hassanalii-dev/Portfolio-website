import React, { useEffect, useRef, useState } from "react";
import {
  BriefcaseBusiness,
  Code2,
  Server,
  Layers3,
  Smartphone,
  Database,
  Plug,
  ArrowUpRight,
} from "lucide-react";

const servicesList = [
  {
    number: "01",
    image: "https://cdn.simpleicons.org/react/61DAFB",
    title: "Frontend Development",
    desc: "Building modern, responsive, and interactive user interfaces using HTML, CSS, JavaScript, React, and modern frontend technologies.",
    tags: ["React", "Tailwind CSS"],
  },
  {
    number: "02",
    image: "https://cdn.simpleicons.org/nodedotjs/5FA04E",
    title: "Backend Development",
    desc: "Learning to build server-side applications, APIs, and backend functionality using Node.js and Express.js.",
    tags: ["Node.js", "Express.js"],
  },
  {
    number: "03",
    image: "https://cdn.simpleicons.org/stackblitz/1389FD",
    title: "Full Stack Development",
    desc: "Connecting frontend interfaces, backend logic, APIs, and databases to build complete web applications.",
    tags: ["Frontend", "Backend"],
  },
  {
    number: "04",
    image: "https://cdn.simpleicons.org/googlechrome/4285F4",
    title: "Responsive Websites",
    desc: "Creating adaptable website layouts that provide a consistent experience across desktops, tablets, and mobile devices.",
    tags: ["Mobile First", "Responsive UI"],
  },
  {
    number: "05",
    image: "https://cdn.simpleicons.org/mongodb/47A248",
    title: "Database Integration",
    desc: "Learning to store, organize, retrieve, and manage application data through database integration.",
    tags: ["Data Handling", "Storage"],
  },
  {
    number: "06",
    image: "https://cdn.simpleicons.org/postman/FF6C37",
    title: "API Integration",
    desc: "Working with REST APIs to exchange data and connect web applications with external services.",
    tags: ["REST APIs", "Integration"],
  },
];

export default function Services() {
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

  // Smooth scroll reveal — unchanged
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

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative isolate overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28"
    >
      {/* Ambient background glow — unchanged */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-32 -z-10 h-56 w-56 rounded-full bg-violet-600/[0.08] blur-[90px] sm:-left-32 sm:h-80 sm:w-80 sm:blur-[110px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 bottom-10 -z-10 h-56 w-56 rounded-full bg-cyan-500/[0.07] blur-[90px] sm:-right-32 sm:h-80 sm:w-80 sm:blur-[110px]"
      />

      <div className="relative mx-auto w-full max-w-[1250px] px-5 sm:px-8">
        {/* Section heading */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            translate: isVisible ? "0 0" : "0 15px",
            transition: `
              opacity 500ms ease,
              translate 500ms ease
            `,
          }}
          className="mx-auto mb-10 max-w-2xl text-center sm:mb-14 md:mb-16"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/[0.07] px-3 py-2 text-[10px] font-semibold uppercase tracking-[2.5px] text-indigo-500 min-[420px]:px-4 sm:text-xs sm:tracking-[3px]">
            <BriefcaseBusiness size={15} />
            What I Do
          </span>

          <h2
            className={`text-3xl font-bold tracking-tight min-[420px]:text-4xl sm:text-5xl lg:text-6xl ${
              isLight ? "text-slate-900" : "text-white"
            }`}
          >
            My Services
          </h2>

          <p
            className={`mx-auto mt-4 max-w-xl text-sm leading-7 sm:mt-5 sm:text-base sm:leading-8 ${
              isLight ? "text-slate-600" : "text-slate-400"
            }`}
          >
            Exploring modern web technologies and developing the skills
            needed to build beautiful, functional, and responsive websites.
          </p>

          <div className="mx-auto mt-6 h-px w-20 bg-gradient-to-r from-transparent via-indigo-400 to-transparent sm:mt-7 sm:w-24" />
        </div>

        {/* Responsive services grid — unchanged */}
        <div className="mx-auto grid w-full max-w-[1250px] grid-cols-1 gap-4 min-[520px]:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {servicesList.map((service, index) => (
            <article
              key={service.number}
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
              className={`service-card group relative isolate flex min-w-0 flex-col overflow-hidden rounded-2xl border p-5 backdrop-blur-xl sm:rounded-[22px] sm:p-6 lg:p-7 ${
                isLight
                  ? "border-slate-200 bg-white/80"
                  : "border-white/[0.09] bg-slate-900/50"
              }`}
            >
              {/* Subtle hover glow — unchanged */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-12 -z-10 h-36 w-36 rounded-full bg-indigo-500/[0.07] blur-3xl transition-colors duration-200 group-hover:bg-cyan-400/[0.10]"
              />

              {/* Card top row */}
              <div className="mb-5 flex items-center justify-between gap-3 sm:mb-7">
                <div
                  className={`service-icon-box flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-2xl border ${
                    isLight
                      ? "border-slate-200 bg-slate-100"
                      : "border-slate-700/70 bg-slate-800/60"
                  }`}
                >
                  <img
                    src={service.image}
                    alt={`${service.title} icon`}
                    loading="lazy"
                    decoding="async"
                    className="service-logo h-11 w-11 object-contain"
                    onError={(event) => {
                      event.currentTarget.style.visibility = "hidden";
                    }}
                  />
                </div>

                <span
                  className={`font-mono text-xs tracking-widest transition-colors duration-200 group-hover:text-indigo-400 sm:text-sm ${
                    isLight
                      ? "text-slate-400"
                      : "text-slate-600 group-hover:text-indigo-300/80"
                  }`}
                >
                  {service.number}
                </span>
              </div>

              {/* Card content */}
              <h3
                className={`break-words text-lg font-semibold leading-snug transition-colors duration-200 group-hover:text-cyan-500 sm:text-xl ${
                  isLight
                    ? "text-slate-900"
                    : "text-white group-hover:text-cyan-200"
                }`}
              >
                {service.title}
              </h3>

              <p
                className={`mt-3 flex-1 text-[13px] leading-6 sm:text-sm sm:leading-7 ${
                  isLight ? "text-slate-600" : "text-slate-400"
                }`}
              >
                {service.desc}
              </p>

              {/* Tags */}
              <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`max-w-full break-words rounded-lg border px-2.5 py-1.5 text-[11px] font-medium transition-colors duration-200 group-hover:border-indigo-400/20 group-hover:text-indigo-500 sm:px-3 sm:text-xs ${
                      isLight
                        ? "border-slate-200 bg-slate-100 text-slate-600"
                        : "border-white/[0.07] bg-white/[0.035] text-slate-300 group-hover:text-indigo-200"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Original hover animation — unchanged except theme background */}
      <style>{`
        #services .service-card {
          transform: translate3d(0, 0, 0) scale(1);
          transform-origin: center center;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        @media (hover: hover) and (pointer: fine) {
          #services .service-card:hover {
            transform: translate3d(0, -2px, 0) scale(1.015);
            border-color: rgba(129, 140, 248, 0.3);
            background-color: ${
              isLight
                ? "rgba(255, 255, 255, 0.96)"
                : "rgba(15, 23, 42, 0.8)"
            };
            box-shadow: 0 15px 40px -20px rgba(99, 102, 241, 0.2);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          #services .service-card,
          #services .service-card * {
            transition: none !important;
            animation: none !important;
          }

          #services .service-card:hover {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}