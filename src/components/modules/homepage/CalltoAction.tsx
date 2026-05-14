import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="w-full py-16 px-4 bg-primary/5">
      <div className="max-w-5xl mx-auto text-center space-y-6">
        
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold">
          Start Learning Without Limits 🚀
        </h2>

        {/* Description */}
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Connect with expert tutors, book sessions instantly, and take your skills 
          to the next level with SkillBridge.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <Button asChild size="lg">
            <Link href="/tutors">Find a Tutor</Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link href="/signup">Become a Tutor</Link>
          </Button>
        </div>

      </div>
    </section>
  );
}