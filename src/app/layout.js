import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import ClientLayout from "@/components/ClientLayout";
import React from "react";
export const metadata = {
  title: {
    default: "First Next App Home Page",
    template: "%s | First Next App",
  },
  description: "Home Page Description",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  // console.log(session);
  return (
    <html lang="en">
      <body>
        <ClientLayout session={session}>
          <div className="container">
            <Navbar />
            {children}
            <Footer />
          </div>
        </ClientLayout>
      </body>
    </html>
  );
}
