"use client";
import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "@/components/Utility/Navbar";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/Context/AuthContext";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`bg-blue-50 `}>
          <Toaster position="top-center" reverseOrder={false} />
          {!pathname.startsWith("/Admin") ? (
            <>
              <Navbar />
              <div className="text-sm px-2  mt-2 md:text-xl">
                {children}
              </div>{" "}
            </>
          ) : (
            <div className="text-sm  md:text-xl">{children}</div>
          )}
        </body>
      </AuthProvider>
    </html>
  );
}
