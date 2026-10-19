import React, { useEffect, useRef, useState } from "react";
import {
  Bot,
  X,
  Send,
  MessageCircle,
  Sparkles,
  User,
  RotateCcw,
  Globe,
  Mic,
  MicOff,
  LoaderCircle,
} from "lucide-react";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "ur", label: "اردو" },
];

const CONTENT = {
  en: {
    title: "Hassan's AI Assistant",
    subtitle: "Portfolio Assistant",
    online: "Online",
    placeholder: "Type your message...",
    suggestions: ["About Hassan", "Skills", "Projects", "Education"],
    welcome: "How can I help you today?",
    listening: "Listening... Speak now",
    thinking: "Thinking...",
    micUnsupported: "Voice input is not supported in this browser.",
    assistant: "Hassan AI Assistant",
    you: "You",
    reset: "Start a new conversation",
    close: "Close chat",
    changeLanguage: "Change language",
    send: "Send message",
    speak: "Speak a message",
    stopMic: "Stop microphone",
    footer: "Portfolio assistant · Text replies only",
    replies: {
      greeting:
        "Hi! 👋 Welcome to Hassan Ali portfolio. I'm your virtual assistant. How can I hep you?",
      about:
        "Hassan Ali is a BS Computer Science student at Lahore Garrison University in Lahore, Pakistan. He is learning full-stack web development and building modern, responsive websites.",
      skills:
        "Hassan works with HTML5, CSS3, JavaScript and React.js. He is also learning Node.js, backend development and MongoDB.",
      projects:
        "Hassan's portfolio showcases his web development journey. His projects include a modern portfolio, an e-commerce website concept and a full-stack web application and other manay projects. You can see his all projects in his work section",
      education:
        "Hassan is studying BS Computer Science at Lahore Garrison University. He completed Intermediate ICS with Physics at Government Islamia Graduate College, Civil Lines, Lahore. He is also learning full-stack development at NexSkill, Arfa Tower, Lahore.",
      contact:
        "You can contact Hassan through the Contact section of this portfolio. Use the available contact details and social links.",
      help:
        "You can ask about Hassan's background, education, skills, projects or web development. You can also use the microphone if your browser supports voice input.",
      thanks:
        "You're welcome! 😊 Feel free to ask anything else about Hassan's portfolio.",
      fallback:
        "I can answer questions about Hassan's portfolio, skills, education and projects. So kindly ask me about these questions",
    },
  },

  ur: {
    title: "حسن کا معاون",
    subtitle: "پورٹ فولیو معاون",
    online: "آن لائن • مدد کے لیے تیار",
    placeholder: "اپنا پیغام لکھیں...",
    suggestions: ["حسن کا تعارف", "مہارتیں", "پروجیکٹس", "تعلیم"],
    welcome: "میں آج آپ کی کیا مدد کر سکتا ہوں؟",
    listening: "سن رہا ہوں... اب بولیے",
    thinking: "جواب تیار ہو رہا ہے...",
    micUnsupported: "اس براؤزر میں آواز کے ذریعے ان پٹ دستیاب نہیں ہے۔",
    assistant: "معاون",
    you: "آپ",
    reset: "نئی گفتگو شروع کریں",
    close: "چیٹ بند کریں",
    changeLanguage: "زبان تبدیل کریں",
    send: "پیغام بھیجیں",
    speak: "بول کر پیغام دیں",
    stopMic: "مائیکروفون بند کریں",
    footer: "پورٹ فولیو معاون · جوابات صرف تحریر میں",
    replies: {
      greeting:
        "السلام علیکم! 👋 حسن علی کے پورٹ فولیو میں خوش آمدید۔ میں آپ کا ورچوئل معاون ہوں۔ آپ کیا جاننا چاہتے ہیں؟",
      about:
        "حسن علی لاہور، پاکستان میں لاہور گیریژن یونیورسٹی کے بی ایس کمپیوٹر سائنس کے طالب علم ہیں۔ وہ فل اسٹیک ویب ڈویلپمنٹ سیکھ رہے ہیں اور جدید، ریسپانسیو ویب سائٹس بنا رہے ہیں۔",
      skills:
        "حسن HTML5، CSS3، JavaScript اور React.js پر کام کرتے ہیں۔ وہ Node.js، بیک اینڈ ڈویلپمنٹ اور MongoDB بھی سیکھ رہے ہیں۔",
      projects:
        "حسن کے پورٹ فولیو میں ان کے ویب ڈویلپمنٹ کے کام کی جھلک موجود ہے۔ ان کے پروجیکٹس میں جدید پورٹ فولیو، ای کامرس ویب سائٹ اور فل اسٹیک ویب ایپلیکیشن شامل ہیں۔",
      education:
        "حسن لاہور گیریژن یونیورسٹی سے بی ایس کمپیوٹر سائنس کر رہے ہیں۔ انہوں نے گورنمنٹ اسلامیہ گریجویٹ کالج، سول لائنز لاہور سے آئی سی ایس فزکس مکمل کیا۔ وہ نیکس اسکل، ارفع ٹاور لاہور سے فل اسٹیک ویب ڈویلپمنٹ بھی سیکھ رہے ہیں۔",
      contact:
        "آپ اس پورٹ فولیو کے رابطہ سیکشن کے ذریعے حسن سے رابطہ کر سکتے ہیں۔ وہاں موجود رابطے کی تفصیلات اور سوشل لنکس استعمال کریں۔",
      help:
        "آپ حسن کی تعلیم، مہارتوں، پروجیکٹس اور ویب ڈویلپمنٹ کے بارے میں پوچھ سکتے ہیں۔ اگر آپ کا براؤزر سپورٹ کرتا ہے تو مائیکروفون سے بھی سوال کر سکتے ہیں۔",
      thanks:
        "آپ کا خیر مقدم ہے! 😊 حسن کے پورٹ فولیو کے بارے میں مزید کچھ پوچھنا ہو تو ضرور پوچھیں۔",
      fallback:
        "میں حسن علی کے پورٹ فولیو، مہارتوں، تعلیم اور پروجیکٹس کے بارے میں معلومات دے سکتا ہوں۔ عام AI سوالات کے لیے Gemini API کو منسلک کرنا ہوگا۔",
    },
  },
};

function getReplyKey(message) {
  const text = message.toLowerCase().trim();

  if (
    /^(hi|hello|hey|salam|assalam|aoa)\b/.test(text) ||
    text.includes("السلام علیکم") ||
    text.includes("اسلام علیکم") ||
    text.includes("ہیلو")
  ) {
    return "greeting";
  }

  if (
    text.includes("thank") ||
    text.includes("shukriya") ||
    text.includes("شکریہ")
  ) {
    return "thanks";
  }

  if (
    text.includes("about") ||
    text.includes("who is hassan") ||
    text.includes("introduce") ||
    text.includes("taaruf") ||
    text.includes("hassan kon") ||
    text.includes("حسن کون") ||
    text.includes("تعارف")
  ) {
    return "about";
  }

  if (
    text.includes("skill") ||
    text.includes("technology") ||
    text.includes("tech stack") ||
    text.includes("html") ||
    text.includes("react") ||
    text.includes("mongodb") ||
    text.includes("مہارت") ||
    text.includes("ہنر")
  ) {
    return "skills";
  }

  if (
    text.includes("project") ||
    text.includes("work") ||
    text.includes("portfolio") ||
    text.includes("پروجیکٹ")
  ) {
    return "projects";
  }

  if (
    text.includes("education") ||
    text.includes("study") ||
    text.includes("university") ||
    text.includes("degree") ||
    text.includes("taleem") ||
    text.includes("تعلیم")
  ) {
    return "education";
  }

  if (
    text.includes("contact") ||
    text.includes("email") ||
    text.includes("hire") ||
    text.includes("rabta") ||
    text.includes("رابطہ")
  ) {
    return "contact";
  }

  if (
    text.includes("help") ||
    text.includes("madad") ||
    text.includes("مدد")
  ) {
    return "help";
  }

  return "fallback";
}

function createMessage(role, text, replyKey = null) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    role,
    text,
    replyKey,
  };
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [message, setMessage] = useState("");
  const [language, setLanguage] = useState("en");
  const [showLanguages, setShowLanguages] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const replyTimerRef = useRef(null);
  const closeTimerRef = useRef(null);
  const mountedRef = useRef(false);

  const current = CONTENT[language];
  const isUrdu = language === "ur";

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      window.clearTimeout(replyTimerRef.current);
      window.clearTimeout(closeTimerRef.current);

      try {
        recognitionRef.current?.abort();
      } catch {
        // Recognition may already be stopped.
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isTyping]);

  useEffect(() => {
    if (!isOpen || isClosing) return;

    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 200);

    return () => window.clearTimeout(timer);
  }, [isOpen, isClosing]);

  const openChat = () => {
    window.clearTimeout(closeTimerRef.current);

    setIsClosing(false);
    setIsMounted(true);

    if (messages.length === 0) {
      setMessages([
        createMessage("bot", CONTENT[language].replies.greeting, "greeting"),
      ]);
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (mountedRef.current) setIsOpen(true);
      });
    });
  };

  const closeChat = () => {
    setIsClosing(true);
    setIsOpen(false);
    setShowLanguages(false);

    try {
      recognitionRef.current?.stop();
    } catch {
      // Recognition may already be stopped.
    }

    setIsListening(false);

    closeTimerRef.current = window.setTimeout(() => {
      if (mountedRef.current) {
        setIsMounted(false);
        setIsClosing(false);
      }
    }, 250);
  };

  const resetChat = () => {
    window.clearTimeout(replyTimerRef.current);

    try {
      recognitionRef.current?.stop();
    } catch {
      // Recognition may already be stopped.
    }

    setIsListening(false);
    setIsTyping(false);
    setMessage("");

    setMessages([
      createMessage("bot", CONTENT[language].replies.greeting, "greeting"),
    ]);
  };

  const changeLanguage = (code) => {
    setLanguage(code);
    setShowLanguages(false);

    try {
      recognitionRef.current?.stop();
    } catch {
      // Recognition may already be stopped.
    }

    setIsListening(false);

    setMessages((previous) =>
      previous.map((item) => {
        if (item.role === "bot" && item.replyKey) {
          return {
            ...item,
            text:
              CONTENT[code].replies[item.replyKey] ||
              CONTENT[code].replies.fallback,
          };
        }

        return item;
      })
    );
  };

  const sendMessage = (value = message) => {
    const text = value.trim();

    if (!text || isTyping) return;

    window.clearTimeout(replyTimerRef.current);

    const replyKey = getReplyKey(text);

    setMessages((previous) => [
      ...previous,
      createMessage("user", text),
    ]);

    setMessage("");
    setIsTyping(true);

    replyTimerRef.current = window.setTimeout(() => {
      if (!mountedRef.current) return;

      setMessages((previous) => [
        ...previous,
        createMessage(
          "bot",
          CONTENT[language].replies[replyKey] ||
            CONTENT[language].replies.fallback,
          replyKey
        ),
      ]);

      setIsTyping(false);
    }, 450);
  };

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMessages((previous) => [
        ...previous,
        createMessage("bot", current.micUnsupported),
      ]);
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch {
        // Recognition may already be stopped.
      }

      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = isUrdu ? "ur-PK" : "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      if (mountedRef.current) setIsListening(true);
    };

    recognition.onresult = (event) => {
      let transcript = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i += 1
      ) {
        transcript += event.results[i][0].transcript;
      }

      if (mountedRef.current) setMessage(transcript);
    };

    recognition.onerror = () => {
      if (mountedRef.current) setIsListening(false);
    };

    recognition.onend = () => {
      if (mountedRef.current) setIsListening(false);
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  return (
    <>
      <style>{`
        .hc-root {
          --hc-panel: #0c1020;
          --hc-panel-soft: #11182b;
          --hc-text: #f1f5f9;
          --hc-muted: #9ca9c1;
          --hc-border: rgba(148,163,184,.16);
          --hc-bot: rgba(30,41,59,.74);
          font-family: inherit;
        }

        html[data-theme="light"] .hc-root {
          --hc-panel: #fff;
          --hc-panel-soft: #f6f7ff;
          --hc-text: #182036;
          --hc-muted: #68738a;
          --hc-border: rgba(100,116,139,.2);
          --hc-bot: #f1f4fb;
        }

        /* Launcher Button */
        .hc-launcher {
          position: fixed;
          z-index: 9998;
          right: 24px;
          bottom: 25px;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          color: white;
          border: none;
          border-radius: 50%;
          background: linear-gradient(135deg,#6366f1,#8b5cf6 55%,#06b6d4);
          box-shadow: 0 12px 35px rgba(99, 102, 241, 0.45);
          cursor: pointer;
          transform: scale(1);
          animation: hc-shadow-pulse 2.5s infinite;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease;
          will-change: transform;
        }

        .hc-launcher:hover {
          transform: scale(1.05);
          box-shadow: 0 16px 45px rgba(99, 102, 241, 0.6);
        }

        .hc-launcher:active {
          transform: scale(0.92);
        }

        @keyframes hc-shadow-pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4),
                        0 12px 35px rgba(99, 102, 241, 0.45);
          }
          70% {
            box-shadow: 0 0 0 14px rgba(99, 102, 241, 0),
                        0 12px 35px rgba(99, 102, 241, 0.45);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0),
                        0 12px 35px rgba(99, 102, 241, 0.45);
          }
        }

        .hc-launcher-symbol {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 28px;
          height: 28px;
          flex-shrink: 0;
        }

        .hc-launcher-symbol svg {
          position: absolute;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease;
        }

        .hc-launcher:not(.hc-launcher-open) .hc-icon-msg {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }
        .hc-launcher:not(.hc-launcher-open) .hc-icon-cross {
          opacity: 0;
          transform: scale(0.5) rotate(-90deg);
          pointer-events: none;
        }

        .hc-launcher.hc-launcher-open .hc-icon-msg {
          opacity: 0;
          transform: scale(0.5) rotate(90deg);
          pointer-events: none;
        }
        .hc-launcher.hc-launcher-open .hc-icon-cross {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }

        /* Chat Window - Fully Smooth & Centered on Mobile */
        .hc-window {
          position: fixed;
          z-index: 9997;
          right: 24px;
          bottom: 96px;
          width: 390px;
          height: 590px;
          min-height: 340px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          color: var(--hc-text);
          background: var(--hc-panel);
          border: 1px solid var(--hc-border);
          border-radius: 22px;
          box-shadow: 0 24px 90px rgba(0,0,0,.35),
                      0 0 0 1px rgba(99,102,241,.07);
          transform-origin: bottom right;
          opacity: 0;
          transform: translateY(15px) scale(.97);
          visibility: hidden;
          pointer-events: none;
          transition:
            opacity .2s ease,
            transform .25s cubic-bezier(.22,1,.36,1),
            visibility .2s;
          will-change: transform, opacity;
        }

        .hc-window.hc-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          visibility: visible;
          pointer-events: auto;
        }

        .hc-window.hc-closing {
          opacity: 0;
          transform: translateY(10px) scale(.98);
          pointer-events: none;
        }

        @media (max-width: 640px) {
          .hc-window {
            right: auto;
            left: 50%;
            bottom: 88px;
            width: calc(100vw - 24px);
            max-width: 390px;
            height: min(560px, calc(100dvh - 110px));
            transform: translateX(-50%) translateY(15px) scale(.97);
            transform-origin: bottom center;
          }

          .hc-window.hc-visible {
            transform: translateX(-50%) translateY(0) scale(1);
          }

          .hc-window.hc-closing {
            transform: translateX(-50%) translateY(10px) scale(.98);
          }
        }

        .hc-header {
          flex-shrink: 0;
          padding: 17px 13px;
          color: white;
          background: linear-gradient(120deg,#4f46e5 0%,#7c3aed 56%,#0891b2 120%);
        }

        .hc-header-top {
          display: flex;
          direction: ltr;
          align-items: center;
          gap: 6px;
        }

        .hc-avatar {
          width: 42px;
          height: 42px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,.28);
          border-radius: 14px;
          background: rgba(255,255,255,.17);
        }

        .hc-heading {
          min-width: 0;
          flex: 1;
          direction: ltr;
          text-align: left;
        }

        .hc-heading h3 {
          margin: 0;
          font-size: 14px;
          line-height: 1.4;
          font-weight: 750;
        }

        .hc-heading p {
          margin: 4px 0 0;
          font-size: 10px;
          color: rgba(255,255,255,.83);
        }

        .hc-online {
          display: inline-block;
          width: 7px;
          height: 7px;
          margin-right: 5px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 8px rgba(74,222,128,.6);
        }

        .hc-icon-button {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 30px;
          height: 32px;
          padding: 0;
          color: white;
          border: 1px solid transparent;
          border-radius: 10px;
          background: transparent;
          cursor: pointer;
          transition: background .2s ease;
        }

        .hc-icon-button:hover {
          background: rgba(255,255,255,.18);
        }

        .hc-close-button {
          position: relative;
          top: 0;
          transform: translateY(0) rotate(0deg);
          transition: transform .3s ease, background .2s ease;
        }

        .hc-close-button:hover,
        .hc-close-button:active {
          top: 0;
          transform: translateY(0) rotate(90deg);
        }

        .hc-language-wrap {
          position: relative;
          flex-shrink: 0;
        }

        .hc-language-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          min-height: 32px;
          padding: 0 7px;
          color: white;
          font-size: 10px;
          white-space: nowrap;
          border: 1px solid rgba(255,255,255,.25);
          border-radius: 9px;
          background: rgba(255,255,255,.13);
          cursor: pointer;
          transition: background .2s ease;
        }

        .hc-language-button:hover {
          background: rgba(255,255,255,.23);
        }

        .hc-language-menu {
          position: absolute;
          z-index: 20;
          top: 39px;
          right: 0;
          left: auto;
          min-width: 125px;
          padding: 5px;
          border: 1px solid var(--hc-border);
          border-radius: 12px;
          background: var(--hc-panel);
          box-shadow: 0 12px 35px rgba(0,0,0,.25);
          animation: hc-menu-in .15s ease both;
        }

        .hc-language-option {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 9px 10px;
          color: var(--hc-text);
          font-size: 12px;
          text-align: left;
          border: 0;
          border-radius: 8px;
          background: transparent;
          cursor: pointer;
        }

        .hc-language-option:hover,
        .hc-language-option.active {
          background: rgba(99,102,241,.15);
          color: #a5b4fc;
        }

        .hc-feed {
          flex: 1;
          min-height: 0;
          padding: 16px 13px 12px;
          overflow-y: auto;
          overscroll-behavior: contain;
          scrollbar-width: thin;
          scrollbar-color: rgba(148,163,184,.3) transparent;
          background:
            radial-gradient(ellipse at 100% 0%,rgba(99,102,241,.055),transparent 45%),
            var(--hc-panel);
        }

        .hc-message-row {
          display: flex;
          direction: ltr;
          align-items: flex-end;
          gap: 8px;
          margin-bottom: 14px;
          animation: hc-message-in .25s cubic-bezier(.22,1,.36,1) both;
        }

        .hc-message-row.user {
          justify-content: flex-end;
        }

        .hc-mini-avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 27px;
          height: 27px;
          margin-bottom: 2px;
          color: white;
          border-radius: 9px;
          background: linear-gradient(135deg,#6366f1,#8b5cf6);
        }

        .hc-bubble-wrap {
          max-width: 83%;
          min-width: 0;
        }

        .hc-message-name {
          margin: 0 0 5px 2px;
          color: var(--hc-muted);
          font-size: 10px;
          text-align: left;
        }

        .hc-bubble {
          padding: 11px 12px;
          color: var(--hc-text);
          font-size: 12px;
          line-height: 1.9;
          overflow-wrap: anywhere;
          white-space: pre-wrap;
          border: 1px solid var(--hc-border);
          border-radius: 13px 13px 13px 4px;
          background: var(--hc-bot);
          text-align: left;
          unicode-bidi: plaintext;
        }

        .hc-bubble[dir="rtl"] {
          direction: rtl;
          text-align: right;
          unicode-bidi: plaintext;
        }

        .hc-message-row.user .hc-bubble {
          color: white;
          border-color: rgba(255,255,255,.1);
          border-radius: 13px 13px 4px 13px;
          background: linear-gradient(135deg,#6366f1,#8b5cf6);
        }

        .hc-message-row.user .hc-message-name {
          text-align: right;
          margin-right: 2px;
        }

        .hc-typing {
          display: flex;
          align-items: center;
          gap: 4px;
          min-width: 57px;
          padding: 13px 14px;
          border: 1px solid var(--hc-border);
          border-radius: 13px 13px 13px 4px;
          background: var(--hc-bot);
        }

        .hc-typing span {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #a5b4fc;
          animation: hc-dot 1s ease-in-out infinite;
        }

        .hc-typing span:nth-child(2) { animation-delay: .15s; }
        .hc-typing span:nth-child(3) { animation-delay: .3s; }

        .hc-input-area {
          flex-shrink: 0;
          padding: 11px 12px 12px;
          border-top: 1px solid var(--hc-border);
          background: var(--hc-panel);
        }

        .hc-input-shell {
          display: flex;
          direction: ltr;
          align-items: center;
          gap: 5px;
          min-height: 46px;
          padding: 5px;
          border: 1px solid var(--hc-border);
          border-radius: 14px;
          background: var(--hc-panel-soft);
          transition: border-color .2s ease, box-shadow .2s ease;
        }

        .hc-input-shell:focus-within {
          border-color: rgba(129,140,248,.7);
          box-shadow: 0 0 0 3px rgba(99,102,241,.09);
        }

        .hc-input {
          flex: 1;
          min-width: 0;
          padding: 7px 5px;
          color: var(--hc-text);
          font: inherit;
          font-size: 12px;
          border: 0;
          outline: none;
          background: transparent;
          direction: auto;
          text-align: start;
        }

        .hc-input::placeholder {
          color: var(--hc-muted);
          opacity: .8;
        }

        .hc-tool-button,
        .hc-send-button {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 35px;
          height: 35px;
          border: 0;
          border-radius: 10px;
          cursor: pointer;
          transition: background .2s ease, transform .2s ease, color .2s ease;
        }

        .hc-tool-button {
          color: var(--hc-muted);
          background: transparent;
        }

        .hc-tool-button:hover {
          color: #a5b4fc;
          background: rgba(99,102,241,.12);
        }

        .hc-tool-button.recording {
          color: white;
          background: #ef4444;
          animation: hc-pulse 1.2s infinite;
        }

        .hc-send-button {
          color: white;
          background: linear-gradient(135deg,#6366f1,#8b5cf6 65%,#06b6d4);
          box-shadow: 0 3px 12px rgba(99,102,241,.25);
        }

        .hc-send-button:hover:not(:disabled) {
          transform: translateY(-2px);
        }

        .hc-send-button:disabled {
          opacity: .45;
          cursor: not-allowed;
          box-shadow: none;
        }

        .hc-spinner {
          animation: hc-spinner 1s linear infinite;
        }

        @keyframes hc-message-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes hc-dot {
          0%,60%,100% { opacity: .4; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-4px); }
        }

        @keyframes hc-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(239,68,68,.35); }
          50% { box-shadow: 0 0 0 5px rgba(239,68,68,0); }
        }

        @keyframes hc-menu-in {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes hc-spinner {
          to { transform: rotate(360deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .hc-root *,
          .hc-root *::before,
          .hc-root *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>

      <div className="hc-root" dir="ltr">
        {isMounted && (
          <section
            className={[
              "hc-window",
              isOpen && !isClosing ? "hc-visible" : "",
              isClosing ? "hc-closing" : "",
            ].join(" ")}
            role="dialog"
            aria-label={current.title}
            aria-hidden={!isOpen}
          >
            <header className="hc-header">
              <div className="hc-header-top">
                <div className="hc-avatar">
                  <Bot size={23} strokeWidth={1.8} />
                </div>

                <div className="hc-heading">
                  <h3>{current.title}</h3>
                  <p>
                    <span className="hc-online" />
                    {current.online}
                  </p>
                </div>

                <button
                  type="button"
                  className="hc-icon-button"
                  onClick={resetChat}
                  title={current.reset}
                  aria-label={current.reset}
                >
                  <RotateCcw size={16} />
                </button>

                <div className="hc-language-wrap">
                  <button
                    type="button"
                    className="hc-language-button"
                    onClick={() => setShowLanguages((value) => !value)}
                    aria-label={current.changeLanguage}
                    aria-expanded={showLanguages}
                    title={current.changeLanguage}
                  >
                    <Globe size={14} />
                    <span>{isUrdu ? "اردو" : "EN"}</span>
                  </button>

                  {showLanguages && (
                    <div className="hc-language-menu">
                      {LANGUAGES.map((item) => (
                        <button
                          type="button"
                          key={item.code}
                          className={[
                            "hc-language-option",
                            language === item.code ? "active" : "",
                          ].join(" ")}
                          onClick={() => changeLanguage(item.code)}
                        >
                          <span>{item.label}</span>
                          {language === item.code && <span>✓</span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className="hc-icon-button hc-close-button"
                  onClick={closeChat}
                  title={current.close}
                  aria-label={current.close}
                >
                  <X size={19} />
                </button>
              </div>
            </header>

            <div className="hc-feed">
              {messages.map((item) => {
                const displayText =
                  item.role === "bot" && item.replyKey
                    ? CONTENT[language].replies[item.replyKey] ||
                      CONTENT[language].replies.fallback
                    : item.text;

                const botTextIsUrdu = item.role === "bot" && isUrdu;

                return (
                  <div
                    key={item.id}
                    className={`hc-message-row ${item.role}`}
                  >
                    {item.role === "bot" && (
                      <div className="hc-mini-avatar">
                        <Bot size={15} />
                      </div>
                    )}

                    <div className="hc-bubble-wrap">
                      <div
                        className="hc-message-name"
                        dir={isUrdu ? "rtl" : "ltr"}
                        style={{ textAlign: isUrdu ? "right" : "left" }}
                      >
                        {item.role === "bot" ? current.assistant : current.you}
                      </div>

                      <div
                        className="hc-bubble"
                        key={`${item.id}-${language}`}
                        dir={botTextIsUrdu ? "rtl" : "auto"}
                      >
                        {displayText}
                      </div>
                    </div>

                    {item.role === "user" && (
                      <div
                        className="hc-mini-avatar"
                        style={{ background: "rgba(100,116,139,.35)" }}
                      >
                        <User size={15} />
                      </div>
                    )}
                  </div>
                );
              })}

              {isTyping && (
                <div className="hc-message-row bot">
                  <div className="hc-mini-avatar">
                    <Bot size={15} />
                  </div>

                  <div className="hc-bubble-wrap">
                    <div
                      className="hc-message-name"
                      dir={isUrdu ? "rtl" : "ltr"}
                      style={{ textAlign: isUrdu ? "right" : "left" }}
                    >
                      {current.assistant}
                    </div>

                    <div className="hc-typing" aria-label={current.thinking}>
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <form
              className="hc-input-area"
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage();
              }}
            >
              <div className="hc-input-shell">
                <input
                  ref={inputRef}
                  className="hc-input"
                  type="text"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder={
                    isListening ? current.listening : current.placeholder
                  }
                  aria-label={current.placeholder}
                  autoComplete="off"
                  disabled={isTyping}
                  dir="auto"
                />

                <button
                  type="button"
                  className={`hc-tool-button ${isListening ? "recording" : ""}`}
                  onClick={startListening}
                  title={isListening ? current.stopMic : current.speak}
                  aria-label={isListening ? current.stopMic : current.speak}
                >
                  {isListening ? <MicOff size={17} /> : <Mic size={17} />}
                </button>

                <button
                  type="submit"
                  className="hc-send-button"
                  disabled={!message.trim() || isTyping}
                  title={current.send}
                  aria-label={current.send}
                >
                  {isTyping ? (
                    <LoaderCircle size={17} className="hc-spinner" />
                  ) : (
                    <Send size={16} />
                  )}
                </button>
              </div>
            </form>
          </section>
        )}

        <button
          type="button"
          className={`hc-launcher ${
            isOpen && !isClosing ? "hc-launcher-open" : ""
          }`}
          onClick={isOpen ? closeChat : openChat}
          aria-label={isOpen ? current.close : current.title}
          title={isOpen ? current.close : current.title}
        >
          <span className="hc-launcher-symbol">
            <Bot
              size={24}
              strokeWidth={2.1}
              className="hc-icon-msg"
            />

            <X
              size={25}
              strokeWidth={2.2}
              className="hc-icon-cross"
            />
          </span>
        </button>
      </div>
    </>
  );
}