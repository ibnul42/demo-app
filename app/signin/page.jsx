'use client'
import PageWrapper from "@/components/PageWrapper";
import TopHeader from "@/components/TopHeader";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email) {
      toast.error("Please enter your email address.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Sign-in successful!");
        router.push("/gallery"); // Redirect to protected page after login
      } else {
        toast.error(result.error || "Something went wrong!");
      }
    } catch (err) {
      toast.error("An error occurred while signing in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="flex flex-col gap-6">
        <TopHeader />
        <div className="w-80 h-auto min-h-80 py-8 px-2 bg-gray-200 flex flex-col gap-5 justify-center items-center">
          <div className="flex-1 w-full">
            <input
              type="email"
              placeholder="Registered Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-300 py-1 px-2 placeholder:text-white text-white outline-none"
            />
          </div>
          <div>
            <button
              onClick={handleSubmit}
              className="bg-gray-300 hover:bg-gray-400 text-white px-2 py-2 text-xl cursor-pointer w-32 text-center"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
