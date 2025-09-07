import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const TrustedBy = () => {
  return (
    <div className="bg-background border-gray-15 grid grid-cols-2 items-center justify-center lg:py-10 lg:flex lg:border-b">
      {new Array(6).fill(0).map((_, i) => {
        return (
          <div
            key={i}
            className={cn("flex h-[100px] lg:h-[80px] justify-center lg:w-[250px] border-b lg:border-b-0 border-gray-15", {
              " border-r lg:border-r-0": i % 2 === 0,
            })}
          >
            <Image
              src={`/trusted-by/tr-by-${i + 1}.svg`}
              alt={`Trusted by ${i + 1}`}
              width={120}
              height={40}
              className={cn("w-[80px] sm:w-[100px] lg:w-[120px]")}
            />
          </div>
        );
      })}
    </div>
  );
};

export default TrustedBy;
