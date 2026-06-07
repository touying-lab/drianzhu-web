import type { LucideIcon } from "lucide-react";
import {
  BriefcaseBusiness,
  Clapperboard,
  Landmark,
  Mic2,
  Presentation,
  Tv,
} from "lucide-react";

export type VideoPlatform = "bilibili" | "youtube";

export type VideoItem = {
  title: string;
  description: string;
  date: string;
  thumbnail: string;
  category: string;
  bilibiliUrl?: string;
  youtubeUrl?: string;
};

export type VideoCollection = {
  slug: string;
  title: string;
  description: string;
  featureDescription: string;
  videoCountLabel: string;
  lastUpdated: string;
  platformSources: VideoPlatform[];
  category: string;
  coverImage: string;
  icon: LucideIcon;
  featured?: boolean;
  keywords: string[];
  videos: VideoItem[];
};

const thumbnailBase =
  "linear-gradient(135deg, rgba(13, 27, 42, 0.96), rgba(19, 34, 56, 0.92) 45%, rgba(201, 162, 39, 0.28))";

const svgText = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;");

export const createPremiumThumbnail = (title: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#0D1B2A"/>
          <stop offset="52%" stop-color="#132238"/>
          <stop offset="100%" stop-color="#2B2718"/>
        </linearGradient>
        <radialGradient id="glow" cx="72%" cy="30%" r="58%">
          <stop offset="0%" stop-color="#C9A227" stop-opacity="0.34"/>
          <stop offset="100%" stop-color="#C9A227" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1280" height="720" fill="url(#bg)"/>
      <rect width="1280" height="720" fill="url(#glow)"/>
      <rect x="72" y="72" width="1136" height="576" fill="none" stroke="#C9A227" stroke-opacity="0.34" stroke-width="2"/>
      <rect x="104" y="104" width="1072" height="512" fill="none" stroke="#C9A227" stroke-opacity="0.16" stroke-width="1"/>
      <text x="640" y="322" text-anchor="middle" fill="#C9A227" font-family="Cinzel, Georgia, serif" font-size="42" letter-spacing="8">DR IAN ZHU</text>
      <line x1="520" y1="360" x2="760" y2="360" stroke="#C9A227" stroke-opacity="0.72" stroke-width="2"/>
      <text x="640" y="420" text-anchor="middle" fill="#F5F5F5" fill-opacity="0.86" font-family="Cormorant Garamond, Georgia, serif" font-size="38">${svgText(title)}</text>
    </svg>
  `)}`;

const createCollectionCover = ({
  title,
  subtitle,
  motif,
  accent = "#C9A227",
}: {
  title: string;
  subtitle: string;
  motif: string;
  accent?: string;
}) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="760" viewBox="0 0 1200 760">
      <defs>
        <linearGradient id="coverBg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#071421"/>
          <stop offset="48%" stop-color="#0D1B2A"/>
          <stop offset="100%" stop-color="#182640"/>
        </linearGradient>
        <radialGradient id="goldGlow" cx="74%" cy="24%" r="56%">
          <stop offset="0%" stop-color="${accent}" stop-opacity="0.42"/>
          <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
        </radialGradient>
        <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M 56 0 L 0 0 0 56" fill="none" stroke="${accent}" stroke-opacity="0.055" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="1200" height="760" fill="url(#coverBg)"/>
      <rect width="1200" height="760" fill="url(#grid)"/>
      <rect width="1200" height="760" fill="url(#goldGlow)"/>
      <circle cx="928" cy="180" r="132" fill="none" stroke="${accent}" stroke-opacity="0.2" stroke-width="2"/>
      <circle cx="928" cy="180" r="92" fill="none" stroke="${accent}" stroke-opacity="0.12" stroke-width="1"/>
      <path d="M82 604 C258 520 376 670 548 584 S842 486 1118 560" fill="none" stroke="${accent}" stroke-opacity="0.22" stroke-width="2"/>
      <path d="M98 132 H1102 V628 H98 Z" fill="none" stroke="${accent}" stroke-opacity="0.32" stroke-width="2"/>
      <path d="M128 162 H1072 V598 H128 Z" fill="none" stroke="#F5F5F5" stroke-opacity="0.08" stroke-width="1"/>
      <text x="156" y="236" fill="${accent}" font-family="Cinzel, Georgia, serif" font-size="30" letter-spacing="7">DR IAN ZHU</text>
      <line x1="156" y1="276" x2="320" y2="276" stroke="${accent}" stroke-opacity="0.75" stroke-width="2"/>
      <text x="156" y="386" fill="#F5F5F5" font-family="Cinzel, Georgia, serif" font-size="50" letter-spacing="5">${svgText(title)}</text>
      <text x="156" y="452" fill="#F5F5F5" fill-opacity="0.74" font-family="Cormorant Garamond, Georgia, serif" font-size="30">${svgText(subtitle)}</text>
      <text x="156" y="544" fill="${accent}" fill-opacity="0.72" font-family="Cormorant Garamond, Georgia, serif" font-size="26" letter-spacing="2">${svgText(motif)}</text>
    </svg>
  `)}`;

const pekingVideos: VideoItem[] = [
  {
    title: "0421 PEK Oliver Haunch 普通法体系下的跨境重组路径与策略选择",
    description:
      "A Peking session by Oliver Haunch on cross-border restructuring routes and strategic choices under common law systems.",
    date: "June 07, 2026",
    thumbnail: "https://i0.hdslb.com/bfs/archive/d6fd2115fab219114f34261e7f6726fb29c69b0d.jpg",
    category: "Peking",
    bilibiliUrl: "https://www.bilibili.com/video/BV1xuEh6VENs/",
  },
  {
    title: "0421 PEK 新 穆忠和 冲突法与联合国示范法视野下的中资企业跨境重组",
    description:
      "A Peking presentation by Mu Zhonghe on Chinese enterprise cross-border restructuring from conflict-of-laws and UNCITRAL Model Law perspectives.",
    date: "June 07, 2026",
    thumbnail: "https://i1.hdslb.com/bfs/archive/9f4cacae2bb74de945a0e259f9130655ff970661.jpg",
    category: "Peking",
    bilibiliUrl: "https://www.bilibili.com/video/BV1qsEh6wEzf/",
  },
  {
    title: "0421 PEK 新 梁闽海 中资企业跨境债务重组的整体战略",
    description:
      "A Peking session by Liang Minhai on overall strategy for cross-border debt restructuring by Chinese-funded enterprises.",
    date: "June 07, 2026",
    thumbnail: "https://i0.hdslb.com/bfs/archive/1ae2012af57101b91fdd85d63ffffee837a67b10.jpg",
    category: "Peking",
    bilibiliUrl: "https://www.bilibili.com/video/BV1BsEh6wEFX/",
  },
  {
    title: "0421 PEK 实战推演 WORKSHOP",
    description:
      "A practical workshop and scenario exercise from the Peking cross-border restructuring programme.",
    date: "June 07, 2026",
    thumbnail: "https://i2.hdslb.com/bfs/archive/2ff33b5df11a548bc284287a6c69c73c4195282a.jpg",
    category: "Peking",
    bilibiliUrl: "https://www.bilibili.com/video/BV1ixEh6hE1Q/",
  },
  {
    title: "0421 PEK 实战推演 WORKSHOP",
    description:
      "A companion practical workshop segment from the Peking cross-border restructuring programme.",
    date: "June 07, 2026",
    thumbnail: "https://i2.hdslb.com/bfs/archive/2ff33b5df11a548bc284287a6c69c73c4195282a.jpg",
    category: "Peking",
    bilibiliUrl: "https://www.bilibili.com/video/BV1ixEh6hEZV/",
  },
  {
    title: "0421 PEK Strachan Gray YEUNG Sui Hung 债务偿还安排(SOA)在离岸重组中的策略定位",
    description:
      "A Peking discussion on the strategic positioning of schemes of arrangement in offshore restructuring.",
    date: "June 07, 2026",
    thumbnail: "https://i2.hdslb.com/bfs/archive/048aba390fb11511e064af04d7746672914959fd.jpg",
    category: "Peking",
    bilibiliUrl: "https://www.bilibili.com/video/BV1oxEh6hEpB/",
  },
  {
    title: "0421 PEK Liam Mills 法域选择的战略意义--英国法何以实现跨境重组的执行确定性",
    description:
      "A Peking session by Liam Mills on the strategic significance of jurisdictional choice and how English law supports enforcement certainty in cross-border restructuring.",
    date: "June 07, 2026",
    thumbnail: "https://i1.hdslb.com/bfs/archive/9cbfcbaa6516cbc5d907362113060cfe5ba1767f.jpg",
    category: "Peking",
    bilibiliUrl: "https://www.bilibili.com/video/BV1NuEh6VEgD/",
  },
  {
    title: "0421 PEK 陈巍 欢迎致辞welcome speech",
    description:
      "A Peking welcome speech by Chen Wei for the cross-border restructuring programme.",
    date: "June 07, 2026",
    thumbnail: "https://i2.hdslb.com/bfs/archive/e38a21942d3ba85ceadadbaf6d8aec0ccbe2e51a.jpg",
    category: "Peking",
    bilibiliUrl: "https://www.bilibili.com/video/BV1vbEh6bEhS/",
  },
];

const shangaiVideos: VideoItem[] = [
  {
    title: "0423 Shanghai 新 吴俊 境外重组官权利确认实务解析--以最高法年度报告案例为视角",
    description:
      "A Shanghai session analysing practical confirmation of overseas restructuring officer rights through the lens of annual report cases from China’s Supreme People’s Court.",
    date: "June 07, 2026",
    thumbnail: "https://i1.hdslb.com/bfs/archive/61d2848588f2f049d527829c48d142b318008c43.jpg",
    category: "Shangai",
    bilibiliUrl: "https://www.bilibili.com/video/BV1tEEt6zEwh/",
  },
  {
    title: "0423 Shanghai 新 陈效 跨境诉讼视角-中国企业在境外诉讼框架下的债务重组方案及实务分析",
    description:
      "A Shanghai presentation on debt restructuring plans and practical analysis for Chinese enterprises within overseas litigation frameworks.",
    date: "June 07, 2026",
    thumbnail: "https://i2.hdslb.com/bfs/archive/e33315755b8c3d78303dbecafd36ddd2e29a7c90.jpg",
    category: "Shangai",
    bilibiliUrl: "https://www.bilibili.com/video/BV1M7Et6gE9Z/",
  },
  {
    title: "0423 Shanghai 陈效 跨境诉讼视角-中国企业在境外诉讼框架下的债务重组方案及实务分析",
    description:
      "A companion Shanghai session discussing cross-border litigation perspectives on debt restructuring options for Chinese companies facing overseas proceedings.",
    date: "June 07, 2026",
    thumbnail: "https://i0.hdslb.com/bfs/archive/4c22a92d0e29b9f362c06e5328466074551e16d9.jpg",
    category: "Shangai",
    bilibiliUrl: "https://www.bilibili.com/video/BV1M7Et6gEy8/",
  },
  {
    title: "0423 Shanghai 实战推演 WORKSHOP",
    description:
      "A practical workshop and scenario exercise from the Shanghai cross-border restructuring programme.",
    date: "June 07, 2026",
    thumbnail: "https://i0.hdslb.com/bfs/archive/4d30238c756b36841ea68c29ac39c431d564d6b4.jpg",
    category: "Shangai",
    bilibiliUrl: "https://www.bilibili.com/video/BV1b7Et6gEsm/",
  },
  {
    title: "0423 Shanghai Oliver Haunch 并行程序在美元债重组中的承认与协调功能",
    description:
      "A Shanghai briefing by Oliver Haunch on recognition and coordination functions of parallel proceedings in offshore US-dollar bond restructurings.",
    date: "June 07, 2026",
    thumbnail: "https://i2.hdslb.com/bfs/archive/567f7308f059658f7887736c4f403f519d45c30d.jpg",
    category: "Shangai",
    bilibiliUrl: "https://www.bilibili.com/video/BV1FeEt6bELt/",
  },
  {
    title: "0423 Shanghai Liam Mills 英国法院对重组计划的审查逻辑--兼论跨境重组案件的承认",
    description:
      "A Shanghai session by Liam Mills on the review logic applied by English courts to restructuring plans and recognition in cross-border restructuring cases.",
    date: "June 07, 2026",
    thumbnail: "https://i0.hdslb.com/bfs/archive/4e8781c38506dcac17188eb56818cec0535e60f9.jpg",
    category: "Shangai",
    bilibiliUrl: "https://www.bilibili.com/video/BV1ceEt68E88/",
  },
  {
    title: "0423 Shanghai Ben McCosker Vivian Ma 马玮 跨境破产承认与协助机制的演进",
    description:
      "A Shanghai discussion by Ben McCosker, Vivian Ma and Ma Wei on the evolution of recognition and assistance mechanisms in cross-border insolvency.",
    date: "June 07, 2026",
    thumbnail: "https://i1.hdslb.com/bfs/archive/d8531aedba3dedf627c6758e7d392dd3fbae1698.jpg",
    category: "Shangai",
    bilibiliUrl: "https://www.bilibili.com/video/BV1cYEt6FE6s/",
  },
  {
    title: "0423 Shanghai 吴俊 境外重组官权利确认实务解析--以最高法年度报告案例为视角",
    description:
      "A companion Shanghai analysis by Wu Jun on practical recognition of overseas restructuring officer rights, viewed through Supreme People’s Court annual report cases.",
    date: "June 07, 2026",
    thumbnail: "https://i0.hdslb.com/bfs/archive/0cd7a3e4bd3aea5000e37f69f16a844347b5e992.jpg",
    category: "Shangai",
    bilibiliUrl: "https://www.bilibili.com/video/BV1cYEt6FEPB/",
  },
];

const nanjingVideos: VideoItem[] = [
  {
    title: "0424 Nanjing 新 陈长灿 跨境重组中股东权益保留的法律边界",
    description:
      "A Nanjing session examining the legal boundaries for retaining shareholder equity in cross-border restructuring scenarios.",
    date: "June 07, 2026",
    thumbnail: "https://i2.hdslb.com/bfs/archive/c585dedae9de145a11a81d8e1de27ffd57abcbd7.jpg",
    category: "Nanjing",
    bilibiliUrl: "https://www.bilibili.com/video/BV1SqEb6LExX/",
  },
  {
    title: "0424 Nanjing 新 陈德渊 中国律师在中资企业跨境债务重组中的作用",
    description:
      "A legal and commercial discussion on the role Chinese lawyers play in cross-border debt restructuring for Chinese-funded enterprises.",
    date: "June 07, 2026",
    thumbnail: "https://i2.hdslb.com/bfs/archive/8fc7329c8e9a6f869d9167cc32b89fec565baf3f.jpg",
    category: "Nanjing",
    bilibiliUrl: "https://www.bilibili.com/video/BV18qEb6LEW4/",
  },
  {
    title: "0424 Nanjing 实战推演 WORKSHOP",
    description:
      "A practical workshop and case-based simulation from the Nanjing cross-border restructuring programme.",
    date: "June 07, 2026",
    thumbnail: "https://i2.hdslb.com/bfs/archive/5992069d4021ce7f2fe0cc8cfd9af5b43a77b63d.jpg",
    category: "Nanjing",
    bilibiliUrl: "https://www.bilibili.com/video/BV1SqEb6LErx/",
  },
  {
    title: "0424 Nanjing 陈德渊 中国律师在中资企业跨境债务重组中的作用",
    description:
      "A companion Nanjing presentation on Chinese legal counsel and their contribution to restructuring Chinese enterprises' overseas debt positions.",
    date: "June 07, 2026",
    thumbnail: "https://i0.hdslb.com/bfs/archive/05dcfdce52f726f033657c3540e5039d17600cd4.jpg",
    category: "Nanjing",
    bilibiliUrl: "https://www.bilibili.com/video/BV19bEb6DEyM/",
  },
  {
    title: "0424 Nanjing 陈长灿 跨境重组中股东权益保留的法律边界",
    description:
      "A focused presentation on shareholder equity preservation and legal limits in cross-border restructuring plans.",
    date: "June 07, 2026",
    thumbnail: "https://i2.hdslb.com/bfs/archive/4057819dce1213ffcdfd81f69b1dd4bef19babe1.jpg",
    category: "Nanjing",
    bilibiliUrl: "https://www.bilibili.com/video/BV1ebEb6DEgV/",
  },
  {
    title: "0424 Nanjing Liam Mills 非共识情境下英国重组计划对异议债权人的突破路径",
    description:
      "A Nanjing briefing on UK restructuring plans and routes for addressing dissenting creditors in non-consensual situations.",
    date: "June 07, 2026",
    thumbnail: "https://i2.hdslb.com/bfs/archive/b3b48d4e233e7968043a280a58097e1c4df66e72.jpg",
    category: "Nanjing",
    bilibiliUrl: "https://www.bilibili.com/video/BV1YbEb6DEbB/",
  },
  {
    title: "0424 Nanjing Ben McCosker Vivian Ma 马玮 开曼ELP型基金有限合伙人的退出策略",
    description:
      "A cross-border funds session on exit strategies for limited partners in Cayman exempted limited partnership fund structures.",
    date: "June 07, 2026",
    thumbnail: "https://i0.hdslb.com/bfs/archive/dc197fa9d1914bd0d27dbf282187ee2c05e3cb03.jpg",
    category: "Nanjing",
    bilibiliUrl: "https://www.bilibili.com/video/BV1YbEb6DEph/",
  },
  {
    title: "0420 Nanjing Oliver Haunch 跨境重组方案设计中的关键要素",
    description:
      "A Nanjing presentation outlining key elements in the design of cross-border restructuring solutions.",
    date: "June 07, 2026",
    thumbnail: "https://i1.hdslb.com/bfs/archive/f7d7e34246add2dbe2c34a84626a47eed0cf9328.jpg",
    category: "Nanjing",
    bilibiliUrl: "https://www.bilibili.com/video/BV19bEb6DEbs/",
  },
];

const hongKongVideos: VideoItem[] = [
  {
    title: "0428 HK Liam Mills 英国重组计划对属地程序的补充与支持性作用",
    description:
      "A Hong Kong-listed session by Liam Mills on how English restructuring plans can supplement and support local territorial proceedings.",
    date: "June 07, 2026",
    thumbnail: "https://i1.hdslb.com/bfs/archive/37696e6182e47021c5f8823b38a60699bb273ccb.jpg",
    category: "Hong Kong",
    bilibiliUrl: "https://www.bilibili.com/video/BV1fvEt6oEv4/",
  },
  {
    title: "0428 HK Oliver Haunch 离岸与境内重组程序的衔接与整合",
    description:
      "A Hong Kong-listed briefing by Oliver Haunch on connecting and integrating offshore and onshore restructuring proceedings.",
    date: "June 07, 2026",
    thumbnail: "https://i2.hdslb.com/bfs/archive/dfeec3439f1d4369eb34af338618bae1239554c1.jpg",
    category: "Hong Kong",
    bilibiliUrl: "https://www.bilibili.com/video/BV1AtEt6YEmq/",
  },
  {
    title: "0428 HK Strachan Gray YEUNG Sui Hung 英属维尔京群岛“轻干预式临时清盘”对离岸债务重组的制度价值",
    description:
      "A Hong Kong-listed discussion on the institutional value of BVI light-touch provisional liquidation for offshore debt restructuring.",
    date: "June 07, 2026",
    thumbnail: "https://i0.hdslb.com/bfs/archive/c672809e2ab37d93e944ff32eb83a33b778ec625.jpg",
    category: "Hong Kong",
    bilibiliUrl: "https://www.bilibili.com/video/BV1ptEt6YEzk/",
  },
  {
    title: "0428 HK 实战推演 WORKSHOP",
    description:
      "A practical workshop and scenario exercise from the Hong Kong-listed cross-border restructuring programme.",
    date: "June 07, 2026",
    thumbnail: "https://i2.hdslb.com/bfs/archive/d54f9fcee77d026c8b4d19b1f57ded271dddf4ba.jpg",
    category: "Hong Kong",
    bilibiliUrl: "https://www.bilibili.com/video/BV1chEt6hEz6/",
  },
  {
    title: "0428 HK 新 梁闽海 中资企业跨境债务重组境内外程序的衔接与完美闭环",
    description:
      "A Hong Kong-listed session by Liang Minhai on aligning domestic and overseas procedures for cross-border debt restructuring by Chinese-funded enterprises.",
    date: "June 07, 2026",
    thumbnail: "https://i1.hdslb.com/bfs/archive/d28b8f0a8299970ee1b13929144035ef66c605bf.jpg",
    category: "Hong Kong",
    bilibiliUrl: "https://www.bilibili.com/video/BV1HhEt6hESb/",
  },
  {
    title: "0428 HK 新 温美倩  债务重组视角下香港与内地判决的相互登记与执行",
    description:
      "A Hong Kong-listed presentation by Wen Meiqian on reciprocal registration and enforcement of Hong Kong and Mainland judgments from a debt restructuring perspective.",
    date: "June 07, 2026",
    thumbnail: "https://i2.hdslb.com/bfs/archive/17cf5ff1ae938ead73774fea688af6237bdf21a3.jpg",
    category: "Hong Kong",
    bilibiliUrl: "https://www.bilibili.com/video/BV1A8Et6wE5w/",
  },
  {
    title: "0428 HK 温美倩  债务重组视角下香港与内地判决的相互登记与执行",
    description:
      "A companion Hong Kong-listed session on reciprocal recognition, registration, and enforcement of judgments between Hong Kong and the Mainland in restructuring contexts.",
    date: "June 07, 2026",
    thumbnail: "https://i1.hdslb.com/bfs/archive/ddedb8f428c0b9b4efc4b9f8d6903afd5ae6ee6a.jpg",
    category: "Hong Kong",
    bilibiliUrl: "https://www.bilibili.com/video/BV1w8Et6wExY/",
  },
  {
    title: "0428 HK 梁闽海 中资企业跨境债务重组境内外程序的衔接与完美闭环",
    description:
      "A companion Hong Kong-listed analysis by Liang Minhai on creating a coordinated procedural loop for cross-border debt restructuring by Chinese-funded enterprises.",
    date: "June 07, 2026",
    thumbnail: "https://i1.hdslb.com/bfs/archive/4f605c51def5b791d40467c0968d4c7b7c451591.jpg",
    category: "Hong Kong",
    bilibiliUrl: "https://www.bilibili.com/video/BV1AVEh66EgU/",
  },
];

export const videoCollections: VideoCollection[] = [
  {
    slug: "peking",
    title: "Peking",
    description: "Video content from Peking events and appearances.",
    featureDescription:
      "The Peking video archive includes Bilibili sessions from the cross-border restructuring programme.",
    videoCountLabel: "8 videos",
    lastUpdated: "June 2026",
    platformSources: ["bilibili"],
    category: "Peking",
    coverImage: createCollectionCover({
      title: "Peking",
      subtitle: "City Archive",
      motif: "Cross-border restructuring sessions",
    }),
    icon: Landmark,
    keywords: [
      "peking",
      "beijing",
      "cross-border restructuring",
      "debt restructuring",
      "common law",
      "scheme of arrangement",
      "workshop",
      "bilibili",
    ],
    videos: pekingVideos,
  },
  {
    slug: "hong-kong",
    title: "Hong Kong",
    description: "Video content from Hong Kong events and appearances.",
    featureDescription:
      "The Hong Kong video archive includes Bilibili sessions from the cross-border restructuring programme.",
    videoCountLabel: "8 videos",
    lastUpdated: "June 2026",
    platformSources: ["bilibili"],
    category: "Hong Kong",
    coverImage: createCollectionCover({
      title: "Hong Kong",
      subtitle: "City Archive",
      motif: "Cross-border restructuring sessions",
    }),
    icon: BriefcaseBusiness,
    keywords: [
      "hong kong",
      "cross-border restructuring",
      "debt restructuring",
      "offshore restructuring",
      "judgment enforcement",
      "workshop",
      "bilibili",
    ],
    videos: hongKongVideos,
  },
  {
    slug: "shangai",
    title: "Shangai",
    description: "Video content from Shangai events and appearances.",
    featureDescription:
      "The Shangai video archive includes Bilibili sessions from the Shanghai cross-border restructuring programme.",
    videoCountLabel: "8 videos",
    lastUpdated: "June 2026",
    platformSources: ["bilibili"],
    category: "Shangai",
    coverImage: createCollectionCover({
      title: "Shangai",
      subtitle: "City Archive",
      motif: "Cross-border restructuring sessions",
    }),
    icon: Presentation,
    keywords: [
      "shangai",
      "shanghai",
      "cross-border restructuring",
      "debt restructuring",
      "cross-border insolvency",
      "recognition and assistance",
      "workshop",
      "bilibili",
    ],
    videos: shangaiVideos,
  },
  {
    slug: "nanjing",
    title: "Nanjing",
    description: "Video content from Nanjing events and appearances.",
    featureDescription:
      "The Nanjing video archive currently includes the full set of Bilibili sessions from the cross-border restructuring programme.",
    videoCountLabel: "8 videos",
    lastUpdated: "June 2026",
    platformSources: ["bilibili"],
    category: "Nanjing",
    coverImage: createCollectionCover({
      title: "Nanjing",
      subtitle: "City Archive",
      motif: "Cross-border restructuring sessions",
    }),
    icon: Mic2,
    featured: true,
    keywords: [
      "nanjing",
      "cross-border restructuring",
      "debt restructuring",
      "cayman funds",
      "uk restructuring plans",
      "workshop",
      "bilibili",
    ],
    videos: nanjingVideos,
  },
  {
    slug: "shenzen",
    title: "Shenzen",
    description: "Video content from Shenzen events and appearances.",
    featureDescription:
      "City-focused video archive for Shenzen events, public appearances, interviews and research-led discussions.",
    videoCountLabel: "0 videos",
    lastUpdated: "June 2026",
    platformSources: [],
    category: "Shenzen",
    coverImage: createCollectionCover({
      title: "Shenzen",
      subtitle: "City Archive",
      motif: "Video library by location",
    }),
    icon: Tv,
    keywords: ["shenzen", "shenzhen", "city", "events", "archive"],
    videos: [],
  },
];

export const getVideoCollection = (slug: string | undefined) =>
  videoCollections.find((collection) => collection.slug === slug);

export const getFeaturedCollection = () =>
  videoCollections.find((collection) => collection.featured) ?? videoCollections[0];

export const resolveVideoCountLabel = (collection: VideoCollection) => {
  if (collection.videos.length === 0) {
    return collection.videoCountLabel;
  }

  return `${collection.videos.length} ${collection.videos.length === 1 ? "video" : "videos"}`;
};

export const getPlatformLabel = (platforms: VideoPlatform[]) => {
  if (platforms.includes("youtube") && platforms.includes("bilibili")) {
    return "YouTube + Bilibili";
  }

  if (platforms.includes("youtube")) {
    return "YouTube";
  }

  if (platforms.includes("bilibili")) {
    return "Bilibili";
  }

  return "Platform pending";
};

export const getVideoPlatforms = (video: VideoItem): VideoPlatform[] => {
  const platforms: VideoPlatform[] = [];

  if (video.bilibiliUrl) {
    platforms.push("bilibili");
  }

  if (video.youtubeUrl) {
    platforms.push("youtube");
  }

  return platforms;
};

export const getThumbnail = (video: VideoItem) => video.thumbnail || createPremiumThumbnail(video.title);

export const thumbnailBackdrop = thumbnailBase;
