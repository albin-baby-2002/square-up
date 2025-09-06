import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <div className="border-gray-15 relative flex flex-col items-center justify-center gap-[50px] border-b pt-[112px]">
      {/* patterns */}

      <div className="absolute top-0 z-[-2] h-full w-full bg-[radial-gradient(#191919_1px,#030303_1px)] bg-[size:20px_20px]"></div>

      <div className="flex w-full flex-col items-center justify-center space-y-10">
        <h1 className="text-center text-[68px] font-semibold xl:max-w-1/2">
          A Digital Product Studio that will Work
        </h1>

        <div className="text-gray-60 border-gray-15 flex items-center gap-3 rounded-xl border bg-[#242424]/20 py-4 pr-[25px] pl-6 text-[18px]">
          <p>For</p>
          <div className="target-market">
            <p>Startups</p>
          </div>
          <p>,</p>

          <div className="target-market">
            <p>Enterprise leaders</p>
          </div>

          <p>,</p>
          <div className="target-market">
            <p>Media & Publishers</p>
          </div>

          <p>and</p>

          <div className="target-market">
            <p>Social Good</p>
          </div>
        </div>
      </div>

      <div className="space-x-3">
        <button className="secondary-btn">Contact Us</button>
        <button className="primary-btn">Contact Us</button>
      </div>

      <Image
        alt="hero-bg"
        width={1920}
        height={1080}
        src={"/hero-bg.svg"}
        className="absolute bottom-0 left-0 -z-[1] opacity-[.8]"
      />

      <div className="bg-gray-10 border-gray-15 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-[100] border px-6 py-4">
        <p>Trusted By 250+ Companies</p>
      </div>

      <div className="h-[200px] w-full" />
    </div>
  );
};

export default HeroSection;
