import { SquareSlash } from "lucide-react";
import React from "react";

const Logo = ({ showText = true }: { showText?: boolean }) => {
  return (
    <div className="flex items-center gap-[10px]">
      <div className="flex size-10 items-center justify-center rounded-sm bg-green-50 text-black">
        <SquareSlash size={28} />
      </div>
      {showText && <p className="text-xl font-semibold">SquareIt</p>}
    </div>
  );
};

export default Logo;
