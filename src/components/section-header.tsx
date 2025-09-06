import React from "react";

//---------------------------------------------------

interface TProps {
  heading: string;
  description: string;
}

//---------------------------------------------------

const SectionHeader = ({ heading, description }: TProps) => {
  return (
    <div className="border-gray-15 relative mx-auto flex w-full flex-col items-center justify-center space-y-[14px] border-b py-[100px] text-center">
      <div className="absolute top-0 z-[-2] h-full w-full bg-[radial-gradient(#191919_1px,#030303_1px)] bg-[size:20px_20px]"></div>

      <h2 className="text-[42px] font-semibold">{heading}</h2>
      <p className="text-gray-90 text-[18px] lg:max-w-[50%]">{description}</p>
    </div>
  );
};

export default SectionHeader;
