import PageWrapper from "@/components/PageWrapper";
import TopHeader from "@/components/TopHeader";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <PageWrapper>
      <div className="flex flex-col gap-6">
        <TopHeader />
        <div className="w-80 h-auto min-h-80 py-8 px-2 bg-gray-200 flex flex-col gap-5 justify-center items-center">
          <Link
            href="/signin"
            className="bg-gray-300 hover:bg-gray-400 text-white px-6 py-2 text-2xl cursor-pointer w-40 text-center"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="bg-gray-300 hover:bg-gray-400 text-white px-6 py-2 text-2xl cursor-pointer w-40 text-center"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
