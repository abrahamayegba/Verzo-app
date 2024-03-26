"use client";
import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { ApolloProvider } from "@/src/apollo/ApolloProvider";
import "./globals.css";
import { useRouter } from "next/navigation";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const router = useRouter();

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
