import Service1 from "@/assets/services/s1";
import Service2 from "@/assets/services/s2";
import Service3 from "@/assets/services/s3";
import SectionHeader from "@/components/section-header";
import { cn } from "@/lib/utils";
import React from "react";

const SERVICES = [
  {
    image: <Service1 />,
    heading: "Design",
    description:
      "At squareIt, our design team is passionate about creating stunning, user-centric designs that captivate your audience and elevate your brand. We believe that great design is not just about aesthetics; it's about creating seamless and intuitive user experiences.",
  },
  {
    image: <Service2 />,
    heading: "Engineering",
    description:
      "Our engineering team combines technical expertise with a passion for innovation to build robust and scalable digital solutions. We leverage the latest technologies and best practices to deliver high-performance applications tailored to your specific needs.",
  },
  {
    image: <Service3 />,
    heading: "Project Management",
    description:
      "Our experienced project management team ensures that your projects are delivered on time, within budget, and according to your specifications. We follow industry-standard methodologies and employ effective communication and collaboration tools to keep you informed throughout the development process.",
  },
];

const OurServices = () => {
  return (
    <div id="services" className="border-gray-15 border-b">
      <SectionHeader
        heading="Our Services"
        description="Transform your brand with our innovative digital solutions that captivate and engage your audience."
      />
      <div className="grid w-full md:grid-cols-3">
        {SERVICES.map((service, index) => (
          <div
            className={cn(
              "flex min-h-[500px] flex-col justify-between p-10 xl:p-12",
              {
                "border-gray-15 border-r": index !== 2,
              },
            )}
            key={index}
          >
            <div className="flex flex-col gap-7 leading-[150%]">
              {service.image}
              <h3 className="text-[24px] font-semibold">{service.heading}</h3>
              <p className="text-gray-90 xl:text-[18px]">
                {service.description}
              </p>
            </div>

            <button className="teritiary-btn">Learn More</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
