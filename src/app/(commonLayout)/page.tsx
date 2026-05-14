import { CTASection } from "@/components/modules/homepage/CalltoAction";
import Categories from "@/components/modules/homepage/Categories";
import FaqSection from "@/components/modules/homepage/FAQSection";
import FeaturedTutor from "@/components/modules/homepage/FeaturedTutor";
import { Hero } from "@/components/modules/homepage/Hero";
import { HowItWorksSection } from "@/components/modules/homepage/HowItWorks";
import { NewsletterSection } from "@/components/modules/homepage/Newsletter";
import { OffersSection } from "@/components/modules/homepage/Offers";
import ReviewSection from "@/components/modules/homepage/ReviewSection";
import { StatsSection } from "@/components/modules/homepage/StatsSection";
import PopularSessions from "@/components/modules/pages/PopularSessions";
import { tutorService } from "@/services/tutor.service";
import { userService } from "@/services/user.service";





export default async function Home() {
  // const {data}=await userService.getSession()
  
  // console.log("Home page session data:",data);
 
  return (
    <div className="min-h-screen bg-muted/40">
      <section className="">
          <Hero></Hero>
      </section>

      <section className="w-full flex flex-col justify-center items-center gap-10 mt-0 lg:mt-10">
            <div className="w-full section-title"> 
               <h1 >Featured Tutors</h1>
            </div>
            
           <FeaturedTutor></FeaturedTutor>
      </section>
      <section className="w-full flex flex-col justify-center items-center gap-10 mt-0 lg:mt-10">
            <div className="w-full section-title"> 
               <h1 >Statistics</h1>
            </div>
            
          <StatsSection></StatsSection>
      </section>
      <section className="w-full flex flex-col justify-center items-center gap-10 mt-5 lg:mt-10">
            <div className="w-full section-title"> 
               <h1 >Popular Sessions</h1>
            </div>
            
           <PopularSessions></PopularSessions>
      </section>
      <section className="w-full flex flex-col justify-center items-center gap-10 mt-5 lg:mt-10">
            <div className="w-full section-title"> 
               <h1 >Popular Categories</h1>
            </div>
            
           <Categories></Categories>
      </section>
      <section className="w-full flex flex-col justify-center items-center gap-10 mt-5 lg:mt-10">
            <div className="w-full section-title"> 
               <h1 > How SkillBridge Works ⚡</h1>
            </div>
            
           <HowItWorksSection></HowItWorksSection>
      </section>
      <section className="w-full flex flex-col justify-center items-center gap-10 mt-5 lg:mt-10">
            <div className="w-full section-title"> 
               <h1 >Student Reviews</h1>
            </div>
            
           <ReviewSection></ReviewSection>
      </section>
      <section className="w-full flex flex-col justify-center items-center gap-10 mt-5 lg:mt-10">
            <div className="w-full section-title"> 
               <h1 >Offers</h1>
            </div>
            
           <OffersSection></OffersSection>
      </section>
      <section className="w-full flex flex-col justify-center items-center gap-10 mt-5 lg:mt-10">
            <div className="w-full section-title"> 
               <h1 >F.A.Q</h1>
            </div>
            
          <FaqSection></FaqSection>
      </section>
      <section className="w-full flex flex-col justify-center items-center gap-10 mt-5 lg:mt-10">
            <div className="w-full section-title"> 
               <h1 >Call to Action</h1>
            </div>
            
          <CTASection></CTASection>
      </section>

      <section className="w-full flex flex-col justify-center items-center gap-10 mt-5 lg:mt-10">
            <div className="w-full section-title"> 
               <h1 >Newsletter</h1>
            </div>
            
          <NewsletterSection></NewsletterSection>
      </section>
     
    </div>
  );
}
