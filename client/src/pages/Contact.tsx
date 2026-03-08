/**
 * CONTACT Sub-page
 * Design: Inspired by davidbeckham.com/contact — elegant, minimal, editorial
 * Deep royal blue background with noble gold accents
 * Features: Contact form + social media links + professional enquiry categories
 * Brand Gold: #C9A227 | Deep Blue: #0D1B2A
 */

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Linkedin, Instagram, MessageCircle, Mail, Send, MapPin, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const BRAND_GOLD = "#C9A227";
const DEEP_BLUE = "#0D1B2A";

const socialLinks = [
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com",
    handle: "@DrIanZhu",
    description: "Professional network & thought leadership",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://instagram.com",
    handle: "@dr.ian.zhu",
    description: "Behind the scenes & global engagements",
  },
  {
    name: "WeChat",
    icon: MessageCircle,
    url: "#",
    handle: "DrIanZhu",
    description: "Direct messaging & China network",
  },
];

const enquiryTypes = [
  "General Enquiry",
  "Speaking Engagement",
  "Media & Press",
  "Consulting & Advisory",
  "Partnership Opportunity",
  "Academic Collaboration",
];

export default function Contact() {
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const socialRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const formInView = useInView(formRef, { once: true, margin: "-80px" });
  const socialInView = useInView(socialRef, { once: true, margin: "-80px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    enquiryType: "",
    message: "",
  });
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!acceptTerms) {
      toast.error("Please accept the terms and conditions.");
      return;
    }
    toast.success("Message sent successfully", {
      description: "Thank you for your enquiry. We will respond within 48 hours.",
    });
    setFormData({ name: "", email: "", enquiryType: "", message: "" });
    setAcceptTerms(false);
  };

  const handleSocialClick = (link: typeof socialLinks[0]) => {
    if (link.url === "#") {
      toast(`${link.name} ID: ${link.handle}`, {
        description: "Please add via the handle shown above.",
      });
    } else {
      window.open(link.url, "_blank");
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: DEEP_BLUE }}>
      <Navigation />

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-40 pb-20 overflow-hidden">
        {/* Subtle background texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${BRAND_GOLD} 0.5px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Page Title */}
            <h1
              className="font-cinzel text-5xl md:text-7xl tracking-[0.15em] mb-8"
              style={{ color: BRAND_GOLD }}
            >
              CONTACT
            </h1>

            {/* Gold divider */}
            <motion.div
              className="h-[2px] w-16 mb-10"
              style={{ backgroundColor: BRAND_GOLD }}
              initial={{ width: 0 }}
              animate={heroInView ? { width: 64 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            />

            {/* Subtitle */}
            <p
              className="font-cormorant text-xl md:text-2xl leading-relaxed font-medium"
              style={{ color: "rgba(245, 245, 245, 0.7)" }}
            >
              For enquiries, please use the form below or reach out through
              the social channels listed. Due to the volume of submissions,
              a response cannot be guaranteed for every message — but every
              one is read.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + Social Section */}
      <section className="relative pb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-20">

            {/* Left: Contact Form (3 cols) */}
            <motion.div
              ref={formRef}
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 40 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Full Name */}
                <div className="group">
                  <label
                    className="block font-cormorant text-xs tracking-[0.25em] uppercase mb-3 font-bold"
                    style={{ color: BRAND_GOLD }}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b-[1px] pb-3 font-cormorant text-lg focus:outline-none transition-colors duration-300"
                    style={{
                      borderColor: "rgba(201, 162, 39, 0.25)",
                      color: "rgba(245, 245, 245, 0.9)",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = BRAND_GOLD)}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(201, 162, 39, 0.25)")}
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email Address */}
                <div className="group">
                  <label
                    className="block font-cormorant text-xs tracking-[0.25em] uppercase mb-3 font-bold"
                    style={{ color: BRAND_GOLD }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-b-[1px] pb-3 font-cormorant text-lg focus:outline-none transition-colors duration-300"
                    style={{
                      borderColor: "rgba(201, 162, 39, 0.25)",
                      color: "rgba(245, 245, 245, 0.9)",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = BRAND_GOLD)}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(201, 162, 39, 0.25)")}
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Enquiry Type */}
                <div className="group">
                  <label
                    className="block font-cormorant text-xs tracking-[0.25em] uppercase mb-3 font-bold"
                    style={{ color: BRAND_GOLD }}
                  >
                    Enquiry Type
                  </label>
                  <select
                    value={formData.enquiryType}
                    onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                    className="w-full bg-transparent border-b-[1px] pb-3 font-cormorant text-lg focus:outline-none transition-colors duration-300 appearance-none cursor-pointer"
                    style={{
                      borderColor: "rgba(201, 162, 39, 0.25)",
                      color: formData.enquiryType ? "rgba(245, 245, 245, 0.9)" : "rgba(245, 245, 245, 0.4)",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = BRAND_GOLD)}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(201, 162, 39, 0.25)")}
                  >
                    <option value="" style={{ backgroundColor: DEEP_BLUE, color: "rgba(245,245,245,0.4)" }}>
                      Select enquiry type
                    </option>
                    {enquiryTypes.map((type) => (
                      <option key={type} value={type} style={{ backgroundColor: DEEP_BLUE, color: "#f5f5f5" }}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="group">
                  <label
                    className="block font-cormorant text-xs tracking-[0.25em] uppercase mb-3 font-bold"
                    style={{ color: BRAND_GOLD }}
                  >
                    Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full bg-transparent border-b-[1px] pb-3 font-cormorant text-lg focus:outline-none transition-colors duration-300 resize-none"
                    style={{
                      borderColor: "rgba(201, 162, 39, 0.25)",
                      color: "rgba(245, 245, 245, 0.9)",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = BRAND_GOLD)}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(201, 162, 39, 0.25)")}
                    placeholder="Write your message here..."
                  />
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 mt-0.5 border flex-shrink-0 flex items-center justify-center cursor-pointer transition-all duration-300"
                    style={{
                      borderColor: acceptTerms ? BRAND_GOLD : "rgba(201, 162, 39, 0.3)",
                      backgroundColor: acceptTerms ? BRAND_GOLD : "transparent",
                    }}
                    onClick={() => setAcceptTerms(!acceptTerms)}
                  >
                    {acceptTerms && (
                      <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                        <path d="M1 5L4.5 8.5L11 1" stroke={DEEP_BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <p
                    className="font-cormorant text-sm leading-relaxed font-medium cursor-pointer"
                    style={{ color: "rgba(245, 245, 245, 0.5)" }}
                    onClick={() => setAcceptTerms(!acceptTerms)}
                  >
                    I accept the{" "}
                    <span
                      className="underline underline-offset-2 transition-colors duration-300 hover:opacity-80"
                      style={{ color: BRAND_GOLD }}
                    >
                      Terms and Conditions
                    </span>{" "}
                    and{" "}
                    <span
                      className="underline underline-offset-2 transition-colors duration-300 hover:opacity-80"
                      style={{ color: BRAND_GOLD }}
                    >
                      Privacy Policy
                    </span>
                  </p>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="group flex items-center gap-3 font-cinzel text-sm tracking-[0.2em] uppercase py-4 px-10 border transition-all duration-500"
                  style={{
                    borderColor: BRAND_GOLD,
                    color: BRAND_GOLD,
                    backgroundColor: "transparent",
                  }}
                  whileHover={{
                    backgroundColor: BRAND_GOLD,
                    color: DEEP_BLUE,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="font-bold">Submit Message</span>
                  <Send className="w-4 h-4" />
                </motion.button>
              </form>
            </motion.div>

            {/* Right: Social & Info (2 cols) */}
            <motion.div
              ref={socialRef}
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 40 }}
              animate={socialInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {/* Connect Section */}
              <div className="mb-14">
                <h3
                  className="font-cinzel text-xs tracking-[0.3em] uppercase mb-8 font-bold"
                  style={{ color: BRAND_GOLD }}
                >
                  Connect
                </h3>

                <div className="space-y-6">
                  {socialLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      className="group flex items-start gap-4 cursor-pointer"
                      onClick={() => handleSocialClick(link)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={socialInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      whileHover={{ x: 4 }}
                    >
                      <div
                        className="w-12 h-12 flex-shrink-0 flex items-center justify-center border transition-all duration-300"
                        style={{
                          borderColor: "rgba(201, 162, 39, 0.3)",
                          color: BRAND_GOLD,
                        }}
                      >
                        <link.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className="font-cormorant text-base font-bold tracking-wider"
                            style={{ color: "rgba(245, 245, 245, 0.9)" }}
                          >
                            {link.name}
                          </span>
                          <ExternalLink
                            className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ color: BRAND_GOLD }}
                          />
                        </div>
                        <p
                          className="font-cormorant text-sm font-semibold"
                          style={{ color: BRAND_GOLD }}
                        >
                          {link.handle}
                        </p>
                        <p
                          className="font-cormorant text-sm font-medium mt-0.5"
                          style={{ color: "rgba(245, 245, 245, 0.4)" }}
                        >
                          {link.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Location Section */}
              <div className="mb-14">
                <h3
                  className="font-cinzel text-xs tracking-[0.3em] uppercase mb-8 font-bold"
                  style={{ color: BRAND_GOLD }}
                >
                  Location
                </h3>

                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 flex-shrink-0 flex items-center justify-center border"
                    style={{
                      borderColor: "rgba(201, 162, 39, 0.3)",
                      color: BRAND_GOLD,
                    }}
                  >
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p
                      className="font-cormorant text-base font-bold"
                      style={{ color: "rgba(245, 245, 245, 0.9)" }}
                    >
                      London, United Kingdom
                    </p>
                    <p
                      className="font-cormorant text-sm font-medium mt-1"
                      style={{ color: "rgba(245, 245, 245, 0.4)" }}
                    >
                      Operating across London, Hong Kong,<br />
                      and the Middle East
                    </p>
                  </div>
                </div>
              </div>

              {/* Email Section */}
              <div>
                <h3
                  className="font-cinzel text-xs tracking-[0.3em] uppercase mb-8 font-bold"
                  style={{ color: BRAND_GOLD }}
                >
                  Email
                </h3>

                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 flex-shrink-0 flex items-center justify-center border"
                    style={{
                      borderColor: "rgba(201, 162, 39, 0.3)",
                      color: BRAND_GOLD,
                    }}
                  >
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p
                      className="font-cormorant text-base font-bold"
                      style={{ color: "rgba(245, 245, 245, 0.9)" }}
                    >
                      enquiries@drianzhu.com
                    </p>
                    <p
                      className="font-cormorant text-sm font-medium mt-1"
                      style={{ color: "rgba(245, 245, 245, 0.4)" }}
                    >
                      For professional enquiries and collaborations
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative divider */}
              <div
                className="mt-14 pt-10"
                style={{ borderTop: "1px solid rgba(201, 162, 39, 0.15)" }}
              >
                <p
                  className="font-cormorant-garamond italic text-sm leading-relaxed font-medium"
                  style={{ color: "rgba(245, 245, 245, 0.35)" }}
                >
                  "The best deals are built on trust, and trust begins with a conversation."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
