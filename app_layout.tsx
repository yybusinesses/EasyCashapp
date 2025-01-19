import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Easy Cash',
  description: 'Revolutionizing the gig economy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-b from-blue-100 to-green-100 min-h-screen`}>
        <main className="flex flex-col items-center justify-between p-4 md:p-24">
          {children}
        </main>
      </body>
    </html>
  )
}

