"use client";

import { useEffect, useState } from "react";
import PageWrapper from "@/components/PageWrapper";
import TopHeader from "@/components/TopHeader";
import ContactButton from "@/components/ContactButton";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "@/constant/helper";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Page() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/user");
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data);
      } catch (error) {}
    }
    fetchUser();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === assets.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? assets.length - 1 : prevIndex - 1
    );
  };

  const handleInterest = async (event) => {
    setLoading(true);
    event.preventDefault();

    if (!user) {
      alert("User information is not available!");
      setLoading(false);
      return;
    }

    const asset = assets[currentIndex];

    try {
      const htmlContent = `
    <h1>Interested in ${asset.title}</h1>
    <h2>User Details:</h2>
    <p><strong>Name:</strong> ${user.name}</p>
    <p><strong>Phone:</strong> ${user.phone}</p>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Address:</strong> ${user.address}</p>
  `;
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user,
          subject: `New Interest in ${asset.title}`,
          htmlContent,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Email sent successfully!");
        router.push(`/receipt/${assets[currentIndex].id}`);
      } else {
        toast.error("Failed to send email");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Error sending email!");
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="flex flex-col gap-6">
        <TopHeader />
        <div className="space-y-2">
          <div className="flex gap-3 items-center">
            <button
              onClick={handlePrev}
              className="text-4xl px-3 py-1 text-gray-300 rounded hover:text-gray-400 cursor-pointer"
            >
              {`<`}
            </button>
            <div className="w-[500px] aspect-video bg-gray-200 relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={assets[currentIndex].src}
                    alt={assets[currentIndex].title}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <button
              onClick={handleNext}
              className="text-4xl px-3 py-1 text-gray-300 rounded hover:text-gray-400 cursor-pointer"
            >
              {`>`}
            </button>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleInterest}
              disabled={loading}
              className="bg-gray-300 hover:bg-gray-400 text-white px-2 py-1 text-xl cursor-pointer w-32 text-center uppercase"
            >
              {loading ? "Sending..." : "Interested"}
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <ContactButton />
        </div>
      </div>
    </PageWrapper>
  );
}
