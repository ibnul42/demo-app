import { Poppins } from "next/font/google";
import "./globals.css";
import { HomeContextProvider } from "./context-api";
import ToastComponent from "@/components/ToastComponent";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: "%s | The12Councils",
    default: "The12Councils",
  },
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased w-screen h-screen overflow-hidden bg-white`}
      >
        <HomeContextProvider>
          {children}
          <ToastComponent />
          </HomeContextProvider>
      </body>
    </html>
  );
}
