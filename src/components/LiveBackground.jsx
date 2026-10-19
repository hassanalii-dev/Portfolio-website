import React, { useEffect, useState } from "react";

const stars = Array.from({ length: 34 }, (_, index) => ({
  id: index,
  left: `${(index * 37 + 7) % 100}%`,
  top: `${(index * 53 + 11) % 100}%`,
  time: `${3 + (index % 5)}s`,
  delay: `${-(index % 7)}s`,
  opacity: 0.25 + (index % 5) * 0.12,
}));

export default function LiveBackground() {
  const [isLight, setIsLight] = useState(() => {
    if (typeof document === "undefined") return false;
    return document.documentElement.dataset.theme === "light";
  });

  useEffect(() => {
    const syncTheme = () => {
      setIsLight(
        document.documentElement.dataset.theme === "light"
      );
    };

    syncTheme();

    window.addEventListener("portfolio-theme-change", syncTheme);

    const observer = new MutationObserver(syncTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      window.removeEventListener(
        "portfolio-theme-change",
        syncTheme
      );
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className={`site-portal-background ${
        isLight ? "site-portal-light" : "site-portal-dark"
      }`}
      aria-hidden="true"
    >
      <style>{`
        .site-portal-background {
          --portal-purple: #a78bfa;
          --portal-cyan: #67e8f9;

          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          isolation: isolate;
          pointer-events: none;
          background: #04040a;
          transition: background-color .3s ease;
        }

        /* DARK THEME */
        .site-portal-background.site-portal-dark {
          background: #04040a;
        }

        .site-portal-dark .site-portal-backdrop {
          background:
            radial-gradient(
              ellipse at 50% 35%,
              rgba(88, 28, 135, .2),
              transparent 40%
            ),
            radial-gradient(
              ellipse at 15% 85%,
              rgba(8, 145, 178, .12),
              transparent 35%
            ),
            radial-gradient(
              ellipse at 90% 20%,
              rgba(124, 58, 237, .1),
              transparent 30%
            ),
            #04040a;
        }

        /* LIGHT THEME */
        .site-portal-background.site-portal-light {
          --portal-purple: #7c3aed;
          --portal-cyan: #0891b2;

          background: #f8fafc;
        }

        .site-portal-light .site-portal-backdrop {
          background:
            radial-gradient(
              ellipse at 50% 35%,
              rgba(139, 92, 246, .10),
              transparent 42%
            ),
            radial-gradient(
              ellipse at 15% 85%,
              rgba(8, 145, 178, .07),
              transparent 36%
            ),
            radial-gradient(
              ellipse at 90% 20%,
              rgba(124, 58, 237, .07),
              transparent 31%
            ),
            #f8fafc;
        }

        .site-portal-backdrop {
          position: absolute;
          inset: 0;
          z-index: -4;
          transition: background .3s ease;
        }

        .site-portal-stars {
          position: absolute;
          inset: 0;
          z-index: -3;
          overflow: hidden;
        }

        .site-portal-star {
          position: absolute;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background: #d8d3ff;
          box-shadow: 0 0 9px rgba(167, 139, 250, .8);
          animation: sitePortalStarFloat var(--star-time, 5s)
            ease-in-out infinite;
          animation-delay: var(--star-delay, 0s);
          transition: background .3s ease, box-shadow .3s ease;
          will-change: transform, opacity;
        }

        .site-portal-light .site-portal-star {
          background: #7c3aed;
          box-shadow: 0 0 7px rgba(124, 58, 237, .4);
        }

        .site-portal-grid {
          position: absolute;
          z-index: -2;
          left: -35%;
          right: -35%;
          bottom: -35%;
          height: 75%;
          background-image:
            linear-gradient(
              rgba(103, 232, 249, .1) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(103, 232, 249, .1) 1px,
              transparent 1px
            );
          background-size: 48px 48px;
          transform: perspective(440px) rotateX(65deg);
          transform-origin: center top;
          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent,
            black 22%,
            transparent 85%
          );
          mask-image: linear-gradient(
            to bottom,
            transparent,
            black 22%,
            transparent 85%
          );
          animation: sitePortalGridTravel 10s linear infinite;
          transition: background-image .3s ease;
          will-change: background-position;
        }

        .site-portal-light .site-portal-grid {
          background-image:
            linear-gradient(
              rgba(8, 145, 178, .09) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(8, 145, 178, .09) 1px,
              transparent 1px
            );
        }

        .site-portal-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: min(90vw, 680px);
          aspect-ratio: 1;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(124, 58, 237, .15),
            rgba(34, 211, 238, .045) 45%,
            transparent 70%
          );
          filter: blur(15px);
          transform: translate(-50%, -50%);
          animation: sitePortalGlowBreath 6s ease-in-out infinite;
          transition: background .3s ease;
          will-change: transform, opacity;
        }

        .site-portal-light .site-portal-glow {
          background: radial-gradient(
            circle,
            rgba(124, 58, 237, .09),
            rgba(8, 145, 178, .035) 45%,
            transparent 70%
          );
        }

        @keyframes sitePortalStarFloat {
          0%, 100% {
            opacity: .15;
            transform: translate3d(0, 0, 0) scale(.8);
          }

          50% {
            opacity: .9;
            transform: translate3d(0, -10px, 0) scale(1.3);
          }
        }

        @keyframes sitePortalGridTravel {
          from {
            background-position: 0 0;
          }

          to {
            background-position: 0 96px;
          }
        }

        @keyframes sitePortalGlowBreath {
          0%, 100% {
            opacity: .55;
            transform: translate(-50%, -50%) scale(.92);
          }

          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.06);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .site-portal-star,
          .site-portal-grid,
          .site-portal-glow {
            animation: none !important;
          }
        }
      `}</style>

      {/* Background gradients */}
      <div className="site-portal-backdrop" />

      {/* Ambient glow */}
      <div className="site-portal-glow" />

      {/* Moving futuristic grid */}
      <div className="site-portal-grid" />

      {/* Floating stars */}
      <div className="site-portal-stars">
        {stars.map((star) => (
          <span
            key={star.id}
            className="site-portal-star"
            style={{
              left: star.left,
              top: star.top,
              "--star-time": star.time,
              "--star-delay": star.delay,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>
    </div>
  );
}