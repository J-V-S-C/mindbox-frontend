import type { Metadata } from "next";
import ApolloWrapper from "./components/ApolloProvider";
import { Header } from "./components/Header";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { cookies } from "next/headers";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: {
    template: "%s | MindBox",
    default: "MindBox",
  },
  description: "A comfortable place for you organize your mind and ideas",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body>
        <ApolloWrapper token={token}>
          <Header />
          {children}
        </ApolloWrapper>
      </body>
    </html>
  );
}
