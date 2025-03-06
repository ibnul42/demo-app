'use client'
import { useState } from "react";
import ContactModal from "./ContactModal";

export default function ContactButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    return (
      <>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-300 hover:bg-gray-400 text-white px-2 py-1 text-xl cursor-pointer w-32 text-center uppercase"
        >
          Contact
        </button>
  
        <ContactModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </>
    );
  }