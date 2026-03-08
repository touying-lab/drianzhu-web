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

  // Legacy Path
  "legacy.title": { en: "THE LEGACY PATH", cn: "传承之路" },
  "legacy.qualifications": { en: "PROFESSIONAL QUALIFICATIONS", cn: "专业资质" },
  "legacy.viewInsights": { en: "VIEW STRATEGIC INSIGHTS", cn: "查看战略洞察" },

  // Insights Section
  "insights.title": { en: "INSIGHTS", cn: "洞察" },
  "insights.viewAll": { en: "VIEW ALL INSIGHTS →", cn: "查看全部洞察 →" },
  "insights.touYing": { en: "Tou Ying Tracker", cn: "投英追踪" },
  "insights.touYingDesc": { en: "Annual flagship report tracking Chinese investment in the UK, officially cited by government and industry bodies.", cn: "追踪中国在英投资的年度旗舰报告，被政府和行业机构官方引用。" },
  "insights.mna": { en: "Cross-Border M&A Analysis", cn: "跨境并购分析" },
  "insights.mnaDesc": { en: "In-depth analysis of cross-border mergers and acquisitions, regulatory trends, and market dynamics.", cn: "深入分析跨境并购、监管趋势和市场动态。" },
  "insights.ukChina": { en: "UK-China Relations", cn: "中英关系" },
  "insights.ukChinaDesc": { en: "Strategic insights on bilateral economic relations, policy developments, and investment opportunities.", cn: "关于双边经济关系、政策发展和投资机会的战略洞察。" },

  // Social Fabric
  "social.title": { en: "THE SOCIAL FABRIC", cn: "社交纽带" },
  "social.explore": { en: "EXPLORE ENGAGEMENTS", cn: "探索社交活动" },

  // Journal Section
  "journal.title": { en: "THE JOURNAL", cn: "日志" },
  "journal.readMore": { en: "Read More", cn: "阅读更多" },

  // AI Avatar Section
  "ai.title": { en: "AI AVATAR", cn: "AI 虚拟形象" },
  "ai.subtitle": { en: "Engage with Dr. Zhu's Digital Mind", cn: "与朱博士的数字智慧互动" },
  "ai.description": { en: "An AI-powered extension trained on decades of expertise in cross-border finance, dispute resolution, and UK-China relations. Ask questions, seek insights, and explore strategic perspectives.", cn: "基于数十年跨境金融、争议解决和中英关系专业知识训练的AI智能助手。提出问题、寻求洞察、探索战略视角。" },
  "ai.cta": { en: "START CONVERSATION", cn: "开始对话" },
  "ai.comingSoon": { en: "COMING SOON", cn: "即将推出" },

  // Footer
  "footer.tagline": { en: "Building Global Trust Through Finance, Law and Culture", cn: "通过金融、法律和文化建立全球信任" },
  "footer.credential": { en: "International Sales &\nCross-Border Dispute Resolution Expert", cn: "国际销售与\n跨境争议解决专家" },
  "footer.wechat.title": { en: "WeChat Official Account", cn: "微信公众号" },
  "footer.wechat.scan": { en: "Scan the QR code to follow", cn: "扫描二维码关注" },
  "footer.privacy": { en: "Privacy Policy", cn: "隐私政策" },
  "footer.terms": { en: "Terms of Use", cn: "使用条款" },
  "footer.cookies": { en: "Cookie Settings", cn: "Cookie 设置" },
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
