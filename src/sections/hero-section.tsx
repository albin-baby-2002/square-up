import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <div
      id="home"
      className="border-gray-15 relative flex flex-col items-center justify-center gap-[35px] border-b pt-[75px] md:gap-[50px] md:pt-[112px]"
    >
      {/* patterns */}

      <div className="absolute top-0 right-0 bottom-0 left-0 -z-[1] bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] bg-[size:14px_24px]"></div>

      <div className="flex w-full flex-col items-center justify-center space-y-7 md:space-y-10">
        <h1 className="max-w-[80%] sm:max-w-[70%] text-center text-[30px] sm:text-[40px] font-semibold md:max-w-none md:text-[68px] xl:max-w-1/2">
          A Digital Product Studio that will Work
        </h1>

        <div className="text-gray-60 border-gray-15 flex max-w-[90%] flex-wrap items-center justify-center gap-0.5 rounded-xl border bg-[#242424]/25 py-4 pr-[25px] pl-6 text-[16px] text-nowrap sm:gap-2 md:gap-3 md:text-[18px]">
          <p>For</p>
          <div className="sm:target-market">
            <p>Startups</p>
          </div>
          <p>,</p>

          <div className="sm:target-market">
            <p>Enterprise leaders</p>
          </div>

          <p>,</p>
          <div className="sm:target-market">
            <p>Media & Publishers</p>
          </div>

          <p>and</p>

          <div className="sm:target-market">
            <p>Social Good</p>
          </div>
        </div>
      </div>

      <div className="space-x-3">
        <button className="secondary-btn">Our Works</button>
        <button className="primary-btn">Contact Us</button>
      </div>

      <Image
        alt="hero-bg"
        width={1920}
        height={1080}
        src={"/hero-bg.svg"}
        className="absolute bottom-0 left-0 -z-[1] scale-[3] translate-x-[8%] opacity-[.9] md:scale-100"
      />

      <div className="bg-gray-10 border-gray-15 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-[100] font-medium  text-sm md:text-base text-nowrap border px-6 py-4">
        <p>Trusted By 250+ Companies</p>
      </div>

      <div className="h-[170px] w-full md:h-[200px]" />
    </div>
  );
};

export default HeroSection;
