"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageCircle, Search } from "lucide-react";
import Link from "next/link";

export default function HelpPage() {
  const [query, setQuery] = React.useState("");

  return (
    <div className="min-h-screen bg-background px-4 py-10 flex justify-center">
      <div className="w-full max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">SkillBridge Help Center </h1>
          <p className="text-muted-foreground">
            Find answers about tutoring, booking sessions, and managing your account
          </p>
        </div>

       

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I book a tutor session?</AccordionTrigger>
                <AccordionContent>
                  Go to the tutor profile, check available time slots, and click "Book Now".
                  Confirm your booking and you will receive a notification.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>How can tutors set their availability?</AccordionTrigger>
                <AccordionContent>
                  Tutors can go to their dashboard, navigate to availability settings,
                  and select the time slots they are available to teach.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Can I cancel a booking?</AccordionTrigger>
                <AccordionContent>
                  Yes, users can cancel bookings from their dashboard before the session starts.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>How do I become a tutor?</AccordionTrigger>
                <AccordionContent>
                  Register an account, switch to tutor mode, and complete your profile with
                  expertise, bio, and availability.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card>
          <CardHeader>
            <CardTitle>Need more help?</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Contact our support team for personalized assistance
            </p>
            <Button asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
