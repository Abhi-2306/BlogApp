// components/ClientLayout.js
"use client"; // This directive makes the component a Client Component
import React from "react";
import { SessionProvider } from "next-auth/react";

export default function ClientLayout({ children, session }) {
    return <SessionProvider session={session}>{children}</SessionProvider>;
}
