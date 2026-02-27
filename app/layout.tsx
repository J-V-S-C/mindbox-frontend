import type { Metadata } from "next";
import ApolloWrapper from "./components/ApolloProvider";
import "./globals.css";

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
    <html lang="en">
      <body>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
