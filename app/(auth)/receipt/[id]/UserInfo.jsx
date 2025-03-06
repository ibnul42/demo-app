"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function UserInfo({ user: initialUser, asset }) {
  const searchParams = useSearchParams();
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(!initialUser);

  const receiptNo = searchParams.get("receiptNo");

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const res = await fetch("/api/user");
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    }

    if (!initialUser) {
      fetchUser();
    }
  }, [initialUser]);

  if (loading) {
    return (
      <div className="w-80 h-auto min-h-80 py-8 px-2 bg-gray-200 flex flex-col gap-5 justify-center items-center"></div>
    );
  }

  return (
    <div className="w-80 h-auto min-h-80 py-8 px-2 bg-gray-200 flex flex-col gap-5 justify-center items-center">
      <div className="w-full flex flex-col items-center gap-2">
        <h2 className="text-xl font-bold text-gray-700">{asset?.title}</h2>
        <h3 className="text-lg font-bold text-gray-700">
          Receipt: {receiptNo}
        </h3>
      </div>
      <Image
        src={asset?.src}
        alt={asset?.title}
        width={320}
        height={160}
        className="w-full h-auto max-h-40 object-cover rounded-md"
      />
      <div className="w-full">
        <p className="text-gray-600 text-sm">Name: {user?.name || ""}</p>
        <p className="text-gray-600 text-sm">Phone: {user?.phone || ""}</p>
        <p className="text-gray-600 text-sm">Email: {user?.email || ""}</p>
        <p className="text-gray-600 text-sm">Address: {user?.address || ""}</p>
      </div>
    </div>
  );
}
