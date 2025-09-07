import { SquareSlash } from "lucide-react";
import React from "react";

const Logo = ({ showText = true }: { showText?: boolean }) => {
  return (
    <div className="flex items-center gap-[10px]">
      <div className="flex size-7 md:size-10 items-center justify-center rounded-sm bg-green-50 text-black">
        <SquareSlash  className=" md:text-[28px]" />
      </div>
      {showText && <p className=" text-lg md:text-xl font-semibold">SquareIt</p>}
    </div>
  );
};

export default Logo;
