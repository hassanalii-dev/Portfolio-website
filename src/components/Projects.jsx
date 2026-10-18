import React, { useEffect, useRef, useState } from "react";
import {
  FolderKanban,
  ArrowUpRight,
  Globe,
  Server,
  Monitor,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const navThemeEvent = "portfolio-theme-change";

const projectsList = [
  {
    number: "01",
    title: "TinyURL Clone",
    desc: "A full-stack URL shortener that allows users to create short links through a modern interface, with frontend and backend integration.",
    image: "image copy 2.png",
    imageAlt: "TinyURL Clone website preview",
    tags: ["React", "Node.js", "Express.js", "MongoDB"],
    status: "Full Stack",
    type: "Frontend + Backend",
    gradient: "from-indigo-500/20 via-violet-500/10 to-cyan-500/20",
    liveUrl: "https://url-shortner-by-hassan-ali.vercel.app/",
  },
  {
    number: "02",
    title: "E-Commerce Store",
    desc: "A modern online shopping interface featuring product browsing, an attractive store layout, and a responsive user experience.",
    image: "image copy 3.png",
    imageAlt: "E-Commerce Store website preview",
    tags: ["React", "JavaScript", "Tailwind CSS"],
    status: "Frontend",
    type: "Frontend Only",
    gradient: "from-purple-500/20 via-fuchsia-500/10 to-indigo-500/20",
    liveUrl: "https://hassan-tech-store.vercel.app",
  },
  {
    number: "03",
    title: "Weather Web App",
    desc: "A weather web app that provides real-time weather updates through a modern interface, with frontend and API integration.",
    image: "image copy 4.png",
    imageAlt: "Weather Web App website preview",
    tags: ["React", "JavaScript", "Weather API", "Frontend"],
    status: "API Integrated",
    type: "Frontend + API",
    gradient: "from-indigo-500/20 via-violet-500/10 to-cyan-500/20",
    liveUrl: "https://weather-app-by-hassan-ali.vercel.app/",
  },
  {
    number: "04",
    title: "Currency Exchanger",
    desc: "A currency exchanger web app with a modern, responsive interface that converts currencies using real-time exchange rates through API integration.",
    image: "image copy 5.png",
    imageAlt: "Currency Exchanger website preview",
    tags: ["React", "JavaScript", "Currency API", "Frontend"],
    status: "API Integrated",
    type: "Frontend + API",
    gradient: "from-indigo-500/20 via-violet-500/10 to-cyan-500/20",
    liveUrl: "https://currrency-exchanger-by-hassan-ali.vercel.app/",
  },
  {
    number: "05",
    title: "Expense Tracker",
    desc: "A modern expense tracker web app that helps users manage daily expenses, track spending, and monitor their finances through a clean, responsive interface.",
    image: "image copy 6.png",
    imageAlt: "Expense Tracker website preview",
    tags: ["React", "JavaScript", "Frontend"],
    status: "Fully Functional",
    type: "Frontend",
    gradient: "from-emerald-500/20 via-teal-500/10 to-cyan-500/20",
    liveUrl: "https://expense-tracker-by-hassan-ali.vercel.app/",
  },
  {
    number: "06",
    title: "Password Generator",
    desc: "A modern password generator that creates strong, customizable passwords with adjustable length and character options.",
    image: "image copy 7.png",
    imageAlt: "Password Generator website preview",
    tags: ["React", "JavaScript", "Frontend"],
    status: "Fully Functional",
    type: "Frontend",
    gradient: "from-violet-500/20 via-indigo-500/10 to-cyan-500/20",
    liveUrl: "https://password-generator-by-hassan-ali.vercel.app/",
  },
];

function ProjectCard({ project, isLight }) {
  const theme = isLight
    ? {
        card: "border-slate-200 bg-white shadow-sm shadow-slate-200/50",
        title: "text-slate-900 group-hover:text-indigo-600",
        desc: "text-slate-600",
        type: "text-slate-600",
        tagContainer: "border-slate-200",
        tag: "border-indigo-200/80 bg-indigo-50 text-indigo-700 group-hover:border-indigo-300",
        button:
          "border-indigo-200 bg-gradient-to-r from-indigo-50 to-cyan-50 text-indigo-700 hover:border-cyan-300 hover:from-indigo-100 hover:to-cyan-100 hover:text-indigo-900",
        imageOverlay:
          "bg-gradient-to-t from-slate-950/65 via-transparent to-slate-950/5",
      }
    : {
        card: "border-white/[0.09] bg-slate-900/60",
        title: "text-white group-hover:text-cyan-200",
        desc: "text-slate-400",
        type: "text-slate-300",
        tagContainer: "border-white/[0.07]",
        tag: "border-indigo-400/10 bg-indigo-400/[0.07] text-indigo-200 group-hover:border-indigo-400/20",
        button:
          "border-indigo-400/25 bg-gradient-to-r from-indigo-500/15 to-cyan-500/10 text-indigo-200 hover:border-cyan-400/40 hover:from-indigo-500/25 hover:to-cyan-500/20 hover:text-white",
        imageOverlay:
          "bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/10",
      };

  return (
    <article
      className={`project-card group relative isolate flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border sm:rounded-[22px] ${theme.card}`}
    >
      <div
        className={`relative flex h-48 shrink-0 items-center justify-center overflow-hidden bg-gradient-to-br ${project.gradient} min-[420px]:h-52 sm:h-56`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.12) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        <div className="project-image relative z-10 h-full w-full overflow-hidden">
          <img
            src={project.image}
            alt={project.imageAlt}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.opacity = "0";
            }}
            className="h-full w-full object-cover object-center transition-[filter] duration-500 group-hover:brightness-110"
          />
        </div>

        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 z-10 ${theme.imageOverlay}`}
        />

        <span className="absolute bottom-3 left-3 z-20 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-slate-950/75 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-emerald-300 backdrop-blur-md sm:bottom-4 sm:left-4 sm:text-[11px]">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
          {project.status}
        </span>

        <span className="absolute bottom-3 right-3 z-20 font-mono text-[10px] text-white/80 sm:bottom-4 sm:right-4 sm:text-xs">
          {project.number}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 min-[420px]:p-5 sm:p-6">
        <h3
          className={`break-words text-lg font-semibold leading-snug transition-colors duration-300 sm:text-xl ${theme.title}`}
        >
          {project.title}
        </h3>

        <p
          className={`mt-3 text-[13px] leading-6 sm:text-sm sm:leading-7 ${theme.desc}`}
        >
          {project.desc}
        </p>

        <div
          className={`mt-4 flex items-center gap-2 text-xs sm:text-sm ${theme.type}`}
        >
          {project.type === "Frontend Only" ? (
            <Monitor size={15} className="shrink-0 text-cyan-500" />
          ) : (
            <Server size={15} className="shrink-0 text-cyan-500" />
          )}
          <span>{project.type}</span>
        </div>

        <div
          className={`mt-5 flex flex-wrap gap-2 border-t pt-4 sm:mt-6 sm:pt-5 ${theme.tagContainer}`}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`max-w-full break-words rounded-lg border px-2.5 py-1.5 text-[11px] font-medium transition-colors duration-300 sm:px-3 sm:text-xs ${theme.tag}`}
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${project.title} live website`}
          className={`group/btn mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 sm:mt-6 ${theme.button}`}
        >
          <Globe size={17} />
          <span>View Project</span>
          <ArrowUpRight
            size={17}
            className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
          />
        </a>
      </div>
    </article>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const extraProjectsRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [extraHeight, setExtraHeight] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  const [isLight, setIsLight] = useState(
    () => document.documentElement.dataset.theme === "light"
  );

  // Synchronize with the global Navbar theme toggle.
  useEffect(() => {
    const updateTheme = (event) => {
      const theme =
        event.detail?.theme ||
        document.documentElement.dataset.theme;

      setIsLight(theme === "light");
    };

    window.addEventListener(navThemeEvent, updateTheme);

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
      window.removeEventListener(navThemeEvent, updateTheme);
      themeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const updateMotionPreference = () => {
      setReduceMotion(mediaQuery.matches);
    };

    updateMotionPreference();
    mediaQuery.addEventListener?.("change", updateMotionPreference);

    return () => {
      mediaQuery.removeEventListener?.("change", updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

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
  }, [reduceMotion]);

  useEffect(() => {
    const element = extraProjectsRef.current;
    if (!element) return;

    const updateHeight = () => {
      setExtraHeight(element.scrollHeight);
    };

    updateHeight();

    if ("ResizeObserver" in window) {
      const resizeObserver = new ResizeObserver(updateHeight);
      resizeObserver.observe(element);

      return () => resizeObserver.disconnect();
    }

    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    const element = extraProjectsRef.current;
    if (!element) return;

    const frame = requestAnimationFrame(() => {
      setExtraHeight(element.scrollHeight);
    });

    return () => cancelAnimationFrame(frame);
  }, [showAllProjects]);

  const handleToggleProjects = () => {
    setShowAllProjects((previous) => !previous);
  };

  const extraProjects = projectsList.slice(3);

  const revealStyle = (index, extra = false) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible
      ? "translate3d(0, 0, 0) scale(1)"
      : "translate3d(0, 22px, 0) scale(0.94)",
    transition: reduceMotion
      ? "none"
      : `opacity 750ms cubic-bezier(0.22, 1, 0.36, 1) ${
          extra ? 100 + index * 110 : 180 + index * 110
        }ms,
         transform 750ms cubic-bezier(0.22, 1, 0.36, 1) ${
           extra ? 100 + index * 110 : 180 + index * 110
         }ms`,
  });

  const theme = isLight
    ? {
        heading: "text-slate-900",
        description: "text-slate-600",
        label:
          "border-indigo-200 bg-indigo-50 text-indigo-700",
        line: "via-indigo-400",
        button:
          "border-indigo-200 bg-gradient-to-r from-indigo-50 to-cyan-50 text-indigo-700 hover:border-cyan-300 hover:from-indigo-100 hover:to-cyan-100 hover:text-indigo-900",
      }
    : {
        heading: "text-white",
        description: "text-slate-400",
        label:
          "border-indigo-400/20 bg-indigo-400/[0.07] text-indigo-300",
        line: "via-indigo-400",
        button:
          "border-indigo-400/25 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 text-indigo-200 hover:border-cyan-400/40 hover:from-indigo-500/20 hover:to-cyan-500/20 hover:text-white",
      };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`relative isolate overflow-hidden py-16 transition-colors duration-300 sm:py-20 md:py-24 lg:py-28 ${
        isLight ? "bg-slate-50" : "bg-transparent"
      }`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute left-1/2 top-24 -z-10 h-56 w-56 -translate-x-1/2 rounded-full blur-[90px] sm:top-32 sm:h-72 sm:w-72 sm:blur-[110px] ${
          isLight ? "bg-indigo-400/[0.10]" : "bg-indigo-600/[0.08]"
        }`}
      />

      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-24 bottom-10 -z-10 h-56 w-56 rounded-full blur-[90px] sm:h-72 sm:w-72 ${
          isLight ? "bg-cyan-400/[0.08]" : "bg-cyan-500/[0.05]"
        }`}
      />

      <div className="relative mx-auto w-full max-w-[1300px] px-4 min-[420px]:px-5 sm:px-8 lg:px-10 xl:px-14">
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? "translate3d(0, 0, 0)"
              : "translate3d(0, 22px, 0)",
            transition: reduceMotion
              ? "none"
              : "opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          className="mx-auto mb-10 max-w-2xl text-center sm:mb-14 md:mb-16"
        >
          <div
            className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-2 min-[420px]:px-4 ${theme.label}`}
          >
            <FolderKanban size={15} />
            <span className="text-[10px] font-semibold uppercase tracking-[2.5px] sm:text-xs sm:tracking-[3px]">
              My Work
            </span>
          </div>

          <h2
            className={`text-3xl font-bold tracking-tight min-[420px]:text-4xl sm:text-5xl lg:text-6xl ${theme.heading}`}
          >
            Featured Projects
          </h2>

          <p
            className={`mx-auto mt-4 max-w-xl text-sm leading-7 sm:mt-5 sm:text-base sm:leading-8 ${theme.description}`}
          >
            Explore my projects, from full-stack web applications to modern
            frontend experiences.
          </p>

          <div
            className={`mx-auto mt-6 h-px w-20 bg-gradient-to-r from-transparent ${theme.line} to-transparent sm:mt-7 sm:w-24`}
          />
        </div>

        {/* First three projects */}
        <div className="mx-auto grid w-full max-w-[1250px] grid-cols-1 items-stretch gap-5 min-[560px]:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {projectsList.slice(0, 3).map((project, index) => (
            <div
              key={project.number}
              className="project-reveal min-w-0"
              style={revealStyle(index)}
            >
              <ProjectCard project={project} isLight={isLight} />
            </div>
          ))}
        </div>

        {/* Extra projects with smooth height and reveal animation */}
        <div
          id="extra-projects"
          style={{
            height: showAllProjects ? extraHeight : 0,
            opacity: showAllProjects ? 1 : 0,
            transition: reduceMotion
              ? "none"
              : "height 650ms cubic-bezier(0.22, 1, 0.36, 1), opacity 450ms ease",
          }}
          className="overflow-hidden"
          aria-hidden={!showAllProjects}
          inert={!showAllProjects}
        >
          <div
            ref={extraProjectsRef}
            className="mx-auto grid w-full max-w-[1250px] grid-cols-1 items-stretch gap-5 pt-5 min-[560px]:grid-cols-2 sm:gap-6 sm:pt-6 lg:grid-cols-3"
          >
            {extraProjects.map((project, index) => (
              <div
                key={project.number}
                className="project-reveal min-w-0"
                style={{
                  opacity: showAllProjects ? 1 : 0,
                  transform: showAllProjects
                    ? "translate3d(0, 0, 0) scale(1)"
                    : "translate3d(0, 24px, 0) scale(0.92)",
                  transition: reduceMotion
                    ? "none"
                    : `opacity 650ms cubic-bezier(0.22, 1, 0.36, 1) ${
                        showAllProjects ? 100 + index * 120 : 0
                      }ms,
                       transform 700ms cubic-bezier(0.22, 1, 0.36, 1) ${
                         showAllProjects ? 100 + index * 120 : 0
                       }ms`,
                }}
              >
                <ProjectCard project={project} isLight={isLight} />
              </div>
            ))}
          </div>
        </div>

        <div
          className="mt-9 flex justify-center sm:mt-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? "translate3d(0, 0, 0)"
              : "translate3d(0, 18px, 0)",
            transition: reduceMotion
              ? "none"
              : "opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) 350ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 350ms",
          }}
        >
          <button
            type="button"
            onClick={handleToggleProjects}
            aria-expanded={showAllProjects}
            aria-controls="extra-projects"
            className={`group/more inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl border px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 sm:px-8 ${theme.button}`}
          >
            <span>
              {showAllProjects ? "Show Less" : "Show More"}
            </span>

            {showAllProjects ? (
              <ChevronUp
                size={18}
                className="transition-transform duration-300 group-hover/more:-translate-y-0.5"
              />
            ) : (
              <ChevronDown
                size={18}
                className="transition-transform duration-300 group-hover/more:translate-y-0.5"
              />
            )}
          </button>
        </div>
      </div>

      <style>{`
        #projects .project-reveal {
          min-width: 0;
          transform-origin: center center;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        #projects .project-card {
          transform: translate3d(0, 0, 0) scale(1);
          transform-origin: center center;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transition:
            transform 550ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 400ms ease,
            background-color 400ms ease,
            box-shadow 400ms ease;
          will-change: transform;
        }

        #projects .project-image img {
          transform: scale(1);
          transition: transform 650ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
        }

        @media (hover: hover) and (pointer: fine) {
          #projects .project-card:hover {
            transform: translate3d(0, -3px, 0) scale(1.025);
            border-color: rgba(129, 140, 248, 0.35);
            box-shadow: 0 20px 55px -25px rgba(99, 102, 241, 0.25);
          }

          #projects .project-image img:hover {
            filter: brightness(1.1);
          }

          #projects .project-card:hover .project-image img {
            transform: scale(1.07);
          }

          #projects:has(.project-card) .project-card:hover {
            background-color: ${
              isLight ? "rgba(255, 255, 255, 0.98)" : "rgba(15, 23, 42, 0.8)"
            };
          }
        }

        @media (max-width: 639px) {
          #projects .project-card:hover {
            transform: translate3d(0, -2px, 0) scale(1.01);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          #projects .project-reveal,
          #projects .project-card,
          #projects .project-image img {
            transition: none !important;
            animation: none !important;
          }

          #projects .project-card,
          #projects .project-card:hover,
          #projects .project-image img,
          #projects .project-card:hover .project-image img {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}