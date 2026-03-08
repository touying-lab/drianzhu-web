/**
 * INSIGHTS Sub-page
 * Design: Deep royal blue background with report library
 * Features: Tou Ying Tracker report covers, research categories, download links
 * Brand Gold: #C9A227 | Deep Blue: #0D1B2A
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, Download, ExternalLink, TrendingUp, Globe, Scale } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const BRAND_GOLD = "#C9A227";
const DEEP_BLUE = "#0D1B2A";

const touYingReports = [
  {
    year: "2018",
    title: "Tou Ying Tracker 2018",
    subtitle: "The latest trends in Chinese investment in the UK",
    publisher: "Grant Thornton × China Daily",
    cover: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/IoJsFXoJTTtbZNvC.jpg",
    downloadUrl: "https://www.grantthornton.co.uk/globalassets/1.-member-firms/united-kingdom/pdf/documents/tou-ying-tracker-2018.pdf",
  },
  {
    year: "2017",
    title: "Tou Ying Tracker 2017",
    subtitle: "The latest trends in Chinese investment in the UK",
    publisher: "Grant Thornton × China Daily",
    cover: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/ZIOpyMlgZhkvrabL.jpg",
    downloadUrl: "https://www.grantthornton.co.uk/globalassets/1.-member-firms/united-kingdom/pdf/documents/tou-ying-tracker-2017-english-version.pdf",
  },
];

const researchAreas = [
  {
    icon: TrendingUp,
    title: "Cross-Border M&A Analysis",
    description: "In-depth analysis of cross-border mergers and acquisitions between the UK and China, covering regulatory trends, deal structures, and market dynamics that shape bilateral investment flows.",
    topics: ["Deal Structuring", "Regulatory Compliance", "Due Diligence", "Post-Merger Integration"],
  },
  {
    icon: Globe,
    title: "UK-China Economic Relations",
    description: "Strategic insights on bilateral economic relations, policy developments, trade patterns, and investment opportunities. Tracking the evolution of one of the world's most important economic corridors.",
    topics: ["Trade Policy", "Investment Trends", "Economic Diplomacy", "Market Access"],
  },
  {
    icon: Scale,
    title: "Dispute Resolution & Restructuring",
    description: "Expert analysis of cross-border dispute resolution mechanisms, insolvency proceedings, and corporate restructuring strategies for Chinese enterprises operating in the UK market.",
    topics: ["Arbitration", "Insolvency", "Asset Recovery", "Regulatory Enforcement"],
  },
];

export default function Insights() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: DEEP_BLUE }}>
      <Navigation />
      
      {/* Hero */}
      <InsightsHero />

      {/* Tou Ying Tracker Reports */}
      <TouYingSection />

      {/* Research Areas */}
      <ResearchAreasSection />

      {/* CTA */}
      <CTASection />

      <Footer />
    </div>
  );
}

function InsightsHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden"
      style={{ backgroundColor: DEEP_BLUE }}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, rgba(201, 162, 39, 0.4) 0%, transparent 50%),
                           radial-gradient(circle at 70% 60%, rgba(201, 162, 39, 0.3) 0%, transparent 50%)`
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-cinzel text-4xl md:text-5xl lg:text-6xl tracking-[0.15em] mb-6 font-bold" style={{ color: BRAND_GOLD }}>
            INSIGHTS
          </h1>
          <div className="w-20 h-0.5 mb-8 mx-auto" style={{ backgroundColor: BRAND_GOLD }} />
          <p className="font-cormorant-garamond text-xl md:text-2xl leading-relaxed font-semibold" style={{ color: "rgba(255, 255, 255, 0.85)" }}>
            Research, analysis, and thought leadership on cross-border finance, 
            UK-China investment, and international dispute resolution.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function TouYingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleDownload = (report: typeof touYingReports[0]) => {
    window.open(report.downloadUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section ref={ref} className="py-20 md:py-28" style={{ backgroundColor: "#132238" }}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="w-6 h-6" style={{ color: BRAND_GOLD }} />
            <h2 className="font-cinzel text-2xl md:text-3xl tracking-[0.15em] font-bold" style={{ color: BRAND_GOLD }}>
              TOU YING TRACKER
            </h2>
          </div>
          <p className="font-cormorant-garamond text-lg md:text-xl font-semibold" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
            The definitive annual report on Chinese investment in the UK
          </p>
          <p className="font-eb-garamond text-base mt-3 font-medium" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
            Officially cited by government bodies and industry leaders for eight consecutive years
          </p>
        </motion.div>

        {/* Report Cards */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {touYingReports.map((report, index) => (
            <motion.div
              key={report.year}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              onClick={() => handleDownload(report)}
            >
              <div 
                className="relative overflow-hidden rounded-sm transition-all duration-500 group-hover:shadow-2xl"
                style={{ border: `1px solid rgba(201, 162, 39, 0.2)` }}
              >
                {/* Report Cover Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-white">
                  <img
                    src={report.cover}
                    alt={report.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-3 px-6 py-3 rounded-sm"
                      style={{ backgroundColor: "rgba(13, 27, 42, 0.9)", border: `1px solid ${BRAND_GOLD}` }}
                    >
                      <Download className="w-5 h-5" style={{ color: BRAND_GOLD }} />
                      <span className="font-cormorant tracking-wider font-bold" style={{ color: BRAND_GOLD }}>
                        DOWNLOAD PDF
                      </span>
                    </motion.div>
                  </div>
                </div>

                {/* Report Info */}
                <div className="p-6" style={{ backgroundColor: "rgba(13, 27, 42, 0.8)" }}>
                  <h3 className="font-cinzel text-lg mb-1 font-bold" style={{ color: "#F5F5F5" }}>
                    {report.title}
                  </h3>
                  <p className="font-eb-garamond text-sm font-medium" style={{ color: "rgba(245, 245, 245, 0.6)" }}>
                    {report.subtitle}
                  </p>
                  <p className="font-cormorant text-xs mt-3 tracking-wider font-semibold" style={{ color: `rgba(201, 162, 39, 0.7)` }}>
                    {report.publisher}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResearchAreasSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 md:py-28" style={{ backgroundColor: DEEP_BLUE }}>
      <div className="container mx-auto px-6">
        <motion.h2
          className="font-cinzel text-2xl md:text-3xl text-center tracking-[0.15em] mb-16 font-bold"
          style={{ color: BRAND_GOLD }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          RESEARCH AREAS
        </motion.h2>

        <div className="max-w-5xl mx-auto space-y-12">
          {researchAreas.map((area, index) => (
            <motion.div
              key={area.title}
              className="flex flex-col md:flex-row gap-8 p-8 rounded-sm"
              style={{ 
                border: `1px solid rgba(201, 162, 39, 0.15)`,
                backgroundColor: "rgba(19, 34, 56, 0.3)"
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              {/* Icon */}
              <div className="flex-shrink-0">
                <div 
                  className="w-16 h-16 rounded-sm flex items-center justify-center"
                  style={{ border: `1px solid rgba(201, 162, 39, 0.3)` }}
                >
                  <area.icon className="w-8 h-8" style={{ color: BRAND_GOLD }} />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-cinzel text-xl mb-3 font-bold" style={{ color: "#F5F5F5" }}>
                  {area.title}
                </h3>
                <p className="font-eb-garamond text-base md:text-lg leading-relaxed mb-5 font-medium" style={{ color: "rgba(245, 245, 245, 0.75)" }}>
                  {area.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {area.topics.map((topic) => (
                    <span
                      key={topic}
                      className="font-cormorant text-sm tracking-wider px-3 py-1 rounded-sm font-semibold"
                      style={{ color: `rgba(201, 162, 39, 0.8)`, border: `1px solid rgba(201, 162, 39, 0.25)` }}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleContact = () => {
    toast("Contact form coming soon", {
      description: "Please reach out via the contact section on the homepage.",
    });
  };

  return (
    <section ref={ref} className="py-16 md:py-20" style={{ backgroundColor: "#132238" }}>
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-cormorant-garamond text-xl md:text-2xl leading-relaxed mb-8 font-semibold" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
            Interested in collaborating on research or accessing detailed reports?
          </p>
          <motion.button
            onClick={handleContact}
            className="inline-flex items-center gap-3 px-8 py-3 rounded-sm font-cormorant tracking-[0.15em] font-bold transition-all duration-300"
            style={{ 
              border: `1px solid rgba(201, 162, 39, 0.5)`,
              color: BRAND_GOLD
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ExternalLink className="w-5 h-5" />
            <span>GET IN TOUCH</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
