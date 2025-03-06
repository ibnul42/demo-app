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
  const [user, setUser] = useState(null);
  const [asset, setAsset] = useState(null);

  // useEffect(() => {
  //   async function fetchUser() {
  //     try {
  //       const res = await fetch("/api/user");
  //       if (!res.ok) throw new Error("Failed to fetch user");
  //       const data = await res.json();
  //       setUser(data);
  //     } catch (error) {}
  //   }
  //   fetchUser();
  // }, []);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        console.log("Fetched user data:", data); // Debugging
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    fetchUser();
  }, []);
  

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
        <UserInfo user={user} asset={asset} />
        <div className="flex justify-center">
          <ContactButton />
        </div>
      </div>
    </PageWrapper>
  );
}
