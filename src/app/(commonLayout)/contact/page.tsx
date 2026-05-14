"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-16">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* HEADER */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Get in Touch
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Have questions, feedback, or need support? We're here to help.
            Reach out to the SkillBridge team anytime.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">

          {/* CONTACT FORM */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-8 space-y-6">
                <h2 className="text-2xl font-semibold">
                  Send a Message
                </h2>

                <form className="space-y-4">
                  <Input placeholder="Your Name" />
                  <Input type="email" placeholder="Your Email" />
                  <Textarea placeholder="Your Message" rows={5} />

                  <Button className="w-full rounded-xl">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* CONTACT INFO */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <Card className="rounded-2xl">
              <CardContent className="p-6 flex items-start gap-4">
                <Mail className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-sm text-muted-foreground">
                    support@skillbridge.com
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-6 flex items-start gap-4">
                <Phone className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-sm text-muted-foreground">
                    +880 1234-567890
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-6 flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-sm text-muted-foreground">
                    Dhaka, Bangladesh
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* EXTRA NOTE */}
            <div className="text-sm text-muted-foreground">
              We usually respond within 24 hours.
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-center space-y-4"
        >
          <h2 className="text-2xl font-semibold">
            Need Immediate Help?
          </h2>
          <p className="text-muted-foreground">
            Browse our help center or contact support directly.
          </p>

          <Button size="lg" variant="outline" className="rounded-xl">
            Visit Help Center
          </Button>
        </motion.div>

      </div>
    </div>
  );
}