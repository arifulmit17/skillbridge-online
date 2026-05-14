"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-16">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* HEADER */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center space-y-3"
        >
          <h1 className="text-4xl font-bold tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">
            Your privacy is important to us. This policy explains how SkillBridge collects, uses, and protects your data.
          </p>
        </motion.div>

        {/* CONTENT */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <Card className="rounded-2xl">
            <CardContent className="p-8 space-y-8 text-sm leading-relaxed text-muted-foreground">

              <section className="space-y-2">
                <h2 className="text-lg font-semibold text-foreground">1. Information We Collect</h2>
                <p>
                  We collect information you provide when creating an account, booking sessions,
                  or contacting tutors. This may include your name, email address, and profile details.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-semibold text-foreground">2. How We Use Your Information</h2>
                <p>
                  We use your data to provide and improve our services, manage user accounts,
                  facilitate tutor-student interactions, and ensure platform security.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-semibold text-foreground">3. Data Sharing</h2>
                <p>
                  We do not sell your personal data. Information may be shared only with tutors
                  or administrators when necessary to provide services on the platform.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-semibold text-foreground">4. Data Security</h2>
                <p>
                  We implement industry-standard security measures to protect your personal data
                  from unauthorized access, alteration, or disclosure.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-semibold text-foreground">5. Cookies</h2>
                <p>
                  SkillBridge may use cookies to enhance user experience, analyze traffic,
                  and improve platform performance.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-semibold text-foreground">6. Your Rights</h2>
                <p>
                  You can access, update, or delete your personal information at any time
                  through your account settings.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-semibold text-foreground">7. Updates to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. Changes will be posted
                  on this page with an updated revision date.
                </p>
              </section>

              <div className="pt-4 border-t text-xs">
                Last updated: {new Date().toLocaleDateString()}
              </div>

            </CardContent>
          </Card>
        </motion.div>

      </div>
    </div>
  );
}