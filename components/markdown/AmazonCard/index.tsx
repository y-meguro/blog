import { formatDate } from '@/lib/date'
import styles from './styles.module.css'
import type { Article } from '@/types/article'

export async function AmazonCard({
  url,
  article,
}: {
  url: string
  article: Article
}) {
  const amazonLink = article.amazonLinks.find((amazonLink) => {
    return amazonLink.url === url
  })

  if (!amazonLink) throw new Error(`no amazonLink. url: ${url}`)

  return (
    <div className={styles.Card_Container}>
      <a href={url} target="_brank">
        <div className={styles.Card_Main}>
          <div className={styles.Card_Title}>{amazonLink.title}</div>
          {amazonLink.author && (
            <div className={styles.Card_Description}>
              作者: {amazonLink.author}
            </div>
          )}
          {amazonLink.releasedAt && (
            <div className={styles.Card_Description}>
              発売日: {formatDate(amazonLink.releasedAt)}
            </div>
          )}
          <div className={styles.AmazonCard_Url}>
            <img src="/amazon.png" width="16" height="16" alt="amazon" />
            <div>www.amazon.co.jp</div>
          </div>
        </div>
        <div className={styles.AmazonCard_Thumbnail}>
          <img src={amazonLink.image.src} alt={amazonLink.title} />
        </div>
      </a>
    </div>
  )
}
