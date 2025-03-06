import React from "react";

export default function PageWrapper({ children }) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      {children}
    </div>
  );
}
