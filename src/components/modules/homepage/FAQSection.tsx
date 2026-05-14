import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FaqSection() {
  return (
    <section className="w-full bg-muted/40">
      <div className="container max-w-4xl mx-auto px-6">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mt-3">
            Everything you need to know about SkillBridge
          </p>
        </div>

        {/* FAQ */}
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              What is SkillBridge?
            </AccordionTrigger>
            <AccordionContent>
              SkillBridge is a learning platform that connects students with
              qualified tutors for one-on-one and group learning sessions,
              both online and offline.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>
              How do I find a tutor?
            </AccordionTrigger>
            <AccordionContent>
              You can search tutors by subject, rating, and price. Each tutor
              profile includes experience, reviews, and availability to help
              you choose the best match.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>
              Is SkillBridge free to use?
            </AccordionTrigger>
            <AccordionContent>
              Creating an account and browsing tutors is free. You only pay
              when you book a tutoring session.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>
              Can I learn online?
            </AccordionTrigger>
            <AccordionContent>
              Yes. SkillBridge supports online tutoring as well as in-person
              sessions, depending on tutor availability.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>
              How are tutors verified?
            </AccordionTrigger>
            <AccordionContent>
              Tutors go through profile verification, qualification checks,
              and continuous review monitoring to maintain quality and trust.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}
