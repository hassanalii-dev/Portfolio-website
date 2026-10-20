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
  { code: "ur", label: "اردو (Urdu)" },
  { code: "es", label: "Español (Spanish)" },
  { code: "fr", label: "Français (French)" },
  { code: "de", label: "Deutsch (German)" },
  { code: "ar", label: "العربية (Arabic)" },
  { code: "zh", label: "中文 (Chinese)" },
  { code: "hi", label: "हिन्दी (Hindi)" },
  { code: "ja", label: "日本語 (Japanese)" },
  { code: "ru", label: "Русский (Russian)" },
  { code: "pt", label: "Português (Portuguese)" },
  { code: "it", label: "Italiano (Italian)" },
  { code: "tr", label: "Türkçe (Turkish)" },
  { code: "ko", label: "한국어 (Korean)" },
];

const CONTENT = {
  en: {
    subtitle: "Portfolio Assistant",
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
        "Hi! 👋 Welcome to Hassan Ali portfolio. I'm your virtual assistant. How can I help you?",
      about:
        "Hassan Ali is a BS Computer Science student at Lahore Garrison University in Lahore, Pakistan. He is learning full-stack web development and building modern, responsive websites.",
      skills:
        "Hassan works with HTML5, CSS3, JavaScript and React.js. He is also learning Node.js, backend development and MongoDB.",
      projects:
        "Hassan's portfolio showcases his web development journey. His projects include a modern portfolio, an e-commerce website concept and a full-stack web application and other many projects. You can see his all projects in his work section",
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
    subtitle: "پورٹ فولیو معاون",
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
        "میں حسن علی کے پورٹ فولیو، مہارتوں، تعلیم اور پروجیکٹس کے بارے میں معلومات دے سکتا ہوں۔",
    },
  },

  es: {
    subtitle: "Asistente de Portafolio",
    placeholder: "Escribe tu mensaje...",
    suggestions: ["Sobre Hassan", "Habilidades", "Proyectos", "Educación"],
    welcome: "¿Cómo puedo ayudarte hoy?",
    listening: "Escuchando... Habla ahora",
    thinking: "Pensando...",
    micUnsupported: "La entrada de voz no es compatible con este navegador.",
    assistant: "Asistente AI de Hassan",
    you: "Tú",
    reset: "Iniciar una nueva conversación",
    close: "Cerrar chat",
    changeLanguage: "Cambiar idioma",
    send: "Enviar mensaje",
    speak: "Hablar un mensaje",
    stopMic: "Detener micrófono",
    footer: "Asistente de portafolio · Solo respuestas de texto",
    replies: {
      greeting:
        "¡Hola! 👋 Bienvenido al portafolio de Hassan Ali. Soy tu asistente virtual. ¿Cómo puedo ayudarte?",
      about:
        "Hassan Ali es estudiante de Licenciatura en Ciencias de la Computación en la Universidad Lahore Garrison en Lahore, Pakistán. Está aprendiendo desarrollo web full-stack.",
      skills:
        "Hassan trabaja con HTML5, CSS3, JavaScript y React.js. También está aprendiendo Node.js, desarrollo backend y MongoDB.",
      projects:
        "El portafolio de Hassan muestra su viaje en el desarrollo web, incluyendo portafolios modernos, conceptos de comercio electrónico y aplicaciones full-stack.",
      education:
        "Hassan estudia Ciencias de la Computación en la Universidad Lahore Garrison y desarrollo full-stack en NexSkill, Arfa Tower, Lahore.",
      contact:
        "Puedes contactar a Hassan a través de la sección de contacto de este portafolio utilizando sus enlaces sociales.",
      help:
        "Puedes preguntar sobre los antecedentes, educación, habilidades, proyectos o desarrollo web de Hassan.",
      thanks:
        "¡De nada! 😊 No dudes en preguntar cualquier otra cosa sobre el portafolio de Hassan.",
      fallback:
        "Puedo responder preguntas sobre el portafolio, habilidades, educación y proyectos de Hassan.",
    },
  },

  fr: {
    subtitle: "Assistant Portfolio",
    placeholder: "Tapez votre message...",
    suggestions: ["À propos de Hassan", "Compétences", "Projets", "Éducation"],
    welcome: "Comment puis-je vous aider aujourd'hui?",
    listening: "Écoute... Parlez maintenant",
    thinking: "Réflexion...",
    micUnsupported: "La saisie vocale n'est pas prise en charge dans ce navigateur.",
    assistant: "Assistant IA de Hassan",
    you: "Vous",
    reset: "Démarrer une nouvelle conversation",
    close: "Fermer le chat",
    changeLanguage: "Changer de langue",
    send: "Envoyer le message",
    speak: "Parler un message",
    stopMic: "Arrêter le micro",
    footer: "Assistant portfolio · Réponses textuelles uniquement",
    replies: {
      greeting:
        "Salut ! 👋 Bienvenue sur le portfolio de Hassan Ali. Je suis votre assistant virtuel. Comment puis-je vous aider ?",
      about:
        "Hassan Ali est étudiant en licence d'informatique à la Lahore Garrison University à Lahore, au Pakistan.",
      skills:
        "Hassan travaille avec HTML5, CSS3, JavaScript et React.js. Il apprend également Node.js et MongoDB.",
      projects:
        "Le portfolio de Hassan présente son parcours de développement web, incluant des projets full-stack et e-commerce.",
      education:
        "Hassan étudie l'informatique à la Lahore Garrison University et le développement web chez NexSkill, Arfa Tower, Lahore.",
      contact:
        "Vous pouvez contacter Hassan via la section contact de ce portfolio en utilisant ses liens sociaux.",
      help:
        "Vous pouvez poser des questions sur le parcours, l'éducation, les compétences ou les projets de Hassan.",
      thanks:
        "De rien ! 😊 N'hésitez pas à poser d'autres questions sur le portfolio de Hassan.",
      fallback:
        "Je peux répondre aux questions concernant le portfolio, les compétences et les projets de Hassan.",
    },
  },

  de: {
    subtitle: "Portfolio-Assistent",
    placeholder: "Geben Sie Ihre Nachricht ein...",
    suggestions: ["Über Hassan", "Fähigkeiten", "Projekte", "Bildung"],
    welcome: "Wie kann ich Ihnen heute helfen?",
    listening: "Höre zu... Sprechen Sie jetzt",
    thinking: "Denke nach...",
    micUnsupported: "Spracheingabe wird in diesem Browser nicht unterstützt.",
    assistant: "Hassans KI-Assistent",
    you: "Sie",
    reset: "Neues Gespräch beginnen",
    close: "Chat schließen",
    changeLanguage: "Sprache ändern",
    send: "Nachricht senden",
    speak: "Nachricht sprechen",
    stopMic: "Mikrofon stoppen",
    footer: "Portfolio-Assistent · Nur Textantworten",
    replies: {
      greeting:
        "Hallo! 👋 Willkommen im Portfolio von Hassan Ali. Ich bin Ihr virtueller Assistent. Wie kann ich Ihnen helfen?",
      about:
        "Hassan Ali studiert Informatik an der Lahore Garrison University in Lahore, Pakistan, und lernt Full-Stack-Webentwicklung.",
      skills:
        "Hassan arbeitet mit HTML5, CSS3, JavaScript und React.js sowie Node.js und MongoDB.",
      projects:
        "Hassans Portfolio zeigt seine Webentwicklungsprojekte, darunter moderne Portfolios und E-Commerce-Konzepte.",
      education:
        "Hassan studiert Informatik an der Lahore Garrison University und Full-Stack-Entwicklung bei NexSkill, Arfa Tower, Lahore.",
      contact:
        "Sie können Hassan über den Kontaktbereich dieses Portfolios und seine Social Links erreichen.",
      help:
        "Sie können Fragen zu Hassans Hintergrund, Bildung, Fähigkeiten oder Projekten stellen.",
      thanks:
        "Gern geschehen! 😊 Fragen Sie ruhig weiter nach Hassans Portfolio.",
      fallback:
        "Ich kann Fragen zu Hassans Portfolio, Fähigkeiten, Bildung und Projekten beantworten.",
    },
  },

  ar: {
    subtitle: "مساعد البورتفوليو",
    placeholder: "اكتب رسالتك...",
    suggestions: ["عن حسان", "المهارات", "المشاريع", "التعليم"],
    welcome: "كيف يمكنني مساعدتك اليوم؟",
    listening: "جاري الاستماع... تحدث الآن",
    thinking: "جاري التفكير...",
    micUnsupported: "الإدخال الصوتي غير مدعوم في هذا المتصفح.",
    assistant: "مساعد حسان الذكي",
    you: "أنت",
    reset: "بدء محادثة جديدة",
    close: "إغلاق المحادثة",
    changeLanguage: "تغيير اللغة",
    send: "إرسال الرسالة",
    speak: "تحدث برسالة",
    stopMic: "إيقاف الميكروفون",
    footer: "مساعد البورتفوليو · ردود نصية فقط",
    replies: {
      greeting:
        "أهلاً بك! 👋 مرحباً بك في بورتفوليو حسان علي. أنا مساعدك الافتراضي. كيف يمكنني مساعدتك؟",
      about:
        "حسان علي طالب يدرس علوم الحاسب في جامعة لاهور غاريسون في لاهور، باكستان. وهو يتعلم تطوير الويب المتكامل.",
      skills:
        "يعمل حسان بـ HTML5 و CSS3 و JavaScript و React.js، كما يتعلم Node.js و MongoDB.",
      projects:
        "يعرض بورتفوليو حسان رحلته في تطوير الويب بما في ذلك المشاريع الحديثة ومفاهيم التجارة الإلكترونية.",
      education:
        "يدرس حسان علوم الحاسب في جامعة لاهور غاريسون وتطوير الويب في NexSkill، أرفا تاور، لاهور.",
      contact:
        "يمكنك التواصل مع حسان عبر قسم الاتصال في هذا البورتفوليو وروابطه الاجتماعية.",
      help:
        "يمكنك طرح أسئلة حول خلفية حسان أو تعليمه أو مهاراته أو مشاريعه.",
      thanks:
        "عفواً! 😊 لا تتردد في طرح أي أسئلة أخرى حول بورتفوليو حسان.",
      fallback:
        "يمكنني الإجابة على الأسئلة المتعلقة ببورتفوليو حسان ومهاراته وتعليمه وماريعه.",
    },
  },

  zh: {
    subtitle: "作品集助手",
    placeholder: "输入您的消息...",
    suggestions: ["关于哈桑", "技能", "项目", "教育"],
    welcome: "今天我能为您做些什么？",
    listening: "正在倾听...请说话",
    thinking: "思考中...",
    micUnsupported: "此浏览器不支持语音输入。",
    assistant: "哈桑AI助手",
    you: "你",
    reset: "开始新对话",
    close: "关闭聊天",
    changeLanguage: "更改语言",
    send: "发送消息",
    speak: "语音输入",
    stopMic: "停止麦克风",
    footer: "作品集助手 · 仅限文本回复",
    replies: {
      greeting:
        "你好！👋 欢迎来到 Hassan Ali 的作品集。我是您的虚拟助手，有什么我可以帮您的？",
      about:
        "Hassan Ali 是巴基斯坦拉合尔加里森大学计算机科学专业的学生，正在学习全栈网页开发。",
      skills:
        "哈桑使用 HTML5、CSS3、JavaScript 和 React.js，同时也在学习 Node.js 和 MongoDB。",
      projects:
        "哈桑的作品集展示了他的网页开发历程，包括现代作品集、电商概念和全栈应用。",
      education:
        "哈桑在拉合尔加里森大学攻读计算机科学，并在拉合尔阿法大厦的 NexSkill 学习全栈开发。",
      contact:
        "您可以通过此作品集的联系方式部分与哈桑取得联系。",
      help:
        "您可以询问有关哈桑的背景、教育、技能、项目或网页开发的问题。",
      thanks:
        "不客气！😊 欢迎随时询问有关哈桑作品集的其他问题。",
      fallback:
        "我可以回答有关哈桑的作品集、技能、教育和项目的问题。",
    },
  },

  hi: {
    subtitle: "पोर्टफोलियो सहायक",
    placeholder: "अपना संदेश टाइप करें...",
    suggestions: ["हसन के बारे में", "कौशल", "प्रोजेक्ट्स", "शिक्षा"],
    welcome: "आज मैं आपकी क्या सहायता कर सकता हूँ?",
    listening: "सुन रहा हूँ... अब बोलें",
    thinking: "सोच रहा हूँ...",
    micUnsupported: "इस ब्राउज़र में वॉइस इनपुट समर्थित नहीं है।",
    assistant: "हसन का AI सहायक",
    you: "आप",
    reset: "नई बातचीत शुरू करें",
    close: "चैट बंद करें",
    changeLanguage: "भाषा बदलें",
    send: "संदेश भेजें",
    speak: "बोलकर संदेश दें",
    stopMic: "माइक्रोफ़ोन बंद करें",
    footer: "पोर्टफोलियो सहायक · केवल टेक्स्ट उत्तर",
    replies: {
      greeting:
        "नमस्ते! 👋 हसन अली के पोर्टफोलियो में आपका स्वागत है। मैं आपका वर्चुअल सहायक हूँ। मैं आपकी क्या मदद कर सकता हूँ?",
      about:
        "हसन अली लाहौर, पाकिस्तान में लाहौर गैरिसन यूनिवर्सिटी में बीएस कंप्यूटर साइंस के छात्र हैं।",
      skills:
        "हसन HTML5, CSS3, JavaScript और React.js के साथ काम करते हैं। वह Node.js और MongoDB भी सीख रहे हैं।",
      projects:
        "हसन के पोर्टफोलियो में उनके वेब डेवलपमेंट प्रोजेक्ट्स, ई-कॉमर्स कॉन्सेप्ट्स और फुल-स्टैक ऐप्स शामिल हैं।",
      education:
        "हसन लाहौर गैरिसन यूनिवर्सिटी से कंप्यूटर साइंस की पढ़ाई कर रहे हैं और NexSkill, अर्फा टॉवर, लाहौर से फुल-स्टैक डेवलपमेंट सीख रहे हैं।",
      contact:
        "आप इस पोर्टफोलियो के संपर्क अनुभाग के माध्यम से हसन से संपर्क कर सकते हैं।",
      help:
        "आप हसन की पृष्ठभूमि, शिक्षा, कौशल या प्रोजेक्ट्स के बारे में पूछ सकते हैं।",
      thanks:
        "आपका स्वागत है! 😊 हसन के पोर्टफोलियो के बारे में कुछ भी और पूछने के लिए स्वतंत्र महसूस करें।",
      fallback:
        "मैं हसन के पोर्टफोलियो, कौशल, शिक्षा और प्रोजेक्ट्स के बारे में प्रश्नों के उत्तर दे सकता हूँ।",
    },
  },

  ja: {
    subtitle: "ポートフォリオアシスタント",
    placeholder: "メッセージを入力...",
    suggestions: ["ハサンについて", "スキル", "プロジェクト", "学歴"],
    welcome: "本日はどのようなご用件でしょうか？",
    listening: "聞いています...お話しください",
    thinking: "考え中...",
    micUnsupported: "このブラウザでは音声入力がサポートされていません。",
    assistant: "ハサンAIアシスタント",
    you: "あなた",
    reset: "新しい会話を開始",
    close: "チャットを閉じる",
    changeLanguage: "言語を変更",
    send: "メッセージを送信",
    speak: "音声で入力",
    stopMic: "マイクを停止",
    footer: "ポートフォリオアシスタント · テキスト返信のみ",
    replies: {
      greeting:
        "こんにちは！👋 Hassan Aliのポートフォリオへようこそ。バーチャルアシスタントです。何かお手伝いできますか？",
      about:
        "Hassan Aliはパキスタンのラホール・ガリソン大学でコンピュータサイエンスを専攻する学生です。",
      skills:
        "ハサンはHTML5、CSS3、JavaScript、React.jsを使用し、Node.jsやMongoDBも学習しています。",
      projects:
        "ハサンのポートフォリオでは、モダンなウェブ開発プロジェクトやフルスタックアプリを紹介しています。",
      education:
        "ラホール・ガリソン大学でコンピュータサイエンスを学び、NexSkill（アルファタワー、ラホール）でフルスタック開発を学んでいます。",
      contact:
        "ポートフォリオのコンタクトセクションからハサンにご連絡いただけます。",
      help:
        "ハサンの経歴、学歴、スキル、プロジェクトについて質問できます。",
      thanks:
        "どういたしまして！😊 ハサンのポートフォリオについて他にお気軽にご質問ください。",
      fallback:
        "ハサンのポートフォリオ、スキル、学歴、プロジェクトについてお答えできます。",
    },
  },

  ru: {
    subtitle: "Помощник по портфолио",
    placeholder: "Введите ваше сообщение...",
    suggestions: ["О Хасане", "Навыки", "Проекты", "Образование"],
    welcome: "Чем я могу помочь вам сегодня?",
    listening: "Слушаю... Говорите",
    thinking: "Думаю...",
    micUnsupported: "Голосовой ввод не поддерживается в этом браузере.",
    assistant: "ИИ-ассистент Хасана",
    you: "Вы",
    reset: "Начать новый разговор",
    close: "Закрыть чат",
    changeLanguage: "Изменить язык",
    send: "Отправить сообщение",
    speak: "Произнести сообщение",
    stopMic: "Остановить микрофон",
    footer: "Помощник по портфолио · Только текстовые ответы",
    replies: {
      greeting:
        "Привет! 👋 Добро пожаловать в портфолио Хасана Али. Я ваш виртуальный помощник. Чем могу помочь?",
      about:
        "Хасан Али — студент бакалавриата по компьютерным наукам в Университете Лахора Гаррисон в Лахоре, Пакистан.",
      skills:
        "Хасан работает с HTML5, CSS3, JavaScript и React.js, а также изучает Node.js и MongoDB.",
      projects:
        "В портфолио Хасана представлены его проекты по веб-разработке и фулл-стек приложения.",
      education:
        "Хасан изучает компьютерные науки в Университете Лахора Гаррисон и веб-разработку в NexSkill (Арфа Тауэр, Лахор).",
      contact:
        "Вы можете связаться с Хасаном через раздел контактов в этом портфолио.",
      help:
        "Вы можете задать вопросы об образовании, навыках или проектах Хасана.",
      thanks:
        "Пожалуйста! 😊 Не стесняйтесь задавать любые другие вопросы о портфолио Хасана.",
      fallback:
        "Я могу ответить на вопросы о портфолио, навыках, образовании и проектах Хасана.",
    },
  },

  pt: {
    subtitle: "Assistente de Portfólio",
    placeholder: "Digite sua mensagem...",
    suggestions: ["Sobre Hassan", "Habilidades", "Projetos", "Educação"],
    welcome: "Como posso ajudar você hoje?",
    listening: "Ouvindo... Fale agora",
    thinking: "Pensando...",
    micUnsupported: "A entrada de voz não é suportada neste navegador.",
    assistant: "Assistente de IA do Hassan",
    you: "Você",
    reset: "Iniciar nova conversa",
    close: "Fechar chat",
    changeLanguage: "Mudar idioma",
    send: "Enviar mensagem",
    speak: "Falar uma mensagem",
    stopMic: "Parar microfone",
    footer: "Assistente de portfólio · Apenas respostas em texto",
    replies: {
      greeting:
        "Olá! 👋 Bem-vindo ao portfólio de Hassan Ali. Sou seu assistente virtual. Como posso ajudar?",
      about:
        "Hassan Ali é estudante de Ciência da Computação na Lahore Garrison University em Lahore, Paquistão.",
      skills:
        "Hassan trabalha com HTML5, CSS3, JavaScript e React.js, e está aprendendo Node.js e MongoDB.",
      projects:
        "O portfólio de Hassan exibe sua jornada de desenvolvimento web, incluindo aplicativos full-stack.",
      education:
        "Hassan estuda Ciência da Computação na Lahore Garrison University e desenvolvimento full-stack no NexSkill, Arfa Tower, Lahore.",
      contact:
        "Você pode entrar em contato com Hassan através da seção de contato deste portfólio.",
      help:
        "Você pode fazer perguntas sobre a formação, educação, habilidades ou projetos de Hassan.",
      thanks:
        "De nada! 😊 Fique à vontade para perguntar qualquer outra coisa sobre o portfólio.",
      fallback:
        "Posso responder a perguntas sobre o portfólio, habilidades, educação e projetos de Hassan.",
    },
  },

  it: {
    subtitle: "Assistente Portfolio",
    placeholder: "Digita il tuo messaggio...",
    suggestions: ["Su Hassan", "Competenze", "Progetti", "Formazione"],
    welcome: "Come posso aiutarti oggi?",
    listening: "Ascoltando... Parla ora",
    thinking: "Sto pensando...",
    micUnsupported: "L'input vocale non è supportato in questo browser.",
    assistant: "Assistente IA di Hassan",
    you: "Tu",
    reset: "Inizia una nuova conversazione",
    close: "Chiudi chat",
    changeLanguage: "Cambia lingua",
    send: "Invia messaggio",
    speak: "Pronuncia un messaggio",
    stopMic: "Ferma microfono",
    footer: "Assistente portfolio · Solo risposte testuali",
    replies: {
      greeting:
        "Ciao! 👋 Benvenuto nel portfolio di Hassan Ali. Sono il tuo assistente virtuale. Come posso aiutarti?",
      about:
        "Hassan Ali è uno studente di Informatica presso la Lahore Garrison University a Lahore, in Pakistan.",
      skills:
        "Hassan lavora con HTML5, CSS3, JavaScript e React.js, e sta studiando Node.js e MongoDB.",
      projects:
        "Il portfolio di Hassan mostra i suoi progetti di sviluppo web e applicazioni full-stack.",
      education:
        "Hassan studia Informatica alla Lahore Garrison University e sviluppo full-stack presso NexSkill, Arfa Tower, Lahore.",
      contact:
        "Puoi contattare Hassan tramite la sezione contatti di questo portfolio.",
      help:
        "Puoi fare domande sul background, sull'istruzione, sulle competenze o sui progetti di Hassan.",
      thanks:
        "Prego! 😊 Non esitare a chiedere altro sul portfolio di Hassan.",
      fallback:
        "Posso rispondere a domande sul portfolio, sulle competenze, sull'istruzione e sui progetti di Hassan.",
    },
  },

  tr: {
    subtitle: "Portfolyo Asistanı",
    placeholder: "Mesajınızı yazın...",
    suggestions: ["Hassan Hakkında", "Yetenekler", "Projeler", "Eğitim"],
    welcome: "Bugün size nasıl yardımcı olabilirim?",
    listening: "Dinliyor... Şimdi konuşun",
    thinking: "Düşünüyor...",
    micUnsupported: "Bu tarayıcıda sesli giriş desteklenmiyor.",
    assistant: "Hassan Yapay Zeka Asistanı",
    you: "Siz",
    reset: "Yeni sohbet başlat",
    close: "Sohbeti kapat",
    changeLanguage: "Dili değiştir",
    send: "Mesaj gönder",
    speak: "Mesaj söyle",
    stopMic: "Mikrofonu durdur",
    footer: "Portfolyo asistanı · Yalnızca metin yanıtları",
    replies: {
      greeting:
        "Merhaba! 👋 Hassan Ali'nin portfolyosuna hoş geldiniz. Ben sanal asistanınızım. Size nasıl yardımcı olabilirim?",
      about:
        "Hassan Ali, Pakistan'ın Lahor şehrindeki Lahore Garrison Üniversitesi'nde Bilgisayar Bilimleri öğrencisidir.",
      skills:
        "Hassan HTML5, CSS3, JavaScript ve React.js ile çalışmaktadır. Ayrıca Node.js ve MongoDB öğrenmektedir.",
      projects:
        "Hassan'ın portfolyosu, web geliştirme yolculuğunu ve modern projelerini sergilemektedir.",
      education:
        "Hassan, Lahore Garrison University'de Bilgisayar Bilimleri okuyor ve NexSkill'de full-stack geliştirme eğitimi alıyor.",
      contact:
        "Bu portfolyonun iletişim bölümü aracılığıyla Hassan ile iletişime geçebilirsiniz.",
      help:
        "Hassan'ın geçmişi, eğitimi, yetenekleri veya projeleri hakkında sorular sorabilirsiniz.",
      thanks:
        "Rica ederim! 😊 Hassan'ın portfolyosu hakkında başka şeyler sormaktan çekinmeyin.",
      fallback:
        "Hassan'ın portfolyosu, yetenekleri, eğitimi ve projeleri hakkında soruları yanıtlayabilirim.",
    },
  },

  ko: {
    subtitle: "포트폴리오 어시스턴트",
    placeholder: "메시지를 입력하세요...",
    suggestions: ["하산 소개", "기술", "프로젝트", "학력"],
    welcome: "오늘 무엇을 도와드릴까요?",
    listening: "듣는 중... 말씀하세요",
    thinking: "생각 중...",
    micUnsupported: "이 브라우저에서는 음성 입력을 지원하지 않습니다.",
    assistant: "하산 AI 어시스턴트",
    you: "나",
    reset: "새 대화 시작",
    close: "채팅 닫기",
    changeLanguage: "언어 변경",
    send: "메시지 전송",
    speak: "음성으로 말하기",
    stopMic: "마이크 중지",
    footer: "포트폴리오 어시스턴트 · 텍스트 응답 전용",
    replies: {
      greeting:
        "안녕하세요! 👋 Hassan Ali의 포트폴리오에 오신 것을 환영합니다. 가상 어시스턴트입니다. 무엇을 도와드릴까요?",
      about:
        "Hassan Ali는 파키스탄 라호르의 Lahore Garrison University에서 컴퓨터 과학을 전공하는 학생입니다.",
      skills:
        "하산은 HTML5, CSS3, JavaScript, React.js를 사용하며 Node.js와 MongoDB를 배우고 있습니다.",
      projects:
        "하산의 포트폴리오는 웹 개발 여정과 다양한 프로젝트 및 풀스택 앱을 보여줍니다.",
      education:
        "Lahore Garrison University에서 컴퓨터 과학을 공부하고 NexSkill에서 풀스택 개발을 배우고 있습니다.",
      contact:
        "이 포트폴리오의 연락처 섹션을 통해 하산에게 연락할 수 있습니다.",
      help:
        "하산의 배경, 교육, 기술 또는 프로젝트에 대해 물어볼 수 있습니다.",
      thanks:
        "천만에요! 😊 하산의 포트폴리오에 대해 자유롭게 더 질문해 주세요.",
      fallback:
        "하산의 포트폴리오, 기술, 학력 및 프로젝트에 관한 질문에 답변할 수 있습니다.",
    },
  },
};

function getReplyKey(message) {
  const text = message.toLowerCase().trim();

  if (
    /^(hi|hello|hey|salam|assalam|aoa|hola|bonjour|hallo|ciao|olá|merhaba|안녕하세요)\b/.test(text) ||
    text.includes("السلام علیکم") ||
    text.includes("اسلام علیکم") ||
    text.includes("ہیلو")
  ) {
    return "greeting";
  }

  if (
    text.includes("thank") ||
    text.includes("shukriya") ||
    text.includes("gracias") ||
    text.includes("merci") ||
    text.includes("danke") ||
    text.includes("شكرا") ||
    text.includes("谢谢") ||
    text.includes("धन्यवाद") ||
    text.includes("ありがとう") ||
    text.includes("спасибо") ||
    text.includes("obrigado") ||
    text.includes("grazie") ||
    text.includes("teşekkür") ||
    text.includes("감사합니다") ||
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
    text.includes("quien es") ||
    text.includes("qui est") ||
    text.includes("über hassan") ||
    text.includes("من هو") ||
    text.includes("关于哈桑") ||
    text.includes("के बारे में") ||
    text.includes("ハサンについて") ||
    text.includes("о хасане") ||
    text.includes("sobre hassan") ||
    text.includes("su hassan") ||
    text.includes("hakkında") ||
    text.includes("하산 소개") ||
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
    text.includes("habilidades") ||
    text.includes("compétences") ||
    text.includes("fähigkeiten") ||
    text.includes("المهارات") ||
    text.includes("技能") ||
    text.includes("कौशल") ||
    text.includes("スキル") ||
    text.includes("навыки") ||
    text.includes("competências") ||
    text.includes("competenze") ||
    text.includes("yetenekler") ||
    text.includes("기술") ||
    text.includes("مہارت") ||
    text.includes("ہنر")
  ) {
    return "skills";
  }

  if (
    text.includes("project") ||
    text.includes("work") ||
    text.includes("portfolio") ||
    text.includes("proyectos") ||
    text.includes("projets") ||
    text.includes("projekte") ||
    text.includes("المشاريع") ||
    text.includes("项目") ||
    text.includes("प्रोजेक्ट्स") ||
    text.includes("プロジェクト") ||
    text.includes("проекты") ||
    text.includes("projetos") ||
    text.includes("progetti") ||
    text.includes("projeler") ||
    text.includes("프로젝트") ||
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
    text.includes("educación") ||
    text.includes("éducation") ||
    text.includes("bildung") ||
    text.includes("التعليم") ||
    text.includes("教育") ||
    text.includes("शिक्षा") ||
    text.includes("学歴") ||
    text.includes("образование") ||
    text.includes("formação") ||
    text.includes("formazione") ||
    text.includes("eğitim") ||
    text.includes("학력") ||
    text.includes("تعلیم")
  ) {
    return "education";
  }

  if (
    text.includes("contact") ||
    text.includes("email") ||
    text.includes("hire") ||
    text.includes("rabta") ||
    text.includes("contacto") ||
    text.includes("contactez") ||
    text.includes("kontakt") ||
    text.includes("اتصال") ||
    text.includes("联系") ||
    text.includes("संपर्क") ||
    text.includes("連絡先") ||
    text.includes("контакты") ||
    text.includes("contato") ||
    text.includes("contatto") ||
    text.includes("iletişim") ||
    text.includes("연락처") ||
    text.includes("رابطہ")
  ) {
    return "contact";
  }

  if (
    text.includes("help") ||
    text.includes("madad") ||
    text.includes("ayuda") ||
    text.includes("aide") ||
    text.includes("hilfe") ||
    text.includes("مساعدة") ||
    text.includes("帮助") ||
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
  const isUrduOrArabic = language === "ur" || language === "ar";

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

    recognition.lang = language === "ur" ? "ur-PK" : `${language}-${language.toUpperCase()}`;
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
          min-width: 150px;
          max-height: 220px;
          overflow-y: auto;
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
            aria-label="Hassan's AI Assistant"
            aria-hidden={!isOpen}
          >
            <header className="hc-header">
              <div className="hc-header-top">
                <div className="hc-avatar">
                  <Bot size={23} strokeWidth={1.8} />
                </div>

                <div className="hc-heading">
                  <h3>Hassan's AI Assistant</h3>
                  <p>
                    <span className="hc-online" />
                    Online
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
                    <span>{language.toUpperCase()}</span>
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

                const botTextIsRtl = item.role === "bot" && (language === "ur" || language === "ar");

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
                        dir={botTextIsRtl ? "rtl" : "ltr"}
                        style={{ textAlign: botTextIsRtl ? "right" : "left" }}
                      >
                        {item.role === "bot" ? current.assistant : current.you}
                      </div>

                      <div
                        className="hc-bubble"
                        key={`${item.id}-${language}`}
                        dir={botTextIsRtl ? "rtl" : "auto"}
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
                      dir={isUrduOrArabic ? "rtl" : "ltr"}
                      style={{ textAlign: isUrduOrArabic ? "right" : "left" }}
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
          aria-label={isOpen ? current.close : "Hassan's AI Assistant"}
          title={isOpen ? current.close : "Hassan's AI Assistant"}
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