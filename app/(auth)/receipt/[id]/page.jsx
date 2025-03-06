"use client";
import ContactButton from "@/components/ContactButton";
import PageWrapper from "@/components/PageWrapper";
import TopHeader from "@/components/TopHeader";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import UserInfo from "./UserInfo";
import { assets } from "@/constant/helper";

export default function page() {
  const params = useParams();
  const id  = params?.id;
  const [asset, setAsset] = useState(null);  

  useEffect(() => {
    if (id) {
      const foundAsset = assets.find((asset) => asset.id === id);
      setAsset(foundAsset);
    }
  }, [id]);

  return (
    <PageWrapper>
      <div className="flex flex-col gap-6">
        <TopHeader />
        <UserInfo asset={asset} />
        <div className="flex justify-center">
          <ContactButton />
        </div>
      </div>
    </PageWrapper>
  );
}
