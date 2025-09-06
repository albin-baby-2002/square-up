"use client";
import Logo from "@/components/logo";
import React from "react";
import { NAV_ITEMS } from "./header";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <div className="border-gray-15 w-full border-t py-5">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-5">
            {NAV_ITEMS?.map((item) => {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="cursor-pointer hover:text-green-50"
                >
                  {item.label}
                </a>
              );
            })}
          </div>
          <div className="border-gray-20 flex items-center gap-2 rounded-lg border p-[10px] pl-[20px]">
            <p className="mr-[10px]">Stay Connected</p>
            {new Array(3).fill(0).map((_, i) => (
              <Image
                key={i}
                src={`/socials/social-${i + 1}.svg`}
                height={52}
                width={52}
                alt={`Social Icon ${i}`}
              />
            ))}
          </div>
        </div>

        <div className="border-gray-15 my-10 h-[2px] w-full border-b" />

        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <div className="border-gray-15 flex items-center gap-2  pb-3">
              <Mail size={18} className="text-green-50" />
              <p>hello@squareup.com</p>
            </div>

            <div className="border-gray-15 flex items-center gap-2  pb-3">
              <Phone size={18} className="text-green-50" />
              <p>+91 91813 23 2309</p>
            </div>

            <div className="border-gray-15 flex items-center gap-2  pb-3">
              <MapPin size={18} className="text-green-50" />
              <p>Somewhere in the world</p>
            </div>
          </div>
          <p>© 2025 SquareUp. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
