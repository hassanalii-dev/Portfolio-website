import React, { useEffect, useRef, useState } from "react";
import {
  Bot,
  X,
  Send,
  RotateCcw,
  Globe,
  Mic,
  MicOff,
  LoaderCircle,
  User,
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
  { code: "fa", label: "فارسی (Persian)" },
  { code: "nl", label: "Nederlands (Dutch)" },
  { code: "id", label: "Bahasa Indonesia (Indonesian)" },
  { code: "ms", label: "Bahasa Melayu (Malay)" },
];

const CONTENT = {
  en: {
    placeholder: "Type your message...",
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
        "Hi! 👋 Welcome to Hassan Ali portfolio. I'm your virtual assistant. How can I help you?",
      about:
        "Hassan Ali is a BS Computer Science student at Lahore Garrison University in Lahore, Pakistan. He is learning full-stack web development and building modern, responsive websites.",
      skills:
        "Hassan works with HTML5, CSS3, JavaScript and React.js. He is also learning Node.js, backend development and MongoDB.",
      projects:
        "Hassan's portfolio showcases his web development journey. His projects include a modern portfolio, an e-commerce website concept and a full-stack web application and other many projects. You can see his all projects in his work section.",
      education:
        "Hassan is studying BS Computer Science at Lahore Garrison University. He completed Intermediate ICS with Physics at Government Islamia Graduate College, Civil Lines, Lahore. He is also learning full-stack development at NexSkill, Arfa Tower, Lahore.",
      contact:
        "You can contact Hassan through the Contact section of this portfolio. Use the available contact details and social links.",
      help:
        "You can ask about Hassan's background, education, skills, projects or web development.",
      thanks:
        "You're welcome! 😊 Feel free to ask anything else about Hassan's portfolio.",
      fallback:
        "I can answer questions about Hassan's portfolio, skills, education and projects. So kindly ask me about these questions.",
    },
  },

  ur: {
    placeholder: "اپنا پیغام لکھیں...",
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
        "آپ حسن کی تعلیم، مہارتوں، پروجیکٹس اور ویب ڈویلپمنٹ کے بارے میں پوچھ سکتے ہیں۔",
      thanks:
        "آپ کا خیر مقدم ہے! 😊 حسن کے پورٹ فولیو کے بارے میں مزید کچھ پوچھنا ہو تو ضرور پوچھیں۔",
      fallback:
        "میں حسن علی کے پورٹ فولیو، مہارتوں، تعلیم اور پروجیکٹس کے بارے میں معلومات دے سکتا ہوں۔",
    },
  },

  es: {
    placeholder: "Escribe tu mensaje...",
    welcome: "¿Cómo puedo ayudarte hoy?",
    listening: "Escuchando... Habla ahora",
    thinking: "Pensando...",
    micUnsupported: "La entrada de voz no es compatible con este navegador.",
    assistant: "Hassan AI Assistant",
    you: "Tú",
    reset: "Iniciar nueva conversación",
    close: "Cerrar chat",
    changeLanguage: "Cambiar idioma",
    send: "Enviar mensaje",
    speak: "Hablar un mensaje",
    stopMic: "Detener micrófono",
    replies: {
      greeting: "¡Hola! 👋 Bienvenido al portafolio de Hassan Ali.",
      about: "Hassan Ali es estudiante de ciencias de la computación en Lahore.",
      skills: "Hassan trabaja con HTML5, CSS3, JavaScript y React.js.",
      projects: "Los proyectos de Hassan muestran su viaje de desarrollo web.",
      education: "Hassan estudia informática en la Universidad Lahore Garrison.",
      contact: "Puedes contactar a Hassan a través de la sección de contacto.",
      help: "Puedes preguntar sobre los antecedentes o proyectos de Hassan.",
      thanks: "¡De nada! 😊",
      fallback: "Puedo responder preguntas sobre el portafolio de Hassan.",
    },
  },

  fr: {
    placeholder: "Écrivez votre message...",
    welcome: "Comment puis-je vous aider aujourd'hui?",
    listening: "Écoute... Parlez maintenant",
    thinking: "Réflexion...",
    micUnsupported: "L'entrée vocale n'est pas prise en charge.",
    assistant: "Hassan AI Assistant",
    you: "Vous",
    reset: "Nouvelle conversation",
    close: "Fermer",
    changeLanguage: "Changer de langue",
    send: "Envoyer",
    speak: "Parler",
    stopMic: "Arrêter le micro",
    replies: {
      greeting: "Bonjour ! 👋 Bienvenue sur le portfolio de Hassan Ali.",
      about: "Hassan Ali étudie l'informatique à Lahore, au Pakistan.",
      skills: "Hassan utilise HTML5, CSS3, JavaScript et React.js.",
      projects: "Les projets de Hassan incluent un portfolio moderne.",
      education: "Hassan étudie à l'Université Lahore Garrison.",
      contact: "Vous pouvez contacter Hassan via la section contact.",
      help: "Vous pouvez poser des questions sur les compétences de Hassan.",
      thanks: "De rien ! 😊",
      fallback: "Je peux répondre aux questions sur le portfolio de Hassan.",
    },
  },

  de: {
    placeholder: "Nachricht eingeben...",
    welcome: "Wie kann ich Ihnen heute helfen?",
    listening: "Zuhören... Sprechen Sie jetzt",
    thinking: "Denken...",
    micUnsupported: "Spracheingabe wird nicht unterstützt.",
    assistant: "Hassan AI Assistant",
    you: "Sie",
    reset: "Neue Konversation",
    close: "Schließen",
    changeLanguage: "Sprache ändern",
    send: "Senden",
    speak: "Sprechen",
    stopMic: "Mikrofon stoppen",
    replies: {
      greeting: "Hallo! 👋 Willkommen im Portfolio von Hassan Ali.",
      about: "Hassan Ali studiert Informatik in Lahore, Pakistan.",
      skills: "Hassan arbeitet mit HTML5, CSS3, JavaScript und React.js.",
      projects: "Hassans Projekte zeigen seine Webentwicklungsreise.",
      education: "Hassan studiert an der Lahore Garrison University.",
      contact: "Sie können Hassan über den Kontaktbereich erreichen.",
      help: "Sie können Fragen zu Hassans Hintergrund stellen.",
      thanks: "Gern geschehen! 😊",
      fallback: "Ich kann Fragen zu Hassans Portfolio beantworten.",
    },
  },

  ar: {
    placeholder: "اكتب رسالتك...",
    welcome: "كيف يمكنني مساعدتك اليوم؟",
    listening: "جاري الاستماع... تحدث الآن",
    thinking: "جاري التفكير...",
    micUnsupported: "إدخال الصوت غير مدعوم في هذا المتصفح.",
    assistant: "Hassan AI Assistant",
    you: "أنت",
    reset: "بدء محادثة جديدة",
    close: "إغلاق الدردشة",
    changeLanguage: "تغيير اللغة",
    send: "إرسال الرسالة",
    speak: "تحدث برسالة",
    stopMic: "إيقاف الميكروفون",
    replies: {
      greeting: "أهلاً بك! 👋 أنا مساعد حسن علي الافتراضي. كيف يمكنني مساعدتك؟",
      about: "حسن علي هو طالب في علوم الكمبيوتر في جامعة لاهور جارسون في باكستان.",
      skills: "يعمل حسن باستخدام HTML5، CSS3، JavaScript و React.js.",
      projects: "تتضمن مشاريع حسن محفظة حديثة ومفهوم متجر إلكتروني.",
      education: "يدرس حسن علوم الكمبيوتر في جامعة لاهور جارسون.",
      contact: "يمكنك التواصل مع حسن عبر قسم الاتصال.",
      help: "يمكنك السؤال عن خلفية حسن أو تعليمه أو مهاراته أو مشاريعه.",
      thanks: "على الرحب والسعة! 😊",
      fallback: "يمكنني الإجابة على الأسئلة المتعلقة بمحفظة حسن ومهاراته.",
    },
  },

  zh: {
    placeholder: "输入您的消息...",
    welcome: "今天有什么我可以帮您的吗？",
    listening: "正在聆听...请说话",
    thinking: "思考中...",
    micUnsupported: "此浏览器不支持语音输入。",
    assistant: "Hassan AI Assistant",
    you: "您",
    reset: "开始新对话",
    close: "关闭",
    changeLanguage: "更改语言",
    send: "发送",
    speak: "语音输入",
    stopMic: "停止麦克风",
    replies: {
      greeting: "你好！👋 欢迎来到 Hassan Ali 的作品集。",
      about: "Hassan Ali 是巴基斯坦拉合尔加里森大学的计算机科学专业学生。",
      skills: "Hassan 使用 HTML5、CSS3、JavaScript 和 React.js 进行开发。",
      projects: "Hassan 的项目展示了他的全栈开发历程。",
      education: "Hassan 正在拉合尔加里森大学攻读计算机科学学士学位。",
      contact: "您可以通过联系方式与 Hassan 取得联系。",
      help: "您可以询问有关 Hassan 背景或技能的问题。",
      thanks: "不客气！ 😊",
      fallback: "我可以回答有关 Hassan 作品集的问题。",
    },
  },

  hi: {
    placeholder: "अपना संदेश टाइप करें...",
    welcome: "आज मैं आपकी क्या सहायता कर सकता हूँ?",
    listening: "सुन रहा हूँ... अब बोलिए",
    thinking: "सोच रहा हूँ...",
    micUnsupported: "इस ब्राउज़र में वॉयस इनपुट समर्थित नहीं है।",
    assistant: "Hassan AI Assistant",
    you: "आप",
    reset: "नया संवाद शुरू करें",
    close: "बंद करें",
    changeLanguage: "भाषा बदलें",
    send: "संदेश भेजें",
    speak: "बोलकर संदेश दें",
    stopMic: "माइक्रोफ़ोन बंद करें",
    replies: {
      greeting: "नमस्ते! 👋 हसन अली के पोर्टफोलियो में आपका स्वागत है।",
      about: "हसन अली लाहौर, पाकिस्तान में कंप्यूटर साइंस के छात्र हैं।",
      skills: "हसन HTML5, CSS3, JavaScript और React.js के साथ काम करते हैं।",
      projects: "हसन के प्रोजेक्ट्स उनके वेब डेवलपमेंट सफर को दर्शाते हैं।",
      education: "हसन लाहौर गैरिसन यूनिवर्सिटी से पढ़ाई कर रहे हैं।",
      contact: "आप संपर्क अनुभाग के माध्यम से हसन से जुड़ सकते हैं।",
      help: "आप हसन की शिक्षा और प्रोजेक्ट्स के बारे में पूछ सकते हैं।",
      thanks: "आपका स्वागत है! 😊",
      fallback: "मैं हसन के पोर्टफोलियो के बारे में प्रश्नों के उत्तर दे सकता हूँ।",
    },
  },

  ja: {
    placeholder: "メッセージを入力...",
    welcome: "本日はどのようなご用件でしょうか？",
    listening: "聞いています...お話しください",
    thinking: "考えています...",
    micUnsupported: "このブラウザでは音声入力がサポートされていません。",
    assistant: "Hassan AI Assistant",
    you: "あなた",
    reset: "新しい会話を開始",
    close: "閉じる",
    changeLanguage: "言語を変更",
    send: "送信",
    speak: "音声入力",
    stopMic: "マイクを停止",
    replies: {
      greeting: "こんにちは！👋 ハッサン・アリのポートフォリオへようこそ。",
      about: "ハッサン・アリはパキスタンのラホール・ガリソン大学の学生です。",
      skills: "ハッサンはHTML5、CSS3、JavaScript、React.jsを使っています。",
      projects: "ハッサンのプロジェクトにはモダンなポートフォリオが含まれます。",
      education: "ハッサンはラホール・ガリソン大学でコンピュータサイエンスを学んでいます。",
      contact: "お問い合わせセクションからハッサンにご連絡いただけます。",
      help: "ハッサンの経歴やスキルについてご質問ください。",
      thanks: "どういたしまして！ 😊",
      fallback: "ハッサンのポートフォリオについてお答えできます。",
    },
  },

  ru: {
    placeholder: "Введите сообщение...",
    welcome: "Чем я могу помочь вам сегодня?",
    listening: "Слушаю... Говорите",
    thinking: "Думаю...",
    micUnsupported: "Голосовой ввод не поддерживается в этом браузере.",
    assistant: "Hassan AI Assistant",
    you: "Вы",
    reset: "Начать новый разговор",
    close: "Закрыть",
    changeLanguage: "Сменить язык",
    send: "Отправить",
    speak: "Говорить",
    stopMic: "Остановить микрофон",
    replies: {
      greeting: "Привет! 👋 Добро пожаловать в портфолио Хасана Али.",
      about: "Хасан Али изучает компьютерные науки в Лахоре, Пакистан.",
      skills: "Хасан работает с HTML5, CSS3, JavaScript и React.js.",
      projects: "Проекты Хасана демонстрируют его навыки веб-разработки.",
      education: "Хасан учится в Университете Лахора Гаррисон.",
      contact: "Вы можете связаться с Хасаном через раздел контактов.",
      help: "Вы можете задать вопросы об образовании или навыках Хасана.",
      thanks: "Пожалуйста! 😊",
      fallback: "Я могу ответить на вопросы о портфолио Хасана.",
    },
  },

  pt: {
    placeholder: "Digite sua mensagem...",
    welcome: "Como posso ajudar você hoje?",
    listening: "Ouvindo... Fale agora",
    thinking: "Pensando...",
    micUnsupported: "Entrada de voz não suportada neste navegador.",
    assistant: "Hassan AI Assistant",
    you: "Você",
    reset: "Iniciar nova conversa",
    close: "Fechar",
    changeLanguage: "Mudar idioma",
    send: "Enviar",
    speak: "Falar",
    stopMic: "Parar microfone",
    replies: {
      greeting: "Olá! 👋 Bem-vindo ao portfólio de Hassan Ali.",
      about: "Hassan Ali é estudante de ciência da computação em Lahore, Paquistão.",
      skills: "Hassan trabalha com HTML5, CSS3, JavaScript e React.js.",
      projects: "Os projetos de Hassan mostram sua jornada de desenvolvimento web.",
      education: "Hassan estuda na Lahore Garrison University.",
      contact: "Você pode entrar em contato com Hassan pela seção de contato.",
      help: "Você pode perguntar sobre a formação ou habilidades de Hassan.",
      thanks: "De nada! 😊",
      fallback: "Posso responder perguntas sobre o portfólio de Hassan.",
    },
  },

  it: {
    placeholder: "Scrivi il tuo messaggio...",
    welcome: "Come posso aiutarti oggi?",
    listening: "Ascoltando... Parla ora",
    thinking: "Sto pensando...",
    micUnsupported: "L'input vocale non è supportato in questo browser.",
    assistant: "Hassan AI Assistant",
    you: "Tu",
    reset: "Nuova conversazione",
    close: "Chiudi",
    changeLanguage: "Cambia lingua",
    send: "Invia",
    speak: "Parla",
    stopMic: "Ferma microfono",
    replies: {
      greeting: "Ciao! 👋 Benvenuto nel portfolio di Hassan Ali.",
      about: "Hassan Ali studia informatica a Lahore, in Pakistan.",
      skills: "Hassan lavora con HTML5, CSS3, JavaScript e React.js.",
      projects: "I progetti di Hassan mostrano il suo percorso di sviluppo web.",
      education: "Hassan studia presso la Lahore Garrison University.",
      contact: "Puoi contattare Hassan tramite la sezione contatti.",
      help: "Puoi fare domande sul background o sulle competenze di Hassan.",
      thanks: "Prego! 😊",
      fallback: "Posso rispondere alle domande sul portfolio di Hassan.",
    },
  },

  tr: {
    placeholder: "Mesajınızı yazın...",
    welcome: "Bugün size nasıl yardımcı olabilirim?",
    listening: "Dinleniyor... Şimdi konuşun",
    thinking: "Düşünüyor...",
    micUnsupported: "Bu tarayıcıda sesli giriş desteklenmiyor.",
    assistant: "Hassan AI Assistant",
    you: "Sen",
    reset: "Yeni sohbet başlat",
    close: "Kapat",
    changeLanguage: "Dili değiştir",
    send: "Gönder",
    speak: "Mesaj söyle",
    stopMic: "Mikrofonu durdur",
    replies: {
      greeting: "Merhaba! 👋 Hassan Ali'nin portfolyosuna hoş geldiniz.",
      about: "Hassan Ali, Lahore Pakistan'da Bilgisayar Bilimleri öğrencisidir.",
      skills: "Hassan HTML5, CSS3, JavaScript ve React.js ile çalışmaktadır.",
      projects: "Hassan'ın projeleri modern web geliştirme çalışmalarını gösterir.",
      education: "Hassan, Lahore Garrison Üniversitesi'nde okumaktadır.",
      contact: "İletişim bölümünden Hassan ile iletişime geçebilirsiniz.",
      help: "Hassan'ın eğitimi veya projeleri hakkında sorular sorabilirsiniz.",
      thanks: "Rica ederim! 😊",
      fallback: "Hassan'ın portfolyosu hakkında soruları yanıtlayabilirim.",
    },
  },

  ko: {
    placeholder: "메시지를 입력하세요...",
    welcome: "오늘 무엇을 도와드릴까요?",
    listening: "듣고 있습니다... 말씀하세요",
    thinking: "생각 중...",
    micUnsupported: "이 브라우저는 음성 입력을 지원하지 않습니다.",
    assistant: "Hassan AI Assistant",
    you: "사용자",
    reset: "새 대화 시작",
    close: "닫기",
    changeLanguage: "언어 변경",
    send: "전송",
    speak: "음성 입력",
    stopMic: "마이크 중지",
    replies: {
      greeting: "안녕하세요! 👋 Hassan Ali의 포트폴리오에 오신 것을 환영합니다.",
      about: "Hassan Ali는 파키스탄 라호르 가리슨 대학교의 컴퓨터 과학 학생입니다.",
      skills: "Hassan은 HTML5, CSS3, JavaScript 및 React.js를 사용합니다.",
      projects: "Hassan의 프로젝트는 웹 개발 여정을 보여줍니다.",
      education: "Hassan은 라호르 가리슨 대학교에서 공부하고 있습니다.",
      contact: "연락처 섹션을 통해 Hassan에게 연락할 수 있습니다.",
      help: "Hassan의 배경이나 기술에 대해 질문하실 수 있습니다.",
      thanks: "천만에요! 😊",
      fallback: "Hassan의 포트폴리오에 대해 답변해 드릴 수 있습니다.",
    },
  },

  fa: {
    placeholder: "پیام خود را بنویسید...",
    welcome: "امروز چطور می‌توانم به شما کمک کنم؟",
    listening: "در حال گوش دادن... صحبت کنید",
    thinking: "در حال تفکر...",
    micUnsupported: "ورودی صدا در این مرورگر پشتیبانی نمی‌شود.",
    assistant: "Hassan AI Assistant",
    you: "شما",
    reset: "شروع گفتگوی جدید",
    close: "بستن",
    changeLanguage: "تغییر زبان",
    send: "ارسال پیام",
    speak: "ارسال پیام صوتی",
    stopMic: "متوقف کردن میکروفون",
    replies: {
      greeting: "سلام! 👋 به پورتفولیوی حسن علی خوش آمدید.",
      about: "حسن علی دانشجوی علوم کامپیوتر در لاهور پاکستان است.",
      skills: "حسن با HTML5، CSS3، JavaScript و React.js کار می‌کند.",
      projects: "پروژه‌های حسن مسیر توسعه وب او را نشان می‌دهند.",
      education: "حسن در دانشگاه لاهور گاریشون تحصیل می‌کند.",
      contact: "می‌توانید از طریق بخش تماس با حسن ارتباط برقرار کنید.",
      help: "می‌توانید درباره پیشینه یا مهارت‌های حسن سوال کنید.",
      thanks: "خواهش می‌کنم! 😊",
      fallback: "من می‌توانم به سوالات مربوط به پورتفولیوی حسن پاسخ دهم.",
    },
  },

  nl: {
    placeholder: "Typ je bericht...",
    welcome: "Hoe kan ik je vandaag helpen?",
    listening: "Luisteren... Spreek nu",
    thinking: "Aan het denken...",
    micUnsupported: "Spraakinvoer wordt niet ondersteund.",
    assistant: "Hassan AI Assistant",
    you: "Jij",
    reset: "Nieuwe gesprek starten",
    close: "Sluiten",
    changeLanguage: "Taal wijzigen",
    send: "Versturen",
    speak: "Inspreken",
    stopMic: "Microfoon stoppen",
    replies: {
      greeting: "Hallo! 👋 Welkom bij het portfolio van Hassan Ali.",
      about: "Hassan Ali studeert Informatica in Lahore, Pakistan.",
      skills: "Hassan werkt met HTML5, CSS3, JavaScript en React.js.",
      projects: "Hassan's projecten tonen zijn webontwikkelingsreis.",
      education: "Hassan studeert aan Lahore Garrison University.",
      contact: "Je kunt contact opnemen via het contactgedeelte.",
      help: "Je kunt vragen stellen over Hassan's vaardigheden.",
      thanks: "Graag gedaan! 😊",
      fallback: "Ik kan vragen beantwoorden over Hassan's portfolio.",
    },
  },

  id: {
    placeholder: "Ketik pesan Anda...",
    welcome: "Ada yang bisa saya bantu hari ini?",
    listening: "Mendengarkan... Bicara sekarang",
    thinking: "Berpikir...",
    micUnsupported: "Input suara tidak didukung di browser ini.",
    assistant: "Hassan AI Assistant",
    you: "Anda",
    reset: "Mulai percakapan baru",
    close: "Tutup",
    changeLanguage: "Ubah bahasa",
    send: "Kirim",
    speak: "Bicara",
    stopMic: "Hentikan mikrofon",
    replies: {
      greeting: "Halo! 👋 Selamat datang di portofolio Hassan Ali.",
      about: "Hassan Ali adalah mahasiswa Ilmu Komputer di Lahore, Pakistan.",
      skills: "Hassan bekerja dengan HTML5, CSS3, JavaScript, dan React.js.",
      projects: "Proyek Hassan menampilkan perjalanan pengembangan webnya.",
      education: "Hassan belajar di Lahore Garrison University.",
      contact: "Anda dapat menghubungi Hassan melalui bagian kontak.",
      help: "Anda dapat bertanya tentang latar belakang Hassan.",
      thanks: "Sama-sama! 😊",
      fallback: "Saya bisa menjawab pertanyaan tentang portofolio Hassan.",
    },
  },

  ms: {
    placeholder: "Taip mesej anda...",
    welcome: "Bagaimana saya boleh membantu anda hari ini?",
    listening: "Mendengar... Bercakap sekarang",
    thinking: "Sedang berfikir...",
    micUnsupported: "Input suara tidak disokong dalam penyemak imbas ini.",
    assistant: "Hassan AI Assistant",
    you: "Anda",
    reset: "Mula perbualan baharu",
    close: "Tutup",
    changeLanguage: "Tukar bahasa",
    send: "Hantar",
    speak: "Bercakap",
    stopMic: "Hentikan mikrofon",
    replies: {
      greeting: "Helo! 👋 Selamat datang ke portfolio Hassan Ali.",
      about: "Hassan Ali ialah pelajar Sains Komputer di Lahore, Pakistan.",
      skills: "Hassan bekerja dengan HTML5, CSS3, JavaScript dan React.js.",
      projects: "Projek Hassan menunjukkan perjalanan pembangunan webnya.",
      education: "Hassan belajar di Lahore Garrison University.",
      contact: "Anda boleh menghubungi Hassan melalui bahagian hubungan.",
      help: "Anda boleh bertanya tentang latar belakang Hassan.",
      thanks: "Sama-sama! 😊",
      fallback: "Saya boleh menjawab soalan mengenai portfolio Hassan.",
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

  const current = CONTENT[language] || CONTENT.en;
  const isRtl = language === "ur" || language === "ar" || language === "fa";

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
        createMessage("bot", current.replies.greeting, "greeting"),
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
      createMessage("bot", current.replies.greeting, "greeting"),
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

    const newContent = CONTENT[code] || CONTENT.en;

    setMessages((previous) =>
      previous.map((item) => {
        if (item.role === "bot" && item.replyKey) {
          return {
            ...item,
            text:
              newContent.replies[item.replyKey] ||
              newContent.replies.fallback,
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
          current.replies[replyKey] || current.replies.fallback,
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

    recognition.lang =
      language === "ur"
        ? "ur-PK"
        : language === "ar"
        ? "ar-SA"
        : language === "es"
        ? "es-ES"
        : language === "fr"
        ? "fr-FR"
        : "en-US";

    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      if (mountedRef.current) setIsListening(true);
    };

    recognition.onresult = (event) => {
      let transcript = "";

      for (let i = event.resultIndex; i < event.results.length; i += 1) {
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

        /* Chat Window */
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
          transition: transform .2s ease, background .2s ease;
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
          font-size: 11px;
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

        /* Modern Dropdown Menu Styling */
        .hc-language-menu {
          position: absolute;
          z-index: 20;
          top: 40px;
          right: 0;
          left: auto;
          width: 150px;
          max-height: 220px;
          overflow-y: auto;
          padding: 6px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 14px;
          background: #12162b;
          box-shadow: 0 16px 40px rgba(0,0,0,.45);
          animation: hc-menu-in .15s ease both;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,.2) transparent;
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
          transition: transform .2s ease, background .2s ease;
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
          gap: 1px;
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

        .hc-language-option:hover {
          background: rgba(99, 102, 241, 0.15);
          color: #a5b4fc;
        }

        .hc-language-option.active {
          background: rgba(99, 102, 241, 0.28);
          font-weight: 600;
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
                    ? current.replies[item.replyKey] ||
                      current.replies.fallback
                    : item.text;

                const botTextIsRtl = item.role === "bot" && isRtl;

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
                        dir={isRtl ? "rtl" : "ltr"}
                        style={{ textAlign: isRtl ? "right" : "left" }}
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
                      dir={isRtl ? "rtl" : "ltr"}
                      style={{ textAlign: isRtl ? "right" : "left" }}
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