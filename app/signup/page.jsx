"use client";
import PageWrapper from "@/components/PageWrapper";
import TopHeader from "@/components/TopHeader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
  const router = useRouter();
  // States to handle form inputs and response
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Please enter your name");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!phone || phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    if (!address) {
      toast.error("Please enter your address");
      return;
    }

    setLoading(true);

    // Prepare the data to be sent in the request
    const userData = { name, email, phone, address };

    try {
      // Call the signup API route
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Signup successful!");
        router.push("/signin");
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
      } else {
        toast.error(result.error || "Something went wrong!");
      }
    } catch (err) {
      toast.error(err.message || "An error occurred while signing up.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="flex flex-col gap-6">
        <TopHeader />
        <div className="w-80 h-auto min-h-80 py-8 px-2 bg-gray-200 flex flex-col gap-5 justify-center items-center">
          <div className="flex-1 w-full flex flex-col gap-2">
            <input
              required
              type="text"
              placeholder="Full name of client"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-300 py-1 px-2 placeholder:text-white text-white outline-none"
            />
            <input
              required
              type="email"
              placeholder="Email address of client"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-300 py-1 px-2 placeholder:text-white text-white outline-none"
            />
            <input
              type="tel"
              placeholder="Phone number of client"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-gray-300 py-1 px-2 placeholder:text-white text-white outline-none"
            />
            <input
              required
              type="text"
              placeholder="Delivery address of client"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-gray-300 py-1 px-2 placeholder:text-white text-white outline-none"
            />
          </div>
          <div className="">
            <button
              onClick={handleSubmit}
              className="bg-gray-300 hover:bg-gray-400 text-white px-2 py-2 text-xl cursor-pointer w-32 text-center uppercase"
              disabled={loading}
            >
              {loading ? "Signing..." : "Confirm"}
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
