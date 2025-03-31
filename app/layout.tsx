import { Poppins } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Telgea',
  description: 'I hope you like the code!',
  generator: 'Alessio Romeo',
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
      <body className={poppins.className}>
      {children}
      </body>
      </html>
  )
}
