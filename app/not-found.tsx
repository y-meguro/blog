import Link from 'next/link'
import styles from '@/styles/Error.module.css'

export default function NotFound() {
  return (
    <div className={styles.Error}>
      <span className={styles.Error_Emoji}>😵</span>
      <h1>ページが見つかりませんでした</h1>
      <Link href="/" className={styles.Error_Link}>
        トップに戻る
      </Link>
    </div>
  )
}
