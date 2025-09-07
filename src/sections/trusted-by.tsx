import Image from "next/image";
import React from "react";

const TrustedBy = () => {
  return (
    <div className="py-10 border-b  bg-background border-gray-15 flex items-center  justify-center">
      {new Array(6).fill(0).map((_, i) => {
        return <div key={i} className="h-[80px] w-[250px] flex justify-center">
          <Image
          src={`/trusted-by/tr-by-${i+1}.svg`}
          alt={`Trusted by ${i+1}`}
          width={120}
          height={40}
          />
        </div>;
      })}
    </div>
  );
};

export default TrustedBy;
