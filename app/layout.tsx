import ModalProvider from "@/components/modals/modal-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Interactive transfer learning | TheGamingClassroom",
  description: "Learn in games. Apply it in life. Win in both.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <ModalProvider />
        {children}
      </body>
    </html>
  );
}
