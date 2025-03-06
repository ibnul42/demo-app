"use client";
import React, { useEffect, useRef, useState } from "react";

export default function ContactModal({ isOpen, onClose, onSend }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const modalRef = useRef(null);

  // Close modal when clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose(); // Close the modal if click is outside
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-xs">
      <div ref={modalRef} className="bg-gray-200 p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-medium text-center mb-4 text-white">Contact Us</h2>

        {/* Subject Input */}
        <input
          type="text"
          placeholder="Subject"
          className="w-full bg-white my-2 py-1 px-2 placeholder:text-gray-300 text-gray-300 outline-none"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        {/* Message Textarea */}
        <textarea
          placeholder="Message"
          className="w-full bg-white my-2 py-1 px-2 placeholder:text-gray-300 text-gray-300 outline-none h-24"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-white px-2 py-2 text-xl cursor-pointer w-32 text-center"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSend(subject, message);
              setSubject("");
              setMessage("");
              onClose();
            }}
            className="bg-gray-300 hover:bg-gray-400 text-white px-2 py-2 text-xl cursor-pointer w-32 text-center"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
