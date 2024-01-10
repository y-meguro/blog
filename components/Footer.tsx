import Image from 'next/image'
import Link from 'next/link'
import { getApp } from '@/lib/newt'
import styles from '../styles/Footer.module.css'

export async function Footer() {
  const app = await getApp()

  return (
    <footer className={styles.Footer}>
      <div className={styles.Footer_Inner}>
        <Link href="/" className={styles.Footer_SiteName}>
          {app.name || app.uid || ''}
        </Link>
        <a
          href="https://www.newt.so/"
          rel="noreferrer noopener"
          target="_blank"
          className={styles.Footer_Newt}
        >
          <Image src="/logo.svg" alt="Newt" width={16} height={13} />
          <span className={styles.Footer_NewtText}>Made in Newt</span>
        </a>
      </div>
    </footer>
  )
}
