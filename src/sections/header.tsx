import Logo from "@/components/logo";
import React from "react";

const Header = () => {
  return (
    <div className="border-gray-15 flex w-full justify-center border-b py-[16px]">
      <div className="container flex items-center justify-between">
        <Logo />
        <button className="primary-btn">Contact Us</button>
      </div>
    </div>
  );
};

export default Header;
