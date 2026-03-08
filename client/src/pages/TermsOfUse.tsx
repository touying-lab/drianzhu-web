/**
 * Terms of Use Page
 * Design: Deep royal blue background, elegant typography
 * Style: Inspired by Beckham official site legal pages
 */

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const BRAND_GOLD = "#C9A227";

export default function TermsOfUse() {
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
              TERMS OF USE
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
            <Section title="1. Acceptance of Terms">
              <p>By accessing and using this website (drianzhu.com), you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use this website.</p>
            </Section>

            <Section title="2. Intellectual Property">
              <p>All content on this website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and data compilations, is the property of Dr. Ian Zhu or its content suppliers and is protected by international copyright laws. The compilation of all content on this site is the exclusive property of Dr. Ian Zhu.</p>
            </Section>

            <Section title="3. Permitted Use">
              <p>You may access and use this website for personal, non-commercial purposes only. You may not:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Reproduce, duplicate, copy, sell, resell, or exploit any portion of the website</li>
                <li>Use the website for any unlawful purpose</li>
                <li>Modify, adapt, or hack the website</li>
                <li>Transmit any worms, viruses, or any code of a destructive nature</li>
                <li>Collect or harvest any personally identifiable information from the website</li>
              </ul>
            </Section>

            <Section title="4. Disclaimer of Warranties">
              <p>This website is provided on an "as is" and "as available" basis. Dr. Ian Zhu makes no representations or warranties of any kind, express or implied, as to the operation of this website or the information, content, materials, or products included on this website.</p>
            </Section>

            <Section title="5. Limitation of Liability">
              <p>Dr. Ian Zhu shall not be liable for any damages of any kind arising from the use of this website, including but not limited to direct, indirect, incidental, punitive, and consequential damages.</p>
            </Section>

            <Section title="6. Third-Party Links">
              <p>This website may contain links to third-party websites. These links are provided solely for your convenience. We do not endorse or assume any responsibility for the content, privacy policies, or practices of any third-party websites.</p>
            </Section>

            <Section title="7. Professional Advice Disclaimer">
              <p>The content on this website is provided for general informational purposes only and does not constitute professional financial, legal, or investment advice. You should consult with appropriate professionals before making any decisions based on the information provided on this website.</p>
            </Section>

            <Section title="8. Governing Law">
              <p>These Terms of Use shall be governed by and construed in accordance with the laws of England and Wales. Any disputes arising from or relating to these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
            </Section>

            <Section title="9. Changes to Terms">
              <p>We reserve the right to modify these Terms of Use at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website following the posting of changes constitutes your acceptance of such changes.</p>
            </Section>

            <Section title="10. Contact">
              <p>If you have any questions regarding these Terms of Use, please contact us through the Contact page on this website.</p>
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
