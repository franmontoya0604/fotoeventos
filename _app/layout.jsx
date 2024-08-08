'use client'
import { SessionProvider } from "next-auth/react"
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <SessionProvider>{children}</SessionProvider>
        
      </body>
    </html>
  );
}
