import SectionHeader from "@/components/section-header";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const CLIENT_TESTIMONIALS = [
  {
    imgSrc: "/clients/cl-1.svg",
    heading:
      "squareIt has been Instrumental in Transforming our Online Presence",
    testimonial:
      "Their team's expertise in web development and design resulted in a visually stunning and user-friendly e-commerce platform. Our online sales have skyrocketed, and we couldn't be happier.",
    name: "John Smith",
    role: "CEO of Chic Boutique",
  },
  {
    imgSrc: "/clients/cl-2.svg",
    heading: "Working with squareIt was a breeze",
    testimonial:
      "They understood our vision for a mobile app that streamlined our food delivery service. The app they delivered exceeded our expectations, and our customers love the seamless ordering experience. squareIt is a trusted partner we highly recommend.",
    name: "Sarah Johnson",
    role: "Founder of HungryBites",
  },
  {
    imgSrc: "/clients/cl-3.svg",
    heading:
      "squareIt developed a comprehensive booking and reservation system for our event management company",
    testimonial:
      "Their attention to detail and commitment to delivering a user-friendly platform was evident throughout the project. The system has streamlined our operations and enhanced our clients’ event experiences.",
    name: "Mark Thompson",
    role: "CEO of EventMasters",
  },
  {
    imgSrc: "/clients/cl-4.svg",
    heading: "ProTech Solutions turned to squareIt to automate our workflow",
    testimonial:
      "They delivered an exceptional custom software solution. The system has significantly increased our productivity and reduced manual errors. squareIt's expertise and professionalism have made them a trusted technology partner.",
    name: "Laura Adams",
    role: "COO of ProTech Solutions",
  },
  {
    imgSrc: "/clients/cl-5.svg",
    heading:
      "squareIt designed and developed a captivating web portal for showcasing our real estate listings",
    testimonial:
      "The platform is visually appealing and easy to navigate, allowing potential buyers to find their dream homes effortlessly. squareIt's expertise in the real estate industry is unmatched.",
    name: "Michael Anderson",
    role: "Founder of Dream Homes Realty",
  },
  {
    imgSrc: "/clients/cl-6.svg",
    heading:
      "FitLife Tracker wanted a mobile app that tracked fitness activities and provided personalized workout plans",
    testimonial:
      "squareIt's team developed an intuitive and feature-rich app that has helped our users stay motivated and achieve their fitness goals. We highly recommend squareIt for any health and fitness app development needs.",
    name: "Emily Turner",
    role: "CEO of FitLife Tracker",
  },
];

export const ClientTestimonials = () => {
  return (
    <div id="feedback">
      <SectionHeader
        heading="What our Clients say About us"
        description="At squareIt, we take pride in delivering exceptional digital products and services that drive success for our clients. Here's what some of our satisfied clients have to say about their experience working with us"
      />
      <div className="grid grid-cols-2">
        {CLIENT_TESTIMONIALS.map((value, index) => (
          <div
            key={index}
            className={cn(
              "border-gray-15 space-y-[40px] border-b px-[60px] py-[80px]",
              {
                "border-r": index % 2 === 0,
              },
            )}
          >
            <div className="flex flex-col gap-5">
              <h3 className="text-green-80 text-xl font-medium">
                {value.heading}
              </h3>
              <p className="text-[16px] leading-[150%] xl:text-[18px]">
                {value.testimonial}
              </p>
            </div>
            <div className="border-gray-15 flex w-full justify-between rounded-md border p-[14px]">
              <div className="flex gap-3">
                <Image
                  src={value.imgSrc}
                  width={40}
                  height={40}
                  alt={value.name}
                />
                <div>
                  <p className="font-medium">{value.name}</p>
                  <p className="text-gray-90 text-sm">{value.role}</p>
                </div>
              </div>
              <button className="teritiary-btn !rounded-sm">
                Open Website
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
