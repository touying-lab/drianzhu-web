/**
 * Language Context - i18n Support
 * Provides EN/CN language switching across the entire site
 */

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "cn";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  "nav.home": { en: "HOME", cn: "首页" },
  "nav.architect": { en: "THE ARCHITECT", cn: "建筑师" },
  "nav.insights": { en: "INSIGHTS", cn: "洞察" },
  "nav.journal": { en: "THE JOURNAL", cn: "日志" },
  "nav.engagements": { en: "ENGAGEMENTS", cn: "社交活动" },
  "nav.aiAvatar": { en: "AI AVATAR", cn: "AI 虚拟形象" },
  "nav.store": { en: "STORE", cn: "商店" },
  "nav.contact": { en: "CONTACT", cn: "联系" },
  "nav.langToggle": { en: "EN / 中", cn: "中 / EN" },

  // Hero Section
  "hero.welcome1": { en: "Hello and welcome to my website!", cn: "你好，欢迎来到我的网站！" },
  "hero.welcome2": { en: "I hope you'll take some time to look around", cn: "希望你能花些时间浏览一下" },
  "hero.welcome3": { en: "and enjoy the insights, photos, videos and updates.", cn: "欣赏这里的洞察、照片、视频和最新动态。" },
  "hero.welcome4": { en: "Thanks for stopping by.", cn: "感谢你的到来。" },
  "hero.love": { en: "Love,", cn: "此致，" },
  "hero.explore": { en: "Explore", cn: "探索" },
  "hero.clickExplore": { en: "Click to explore", cn: "点击探索" },
  "hero.scroll": { en: "Scroll", cn: "滚动" },

  // Legacy Path (Home section)
  "legacy.title": { en: "THE LEGACY PATH", cn: "传承之路" },
  "legacy.qualifications": { en: "PROFESSIONAL QUALIFICATIONS", cn: "专业资质" },
  "legacy.viewInsights": { en: "VIEW STRATEGIC INSIGHTS", cn: "查看战略洞察" },

  // Insights Section (Home preview)
  "insights.title": { en: "INSIGHTS", cn: "洞察" },
  "insights.viewAll": { en: "VIEW ALL INSIGHTS →", cn: "查看全部洞察 →" },
  "insights.touYing": { en: "Tou Ying Tracker", cn: "投英追踪" },
  "insights.touYingDesc": { en: "Annual flagship report tracking Chinese investment in the UK, officially cited by government and industry bodies.", cn: "追踪中国在英投资的年度旗舰报告，被政府和行业机构官方引用。" },
  "insights.touYingYears": { en: "2016 - Present", cn: "2016 年至今" },
  "insights.mna": { en: "Cross-Border M&A Analysis", cn: "跨境并购分析" },
  "insights.mnaDesc": { en: "In-depth analysis of cross-border mergers and acquisitions, regulatory trends, and market dynamics.", cn: "深入分析跨境并购、监管趋势和市场动态。" },
  "insights.mnaYears": { en: "Ongoing Research", cn: "持续研究" },
  "insights.ukChina": { en: "UK-China Relations", cn: "中英关系" },
  "insights.ukChinaDesc": { en: "Strategic insights on bilateral economic relations, policy developments, and investment opportunities.", cn: "关于双边经济关系、政策发展和投资机会的战略洞察。" },
  "insights.ukChinaYears": { en: "Thought Leadership", cn: "思想领导力" },

  // Insights Page (full page)
  "insightsPage.hero.title": { en: "INSIGHTS", cn: "洞察" },
  "insightsPage.hero.subtitle": { en: "Strategic Intelligence on UK-China Business", cn: "中英商业战略情报" },
  "insightsPage.hero.desc": { en: "Decades of research, analysis, and thought leadership at the intersection of finance, law, and cross-border commerce.", cn: "数十年在金融、法律与跨境商业交汇处的研究、分析与思想领导力。" },
  "insightsPage.reports.title": { en: "TOU YING TRACKER", cn: "投英追踪" },
  "insightsPage.reports.subtitle": { en: "Annual Report on Chinese Investment in the UK", cn: "中国在英投资年度报告" },
  "insightsPage.reports.download": { en: "Download Report", cn: "下载报告" },
  "insightsPage.research.title": { en: "RESEARCH AREAS", cn: "研究领域" },
  "insightsPage.research.mna": { en: "Cross-Border M&A Analysis", cn: "跨境并购分析" },
  "insightsPage.research.mnaDesc": { en: "In-depth analysis of cross-border mergers and acquisitions between the UK and China, covering regulatory trends, deal structures, and market dynamics that shape bilateral investment flows.", cn: "深入分析中英跨境并购，涵盖监管趋势、交易结构以及影响双边投资流动的市场动态。" },
  "insightsPage.research.ukChina": { en: "UK-China Economic Relations", cn: "中英经济关系" },
  "insightsPage.research.ukChinaDesc": { en: "Strategic insights on bilateral economic relations, policy developments, trade patterns, and investment opportunities. Tracking the evolution of one of the world's most important economic corridors.", cn: "关于双边经济关系、政策发展、贸易格局和投资机会的战略洞察，追踪全球最重要经济走廊之一的演变。" },
  "insightsPage.research.dispute": { en: "Dispute Resolution & Restructuring", cn: "争议解决与重组" },
  "insightsPage.research.disputeDesc": { en: "Expert analysis of cross-border dispute resolution mechanisms, insolvency proceedings, and corporate restructuring strategies for Chinese enterprises operating in the UK market.", cn: "针对在英运营的中国企业，专业分析跨境争议解决机制、破产程序及企业重组策略。" },
  "insightsPage.cta.title": { en: "COLLABORATE ON RESEARCH", cn: "研究合作" },
  "insightsPage.cta.desc": { en: "Interested in collaborating on research, contributing to the Tou Ying Tracker, or commissioning bespoke analysis? Get in touch.", cn: "有意合作研究、为《投英追踪》贡献内容或委托定制分析？欢迎联系。" },
  "insightsPage.cta.button": { en: "GET IN TOUCH", cn: "立即联系" },

  // Social Fabric
  "social.title": { en: "THE SOCIAL FABRIC", cn: "社交纽带" },
  "social.explore": { en: "EXPLORE ENGAGEMENTS", cn: "探索社交活动" },

  // Journal Section (Home preview)
  "journal.title": { en: "THE JOURNAL", cn: "日志" },
  "journal.readMore": { en: "Read More", cn: "阅读更多" },

  // Journal Page
  "journalPage.hero.title": { en: "THE JOURNAL", cn: "日志" },
  "journalPage.hero.subtitle": { en: "Reflections on Finance, Law & Culture", cn: "金融、法律与文化的思考" },
  "journalPage.hero.desc": { en: "Reflections on cross-border commerce, legal practice, and the art of building trust across cultures.", cn: "对跨境商业、法律实践以及跨文化建立信任艺术的思考。" },
  "journalPage.thoughtsLabel": { en: "THOUGHTS & OBSERVATIONS", cn: "思考与观察" },
  "journalPage.recentLabel": { en: "RECENT ARTICLES", cn: "最新文章" },
  "journalPage.featured": { en: "FEATURED", cn: "精选" },
  "journalPage.readArticle": { en: "READ ARTICLE", cn: "阅读文章" },
  "journalPage.allArticles": { en: "ALL ARTICLES", cn: "全部文章" },
  "journalPage.originalSource": { en: "ORIGINAL SOURCE", cn: "原文来源" },
  "journalPage.readOnWechat": { en: "Read on WeChat →", cn: "在微信阅读 →" },
  "journalPage.nextArticle": { en: "NEXT ARTICLE", cn: "下一篇" },
  "journalPage.notFound": { en: "Article Not Found", cn: "文章未找到" },
  "journalPage.back": { en: "Back to Journal", cn: "返回日志" },
  "journalPage.prev": { en: "Previous", cn: "上一篇" },
  "journalPage.next": { en: "Next", cn: "下一篇" },
  "journalPage.readMore": { en: "Read More →", cn: "阅读更多 →" },

  // AI Avatar Section (Home preview)
  "ai.title": { en: "AI AVATAR", cn: "AI 虚拟形象" },
  "ai.subtitle": { en: "Engage with Dr. Zhu's Digital Mind", cn: "与朱博士的数字智慧互动" },
  "ai.description": { en: "An AI-powered extension trained on decades of expertise in cross-border finance, dispute resolution, and UK-China relations. Ask questions, seek insights, and explore strategic perspectives.", cn: "基于数十年跨境金融、争议解决和中英关系专业知识训练的AI智能助手。提出问题、寻求洞察、探索战略视角。" },
  "ai.cta": { en: "START CONVERSATION", cn: "开始对话" },
  "ai.comingSoon": { en: "COMING SOON", cn: "即将推出" },

  // AI Avatar Page
  "aiPage.hero.title": { en: "AI AVATAR", cn: "AI 虚拟形象" },
  "aiPage.hero.subtitle": { en: "The Digital Personas of Dr. Ian Zhu", cn: "朱博士的数字人格" },
  "aiPage.hero.desc": { en: "Beyond the boardroom, Dr. Zhu embodies multiple dimensions of excellence. Explore the facets of a Renaissance man through his AI-powered digital personas.", cn: "超越会议室，朱博士体现了多维度的卓越。通过其AI驱动的数字人格，探索这位文艺复兴式人物的多个侧面。" },
  "aiPage.persona": { en: "PERSONA", cn: "人格" },
  "aiPage.comingSoon": { en: "COMING SOON", cn: "即将推出" },
  "aiPage.comingSoonDesc": { en: "The AI Avatar is currently in development. Soon you'll be able to engage with Dr. Zhu's digital intelligence across all his personas.", cn: "AI虚拟形象正在开发中。即将推出，您将能够与朱博士所有人格的数字智慧进行互动。" },
  "aiPage.notify": { en: "NOTIFY ME WHEN LIVE", cn: "上线时通知我" },

  // The Architect Page
  "architectPage.hero.title": { en: "THE ARCHITECT", cn: "建筑师" },
  "architectPage.hero.intro": { en: "Dr. Ian Zhu — International Sales Expert, Cross-Border Dispute Resolution Specialist, and a bridge between Eastern and Western business worlds.", cn: "朱博士 — 国际销售专家、跨境争议解决专家，东西方商业世界的桥梁。" },
  "architectPage.hero.career": { en: "A career spanning three decades, three continents, and countless deals that have shaped the landscape of UK-China business relations.", cn: "职业生涯横跨三十年、三大洲，无数交易塑造了中英商业关系的格局。" },
  "architectPage.quote": { en: "\"Every deal tells a story. Every negotiation reveals character. Every bridge built between cultures creates lasting value.\"", cn: "「每一笔交易都讲述一个故事。每一次谈判都揭示人的性格。每一座跨文化的桥梁都创造持久的价值。」" },
  "architectPage.qualifications": { en: "QUALIFICATIONS", cn: "专业资质" },
  "architectPage.philosophy.title": { en: "PHILOSOPHY", cn: "理念" },
  "architectPage.philosophy.quote": { en: "\"Building Global Trust Through Finance, Law and Culture\"", cn: "「通过金融、法律和文化建立全球信任」" },
  "architectPage.philosophy.desc": { en: "In a world of increasing complexity, Dr. Zhu believes that genuine trust — built through deep cultural understanding, professional excellence, and personal integrity — remains the most valuable currency in international business.", cn: "在日益复杂的世界中，朱博士相信，通过深厚的文化理解、卓越的专业素养和个人诚信所建立的真正信任，依然是国际商业中最宝贵的货币。" },

  // Engagements Page
  "engagementsPage.hero.title": { en: "ENGAGEMENTS", cn: "社交活动" },
  "engagementsPage.hero.subtitle": { en: "A Chronicle of Global Connections", cn: "全球联结纪实" },
  "engagementsPage.back": { en: "Back", cn: "返回" },

  // Contact Page
  "contactPage.hero.title": { en: "GET IN TOUCH", cn: "联系我" },
  "contactPage.hero.subtitle": { en: "Let's Build Something Together", cn: "让我们共同创造" },
  "contactPage.hero.desc": { en: "Whether you're looking to explore a business opportunity, invite Dr. Zhu for a speaking engagement, or simply connect — reach out through the channels below.", cn: "无论您是想探索商业机会、邀请朱博士出席演讲，还是单纯希望建立联系，请通过以下渠道与我们联系。" },
  "contactPage.form.name": { en: "Full Name", cn: "姓名" },
  "contactPage.form.email": { en: "Email Address", cn: "电子邮箱" },
  "contactPage.form.enquiry": { en: "Enquiry Type", cn: "咨询类型" },
  "contactPage.form.enquiryPlaceholder": { en: "Select enquiry type", cn: "请选择咨询类型" },
  "contactPage.form.message": { en: "Your Message", cn: "您的留言" },
  "contactPage.form.terms": { en: "I agree to the Terms of Use and Privacy Policy", cn: "我同意使用条款和隐私政策" },
  "contactPage.form.submit": { en: "SEND MESSAGE", cn: "发送消息" },
  "contactPage.form.required": { en: "Please fill in all required fields.", cn: "请填写所有必填项。" },
  "contactPage.form.termsRequired": { en: "Please accept the terms and conditions.", cn: "请同意条款和条件。" },
  "contactPage.form.success": { en: "Message sent successfully", cn: "消息发送成功" },
  "contactPage.form.successDesc": { en: "Thank you for your enquiry. We will respond within 48 hours.", cn: "感谢您的咨询，我们将在48小时内回复。" },
  "contactPage.social.title": { en: "CONNECT", cn: "社交媒体" },
  "contactPage.location.title": { en: "BASED IN", cn: "所在地" },
  "contactPage.location.city": { en: "London, United Kingdom", cn: "英国伦敦" },

  // Store Page
  "storePage.hero.title": { en: "THE STORE", cn: "精品商店" },
  "storePage.hero.subtitle": { en: "Curated Excellence", cn: "臻选精品" },
  "storePage.hero.desc": { en: "A carefully curated selection of fine wines, premium spirits, rare teas, and luxury goods — each chosen for its exceptional quality and cultural significance.", cn: "精心甑选的名酒、优质烈酒、珍稀茶叶及奢侈品，每件均以卓越品质和文化意义为标准。" },
  "storePage.all": { en: "ALL", cn: "全部" },
  "storePage.wine": { en: "FINE WINES", cn: "名酒" },
  "storePage.whisky": { en: "WHISKY", cn: "威士忌" },
  "storePage.tea": { en: "CHINESE TEA", cn: "中国茶" },
  "storePage.leather": { en: "LEATHER GOODS", cn: "皮具" },
  "storePage.apparel": { en: "APPAREL", cn: "服饰" },
  "storePage.addToCart": { en: "ADD TO COLLECTION", cn: "加入收藏" },
  "storePage.comingSoon": { en: "Coming Soon", cn: "即将推出" },
  "storePage.comingSoonDesc": { en: "The store will be available for purchases shortly.", cn: "商店将尽快开放购买功能。" },
  "storePage.limitedEdition": { en: "Limited Edition", cn: "限量版" },
  "storePage.collectorsChoice": { en: "Collector's Choice", cn: "藏家之选" },
  "storePage.rareReserve": { en: "Rare Reserve", cn: "珍稀珍藏" },
  "storePage.agedReserve": { en: "Aged Reserve", cn: "陈年珍藏" },
  "storePage.noProducts": { en: "No products in this category yet.", cn: "该分类暂无商品。" },
  "storePage.bespoke.title": { en: "BESPOKE ENQUIRIES", cn: "定制和询" },
  "storePage.bespoke.desc": { en: "For private collections, corporate gifting, or bespoke commissions, please reach out to our concierge team for a personalised consultation.", cn: "如需私人收藏、企业馈赠或定制委托，请联系我们的礼宾团队进行个性化和询。" },
  "storePage.concierge": { en: "CONTACT CONCIERGE", cn: "联系礼宾" },

  // Footer
  "footer.tagline": { en: "Building Global Trust Through Finance, Law and Culture", cn: "通过金融、法律和文化建立全球信任" },
  "footer.credential": { en: "International Sales &\nCross-Border Dispute Resolution Expert", cn: "国际销售与\n跨境争议解决专家" },
  "footer.wechat.title": { en: "WeChat Official Account", cn: "微信公众号" },
  "footer.wechat.scan": { en: "Scan the QR code to follow", cn: "扫描二维码关注" },
  "footer.wechat.name": { en: "TOU YING", cn: "投英 TOU YING" },
  "footer.privacy": { en: "Privacy Policy", cn: "隐私政策" },
  "footer.terms": { en: "Terms of Use", cn: "使用条款" },
  "footer.cookies": { en: "Cookie Settings", cn: "Cookie 设置" },
  "footer.copyright": { en: "© 2026 DR IAN ZHU.\nALL RIGHTS RESERVED.", cn: "© 2026 朱博士。\n保留所有权利。" },

  // Privacy Policy
  "privacyPage.title": { en: "PRIVACY POLICY", cn: "隐私政策" },
  "privacyPage.updated": { en: "Last Updated: February 2026", cn: "最后更新：2026年2月" },

  // Terms of Use
  "termsPage.title": { en: "TERMS OF USE", cn: "使用条款" },
  "termsPage.updated": { en: "Last Updated: February 2026", cn: "最后更新：2026年2月" },

  // Cookie Settings
  "cookiePage.title": { en: "COOKIE SETTINGS", cn: "Cookie 设置" },
  "cookiePage.desc": { en: "We use cookies to enhance your experience on our website. You can manage your preferences below.", cn: "我们使用 Cookie 来提升您的网站体验。您可以在下方管理您的偏好设置。" },
  "cookiePage.save": { en: "SAVE PREFERENCES", cn: "保存偏好" },
  "cookiePage.required": { en: "Required", cn: "必要" },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
