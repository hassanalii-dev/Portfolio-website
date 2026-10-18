
import React, { useEffect, useRef, useState } from "react";
import {
  Mail,
  MapPin,
  GraduationCap,
  Send,
  CheckCircle2,
  AlertCircle,
  LoaderCircle,
  ArrowUpRight,
  UserRound,
  MessageSquare,
} from "lucide-react";

function GitHubIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.23-1.63-1.23-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.71-1.49-2.47-.28-5.07-1.24-5.07-5.5 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3.01 0 4.27-2.6 5.21-5.08 5.49.4.35.76 1.02.76 2.06v3.09c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}

function LinkedInIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.74H4.96V9.18h2.97v9.56ZM6.45 7.88a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44Zm12.29 10.86h-2.96v-4.65c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.48V9.18h2.84v1.31h.04c.4-.75 1.36-1.55 2.8-1.55 3 0 3.58 1.97 3.58 4.53v5.27Z" />
    </svg>
  );
}

function GmailIcon({ size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path fill="#4285F4" d="M3 6.5V19h4V9.2L3 6.5Z" />
      <path fill="#34A853" d="M17 9.2V19h4V6.5l-4 2.7Z" />
      <path
        fill="#EA4335"
        d="M3 5.8v.7l4 2.7 5 3.8 5-3.8 4-2.7v-.7a2.5 2.5 0 0 0-4-2L12 7.5 7 3.8a2.5 2.5 0 0 0-4 2Z"
      />
      <path
        fill="#C5221F"
        d="M3 5.8v.7l4 2.7V4.5l-1-.7a2.5 2.5 0 0 0-4 2Z"
      />
    </svg>
  );
}

export default function Contact() {
  const sectionRef = useRef(null);
  const statusTimerRef = useRef(null);
  const statusRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const [isLight, setIsLight] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.dataset.theme === "light"
  );

  const [formStatus, setFormStatus] = useState({
    show: false,
    success: false,
    message: "",
  });

  // Synchronize with the website theme.
  useEffect(() => {
    const syncTheme = () => {
      setIsLight(
        document.documentElement.dataset.theme === "light"
      );
    };

    syncTheme();

    window.addEventListener("portfolio-theme-change", syncTheme);

    const mutationObserver = new MutationObserver(syncTheme);

    mutationObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      window.removeEventListener(
        "portfolio-theme-change",
        syncTheme
      );
      mutationObserver.disconnect();
    };
  }, []);

  // Reveal both cards when the Contact section enters the viewport.
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
        threshold: 0.06,
        rootMargin: "0px 0px -25px 0px",
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Clear status timer when the component unmounts.
  useEffect(() => {
    return () => {
      if (statusTimerRef.current) {
        clearTimeout(statusTimerRef.current);
      }
    };
  }, []);

  // Shared reveal animation for both cards.
  const reveal = (delay = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible
      ? "translate3d(0, 0, 0)"
      : "translate3d(0, 24px, 0)",
    transition: `
      opacity 850ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms,
      transform 850ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms
    `,
    willChange: isVisible ? "auto" : "opacity, transform",
  });

  const showStatus = (success, message) => {
    if (statusTimerRef.current) {
      clearTimeout(statusTimerRef.current);
    }

    setFormStatus({
      show: true,
      success,
      message,
    });

    statusTimerRef.current = setTimeout(() => {
      setFormStatus({
        show: false,
        success: false,
        message: "",
      });
    }, 6000);
  };

  // FormSubmit contact form.
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSending) return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    setIsSending(true);

    if (statusTimerRef.current) {
      clearTimeout(statusTimerRef.current);
    }

    setFormStatus({
      show: false,
      success: false,
      message: "",
    });

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/hassanmughal085870@gmail.com",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        }
      );

      const result = await response.json().catch(() => null);

      if (
        !response.ok ||
        !result ||
        result.success === false ||
        result.success === "false" ||
        result.success === "error"
      ) {
        throw new Error("Message submission failed");
      }

      form.reset();

      showStatus(
        true,
        "Message sent successfully! Thank you for reaching out. I'll get back to you soon."
      );
    } catch {
      showStatus(
        false,
        "Your message couldn't be sent. Please check your connection and try again, or email me directly."
      );
    } finally {
      setIsSending(false);

      requestAnimationFrame(() => {
        statusRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      });
    }
  };

  const contactDetails = [
    {
      title: "Email Address",
      value: "hassanmughal085870@gmail.com",
      icon: Mail,
    },
    {
      title: "Phone Number",
      value: "+92 321 4062601",
      icon: MessageSquare,
    },
    {
      title: "Location",
      value: "Lahore, Pakistan",
      icon: MapPin,
    },
    {
      title: "Education",
      value: "BS Computer Science",
      icon: GraduationCap,
    },
  ];

  const headingClass = isLight
    ? "text-slate-900"
    : "text-white";

  const paragraphClass = isLight
    ? "text-slate-600"
    : "text-slate-400";

  const labelClass = isLight
    ? "text-slate-700"
    : "text-slate-300";

  const detailValueClass = isLight
    ? "text-slate-700"
    : "text-slate-200";

  const cardClasses = `
    contact-card relative min-w-0 overflow-hidden rounded-3xl
    border shadow-xl backdrop-blur-xl
    ${
      isLight
        ? "border-slate-200 bg-white/85 shadow-slate-900/[0.06]"
        : "border-white/[0.09] bg-slate-900/50 shadow-black/10"
    }
  `;

  const inputClasses = `
    contact-input block w-full min-w-0 rounded-xl border px-4 py-3.5
    text-sm outline-none
    focus:border-indigo-400/70 focus:ring-4 focus:ring-indigo-500/10
    ${
      isLight
        ? "border-slate-200 bg-slate-50/70 text-slate-800 placeholder:text-slate-400 focus:bg-white"
        : "border-white/10 bg-slate-950/50 text-white placeholder:text-slate-500 focus:bg-slate-950/80"
    }
  `;

  const socialClass = `
    contact-social inline-flex h-11 w-11 shrink-0 items-center
    justify-center rounded-xl border p-0
    ${
      isLight
        ? "border-slate-200 bg-slate-50 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
        : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-indigo-400/40 hover:bg-indigo-500/10 hover:text-indigo-200"
    }
  `;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`relative isolate overflow-hidden py-16 transition-colors duration-500 sm:py-20 lg:py-24 xl:py-28 ${
        isLight ? "text-slate-800" : "text-white"
      }`}
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/4 -z-10 h-64 w-64 rounded-full bg-indigo-600/[0.08] blur-[100px] sm:h-80 sm:w-80"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-64 w-64 rounded-full bg-cyan-500/[0.06] blur-[100px] sm:h-80 sm:w-80"
      />

      <div className="relative mx-auto w-full max-w-[1235px] px-4 min-[480px]:px-5 sm:px-8 lg:px-6">
        {/* Section heading */}
        <div
          className="mb-10 text-center sm:mb-14 lg:mb-16"
          style={reveal(0)}
        >
          <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-400/[0.08] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[1.5px] text-indigo-500 sm:px-4 sm:text-xs sm:tracking-[3px]">
            <Mail size={15} />
            Get In Touch
          </span>

          <h2
            className={`mt-4 text-3xl font-black tracking-tight transition-colors duration-500 min-[480px]:text-4xl sm:text-5xl ${headingClass}`}
          >
            Let's <span className="contact-gradient-text">Talk</span>
          </h2>

          <p
            className={`mx-auto mt-4 max-w-[620px] text-sm leading-7 transition-colors duration-500 sm:text-base ${paragraphClass}`}
          >
            Have a question, opportunity, or project idea?
            Send me a message. I'd love to hear from you.
          </p>

          <div className="mx-auto mt-6 h-px w-20 rounded-full bg-gradient-to-r from-transparent via-indigo-400 to-transparent sm:mt-7 sm:w-24" />
        </div>

        {/* Two-column contact layout */}
        <div className="grid grid-cols-1 items-stretch gap-5 min-[480px]:gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-7 xl:gap-8">
          {/* LEFT CARD: Contact Information */}
          <div
            className={`${cardClasses} group p-5 transition-[transform,border-color,box-shadow,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-indigo-400/40 hover:shadow-2xl motion-reduce:transform-none min-[480px]:p-6 sm:p-8`}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-indigo-500/[0.08] blur-3xl"
            />

            <div className="relative">
              <div
                style={reveal(100)}
                className="contact-main-icon mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-400/30 bg-indigo-500/10 text-indigo-500 sm:h-14 sm:w-14"
              >
                <Mail size={23} />
              </div>

              <h3
                style={reveal(180)}
                className={`text-xl font-bold transition-colors duration-500 sm:text-2xl ${headingClass}`}
              >
                Contact Information
              </h3>

              <p
                style={reveal(260)}
                className={`mt-3 text-sm leading-7 ${paragraphClass}`}
              >
                Let's connect! Feel free to reach out for collaborations,
                learning opportunities, or web development projects.
              </p>

              {/* Contact details */}
              <div className="mt-7 space-y-5 sm:mt-8 sm:space-y-6">
                {contactDetails.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      style={reveal(340 + index * 100)}
                      className="contact-detail group/item flex min-w-0 items-center gap-3 sm:gap-4"
                    >
                      <div
                        className={`contact-detail-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-indigo-500 sm:h-11 sm:w-11 ${
                          isLight
                            ? "border-slate-200 bg-slate-50"
                            : "border-white/[0.08] bg-white/[0.04]"
                        }`}
                      >
                        <Icon size={19} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="mb-1 text-xs text-slate-500">
                          {item.title}
                        </p>

                        <p
                          className={`break-words text-[13px] font-medium leading-6 min-[480px]:text-sm ${detailValueClass}`}
                        >
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Social links */}
              <div
                style={reveal(800)}
                className={`mt-8 border-t pt-6 sm:mt-9 ${
                  isLight
                    ? "border-slate-200"
                    : "border-white/[0.08]"
                }`}
              >
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[2px] text-slate-500 sm:text-xs">
                  Find Me Online
                </p>

                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/hassanalii-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    title="GitHub"
                    className={socialClass}
                  >
                    <GitHubIcon size={20} />
                  </a>

                  <a
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                    className={socialClass}
                  >
                    <LinkedInIcon size={20} />
                  </a>

                  <a
                    href="mailto:hassanmughal085870@gmail.com"
                    aria-label="Email me"
                    title="Email me"
                    className={socialClass}
                  >
                    <GmailIcon size={22} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT CARD: Send a Message */}
          <div
            className={`${cardClasses} group p-5 transition-[transform,border-color,box-shadow,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-indigo-400/40 hover:shadow-2xl motion-reduce:transform-none min-[480px]:p-6 sm:p-8`}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-cyan-500/[0.06] blur-3xl"
            />

            <div className="relative">
              {/* Animated icon */}
              <div
                style={reveal(100)}
                className="contact-main-icon mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-400/30 bg-indigo-500/10 text-indigo-500 sm:h-14 sm:w-14"
              >
                <MessageSquare size={23} />
              </div>

              {/* Animated heading */}
              <h3
                style={reveal(200)}
                className={`text-xl font-bold transition-colors duration-500 sm:text-2xl ${headingClass}`}
              >
                Send Me a Message
              </h3>

              {/* Animated paragraph */}
              <p
                style={reveal(300)}
                className={`mt-3 text-sm leading-7 ${paragraphClass}`}
              >
                Fill in the details below and send me your message.
              </p>

              {/* Form with staggered field animations */}
              <form
                onSubmit={handleSubmit}
                className="contact-form mt-6 space-y-5 sm:mt-7"
                aria-busy={isSending}
              >
                <input
                  type="hidden"
                  name="_subject"
                  value="New Portfolio Message - Hassan Ali"
                />

                <input
                  type="hidden"
                  name="_captcha"
                  value="false"
                />

                <input
                  type="hidden"
                  name="_template"
                  value="table"
                />

                {/* Name */}
                <div
                  className="contact-field"
                  style={reveal(400)}
                >
                  <label
                    htmlFor="contact-name"
                    className={`mb-2 block text-sm font-semibold ${labelClass}`}
                  >
                    Your Name
                  </label>

                  <div className="relative">
                    <UserRound
                      size={17}
                      aria-hidden="true"
                      className=" pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      autoComplete="name"
                      required
                      maxLength={100}
                      className={`${inputClasses} pl-11`}
                    />
                  </div>
                </div>

                {/* Email */}
                <div
                  className="contact-field"
                  style={reveal(520)}
                >
                  <label
                    htmlFor="contact-email"
                    className={`mb-2 block text-sm font-semibold ${labelClass}`}
                  >
                    Your Email
                  </label>

                  <div className="relative">
                    <Mail
                      size={17}
                      aria-hidden="true"
                      className=" pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      maxLength={254}
                      className={`${inputClasses} pl-11`}
                    />
                  </div>
                </div>

                {/* Message */}
                <div
                  className="contact-field"
                  style={reveal(640)}
                >
                  <label
                    htmlFor="contact-message"
                    className={`mb-2 block text-sm font-semibold ${labelClass}`}
                  >
                    Your Message{" "}
                    <span className="text-indigo-400"></span>
                  </label>

                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell me about your project, idea, or question..."
                    required
                    minLength={5}
                    maxLength={5000}
                    rows={5}
                    className={`${inputClasses} min-h-[145px] resize-y leading-7 sm:min-h-[160px]`}
                  />
                </div>

                {/* Animated submit button */}
                <div style={reveal(760)}>
                  <button
                    type="submit"
                    disabled={isSending}
                    className="contact-submit group/btn flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSending ? (
                      <>
                        <LoaderCircle
                          size={19}
                          className="animate-spin"
                        />
                        Sending Your Message...
                      </>
                    ) : (
                      <>
                        <Send
                          size={17}
                          className="contact-send-icon"
                        />
                        Send Message
                        <ArrowUpRight
                          size={17}
                          className="contact-submit-arrow"
                        />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Success / error status */}
              <div
                ref={statusRef}
                aria-live="polite"
                aria-atomic="true"
              >
                {formStatus.show && (
                  <div
                    role="status"
                    className={`contact-status mt-5 flex items-start gap-3 rounded-xl border p-4 text-sm leading-6 ${
                      formStatus.success
                        ? isLight
                          ? "border-emerald-500/30 bg-emerald-50 text-emerald-700"
                          : "border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-300"
                        : isLight
                          ? "border-red-500/30 bg-red-50 text-red-700"
                          : "border-red-500/30 bg-red-500/[0.08] text-red-300"
                    }`}
                  >
                    {formStatus.success ? (
                      <CheckCircle2
                        size={20}
                        className="mt-0.5 shrink-0"
                      />
                    ) : (
                      <AlertCircle
                        size={20}
                        className="mt-0.5 shrink-0"
                      />
                    )}

                    <p className="min-w-0 flex-1 break-words">
                      {formStatus.message}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Smooth hover, focus and status animations */}
      <style>{`
        #contact .contact-gradient-text {
          background: linear-gradient(
            110deg,
            #818cf8 0%,
            #c084fc 48%,
            #22d3ee 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        #contact .contact-card {
          transition:
            transform 500ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 450ms ease,
            box-shadow 450ms ease,
            background-color 450ms ease;
        }

        #contact .contact-main-icon {
          transition:
            transform 450ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 350ms ease,
            background-color 350ms ease;
        }

        #contact .contact-detail-icon {
          transition:
            transform 350ms cubic-bezier(0.22, 1, 0.36, 1),
            color 350ms ease,
            background-color 350ms ease,
            border-color 350ms ease;
        }

        #contact .contact-social {
          transition:
            transform 350ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 300ms ease,
            background-color 300ms ease,
            color 300ms ease;
        }

        #contact .contact-input {
          transition:
            border-color 300ms ease,
            box-shadow 300ms ease,
            background-color 300ms ease,
            color 300ms ease;
        }

        #contact .contact-input-icon {
          transition:
            color 250ms ease,
            transform 250ms ease;
        }

        #contact .contact-field:focus-within .contact-input-icon {
          color: #818cf8;
          transform: translateY(-50%) scale(1.08);
        }

        #contact .contact-submit {
          position: relative;
          overflow: hidden;
          transition:
            transform 300ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 300ms ease,
            opacity 200ms ease;
        }

        #contact .contact-send-icon,
        #contact .contact-submit-arrow {
          transition:
            transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        #contact .contact-status {
          animation:
            contactStatusIn 450ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes contactStatusIn {
          from {
            opacity: 0;
            transform: translate3d(0, 12px, 0) scale(0.985);
          }

          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        @media (hover: hover) and (pointer: fine) {
          #contact .contact-card:hover {
            transform: translate3d(0, -3px, 0);
            border-color: rgba(129, 140, 248, 0.3);
            box-shadow: 0 20px 55px rgba(0, 0, 0, 0.12);
          }

          #contact .contact-main-icon:hover {
            transform: translateY(-3px) scale(1.035);
          }

          #contact .group\\/item:hover .contact-detail-icon {
            transform: translateY(-2px);
            border-color: rgba(129, 140, 248, 0.35);
            background-color: rgba(99, 102, 241, 0.1);
          }

          #contact .contact-social:hover {
            transform: translateY(-3px);
            border-color: rgba(129, 140, 248, 0.45);
          }

          #contact .contact-submit:not(:disabled):hover {
            transform: translateY(-2px);
            box-shadow: 0 14px 32px rgba(99, 102, 241, 0.28);
          }

          #contact .contact-submit:not(:disabled):hover .contact-send-icon {
            transform: translateX(3px);
          }

          #contact .contact-submit:not(:disabled):hover .contact-submit-arrow {
            transform: translate(2px, -2px);
          }
        }

        #contact .contact-submit:active:not(:disabled) {
          transform: scale(0.99);
        }

        #contact button:focus-visible,
        #contact a:focus-visible {
          outline: 2px solid rgba(129, 140, 248, 0.85);
          outline-offset: 4px;
        }

        #contact button,
        #contact a {
          -webkit-tap-highlight-color: transparent;
        }

        @media (prefers-reduced-motion: reduce) {
          #contact *,
          #contact *::before,
          #contact *::after {
            animation: none !important;
            transition: none !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </section>
  );
}
