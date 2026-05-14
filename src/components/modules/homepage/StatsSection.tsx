"use client";

import CountUp from "react-countup";
import { Card, CardContent } from "@/components/ui/card";
import { Users, BookOpen, Star, CalendarCheck } from "lucide-react";

const stats = [
  {
    title: "Active Students",
    value: 10000,
    suffix: "+",
    icon: Users,
  },
  {
    title: "Expert Tutors",
    value: 500,
    suffix: "+",
    icon: BookOpen,
  },
  {
    title: "Sessions Completed",
    value: 25000,
    suffix: "+",
    icon: CalendarCheck,
  },
  {
    title: "Average Rating",
    value: 4.9,
    suffix: "/5",
    decimals: 1,
    icon: Star,
  },
];

export function StatsSection() {
  return (
    <section className="w-full px-4">
      <div className="max-w-6xl mx-auto text-center space-y-10">
        
        {/* Heading */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">
            Trusted by Learners Worldwide 🌍
          </h2>
          <p className="text-muted-foreground mt-2">
            Our growing community speaks for itself
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <Card
                key={index}
                className="rounded-2xl border bg-card shadow-sm hover:shadow-md transition"
              >
                <CardContent className="p-6 flex flex-col items-center gap-3">
                  
                  {/* Icon */}
                  <div className="p-3 rounded-full bg-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Animated Value */}
                  <h3 className="text-2xl font-bold">
                    <CountUp
                      end={stat.value}
                      duration={2}
                      decimals={stat.decimals || 0}
                    />
                    {stat.suffix}
                  </h3>

                  {/* Label */}
                  <p className="text-sm text-muted-foreground">
                    {stat.title}
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