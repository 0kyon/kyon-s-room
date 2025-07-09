import './globals.css'
import { Inter } from 'next/font/google'
import BackButton from '../components/BackButton'
import { FontSizeProvider } from '../components/FontSizeProvider'
import ScrollControl from '../components/ScrollControl'
import HamburgerMenu from '../components/HamburgerMenu'
import CartProvider from '../components/CartProvider'
import Script from "next/script";
import Analytics from '../components/Analytics'

const inter = Inter({ subsets: ['latin'] })

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata = {
  title: "kyon's room",
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
      <head>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}
      </head>
      <body className={inter.className}>
        <FontSizeProvider>
          <CartProvider>
            <ScrollControl />
            <BackButton />
            <HamburgerMenu />
            {children}
            <Analytics />
          </CartProvider>
        </FontSizeProvider>
      </body>
    </html>
  )
}