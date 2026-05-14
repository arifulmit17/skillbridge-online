import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { Card, CardContent } from "../../ui/card"
import { Button } from "@/components/ui/button"


import tutorimg1 from "../../../../public/AP-English-Tutor-1-1.jpg"
import tutorimg2 from "../../../../public/a-z-tutoring.jpg"
import tutorimg3 from "../../../../public/home-tutor-Singapore.jpg"

export function Hero() {
  const slides = [
    {
      image: tutorimg1,
      title: "Find the Perfect Tutor",
      subtitle: "Learn smarter with expert guidance",
    },
    {
      image: tutorimg2,
      title: "One-on-One Learning",
      subtitle: "Personalized sessions that fit your goals",
    },
    {
      image: tutorimg3,
      title: "Learn From Anywhere",
      subtitle: "Online & home tutoring made easy",
    },
  ]

  return (
    <div className="w-full h-[70vh]">
  <Carousel className="relative w-full h-1/2">
     
    <CarouselContent className="h-1/2">
      {slides?.map((slide, index) => (
        <CarouselItem
          key={index}
          className="h-1/2 flex items-stretch"
        >
          <Card className="h-1/2 w-full rounded-0 ">
            <CardContent className="relative h-100 p-0 flex">
              
              {/* Image */}
              <Image
                src={slide?.image}
                alt={slide?.title}
                fill
                className="object-center"
                priority={index === 0}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
                  {slide?.title}
                </h1>
                <p className="text-white/90 text-lg mb-6 max-w-xl">
                  {slide?.subtitle}
                </p>

                <Link href="/tutors">
                  <Button size="lg">Find Tutors</Button>
                </Link>
              </div>

            </CardContent>
          </Card>
        </CarouselItem>
      ))}
    </CarouselContent>

    <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
    <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
  </Carousel>
</div>

  )
}
