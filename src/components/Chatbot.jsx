
import React, { useEffect, useRef, useState } from "react";
import {
  Bot,
  X,
  Send,
  MessageCircle,
  User,
  RotateCcw,
  Globe,
  Mic,
  MicOff,
  LoaderCircle,
  Sparkles,
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
    suggestions: [
      "About Hassan",
      "Skills",
      "Projects",
      "Education",
    ],
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
    replies: {
      greeting:
        "Hi! 👋 Welcome to Hassan Ali's portfolio. I'm your virtual assistant. How can I help you?",
      about:
        "Hassan Ali is a BS Computer Science student at Lahore Garrison University in Lahore, Pakistan. He is learning full-stack web development and building modern, responsive websites.",
      skills:
        "Hassan works with HTML5, CSS3, JavaScript and React.js. He is also learning Node.js, backend development and MongoDB.",
      projects:
        "Hassan's portfolio showcases his web development journey. His projects include a modern portfolio, an e-commerce website concept and a full-stack web application. You can explore his work in the Projects section.",
      education:
        "Hassan is studying BS Computer Science at Lahore Garrison University. He completed Intermediate ICS with Physics at Government Islamia Graduate College, Civil Lines, Lahore. He is also learning full-stack development at NexSkill, Arfa Tower, Lahore.",
      contact:
        "You can contact Hassan through the Contact section of this portfolio. Use the available contact details and social links.",
      help:
        "You can ask about Hassan's background, education, skills, projects or web development. You can also use the microphone if your browser supports voice input.",
      thanks:
        "You're welcome! 😊 Feel free to ask anything else about Hassan's portfolio.",
      fallback:
        "I can answer questions about Hassan's portfolio, skills, education and projects. Try asking about his background, skills, work or education.",
    },
  },

  ur: {
    title: "حسن کا معاون",
    subtitle: "پورٹ فولیو معاون",
    online: "آن لائن",
    placeholder: "اپنا پیغام لکھیں...",
    suggestions: ["حسن کا تعارف", "مہارتیں", "پروجیکٹس", "تعلیم"],
    welcome: "میں آج آپ کی کیا مدد کر سکتا ہوں؟",
    listening: "سن رہا ہوں... اب بولیے",
    thinking: "جواب تیار ہو رہا ہے...",
    micUnsupported: "اس براؤزر میں آواز کے ذریعے ان پٹ دستیاب نہیں ہے۔",
    assistant: "حسن کا معاون",
    you: "آپ",
    reset: "نئی گفتگو شروع کریں",
    close: "چیٹ بند کریں",
    changeLanguage: "زبان تبدیل کریں",
    send: "پیغام بھیجیں",
    speak: "بول کر پیغام دیں",
    stopMic: "مائیکروفون بند کریں",
    footer: "پورٹ فولیو معاون · تحریری جوابات",
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
        "میں حسن علی کے پورٹ فولیو، مہارتوں، تعلیم اور پروجیکٹس کے بارے میں معلومات دے سکتا ہوں۔ آپ ان موضوعات کے بارے میں سوال پوچھ سکتے ہیں۔",
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
    text.includes("css") ||
    text.includes("javascript") ||
    text.includes("react") ||
    text.includes("node") ||
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
    text.includes("college") ||
    text.includes("taleem") ||
    text.includes("تعلیم")
  ) {
    return "education";
  }

  if (
    text.includes("contact") ||
    text.includes("email") ||
    text.includes("hire") ||
    text.includes("phone") ||
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
  const feedRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const replyTimerRef = useRef(null);
  const closeTimerRef = useRef(null);
  const openFrameRef = useRef([]);
  const mountedRef = useRef(false);
  const typingRef = useRef(false);

  const current = CONTENT[language];
  const isUrdu = language === "ur";

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;

      window.clearTimeout(replyTimerRef.current);
      window.clearTimeout(closeTimerRef.current);

      openFrameRef.current.forEach((frame) =>
        window.cancelAnimationFrame(frame)
      );

      try {
        recognitionRef.current?.abort();
      } catch {
        // Recognition may already be stopped.
      }
    };
  }, []);

  useEffect(() => {
    typingRef.current = isTyping;
  }, [isTyping]);

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
    }, 250);

    return () => window.clearTimeout(timer);
  }, [isOpen, isClosing]);

  const stopListening = () => {
    try {
      recognitionRef.current?.stop();
    } catch {
      // Recognition may already be stopped.
    }

    setIsListening(false);
  };

  const openChat = () => {
    window.clearTimeout(closeTimerRef.current);

    openFrameRef.current.forEach((frame) =>
      window.cancelAnimationFrame(frame)
    );

    setIsClosing(false);
    setIsMounted(true);

    if (messages.length === 0) {
      setMessages([
        createMessage(
          "bot",
          CONTENT[language].replies.greeting,
          "greeting"
        ),
      ]);
    }

    const firstFrame = window.requestAnimationFrame(() => {
      const secondFrame = window.requestAnimationFrame(() => {
        if (mountedRef.current) setIsOpen(true);
      });

      openFrameRef.current.push(secondFrame);
    });

    openFrameRef.current.push(firstFrame);
  };

  const closeChat = () => {
    setIsClosing(true);
    setIsOpen(false);
    setShowLanguages(false);
    stopListening();

    window.clearTimeout(closeTimerRef.current);

    closeTimerRef.current = window.setTimeout(() => {
      if (mountedRef.current) {
        setIsMounted(false);
        setIsClosing(false);
      }
    }, 320);
  };

  const resetChat = () => {
    window.clearTimeout(replyTimerRef.current);
    stopListening();

    typingRef.current = false;
    setIsTyping(false);
    setMessage("");
    setShowLanguages(false);

    setMessages([
      createMessage(
        "bot",
        CONTENT[language].replies.greeting,
        "greeting"
      ),
    ]);
  };

  const changeLanguage = (code) => {
    setLanguage(code);
    setShowLanguages(false);
    stopListening();

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

    if (!text || typingRef.current) return;

    window.clearTimeout(replyTimerRef.current);

    const replyKey = getReplyKey(text);
    const selectedLanguage = language;

    setMessages((previous) => [
      ...previous,
      createMessage("user", text),
    ]);

    setMessage("");
    typingRef.current = true;
    setIsTyping(true);

    replyTimerRef.current = window.setTimeout(() => {
      if (!mountedRef.current) return;

      setMessages((previous) => [
        ...previous,
        createMessage(
          "bot",
          CONTENT[selectedLanguage].replies[replyKey] ||
            CONTENT[selectedLanguage].replies.fallback,
          replyKey
        ),
      ]);

      typingRef.current = false;
      setIsTyping(false);
    }, 550);
  };

  const startListening = () => {
    if (isTyping) return;

    if (isListening) {
      stopListening();
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMessages((previous) => [
        ...previous,
        createMessage("bot", current.micUnsupported),
      ]);
      return;
    }

    try {
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
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const quickQuestions = current.suggestions;

  const showQuickQuestions =
    messages.length === 1 &&
    messages[0]?.role === "bot" &&
    messages[0]?.replyKey === "greeting";

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

        .hc-root *,
        .hc-root *::before,
        .hc-root *::after {
          box-sizing: border-box;
        }

        .hc-launcher {
          position: fixed;
          z-index: 9998;
          right: max(20px, env(safe-area-inset-right));
          bottom: max(16px, env(safe-area-inset-bottom));
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          color: white;
          border: 0;
          border-radius: 50%;
          background: linear-gradient(135deg,#6366f1,#8b5cf6 55%,#06b6d4);
          box-shadow: 0 12px 35px rgba(99,102,241,.4);
          cursor: pointer;
          animation: hc-shadow-pulse 2.5s infinite;
          transition: transform .3s cubic-bezier(.34,1.56,.64,1),
                      box-shadow .3s ease;
          -webkit-tap-highlight-color: transparent;
        }

        .hc-launcher:hover {
          transform: scale(1.05);
          box-shadow: 0 16px 45px rgba(99,102,241,.55);
        }

        .hc-launcher:active {
          transform: scale(.94);
        }

        .hc-launcher-symbol {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
        }

        .hc-launcher-symbol svg {
          position: absolute;
          transition: transform .35s cubic-bezier(.34,1.56,.64,1),
                      opacity .3s ease;
        }

        .hc-launcher:not(.hc-launcher-open) .hc-icon-msg {
          opacity: 1;
          transform: scale(1) rotate(0);
        }

        .hc-launcher:not(.hc-launcher-open) .hc-icon-cross {
          opacity: 0;
          transform: scale(.5) rotate(-90deg);
          pointer-events: none;
        }

        .hc-launcher.hc-launcher-open .hc-icon-msg {
          opacity: 0;
          transform: scale(.5) rotate(90deg);
          pointer-events: none;
        }

        .hc-launcher.hc-launcher-open .hc-icon-cross {
          opacity: 1;
          transform: scale(1) rotate(0);
        }

        @keyframes hc-shadow-pulse {
          0%,100% {
            box-shadow: 0 0 0 0 rgba(99,102,241,0),
                        0 12px 35px rgba(99,102,241,.4);
          }
          70% {
            box-shadow: 0 0 0 12px rgba(99,102,241,0),
                        0 12px 35px rgba(99,102,241,.4);
          }
        }

        .hc-window {
          position: fixed;
          z-index: 9997;
          right: 24px;
          bottom: 96px;
          width: min(400px,calc(100vw - 32px));
          height: min(620px,calc(100dvh - 120px));
          min-height: 280px;
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
          transition: opacity .26s ease,
                      transform .32s cubic-bezier(.22,1,.36,1),
                      visibility .26s;
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

        .hc-header {
          flex-shrink: 0;
          padding: 16px 12px;
          color: white;
          background: linear-gradient(120deg,#4f46e5 0%,#7c3aed 56%,#0891b2 120%);
        }

        .hc-header-top {
          display: flex;
          direction: ltr;
          align-items: center;
          gap: 6px;
          min-width: 0;
        }

        .hc-avatar {
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,.28);
          border-radius: 13px;
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
          font-size: 13px;
          line-height: 1.4;
          font-weight: 750;
          overflow-wrap: anywhere;
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
          width: 31px;
          height: 33px;
          padding: 0;
          color: white;
          border: 1px solid transparent;
          border-radius: 9px;
          background: transparent;
          cursor: pointer;
          transition: background .2s ease, transform .25s ease;
        }

        .hc-icon-button:hover {
          background: rgba(255,255,255,.18);
        }

        .hc-close-button:hover {
          transform: rotate(90deg);
        }

        .hc-language-wrap {
          position: relative;
          flex-shrink: 0;
        }

        .hc-language-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          min-height: 33px;
          padding: 0 7px;
          color: white;
          font-size: 10px;
          white-space: nowrap;
          border: 1px solid rgba(255,255,255,.25);
          border-radius: 9px;
          background: rgba(255,255,255,.13);
          cursor: pointer;
        }

        .hc-language-menu {
          position: absolute;
          z-index: 20;
          top: calc(100% + 7px);
          right: 0;
          min-width: 125px;
          padding: 5px;
          border: 1px solid var(--hc-border);
          border-radius: 12px;
          background: var(--hc-panel);
          box-shadow: 0 12px 35px rgba(0,0,0,.25);
          animation: hc-menu-in .2s ease both;
        }

        .hc-language-option {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 10px;
          color: var(--hc-text);
          font-size: 12px;
          text-align: start;
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
          padding: 15px 12px 12px;
          overflow-x: hidden;
          overflow-y: auto;
          overscroll-behavior: contain;
          scrollbar-width: thin;
          scrollbar-color: rgba(148,163,184,.3) transparent;
          background:
            radial-gradient(ellipse at 100% 0%,rgba(99,102,241,.055),transparent 45%),
            var(--hc-panel);
          -webkit-overflow-scrolling: touch;
        }

        .hc-day-label {
          width: fit-content;
          margin: 0 auto 15px;
          padding: 5px 10px;
          color: var(--hc-muted);
          font-size: 10px;
          border: 1px solid var(--hc-border);
          border-radius: 20px;
          background: var(--hc-panel-soft);
        }

        .hc-welcome {
          margin: 0 0 12px 35px;
          color: var(--hc-muted);
          font-size: 11px;
          line-height: 1.7;
          animation: hc-message-in .4s ease both;
        }

        .hc-message-row {
          display: flex;
          direction: ltr;
          align-items: flex-end;
          gap: 8px;
          margin-bottom: 14px;
          animation: hc-message-in .34s cubic-bezier(.22,1,.36,1) both;
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
          max-width: min(83%,310px);
          min-width: 0;
        }

        .hc-message-name {
          margin: 0 0 5px 2px;
          color: var(--hc-muted);
          font-size: 10px;
          text-align: left;
        }

        .hc-bubble {
          padding: 10px 12px;
          color: var(--hc-text);
          font-size: 12px;
          line-height: 1.85;
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

        .hc-suggestions {
          display: flex;
          flex-wrap: wrap;
          direction: ltr;
          gap: 7px;
          margin: 6px 0 15px 35px;
          animation: hc-message-in .4s ease both;
        }

        .hc-suggestion {
          max-width: 100%;
          padding: 8px 10px;
          color: var(--hc-text);
          font-size: 10px;
          line-height: 1.5;
          border: 1px solid rgba(129,140,248,.28);
          border-radius: 20px;
          background: rgba(99,102,241,.08);
          cursor: pointer;
          overflow-wrap: anywhere;
          transition: background .2s ease, border-color .2s ease, transform .2s ease;
        }

        .hc-suggestion:hover:not(:disabled) {
          border-color: #818cf8;
          background: rgba(99,102,241,.18);
          transform: translateY(-2px);
        }

        .hc-suggestion:disabled {
          opacity: .5;
          cursor: not-allowed;
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
          gap: 4px;
          min-width: 0;
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
  width: 0;
  min-width: 0;
  padding: 5px 5px;
  color: var(--hc-text);
  font: inherit;
  font-size: 13px;
  border: 0;
  outline: none;
  background: transparent;
  direction: auto;
  text-align: start;
  box-sizing: border-box;
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
          height: 36px;
          padding: 0;
          border: 0;
          border-radius: 10px;
          cursor: pointer;
          transition: background .2s ease, transform .2s ease, color .2s ease;
          -webkit-tap-highlight-color: transparent;
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

        .hc-tool-button:disabled {
          opacity: .45;
          cursor: not-allowed;
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

        .hc-footer-note {
          margin: 9px 0 0;
          color: var(--hc-muted);
          font-size: 9px;
          line-height: 1.5;
          text-align: center;
          opacity: .8;
        }

        .hc-root button:focus-visible {
          outline: 2px solid #a5b4fc;
          outline-offset: 3px;
        }

        @keyframes hc-message-in {
          from { opacity: 0; transform: translateY(8px); }
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
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes hc-spinner {
          to { transform: rotate(360deg); }
        }

        /* Mobile phones */
        @media (max-width: 520px) {
          .hc-launcher {
            right: max(15px,env(safe-area-inset-right));
            bottom: max(15px,env(safe-area-inset-bottom));
            width: 55px;
            height: 55px;
          }

          .hc-window {
            right: 10px;
            bottom: calc(78px + env(safe-area-inset-bottom));
            width: calc(100vw - 20px);
            height: calc(100dvh - 100px - env(safe-area-inset-bottom));
            min-height: 250px;
            border-radius: 19px;
          }

          .hc-header {
            padding: 13px 9px;
          }

          .hc-header-top {
            gap: 4px;
          }

          .hc-avatar {
            width: 35px;
            height: 35px;
            border-radius: 11px;
          }

          .hc-heading h3 {
            font-size: 12px;
          }

          .hc-heading p {
            font-size: 9px;
          }

          .hc-icon-button {
            width: 28px;
            height: 32px;
          }

          .hc-language-button {
            min-height: 32px;
            gap: 3px;
            padding: 0 5px;
            font-size: 9px;
          }

          .hc-feed {
            padding: 12px 9px;
          }

          .hc-bubble-wrap {
            max-width: 85%;
          }

          .hc-input-area {
            padding: 9px;
            padding-bottom: max(9px,env(safe-area-inset-bottom));
          }
        }

        /* Extra-small phones */
        @media (max-width: 360px) {
          .hc-window {
            right: 6px;
            width: calc(100vw - 12px);
            bottom: calc(72px + env(safe-area-inset-bottom));
            height: calc(100dvh - 88px - env(safe-area-inset-bottom));
            border-radius: 16px;
          }

          .hc-header {
            padding: 11px 6px;
          }

          .hc-header-top {
            gap: 2px;
          }

          .hc-avatar {
            width: 30px;
            height: 30px;
          }

          .hc-heading h3 {
            font-size: 10px;
          }

          .hc-heading p {
            font-size: 8px;
          }

          .hc-icon-button {
            width: 25px;
          }

          .hc-language-button {
            padding: 0 3px;
            font-size: 9px;
          }

          .hc-language-button svg {
            width: 12px;
          }

          .hc-feed {
            padding: 10px 7px;
          }

          .hc-message-row {
            gap: 5px;
          }

          .hc-mini-avatar {
            width: 24px;
            height: 24px;
          }

          .hc-bubble-wrap {
            max-width: 87%;
          }

          .hc-bubble {
            padding: 9px;
            font-size: 12px;
            line-height: 1.75;
          }

          .hc-suggestions {
            gap: 5px;
            margin-left: 29px;
          }

          .hc-suggestion {
            padding: 7px 8px;
            font-size: 9px;
          }

          .hc-input-area {
            padding: 7px;
          }

          .hc-input-shell {
            gap: 2px;
            padding: 4px;
          }

          .hc-tool-button,
          .hc-send-button {
            width: 31px;
            height: 33px;
          }
        }

        /* Tablets */
        @media (min-width: 521px) and (max-width: 1024px) {
          .hc-window {
            right: 20px;
            bottom: 92px;
            width: min(410px,calc(100vw - 40px));
            height: min(640px,calc(100dvh - 115px));
          }
        }

        /* Short screens and landscape */
        @media (max-height: 500px) {
          .hc-window {
            top: 8px;
            bottom: 8px;
            height: auto;
            min-height: 0;
          }

          .hc-launcher {
            bottom: max(12px,env(safe-area-inset-bottom));
          }

          .hc-header {
            padding-top: 8px;
            padding-bottom: 8px;
          }

          .hc-avatar {
            width: 30px;
            height: 30px;
          }

          .hc-feed {
            padding-top: 8px;
            padding-bottom: 8px;
          }

          .hc-input-area {
            padding: 7px 9px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hc-root *,
          .hc-root *::before,
          .hc-root *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
            scroll-behavior: auto !important;
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
                    onClick={() =>
                      setShowLanguages((value) => !value)
                    }
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

            <div className="hc-feed" ref={feedRef}>
              

              {messages.map((item) => {
                const displayText =
                  item.role === "bot" && item.replyKey
                    ? CONTENT[language].replies[item.replyKey] ||
                      CONTENT[language].replies.fallback
                    : item.text;

                const botTextIsUrdu =
                  item.role === "bot" && isUrdu;

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
                        style={{
                          textAlign: isUrdu ? "right" : "left",
                        }}
                      >
                        {item.role === "bot"
                          ? current.assistant
                          : current.you}
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
                        style={{
                          background: "rgba(100,116,139,.35)",
                        }}
                      >
                        <User size={15} />
                      </div>
                    )}
                  </div>
                );
              })}

              {showQuickQuestions && (
                <>
                  <p
                    className="hc-welcome"
                    dir={isUrdu ? "rtl" : "ltr"}
                    style={{
                      textAlign: isUrdu ? "right" : "left",
                    }}
                  >
                    {current.welcome}
                  </p>

                  <div className="hc-suggestions">
                    {quickQuestions.map((question) => (
                      <button
                        type="button"
                        key={question}
                        className="hc-suggestion"
                        disabled={isTyping}
                        onClick={() => sendMessage(question)}
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {isTyping && (
                <div className="hc-message-row bot">
                  <div className="hc-mini-avatar">
                    <Bot size={15} />
                  </div>

                  <div className="hc-bubble-wrap">
                    <div
                      className="hc-message-name"
                      dir={isUrdu ? "rtl" : "ltr"}
                      style={{
                        textAlign: isUrdu ? "right" : "left",
                      }}
                    >
                      {current.assistant}
                    </div>

                    <div
                      className="hc-typing"
                      aria-label={current.thinking}
                      role="status"
                    >
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
                  onChange={(event) =>
                    setMessage(event.target.value)
                  }
                  placeholder={
                    isListening
                      ? current.listening
                      : current.placeholder
                  }
                  aria-label={current.placeholder}
                  autoComplete="off"
                  disabled={isTyping}
                  dir="auto"
                />

                <button
                  type="button"
                  className={`hc-tool-button ${
                    isListening ? "recording" : ""
                  }`}
                  onClick={startListening}
                  disabled={isTyping}
                  title={
                    isListening ? current.stopMic : current.speak
                  }
                  aria-label={
                    isListening ? current.stopMic : current.speak
                  }
                >
                  {isListening ? (
                    <MicOff size={17} />
                  ) : (
                    <Mic size={17} />
                  )}
                </button>

                <button
                  type="submit"
                  className="hc-send-button"
                  disabled={!message.trim() || isTyping}
                  title={current.send}
                  aria-label={current.send}
                >
                  {isTyping ? (
                    <LoaderCircle
                      size={17}
                      className="hc-spinner"
                    />
                  ) : (
                    <Send size={16} />
                  )}
                </button>
              </div>

              <p
                className="hc-footer-note"
                dir={isUrdu ? "rtl" : "ltr"}
              >
                {current.footer}
              </p>
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
          aria-expanded={isOpen && !isClosing}
        >
          <span className="hc-launcher-symbol">
            <MessageCircle
              size={26}
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
