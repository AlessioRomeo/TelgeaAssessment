import { Poppins } from "next/font/google"
import type { Metadata } from "next"
import "./globals.css"
import React from "react"

/**
 * Unfortunately I was unable to find the font Selecta used in the Figma design.
 * The only version I could find was a paid version. For this reason I am using Poppins.
 * In production, it would of course be different.
 */
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
    title: "Telgea",
    description: "I hope you like the code!",
    generator: "Alessio Romeo",
}


export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Telgea Assessment</title>
        </head>
        <body className={poppins.className}>
        {children}
        </body>
        </html>
    )
}
