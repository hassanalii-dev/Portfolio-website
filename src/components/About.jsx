
import React, { useEffect, useRef, useState } from "react";
import { UserRound, MapPin, LaptopMinimal } from "lucide-react";

const details = [
  { label: "Name", value: "Hassan Ali" },
  { label: "Location", value: "Lahore, Pakistan" },
  { label: "Current Degree", value: "BS Computer Science" },
  { label: "Field", value: "Computer Science" },
];

export default function About() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const [isLight, setIsLight] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.dataset.theme === "light"
  );

  // Sync website theme
  useEffect(() => {
    const syncTheme = () => {
      setIsLight(document.documentElement.dataset.theme === "light");
    };

    syncTheme();
    window.addEventListener("portfolio-theme-change", syncTheme);

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      window.removeEventListener("portfolio-theme-change", syncTheme);
      observer.disconnect();
    };
  }, []);

  // Reveal animation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (
      reducedMotion.matches ||
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
        rootMargin: "0px 0px -25px 0px",
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const reveal = (delay = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible
      ? "translate3d(0, 0, 0)"
      : "translate3d(0, 20px, 0)",
    transition: `opacity 700ms ease ${isVisible ? delay : 0}ms, transform 700ms ease ${isVisible ? delay : 0}ms`,
  });

  // Desktop card tilt
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
      x: (0.5 - y) * 2.5,
      y: (x - 0.5) * 2.5,
    });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  const colors = {
    heading: isLight ? "text-slate-900" : "text-white",
    paragraph: isLight ? "text-slate-600" : "text-slate-400",

    card: isLight
      ? "border-slate-200 bg-white/90 shadow-[0_20px_55px_rgba(15,23,42,0.08)]"
      : "border-white/[0.11] bg-[#0a0f1e]/95 shadow-[0_20px_55px_rgba(0,0,0,0.25)]",

    profileTitle: isLight ? "text-slate-800" : "text-slate-200",

    profileBorder: isLight
      ? "border-white"
      : "border-[#0a0f1e]",

    profileImageBg: isLight ? "bg-slate-100" : "bg-[#070b19]",

    location: isLight
      ? "border-slate-200 bg-slate-100/80 text-slate-600"
      : "border-white/[0.07] bg-white/[0.025] text-slate-400",

    divider: isLight ? "via-slate-300" : "via-white/[0.12]",

    detailCard: isLight
      ? "border-slate-200 bg-white/80 hover:bg-indigo-50/70 hover:shadow-[0_15px_35px_rgba(99,102,241,0.12)]"
      : "border-white/[0.08] bg-[#0a0f1e]/70 hover:bg-indigo-400/[0.04] hover:shadow-[0_15px_35px_rgba(99,102,241,0.08)]",

    detailLabel: "text-slate-500",
    detailValue: isLight ? "text-slate-700" : "text-slate-200",
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      data-theme={isLight ? "light" : "dark"}
      className={`about-section relative isolate overflow-hidden pt-8 pb-14 transition-colors duration-500 sm:py-20 md:py-24 lg:py-28 xl:py-32 ${
        isLight ? "text-slate-800" : "text-white"
      }`}
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className={`about-orb absolute -left-32 top-[12%] h-64 w-64 rounded-full blur-[90px] sm:-left-40 sm:h-[28rem] sm:w-[28rem] sm:blur-[110px] ${
            isLight ? "bg-indigo-500/[0.12]" : "bg-indigo-600/[0.10]"
          }`}
        />

        <div
          className={`about-orb about-orb-delay absolute -right-32 bottom-[5%] h-64 w-64 rounded-full blur-[90px] sm:-right-40 sm:h-[28rem] sm:w-[28rem] sm:blur-[110px] ${
            isLight ? "bg-cyan-500/[0.10]" : "bg-cyan-500/[0.06]"
          }`}
        />

        <div
          className={`absolute inset-0 ${
            isLight
              ? "bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.07),transparent_55%)]"
              : "bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.045),transparent_55%)]"
          }`}
        />

        <div
          className={`absolute inset-0 ${
            isLight ? "opacity-[0.035]" : "opacity-[0.025]"
          }`}
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.6) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1300px] px-5 sm:px-8 lg:px-10 xl:px-14 2xl:px-16">
        {/* Section heading */}
        <div
          className="mb-8 text-center transition-all duration-700 ease-out motion-reduce:transition-none sm:mb-14 lg:mb-16"
          style={reveal(0)}
        >
          <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-400/[0.08] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[1.5px] text-indigo-500 sm:px-4 sm:text-xs sm:tracking-[3px]">
            <UserRound size={15} />
            About Me
          </span>

          <h2
            className={`mt-4 text-3xl font-black tracking-tight transition-colors duration-500 min-[420px]:text-4xl sm:mt-5 sm:text-5xl md:text-6xl ${colors.heading}`}
          >
            Who I Am
          </h2>

          <p
            className={`mx-auto mt-3 max-w-[620px] text-sm leading-7 transition-colors duration-500 sm:mt-4 sm:text-base sm:leading-8 ${colors.paragraph}`}
          >
            A passionate student who is continuously learning,
            creating, and building in the world of web development.
          </p>

          <div className="mx-auto mt-5 h-px w-20 bg-gradient-to-r from-transparent via-indigo-400 to-transparent sm:mt-7 sm:w-24" />
        </div>

        {/* Responsive main layout */}
        <div className="grid grid-cols-1 items-center gap-8 md:gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] xl:gap-14 2xl:gap-20">
          {/* Profile card */}
          <div
            className="relative mx-auto w-full max-w-[360px] min-w-0 transition-all duration-700 ease-out motion-reduce:transition-none sm:max-w-[380px] lg:max-w-none"
            style={reveal(120)}
          >
            <div className="pointer-events-none absolute -inset-3 rounded-[30px] bg-gradient-to-br from-indigo-500/[0.14] via-purple-500/[0.06] to-cyan-400/[0.09] blur-2xl sm:-inset-4 sm:rounded-[36px]" />

            <div
              onPointerMove={handlePointerMove}
              onPointerLeave={resetTilt}
              className={`group relative overflow-hidden rounded-[26px] border p-4 transition-[background-color,border-color,box-shadow] duration-500 hover:border-indigo-400/40 hover:shadow-[0_20px_55px_rgba(79,70,229,0.10)] min-[420px]:p-5 sm:rounded-[32px] sm:p-6 xl:p-7 ${colors.card}`}
              style={{
                transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transitionProperty:
                  "transform, border-color, box-shadow, background-color",
                transitionDuration: "220ms",
                transitionTimingFunction: "ease-out",
              }}
            >
              {/* Card atmosphere */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-indigo-500/[0.08] blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-cyan-500/[0.05] blur-3xl" />

              <div
                className={`pointer-events-none absolute inset-0 ${
                  isLight ? "opacity-[0.015]" : "opacity-[0.025]"
                }`}
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(148,163,184,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.7) 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              />

              {/* Card header */}
              <div className="relative z-10 flex items-center justify-between gap-2 sm:gap-3">
                <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-indigo-400/30 bg-indigo-400/[0.08] sm:h-10 sm:w-10">
                    <LaptopMinimal size={19} className="text-indigo-500" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 sm:text-[10px] sm:tracking-[0.18em]">
                      PORTFOLIO
                    </p>

                    <p
                      className={`mt-1 text-xs font-semibold transition-colors duration-500 sm:text-sm ${colors.profileTitle}`}
                    >
                      About My Profile
                    </p>
                  </div>
                </div>

                <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/[0.08] px-2 py-1.5 sm:gap-2 sm:px-3 sm:py-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                  <span className="text-[9px] font-semibold text-emerald-500 sm:text-[11px]">
                    Learning
                  </span>
                </div>
              </div>

              {/* Profile picture */}
              <div className="relative z-10 mt-6 flex justify-center sm:mt-10 xl:mt-12">
                <div className="relative">
                  <div className="pointer-events-none absolute -inset-3 rounded-full bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-cyan-400/15 opacity-70 blur-xl transition-opacity duration-300 group-hover:opacity-100 sm:-inset-4" />

                  <div className="relative h-36 w-36 rounded-full bg-gradient-to-br from-indigo-400 via-purple-500 to-cyan-400 p-[3px] shadow-[0_0_35px_rgba(99,102,241,0.15)] transition-transform duration-300 group-hover:scale-[1.025] min-[420px]:h-40 min-[420px]:w-40 sm:h-52 sm:w-52 xl:h-56 xl:w-56">
                    <div
                      className={`h-full w-full overflow-hidden rounded-full border-[3px] transition-colors duration-500 ${colors.profileBorder} ${colors.profileImageBg}`}
                    >
                      <img
                        src="/image copy.png"
                        alt="Hassan Ali - Full Stack Web Developer"
                        className="h-full w-full object-cover object-[center_15%]"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <span
                    className={`absolute bottom-2 right-2 flex h-5 w-5 items-center justify-center rounded-full border-[3px] bg-emerald-400 transition-colors duration-500 sm:bottom-4 sm:right-3 ${colors.profileBorder}`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-950" />
                  </span>
                </div>
              </div>

              {/* Identity */}
              <div className="relative z-10 mt-4 text-center sm:mt-6">
                <h3
                  className={`text-2xl font-bold tracking-tight transition-colors duration-300 sm:text-3xl ${colors.heading}`}
                >
                  Hassan Ali
                </h3>

                <p className="mt-2 text-sm font-medium text-indigo-500 sm:text-base">
                  Full Stack Web Developer
                </p>

                <p
                  className={`mt-3 inline-flex max-w-full items-center gap-2 rounded-full border px-3 py-2 text-xs transition-colors duration-500 ${colors.location}`}
                >
                  <MapPin size={14} className="shrink-0 text-indigo-400" />
                  Lahore, Pakistan
                </p>
              </div>

              {/* Divider */}
              <div
                className={`relative z-10 my-5 h-px bg-gradient-to-r from-transparent to-transparent transition-colors duration-500 sm:my-6 ${colors.divider}`}
              />

              {/* Learning status */}
              <div className="relative z-10 flex items-center justify-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.05] px-3 py-3 sm:px-4">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>

                <span className="text-center text-[11px] font-medium text-emerald-500 sm:text-xs">
                  Always Learning &amp; Building
                </span>
              </div>

              <div className="pointer-events-none absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent" />
            </div>
          </div>

          {/* About text */}
          <div className="min-w-0">
            <div
              className="transition-all duration-700 ease-out motion-reduce:transition-none"
              style={reveal(220)}
            >
              <span className="text-xs font-semibold tracking-[2px] text-indigo-500 sm:text-sm">
                GET TO KNOW ME
              </span>

              <h3
                className={`mt-3 text-2xl font-bold leading-snug tracking-tight transition-colors duration-500 min-[420px]:text-3xl sm:text-4xl lg:text-[32px] xl:text-[36px] ${colors.heading}`}
              >
                I&apos;m Hassan Ali,
                <span className="mt-1 block bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                  a Full Stack Web Developer.
                </span>
              </h3>

              <p
                className={`mt-5 text-sm leading-7 transition-colors duration-500 sm:text-base sm:leading-8 ${colors.paragraph}`}
              >
                I am a BSCS student at Lahore Garrison University and a Full
                Stack Web Developer trained at NexSkill, Arfa Tower Lahore. I
                specialize in building modern, responsive, and interactive web
                applications, combining creative design with functional
                development to deliver engaging user experiences.
              </p>

              <p
                className={`mt-4 text-sm leading-7 transition-colors duration-500 sm:text-base sm:leading-8 ${colors.paragraph}`}
              >
                My goal is to become a professional full stack developer and
                build useful, beautiful, and high-quality digital products
                that provide meaningful experiences.
              </p>
            </div>

            {/* Personal details */}
            <div className="mt-6 grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:mt-8 sm:gap-4">
              {details.map((item) => (
                <div
                  key={item.label}
                  className={`group relative min-w-0 overflow-hidden rounded-xl border p-4 backdrop-blur-md transition duration-300 ease-out hover:-translate-y-1 hover:border-indigo-400/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 motion-reduce:transform-none ${colors.detailCard}`}
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-400/[0.08] to-cyan-400/[0.04] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

                  <div className="relative">
                    <p
                      className={`text-[10px] font-semibold uppercase tracking-[1.2px] transition-colors duration-200 group-hover:text-indigo-500 sm:text-xs ${colors.detailLabel}`}
                    >
                      {item.label}
                    </p>

                    <p
                      className={`mt-2 break-words text-sm font-semibold leading-6 transition-colors duration-200 group-hover:text-cyan-600 sm:text-[15px] ${colors.detailValue}`}
                    >
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section animations */}
      <style>{`
        .about-orb {
          animation: aboutOrbFloat 12s ease-in-out infinite alternate;
        }

        .about-orb-delay {
          animation-delay: -5s;
        }

        .about-gradient-text {
          background-size: 200% auto;
          animation: aboutGradient 8s ease-in-out infinite alternate;
        }

        @keyframes aboutOrbFloat {
          from {
            transform: translate3d(0, 0, 0) scale(1);
          }

          to {
            transform: translate3d(16px, -18px, 0) scale(1.06);
          }
        }

        @keyframes aboutGradient {
          from {
            background-position: 0% center;
          }

          to {
            background-position: 100% center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .about-orb,
          .about-gradient-text {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
