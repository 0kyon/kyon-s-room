import './globals.css'
import { Inter } from 'next/font/google'
import BackButton from '../components/BackButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Personal Blog',
  description: 'Welcome to my personal blog',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BackButton />
        {children}
      </body>
    </html>
  )
}