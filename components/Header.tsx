import Link from 'next/link'
import { getApp } from '@/lib/newt'
import styles from '../styles/Header.module.css'

export async function Header() {
  const app = await getApp()

  return (
    <header className={styles.Header}>
      <div className={styles.Header_Inner}>
        <Link href="/" className={styles.Header_Title}>
          {app.name || app.uid || ''}
        </Link>
        <nav className={styles.Nav}>
          <Link href="/about">About</Link>
          <Link href="/">Blog</Link>
        </nav>
        <div className={styles.Link}>
          <a
            href="https://github.com/y-meguro/blog"
            rel="noreferrer noopener"
            target="_blank"
          >
            <svg viewBox="0 0 24 24">
              <path d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2 2 0 01.64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 010-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 010 2.93c.83.74 1.2 1.74 1.2 2.94 0 4.21-2.57 5.13-5.04 5.4.45.37.82.92.82 2.02v3.03c0 .27.1.64.73.55A11 11 0 0012 1.27"></path>
            </svg>
            Source
          </a>
        </div>
      </div>
    </header>
  )
}
