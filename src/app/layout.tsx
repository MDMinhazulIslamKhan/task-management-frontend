import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/lib/Providers";
import Header from "@/components/ui/Header";

export const metadata: Metadata = {
  title: "Task Management",
  description: "Created by Md. Minhazul Islam Khan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <div>
          <Header />
        </div>
        <body className="pt-20 min-h-screen">{children}</body>
      </html>
    </Providers>
  );
}
