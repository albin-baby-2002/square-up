import Why1 from "@/assets/why-choose-us/why-1";
import Why2 from "@/assets/why-choose-us/why-2";
import Why3 from "@/assets/why-choose-us/why-3";
import Why4 from "@/assets/why-choose-us/why-4";
import SectionHeader from "@/components/section-header";
import { cn } from "@/lib/utils";
import React from "react";

const VALUES = [
  {
    image: <Why1 />,
    heading: "Expertise",
    description:
      "Our team consists of highly skilled professionals who have a deep understanding of the digital landscape. We stay updated with the latest industry trends and best practices to deliver cutting-edge solutions.",
  },
  {
    image: <Why2 />,
    heading: "Client-Centric Approach",
    description:
      "We prioritize our clients and their unique needs. We listen to your ideas, challenges, and goals, and tailor our services to meet your specific requirements. Your success is our success.",
  },
  {
    image: <Why3 />,
    heading: "Results-Driven Solutions",
    description:
      "Our primary focus is on delivering results. We combine creativity and technical expertise to create digital products that drive business growth, enhance user experiences, and provide a competitive advantage.",
  },
  {
    image: <Why4 />,
    heading: "Collaborative Partnership",
    description:
      "We value long-term relationships with our clients. We see ourselves as your digital partner, providing ongoing support, maintenance, and updates to ensure your digital products continue to thrive.",
  },
];

const WhyChooseUs = () => {
  return (
    <div id="work">
      <SectionHeader
        heading="Why Choose SquareIt"
        description="Experience excellence in digital craftsmanship with our team of skilled professionals dedicated to delivering exceptional results."
      />
      <div className="grid md:grid-cols-2">
        {VALUES.map((value, index) => (
          <div
            key={index}
            className={cn("border-gray-15 space-y-[30px] border-b p-10 xl:p-12", {
              "md:border-r": index % 2 === 0,
            })}
          >
            <div className="flex items-center gap-[14px]">
              <div className="size-[58px] md:size-[65px]">{value.image}</div>
              <h3 className="text-xl md:text-2xl font-medium">{value.heading}</h3>
            </div>
            <p className=" text-gray-90 text-[16px] leading-[150%] xl:text-[18px]">
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
