"use client";

import { useEffect, useState } from "react";
import PageWrapper from "@/components/PageWrapper";
import TopHeader from "@/components/TopHeader";
import ContactButton from "@/components/ContactButton";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "@/constant/helper";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Page() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/user");
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
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
    event.preventDefault();
  
    // const formData = {
    //   name: "ibnul",
    //   email: "ibnul@example.com",
    //   subject: "New Interest",
    //   message: "I am interested in learning more about your website",
    // };
  
    // try {
    //   const res = await fetch("/api/send-email", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(formData), // Ensure this is sent
    //   });
  
    //   const data = await res.json();
    //   setResponse(data.message);
    //   toast.success(data.message);
    // } catch (error) {
    //   console.error("Error:", error);
    //   setResponse("Something went wrong.");
    //   toast.error("Failed to send email");
    // }
    router.push(`/receipt/${assets[currentIndex].id}`);
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
              className="bg-gray-300 hover:bg-gray-400 text-white px-2 py-1 text-xl cursor-pointer w-32 text-center uppercase"
            >
              Interested
            </button>
          </div>

          {/* {user && (
            <div className="w-full bg-gray-100 p-4 rounded-md">
              <p className="text-gray-600 text-sm">Name: {user.name}</p>
              <p className="text-gray-600 text-sm">Phone: {user.phone}</p>
              <p className="text-gray-600 text-sm">Email: {user.email}</p>
              <p className="text-gray-600 text-sm">Address: {user.address}</p>
            </div>
          )} */}
        </div>

        <div className="flex justify-center">
          <ContactButton />
        </div>
      </div>
    </PageWrapper>
  );
}
