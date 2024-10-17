import './globals.css'
// import { Inter } from 'next/font/google'
// const inter = Inter({ subsets: ['latin'] })
import { GoogleAnalytics } from '@next/third-parties/google'
export const metadata = {
  title: 'Quality Driven Tech',
  description: 'Quality is Priority',
}
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
})



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GoogleAnalytics gaId="G-G98MDNV30F" />
      <body className={montserrat.className}>{children}</body>
    </html>
  )
}
