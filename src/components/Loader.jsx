
import React, { useEffect, useRef, useState } from "react";

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const [isLight, setIsLight] = useState(() => {
    if (typeof document === "undefined") return false;
    return document.documentElement.dataset.theme === "light";
  });

  const callbackRef = useRef(onComplete);

  useEffect(() => {
    callbackRef.current = onComplete;
  }, [onComplete]);

  // Sync loader with the website's current theme.
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

  // Loading progress and immediate exit animation.
  useEffect(() => {
    let frame;
    let finishTimer;

    const started = performance.now();
    const duration = 3400;

    const tick = (now) => {
      const ratio = Math.min((now - started) / duration, 1);
      const eased = 1 - Math.pow(1 - ratio, 2.4);
      const nextProgress = Math.round(eased * 100);

      setProgress(nextProgress);

      if (ratio < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        // 100% hotay hi exit animation start.
        setProgress(100);
        setLeaving(true);

        // Exit animation complete honay par loader remove.
        finishTimer = setTimeout(() => {
          callbackRef.current?.();
        }, 850);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(finishTimer);
    };
  }, []);

  return (
    <div
      className={`portal-loader ${
        leaving ? "portal-loader--exit" : ""
      }`}
      data-theme={isLight ? "light" : "dark"}
      role="status"
      aria-label="Welcome to my portfolio"
    >
      <style>{`
        .portal-loader {
          --purple: #a78bfa;
          --blue: #67e8f9;
          --pink: #e879f9;

          position: fixed;
          inset: 0;
          z-index: 99999;
          display: grid;
          place-items: center;
          overflow: hidden;
          isolation: isolate;
          color: #f8fafc;
          background: #04040a;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system,
            BlinkMacSystemFont, "Segoe UI", sans-serif;
          opacity: 1;
          visibility: visible;
          transition: opacity .85s ease, visibility .85s ease;
        }

        .portal-loader *,
        .portal-loader *::before,
        .portal-loader *::after {
          box-sizing: border-box;
        }

        /* LIGHT THEME */
        .portal-loader[data-theme="light"] {
          --purple: #7c3aed;
          --blue: #0891b2;
          --pink: #c026d3;

          color: #0f172a;
          background: #f8fafc;
        }

        .portal-loader[data-theme="light"] .portal-backdrop {
          background:
            radial-gradient(
              ellipse at 50% 35%,
              rgba(139, 92, 246, .12),
              transparent 42%
            ),
            radial-gradient(
              ellipse at 15% 85%,
              rgba(8, 145, 178, .09),
              transparent 36%
            ),
            radial-gradient(
              ellipse at 90% 20%,
              rgba(124, 58, 237, .08),
              transparent 31%
            ),
            #f8fafc;
        }

        .portal-loader[data-theme="light"] .portal-star {
          background: #7c3aed;
          box-shadow: 0 0 8px rgba(124, 58, 237, .35);
        }

        .portal-loader[data-theme="light"] .portal-grid {
          background-image:
            linear-gradient(
              rgba(8, 145, 178, .10) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(8, 145, 178, .10) 1px,
              transparent 1px
            );
        }

        .portal-loader[data-theme="light"] .portal-glow {
          background: radial-gradient(
            circle,
            rgba(124, 58, 237, .10),
            rgba(8, 145, 178, .035) 45%,
            transparent 70%
          );
        }

        .portal-loader[data-theme="light"] .portal-halo {
          background: radial-gradient(
            circle,
            rgba(124, 58, 237, .15),
            rgba(8, 145, 178, .055) 52%,
            transparent 72%
          );
        }

        .portal-loader[data-theme="light"] .portal-top-label {
          color: rgba(51, 65, 85, .78);
        }

        .portal-loader[data-theme="light"] .portal-heading-kicker {
          color: rgba(91, 33, 182, .85);
        }

        .portal-loader[data-theme="light"] .portal-heading-main {
          color: #0f172a;
          text-shadow: 0 0 22px rgba(124, 58, 237, .08);
        }

        .portal-loader[data-theme="light"] .portal-description {
          color: rgba(51, 65, 85, .82);
        }

        .portal-loader[data-theme="light"] .portal-description strong {
          color: #1e293b;
        }

        .portal-loader[data-theme="light"] .portal-progress-meta {
          color: rgba(51, 65, 85, .72);
        }

        .portal-loader[data-theme="light"] .portal-progress-number {
          color: #6d28d9;
        }

        .portal-loader[data-theme="light"] .portal-progress-track {
          background: rgba(15, 23, 42, .10);
        }

        .portal-loader[data-theme="light"] .portal-progress-fill {
          box-shadow: 0 0 12px rgba(124, 58, 237, .25);
        }

        .portal-loader[data-theme="light"] .portal-footer {
          color: rgba(51, 65, 85, .62);
        }

        .portal-loader[data-theme="light"] .portal-footer-brand svg {
          color: rgba(109, 40, 217, .9);
        }

        .portal-loader[data-theme="light"] .portal-frame-inner {
          border-color: #f8fafc;
          background: #e2e8f0;
        }

        /* BACKGROUND */
        .portal-backdrop {
          position: absolute;
          inset: 0;
          z-index: -4;
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

        .portal-stars {
          position: absolute;
          inset: 0;
          z-index: -3;
          overflow: hidden;
          pointer-events: none;
        }

        .portal-star {
          position: absolute;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background: #d8d3ff;
          box-shadow: 0 0 9px rgba(167, 139, 250, .8);
          animation: starFloat var(--time, 5s) ease-in-out infinite;
          animation-delay: var(--delay, 0s);
        }

        .portal-grid {
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
          mask-image: linear-gradient(
            to bottom,
            transparent,
            black 22%,
            transparent 85%
          );
          animation: gridTravel 12s linear infinite;
          pointer-events: none;
        }

        .portal-glow {
          position: absolute;
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
          animation: glowBreath 5s ease-in-out infinite;
          pointer-events: none;
        }

        /* MAIN LAYOUT */
        .portal-layout {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: min(100% - 34px, 570px);
          max-height: 100dvh;
          padding: 26px 0 45px;
          overflow: visible;
          text-align: center;
          animation: layoutEnter 1s cubic-bezier(.16, 1, .3, 1) both;
        }

        .portal-top-label {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          margin-bottom: 6px;
          color: rgba(226, 232, 255, .66);
          font-size: 9px;
          font-weight: 650;
          letter-spacing: .27em;
          text-transform: uppercase;
        }

        .portal-live {
          width: 6px;
          height: 6px;
          flex-shrink: 0;
          border-radius: 50%;
          background: var(--blue);
          box-shadow: 0 0 12px var(--blue);
          animation: livePulse 1.8s ease-in-out infinite;
        }

        /* 3D PORTAL */
        .portal-scene {
          position: relative;
          display: grid;
          place-items: center;
          width: min(78vw, 340px);
          aspect-ratio: 1;
          margin: 0 0 2px;
          perspective: 1000px;
          transform-style: preserve-3d;
        }

        .portal-halo {
          position: absolute;
          width: 75%;
          aspect-ratio: 1;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(124, 58, 237, .3),
            rgba(34, 211, 238, .08) 52%,
            transparent 72%
          );
          filter: blur(14px);
          animation: haloPulse 4s ease-in-out infinite;
        }

        .portal-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          border: 1px solid transparent;
          border-radius: 50%;
          transform-style: preserve-3d;
          pointer-events: none;
        }

        .portal-ring--back {
          width: 74%;
          height: 91%;
          border-left-color: rgba(103, 232, 249, .65);
          border-right-color: rgba(167, 139, 250, .5);
          box-shadow: 0 0 20px rgba(103, 232, 249, .06);
          transform: translate(-50%, -50%) rotateY(67deg) rotateX(12deg);
          animation: ringBack 11s linear infinite;
        }

        .portal-ring--middle {
          width: 92%;
          height: 92%;
          border-top-color: rgba(232, 121, 249, .85);
          border-bottom-color: rgba(103, 232, 249, .8);
          box-shadow: 0 0 20px rgba(167, 139, 250, .08);
          transform: translate(-50%, -50%) rotateX(68deg) rotateZ(-20deg);
          animation: ringMiddle 10s linear infinite;
        }

        .portal-ring--front {
          width: 82%;
          height: 82%;
          border-top-color: rgba(103, 232, 249, .8);
          border-bottom-color: rgba(167, 139, 250, .8);
          transform: translate(-50%, -50%) rotateY(68deg) rotateX(17deg);
          animation: ringFront 8s linear infinite;
        }

        .portal-ring--thin {
          width: 106%;
          height: 45%;
          border-top-color: rgba(167, 139, 250, .7);
          border-bottom-color: rgba(103, 232, 249, .55);
          transform: translate(-50%, -50%) rotateX(75deg) rotateZ(25deg);
          animation: ringThin 13s linear infinite;
        }

        .portal-ring-light {
          position: absolute;
          top: 50%;
          left: 0;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--blue);
          box-shadow:
            0 0 12px var(--blue),
            0 0 28px rgba(103, 232, 249, .7);
          transform: translate(-50%, -50%);
        }

        .portal-ring-light--purple {
          left: auto;
          right: 0;
          background: var(--purple);
          box-shadow:
            0 0 12px var(--purple),
            0 0 28px rgba(167, 139, 250, .7);
        }

        /* PROFILE IMAGE FRAME */
        .portal-frame {
          position: relative;
          z-index: 3;
          display: grid;
          place-items: center;
          width: 47%;
          aspect-ratio: 1;
          padding: 5px;
          border-radius: 28%;
          background: linear-gradient(
            140deg,
            #67e8f9 0%,
            #8b5cf6 40%,
            #e879f9 70%,
            #67e8f9 100%
          );
          background-size: 250% 250%;
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, .2),
            0 0 25px rgba(139, 92, 246, .4),
            0 0 65px rgba(103, 232, 249, .12),
            inset 0 0 12px rgba(255, 255, 255, .28);
          transform: translateZ(50px) rotate(-4deg);
          animation:
            frameFloat 4.2s ease-in-out infinite,
            frameGradient 7s linear infinite;
        }

        .portal-frame-inner {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border: 3px solid #080811;
          border-radius: calc(28% - 2px);
          background: #11111e;
          isolation: isolate;
        }

        .portal-frame-inner img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transform: scale(1.035);
          filter: saturate(1.08) contrast(1.035);
        }

        .portal-frame-inner::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            120deg,
            transparent 25%,
            rgba(255, 255, 255, .35) 46%,
            transparent 65%
          );
          transform: translateX(-130%);
          animation: frameShine 4.5s ease-in-out infinite;
          pointer-events: none;
        }

        /* CORNER DETAILS */
        .portal-corner {
          position: absolute;
          z-index: 4;
          width: 19px;
          height: 19px;
          border: 0 solid rgba(103, 232, 249, .8);
          filter: drop-shadow(0 0 4px rgba(103, 232, 249, .3));
        }

        .portal-corner--tl {
          top: 7%;
          left: 8%;
          border-top-width: 1px;
          border-left-width: 1px;
        }

        .portal-corner--tr {
          top: 7%;
          right: 8%;
          border-top-width: 1px;
          border-right-width: 1px;
        }

        .portal-corner--bl {
          bottom: 7%;
          left: 8%;
          border-bottom-width: 1px;
          border-left-width: 1px;
        }

        .portal-corner--br {
          right: 8%;
          bottom: 7%;
          border-right-width: 1px;
          border-bottom-width: 1px;
        }

        /* FLOATING PARTICLES */
        .portal-particle {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--purple);
          box-shadow: 0 0 12px var(--purple);
          animation: particleDrift 4s ease-in-out infinite;
        }

        .portal-particle--1 {
          top: 13%;
          left: 18%;
          animation-delay: -.5s;
        }

        .portal-particle--2 {
          top: 23%;
          right: 13%;
          background: var(--blue);
          box-shadow: 0 0 12px var(--blue);
          animation-delay: -1.4s;
        }

        .portal-particle--3 {
          right: 11%;
          bottom: 23%;
          animation-delay: -2.2s;
        }

        .portal-particle--4 {
          left: 14%;
          bottom: 18%;
          background: var(--blue);
          box-shadow: 0 0 12px var(--blue);
          animation-delay: -.8s;
        }

        .portal-particle--5 {
          top: 45%;
          left: 2%;
          animation-delay: -2.7s;
        }

        .portal-particle--6 {
          top: 60%;
          right: 2%;
          background: var(--blue);
          box-shadow: 0 0 12px var(--blue);
          animation-delay: -1.9s;
        }

        .portal-particle--7 {
          top: 7%;
          left: 49%;
          background: var(--pink);
          box-shadow: 0 0 12px var(--pink);
          animation-delay: -1.2s;
        }

        .portal-particle--8 {
          right: 29%;
          bottom: 7%;
          animation-delay: -3s;
        }

        /* HEADING */
        .portal-heading-kicker {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 11px;
          margin: 0 0 12px;
          color: rgba(199, 190, 255, .82);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .25em;
          text-transform: uppercase;
          animation: textReveal .8s .15s both;
        }

        .portal-heading-kicker span {
          width: 22px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #a78bfa);
        }

        .portal-heading-kicker span:last-child {
          background: linear-gradient(90deg, #67e8f9, transparent);
        }

        .portal-heading {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          margin: 0;
          font-size: clamp(28px, 6.8vw, 43px);
          font-weight: 850;
          line-height: 1.08;
          letter-spacing: -.06em;
          text-align: center;
          animation: textReveal .9s .22s both;
        }

        .portal-heading-main {
          color: #fff;
          text-shadow: 0 0 25px rgba(167, 139, 250, .1);
        }

        .portal-heading-gradient {
          display: block;
          padding: 0 2px 5px;
          background: linear-gradient(
            100deg,
            #c4b5fd,
            #a78bfa 35%,
            #67e8f9 73%,
            #e0fbff
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 19px rgba(139, 92, 246, .2));
          animation: headingShimmer 5s linear infinite;
        }

        /* DESCRIPTION */
        .portal-description {
          max-width: 330px;
          margin: 10px 0 0;
          color: rgba(203, 213, 225, .68);
          font-size: 11px;
          line-height: 1.85;
          letter-spacing: .035em;
          animation: textReveal .9s .32s both;
        }

        .portal-description strong {
          color: rgba(226, 232, 255, .92);
          font-weight: 600;
        }

        /* PROGRESS BAR */
        .portal-progress {
          width: min(100%, 300px);
          margin-top: 22px;
          animation: textReveal .9s .4s both;
        }

        .portal-progress-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 10px;
          color: rgba(203, 213, 225, .56);
          font-size: 9px;
          font-weight: 650;
          letter-spacing: .15em;
          text-transform: uppercase;
        }

        .portal-progress-number {
          color: #c4b5fd;
          font-variant-numeric: tabular-nums;
        }

        .portal-progress-track {
          position: relative;
          height: 3px;
          overflow: hidden;
          border-radius: 10px;
          background: rgba(255, 255, 255, .09);
        }

        .portal-progress-fill {
          position: relative;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(
            90deg,
            #8b5cf6,
            #c4b5fd 42%,
            #67e8f9
          );
          box-shadow: 0 0 14px rgba(139, 92, 246, .6);
          transition: width .12s linear;
        }

        .portal-progress-fill::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          width: 30px;
          height: 100%;
          background: rgba(255, 255, 255, .85);
          filter: blur(5px);
        }

        /* FOOTER */
        .portal-footer {
          position: absolute;
          right: 20px;
          bottom: max(20px, env(safe-area-inset-bottom));
          left: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          color: rgba(203, 213, 225, .37);
          font-size: 8px;
          font-weight: 600;
          letter-spacing: .13em;
          text-transform: uppercase;
        }

        .portal-footer-brand {
          display: inline-flex;
          align-items: center;
          gap: 7px;
        }

        .portal-footer-brand svg {
          width: 13px;
          height: 13px;
          color: rgba(167, 139, 250, .85);
        }

        /* EXIT ANIMATION */
        .portal-loader--exit {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .portal-loader--exit .portal-layout {
          animation: layoutExit .85s cubic-bezier(.7, 0, .3, 1) both;
        }

        .portal-loader--exit .portal-scene {
          animation: sceneExit .85s cubic-bezier(.7, 0, .3, 1) both;
        }

        /* KEYFRAMES */
        @keyframes starFloat {
          0%, 100% {
            opacity: .15;
            transform: translateY(0) scale(.8);
          }

          50% {
            opacity: .9;
            transform: translateY(-12px) scale(1.4);
          }
        }

        @keyframes gridTravel {
          from { background-position: 0 0; }
          to { background-position: 0 96px; }
        }

        @keyframes glowBreath {
          0%, 100% {
            opacity: .55;
            transform: scale(.92);
          }

          50% {
            opacity: 1;
            transform: scale(1.08);
          }
        }

        @keyframes layoutEnter {
          from {
            opacity: 0;
            transform: translateY(20px);
            filter: blur(7px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @keyframes livePulse {
          0%, 100% {
            opacity: .65;
            box-shadow: 0 0 5px var(--blue);
          }

          50% {
            opacity: 1;
            box-shadow: 0 0 15px var(--blue);
          }
        }

        @keyframes haloPulse {
          0%, 100% {
            opacity: .65;
            transform: scale(.92);
          }

          50% {
            opacity: 1;
            transform: scale(1.08);
          }
        }

        @keyframes ringBack {
          from {
            transform: translate(-50%, -50%)
              rotateY(67deg) rotateX(12deg) rotate(0deg);
          }

          to {
            transform: translate(-50%, -50%)
              rotateY(67deg) rotateX(12deg) rotate(360deg);
          }
        }

        @keyframes ringMiddle {
          from {
            transform: translate(-50%, -50%)
              rotateX(68deg) rotateZ(-20deg) rotate(0deg);
          }

          to {
            transform: translate(-50%, -50%)
              rotateX(68deg) rotateZ(-20deg) rotate(-360deg);
          }
        }

        @keyframes ringFront {
          from {
            transform: translate(-50%, -50%)
              rotateY(68deg) rotateX(17deg) rotate(0deg);
          }

          to {
            transform: translate(-50%, -50%)
              rotateY(68deg) rotateX(17deg) rotate(360deg);
          }
        }

        @keyframes ringThin {
          from {
            transform: translate(-50%, -50%)
              rotateX(75deg) rotateZ(25deg) rotate(0deg);
          }

          to {
            transform: translate(-50%, -50%)
              rotateX(75deg) rotateZ(25deg) rotate(-360deg);
          }
        }

        @keyframes frameFloat {
          0%, 100% {
            transform: translateY(0) translateZ(50px) rotate(-4deg);
          }

          50% {
            transform: translateY(-9px) translateZ(65px) rotate(2deg);
          }
        }

        @keyframes frameGradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes frameShine {
          0%, 24% { transform: translateX(-130%); }
          56%, 100% { transform: translateX(130%); }
        }

        @keyframes particleDrift {
          0%, 100% {
            opacity: .25;
            transform: translate3d(0, 0, 0) scale(.8);
          }

          50% {
            opacity: 1;
            transform: translate3d(0, -13px, 0) scale(1.4);
          }
        }

        @keyframes textReveal {
          from {
            opacity: 0;
            transform: translateY(12px);
            filter: blur(4px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @keyframes headingShimmer {
          from { background-position: 0% center; }
          to { background-position: 200% center; }
        }

        @keyframes layoutExit {
          to {
            opacity: 0;
            transform: translateY(-12px) scale(.97);
            filter: blur(8px);
          }
        }

        @keyframes sceneExit {
          to {
            opacity: 0;
            transform: scale(1.1);
            filter: blur(6px);
          }
        }

        /* SMALL SCREENS */
        @media (max-width: 480px) {
          .portal-layout {
            width: calc(100% - 28px);
            padding-top: 15px;
            padding-bottom: 48px;
          }

          .portal-top-label {
            font-size: 8px;
            letter-spacing: .2em;
          }

          .portal-scene {
            width: min(75vw, 270px);
          }

          .portal-heading {
            font-size: clamp(27px, 7.4vw, 35px);
          }

          .portal-heading-kicker {
            gap: 8px;
            font-size: 8px;
            letter-spacing: .17em;
          }

          .portal-heading-kicker span {
            width: 15px;
          }

          .portal-description {
            max-width: 290px;
            font-size: 10px;
          }

          .portal-progress {
            width: min(100%, 260px);
            margin-top: 19px;
          }

          .portal-footer {
            right: 13px;
            left: 13px;
            font-size: 7px;
            letter-spacing: .07em;
          }
        }

        /* SHORT HEIGHT SCREENS */
        @media (max-height: 720px) {
          .portal-layout {
            padding-top: 8px;
            padding-bottom: 34px;
          }

          .portal-top-label {
            margin-bottom: 0;
          }

          .portal-scene {
            width: min(47vh, 255px);
          }

          .portal-description {
            margin-top: 6px;
          }

          .portal-progress {
            margin-top: 15px;
          }
        }

        /* REDUCED MOTION ACCESSIBILITY */
        @media (prefers-reduced-motion: reduce) {
          .portal-loader *,
          .portal-loader *::before,
          .portal-loader *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      {/* BACKGROUND EFFECTS */}
      <div className="portal-backdrop" />
      <div className="portal-glow" />
      <div className="portal-grid" />

      {/* STAR PARTICLES */}
      <div className="portal-stars" aria-hidden="true">
        {Array.from({ length: 34 }, (_, index) => (
          <span
            key={index}
            className="portal-star"
            style={{
              left: `${(index * 37 + 7) % 100}%`,
              top: `${(index * 53 + 11) % 100}%`,
              "--time": `${3 + (index % 5)}s`,
              "--delay": `${-(index % 7)}s`,
              opacity: 0.25 + (index % 5) * 0.12,
            }}
          />
        ))}
      </div>

      {/* MAIN CONTENT */}
      <main className="portal-layout">
        <div className="portal-top-label">
          <span>Entering My Digital World</span>
        </div>

        {/* 3D PROFILE PORTAL */}
        <div className="portal-scene">
          <div className="portal-halo" />

          <div className="portal-ring portal-ring--back">
            <span className="portal-ring-light" />
          </div>

          <div className="portal-ring portal-ring--middle">
            <span className="portal-ring-light portal-ring-light--purple" />
          </div>

          <div className="portal-ring portal-ring--front">
            <span className="portal-ring-light" />
          </div>

          <div className="portal-ring portal-ring--thin">
            <span className="portal-ring-light portal-ring-light--purple" />
          </div>

          <span className="portal-corner portal-corner--tl" />
          <span className="portal-corner portal-corner--tr" />
          <span className="portal-corner portal-corner--bl" />
          <span className="portal-corner portal-corner--br" />

          {Array.from({ length: 8 }, (_, index) => (
            <span
              key={index}
              className={`portal-particle portal-particle--${index + 1}`}
            />
          ))}

          <div className="portal-frame">
            <div className="portal-frame-inner">
              <img
                src="/image%20copy.png"
                alt="My profile"
                draggable="false"
                onError={(event) => {
                  event.currentTarget.style.opacity = "0";
                }}
              />
            </div>
          </div>
        </div>

        {/* HEADING */}
        <div className="portal-heading-kicker" />

        <h1 className="portal-heading">
          <span className="portal-heading-main">
            WELCOME TO MY
          </span>

          <span className="portal-heading-gradient">
            PORTFOLIO
          </span>
        </h1>

        
{/* DESCRIPTION */}
<p className="portal-description">
  Turning ideas into digital experiences.
  <br />
  Explore my work in modern web development, creative design, and innovation.
</p>


        {/* LOADING PROGRESS */}
        <div className="portal-progress">
          <div className="portal-progress-meta">
            <span>
              {progress < 100
                ? "Crafting Your Experience"
                : "Ready to Explore"}
            </span>

            <span className="portal-progress-number">
              {progress}%
            </span>
          </div>

          <div
            className="portal-progress-track"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div
              className="portal-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
