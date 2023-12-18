import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { ApolloProvider } from "@/src/apollo/ApolloProvider";

export const metadata = {
  title: "Verzo",
  description: "Manage your business on Verzo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ApolloProvider>
        <body className=" satoshi-text">
          {children}
          <Toaster />
        </body>
      </ApolloProvider>
    </html>
  );
}
