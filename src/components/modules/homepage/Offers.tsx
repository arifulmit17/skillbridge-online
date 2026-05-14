"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Rocket, Users } from "lucide-react";
import Link from "next/link";

const offers = [
  {
    title: "Free Trial Session",
    description:
      "Book your first session with a tutor for free and experience personalized learning.",
    icon: Gift,
    badge: "Popular",
    cta: "Start Free",
    link: "/tutors",
  },
  {
    title: "Become a Tutor",
    description:
      "Share your knowledge, earn money, and connect with students worldwide.",
    icon: Users,
    badge: "Earn",
    cta: "Join Now",
    link: "/signup",
  },
  {
    title: "Premium Learning",
    description:
      "Unlock advanced courses, priority bookings, and exclusive resources.",
    icon: Rocket,
    badge: "Pro",
    cta: "Upgrade",
    link: "/sessions",
  },
];

export function OffersSection() {
  return (
    <section className="w-full px-4 bg-muted/40">
      <div className="max-w-6xl mx-auto space-y-10 text-center">
        
        {/* Heading */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">
            Special Offers for You 🎁
          </h2>
          <p className="text-muted-foreground mt-2">
            Explore opportunities to learn, teach, and grow with SkillBridge
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer, index) => {
            const Icon = offer.icon;

            return (
              <Card
                key={index}
                className="rounded-2xl border bg-card shadow-sm hover:shadow-md transition relative"
              >
                {/* Badge */}
                <Badge className="absolute top-4 right-4">
                  {offer.badge}
                </Badge>

                <CardHeader className="flex flex-col items-center gap-4 pt-10">
                  <div className="p-4 rounded-full bg-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>{offer.title}</CardTitle>
                </CardHeader>

                <CardContent className="text-center space-y-4">
                  <p className="text-muted-foreground">
                    {offer.description}
                  </p>

                  <Button asChild className="w-full">
                    <Link href={offer.link}>{offer.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
}