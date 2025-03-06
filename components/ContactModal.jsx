"use client";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function ContactModal({ isOpen, onClose, onSend }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const modalRef = useRef(null);

  // Close modal when clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setSubject("");
        setMessage("");
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

  const handleSubmit = async (event) => {
    // onSend(subject, message);
    // setSubject("");
    // setMessage("");
    // onClose();
    setLoading(true);
    event.preventDefault();

    if (!user) {
      alert("User information is not available!");
      setLoading(false);
      return;
    }

    try {
      const htmlContent = `
      <h3>User Details:</h3>
    <p><strong>Name:</strong> ${user.name}</p>
    <p><strong>Phone:</strong> ${user.phone}</p>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Address:</strong> ${user.address}</p>
    <p><strong>Message:</strong> ${message}</p>`;
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user,
          subject: `${subject}`,
          htmlContent,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Message sent successfully!");
        setSubject("");
        setMessage("");
        setLoading(false);
        onClose();
      } else {
        toast.error("Failed to send message");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Failed to send message");
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-xs">
      <div ref={modalRef} className="bg-gray-200 p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-medium text-center mb-4 text-white">
          Contact Us
        </h2>

        {/* Subject Input */}
        <input
          type="text"
          placeholder="Subject"
          className="w-full bg-white my-2 py-1 px-2 placeholder:text-gray-300 text-gray-600 outline-none"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        {/* Message Textarea */}
        <textarea
          placeholder="Message"
          className="w-full bg-white my-2 py-1 px-2 placeholder:text-gray-300 text-gray-600 outline-none h-24"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            disabled={loading}
            onClick={() => {
              setSubject("");
              setMessage("");
              onClose();
            }}
            className="bg-gray-300 hover:bg-gray-400 text-white px-2 py-2 text-xl cursor-pointer w-32 text-center"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-gray-300 hover:bg-gray-400 text-white px-2 py-2 text-xl cursor-pointer w-32 text-center"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
