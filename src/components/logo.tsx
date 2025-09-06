import SquareUp from "@/assets/square-up";
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center gap-[10px]">
      <SquareUp />
      <p className=" font-semibold text-xl ">SquareUp</p>
    </div>
  );
};

export default Logo;
