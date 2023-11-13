import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <body className=" satoshi-text">{children}</body>
    </html>
  );
}
