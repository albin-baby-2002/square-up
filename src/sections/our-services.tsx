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
    <div id="services" className="border-gray-15 md:border-b">
      <SectionHeader
        heading="Our Services"
        description="Transform your brand with our innovative digital solutions that captivate and engage your audience."
      />
      <div className="grid w-full md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, index) => (
          <div
            className={cn(
              "border-gray-15 flex  flex-col justify-between space-y-9  border-b p-10 lg:min-h-[500px] md:last:border-b-0 lg:border-b-0 xl:p-12",
              {
                "lg:border-r": index !== 2,
                "md:border-r":index % 2 === 0 ,
              },
            )}
            key={index}
          >
            <div className="flex flex-col gap-7 leading-[150%]">
              <div className="flex md:flex-col md:gap-4 md:items-start items-center gap-3">
                <div className=" size-[58px] md:size-[65px]">{service.image}</div>
                <h3 className="text-xl md:text-2xl font-medium">
                  {service.heading}
                </h3>
              </div>
              <p className="text-[16px] leading-[150%] xl:text-[18px] text-gray-90">
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
