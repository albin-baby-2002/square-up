import React from "react";

//---------------------------------------------------

interface TProps {
  heading: string;
  description: string;
}

//---------------------------------------------------

const SectionHeader = ({ heading, description }: TProps) => {
  return (
    <div className="border-gray-15 relative mx-auto flex w-full flex-col items-center justify-center space-y-[14px] border-b py-[50px] lg:py-[70px] xl:py-[100px] text-center">

      <div className="absolute top-0  h-full w-full bg-[radial-gradient(#191919_1px,#030303_1px)] bg-[size:20px_20px]"></div>

      <h2 className=" text-[28px] sm:text-[32px] max-w-[90%] md:text-[36px] z-10 lg:text-[42px] font-semibold">{heading}</h2>
      <p className="text-gray-90 z-10 text-[14px] sm:text-[16px] lg:text-[18px] max-w-[90%] sm:max-w-[80%] lg:max-w-[70%] xl:max-w-[50%]">{description}</p>
    </div>
  );
};

export default SectionHeader;
