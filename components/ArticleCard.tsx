import Link from 'next/link'
import { formatDate } from '@/lib/date'
import { getDescription } from '@/lib/htmlToText'
import styles from '@/styles/ArticleCard.module.css'
import type { Article } from '@/types/article'

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/entry/${article.slug}`} className={styles.Article}>
      <div className={styles.Article_Emoji}>{article.emoji.value}</div>
      <div className={styles.Article_Data}>
        <time
          className={styles.Article_Date}
          dateTime={formatDate(article.createdAt || article._sys.createdAt)}
        >
          {formatDate(article.createdAt || article._sys.createdAt)}
        </time>
        <h3 className={styles.Article_Title}>{article.title}</h3>
        <ul className={styles.Article_Tags}>
          {article.tags.map((tag) => (
            <li key={tag._id}>#{tag.name}</li>
          ))}
        </ul>
        <p className={styles.Article_Text}>{getDescription(article.body)}</p>
      </div>
    </Link>
  )
}
