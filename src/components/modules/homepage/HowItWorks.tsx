"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Search, CalendarCheck, GraduationCap } from "lucide-react";

const steps = [
  {
    title: "Find a Tutor",
    description:
      "Browse expert tutors by subject, availability, and ratings to find your perfect match.",
    icon: Search,
  },
  {
    title: "Book a Session",
    description:
      "Choose a convenient time slot and book your session instantly with just a few clicks.",
    icon: CalendarCheck,
  },
  {
    title: "Start Learning",
    description:
      "Join your session, learn from experts, and achieve your goals faster.",
    icon: GraduationCap,
  },
];

export function HowItWorksSection() {
  return (
    <section className="w-full px-4 bg-muted/40">
      <div className="max-w-6xl mx-auto text-center space-y-12">
        
        {/* Heading */}
        <div>
          
          <p className="text-muted-foreground mt-2">
            Get started in just three simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <Card
                key={index}
                className="rounded-2xl border bg-card shadow-sm hover:shadow-md transition"
              >
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                  
                  {/* Step Number */}
                  <div className="text-sm font-semibold text-primary">
                    Step {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="p-4 rounded-full bg-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>

                </CardContent>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
}