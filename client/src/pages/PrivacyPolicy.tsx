/**
 * Privacy Policy Page
 * Design: Deep royal blue background, elegant typography
 * Style: Inspired by Beckham official site legal pages
 */

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const BRAND_GOLD = "#C9A227";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0D1B2A" }}>
      <Navigation />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          {/* Header */}
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-cinzel text-3xl md:text-4xl tracking-[0.2em] mb-4 font-bold" style={{ color: BRAND_GOLD }}>
              PRIVACY POLICY
            </h1>
            <div className="w-24 h-px mx-auto" style={{ backgroundColor: `rgba(201, 162, 39, 0.4)` }} />
            <p className="font-cormorant text-sm tracking-wider mt-4 font-semibold" style={{ color: "rgba(245, 245, 245, 0.5)" }}>
              Last Updated: February 2026
            </p>
          </motion.div>

          {/* Content */}
          <motion.div
            className="space-y-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Section title="1. Introduction">
              <p>Welcome to the official website of Dr. Ian Zhu ("we", "us", or "our"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>
            </Section>

            <Section title="2. Information We Collect">
              <p>We may collect information that you voluntarily provide to us when you contact us through the website, subscribe to our newsletter, or otherwise interact with our services. This may include:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Name and contact details (email address, phone number)</li>
                <li>Professional information (company name, job title)</li>
                <li>Communication preferences</li>
                <li>Any other information you choose to provide</li>
              </ul>
            </Section>

            <Section title="3. Automatically Collected Information">
              <p>When you visit our website, we may automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. We refer to this automatically-collected information as "Device Information".</p>
            </Section>

            <Section title="4. How We Use Your Information">
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Respond to your enquiries and provide requested services</li>
                <li>Send you relevant updates and communications (with your consent)</li>
                <li>Improve and optimise our website experience</li>
                <li>Comply with legal obligations</li>
                <li>Protect against fraudulent or unauthorised activity</li>
              </ul>
            </Section>

            <Section title="5. Sharing Your Information">
              <p>We do not sell, trade, or otherwise transfer your personal information to outside parties except as described in this policy. We may share information with trusted third parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.</p>
            </Section>

            <Section title="6. Data Retention">
              <p>We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.</p>
            </Section>

            <Section title="7. Your Rights">
              <p>Under applicable data protection legislation (including the UK GDPR), you have the right to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Request restriction of processing</li>
                <li>Data portability</li>
              </ul>
            </Section>

            <Section title="8. Cookies">
              <p>We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. Please visit our Cookie Settings page for more information.</p>
            </Section>

            <Section title="9. Contact Us">
              <p>If you have any questions about this Privacy Policy, please contact us through the Contact page on this website.</p>
            </Section>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-cormorant-garamond text-xl md:text-2xl mb-4 font-bold" style={{ color: "#F5F5F5" }}>
        {title}
      </h2>
      <div className="font-eb-garamond text-base leading-relaxed font-medium space-y-3" style={{ color: "rgba(245, 245, 245, 0.75)" }}>
        {children}
      </div>
    </div>
  );
}
