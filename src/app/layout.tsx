import type { Metadata } from "next";
import { Providers } from "./providers";
import { MiniCart } from "@/modules/cart/components/mini-cart";
import "./globals.css";

export const metadata: Metadata = {
  title: "Slide-out Mini Cart",
  description: 'Slide out mini cart'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <Providers>
          {children}
          <MiniCart />
        </Providers>
      </body>
    </html>
  );
}
