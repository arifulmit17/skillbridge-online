"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, ShieldCheck, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-16">
      <div className="max-w-6xl mx-auto space-y-20">

        {/* HERO */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Empowering Learning Through Connection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            SkillBridge is a modern platform designed to connect learners with
            expert tutors—making quality education accessible, flexible, and efficient.
          </p>

          <div className="flex justify-center gap-4">
            <Button asChild size="lg" className="rounded-xl px-8">
  <Link href="/signup">Get Started</Link>
</Button>
            <Button asChild size="lg" variant="outline" className="rounded-xl">
              <Link href="/tutors">Browse Tutors</Link>
            </Button>
          </div>
        </motion.section>

        {/* STATS */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {[
            { value: "1,000+", label: "Students" },
            { value: "200+", label: "Expert Tutors" },
            { value: "5,000+", label: "Sessions Booked" },
            { value: "4.8★", label: "Average Rating" },
          ].map((stat, i) => (
            <div key={i} className="space-y-2">
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.section>

        {/* OVERVIEW */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <Card className="rounded-2xl border shadow-sm">
            <CardContent className="p-8 space-y-4">
              <h2 className="text-2xl font-semibold">About SkillBridge</h2>
              <p className="text-muted-foreground leading-relaxed">
                SkillBridge is a full-stack learning platform that bridges the gap
                between students and expert tutors. Our goal is to simplify the
                learning experience by offering seamless tutor discovery, real-time
                scheduling, and personalized learning journeys.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether you're looking to master a new skill or share your expertise,
                SkillBridge provides the tools and environment to succeed.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* FEATURES */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold">What We Offer</h2>
            <p className="text-muted-foreground">
              Designed to deliver a seamless and effective learning experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="rounded-2xl hover:shadow-md transition">
              <CardContent className="p-6 space-y-4">
                <Users className="w-8 h-8 text-primary" />
                <h3 className="font-semibold text-lg">Smart Tutor Discovery</h3>
                <p className="text-sm text-muted-foreground">
                  Easily find tutors based on expertise, ratings, and availability.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl hover:shadow-md transition">
              <CardContent className="p-6 space-y-4">
                <BookOpen className="w-8 h-8 text-primary" />
                <h3 className="font-semibold text-lg">Flexible Scheduling</h3>
                <p className="text-sm text-muted-foreground">
                  Book sessions instantly and manage your learning schedule with ease.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl hover:shadow-md transition">
              <CardContent className="p-6 space-y-4">
                <ShieldCheck className="w-8 h-8 text-primary" />
                <h3 className="font-semibold text-lg">Secure & Reliable</h3>
                <p className="text-sm text-muted-foreground">
                  A trusted platform with admin oversight and secure interactions.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* ROLES */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold">Who It’s For</h2>
            <p className="text-muted-foreground">
              Built for every role in the learning ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Students",
                desc: "Access expert tutors, book sessions, and track your progress efficiently.",
              },
              {
                title: "Tutors",
                desc: "Showcase your expertise, manage availability, and grow your audience.",
              }
              
            ].map((role, i) => (
              <Card key={i} className="rounded-2xl">
                <CardContent className="p-6 space-y-2">
                  <h3 className="font-semibold text-lg">{role.title}</h3>
                  <p className="text-sm text-muted-foreground">{role.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-center space-y-6"
        >
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">
              Ready to Start Learning?
            </h2>
            <p className="text-muted-foreground">
              Join SkillBridge today and take the next step in your learning journey.
            </p>
          </div>

          <Button asChild size="lg" className="rounded-xl px-8">
  <Link href="/signup">Join Now</Link>
</Button>
        </motion.section>

      </div>
    </div>
  );
}