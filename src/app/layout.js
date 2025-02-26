"use client";
import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "@/components/Utility/Navbar";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className={`bg-blue-50 `}>
        <Toaster position="top-center" reverseOrder={false} />
        {pathname != "/Admin" ? (
          <>
            <Navbar />
            <div className="text-sm px-2  md:text-xl">
              {/* <div className="text-sm px-2 md:px-0 md:text-xl  container m-auto"> */}
              {children}
            </div>{" "}
          </>
        ) : (
          <div className="text-sm  md:text-xl">{children}</div>
        )}
      </body>
    </html>
  );
}
