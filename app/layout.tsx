"use client";
import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { ApolloProvider } from "@/src/apollo/ApolloProvider";
import "./globals.css";
import { usePathname, useRouter } from "next/navigation";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768; // Check for screen size less than 768px (sm)
      if (isMobile) {
        router.push("/verzo/mobilenotavailable");
      } else if (pathname === "/verzo/mobilenotavailable") {
        router.push("/auth/signin");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [router]);
      
  return (
    <html lang="en">
      <ApolloProvider>
        <body className="satoshi-text">
          {children}
          <Toaster />
        </body>
      </ApolloProvider>
    </html>
  );
};

export default RootLayout;
