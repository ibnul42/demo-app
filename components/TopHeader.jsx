import Image from "next/image";
import React from "react";

export default function TopHeader() {
  return (
    <div className="flex flex-col gap-2 items-center">
      <Image
        src="/assets/logo.svg"
        height={100}
        width={100}
        alt=""
        className="w-36 h-36"
      />
      <p className="opacity-30 font-semibold text-xl -mt-8">The12Councils</p>
    </div>
  );
}
