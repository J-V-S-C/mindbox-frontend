import type { Metadata } from "next";
import ApolloWrapper from "./components/ApolloProvider";
import { Header } from "./components/Header";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    template: "%s | MindBox",
    default: "MindBox",
  },
  description: "A comfortable place for you organize your mind and ideas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body>
        <ApolloWrapper>
          <Header />
          {children}
        </ApolloWrapper>
      </body>
    </html>
  );
}
