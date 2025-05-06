import './globals.css'
import { Inter } from 'next/font/google'
import BackButton from '../components/BackButton'
import ScrollControl from '../components/ScrollControl'
import HamburgerMenu from '../components/HamburgerMenu'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Personal Blog',
  description: 'Welcome to my personal blog',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // クライアントコンポーネントではないためusePathname()が使えないので
  // クラスの適用はクライアントコンポーネント側で行います
  return (
    <html lang="en">
      <body className={inter.className}>
        <ScrollControl />
        <BackButton />
        <HamburgerMenu />
        {children}
      </body>
    </html>
  )
}