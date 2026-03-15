import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'ihthisham — Offensive Security Researcher',
    template: '%s | ihthisham',
  },
  description:
    'Offensive security researcher documenting the OSCP journey, bug bounty findings, and cybersecurity writeups.',
  keywords: ['cybersecurity', 'OSCP', 'penetration testing', 'bug bounty', 'writeups', 'CTF'],
  authors: [{ name: 'ihthisham' }],
  openGraph: {
    title: 'ihthisham — Offensive Security Researcher',
    description:
      'Offensive security researcher documenting the OSCP journey, bug bounty findings, and cybersecurity writeups.',
    url: 'https://ihthisham.github.io',
    siteName: 'ihthisham hub',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ihthisham — Offensive Security Researcher',
    description: 'Offensive security research, OSCP prep, and bug bounty writeups.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;700&family=Fira+Code:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
