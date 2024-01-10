import { GoogleTagManager } from '@next/third-parties/google'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import './globals.css'
import styles from '@/styles/Layout.module.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `ymeguro's blog`,
  description:
    'ymeguroのブログです。ヘッドレスCMS「Newt」の開発を行う、Newt株式会社でCTOとして働いています。このブログでは、勉強したことや、振り返りの記録をまとめています。',
  twitter: {
    card: 'summary_large_image',
    site: '@yohei_meguro',
    creator: '@yohei_meguro',
  },
  openGraph: {
    title: `ymeguro's blog`,
    description:
      'ymeguroのブログです。ヘッドレスCMS「Newt」の開発を行う、Newt株式会社でCTOとして働いています。このブログでは、勉強したことや、振り返りの記録をまとめています。',
    images: '/ogp.jpg',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? ''),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <div className={styles.Wrapper}>
          <Header />
          {children}
          <Footer />
        </div>
      </body>
      <GoogleTagManager
        gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID ?? ''}
      />
    </html>
  )
}
