import Link from 'next/link'
import { getDescription } from '@/lib/htmlToText'
import { getArticles } from '@/lib/newt'
import styles from '@/styles/Search.module.css'

type Props = {
  searchParams: {
    q?: string
  }
}

export default async function Page({ searchParams }: Props) {
  const { q } = searchParams

  const { articles, total } = q
    ? await getArticles({
        or: [
          {
            title: { match: q },
          },
          {
            body: { match: q },
          },
        ],
      })
    : { articles: [], total: 0 }

  return (
    <main className={styles.Container}>
      {articles.length > 0 ? (
        <div className={styles.Search}>
          <p className={styles.Search_Text}>{total}件の検索結果があります</p>
          <div className={styles.Search_Results}>
            {articles.map((article) => (
              <article key={article._id} className={styles.Article}>
                <Link
                  className={styles.Article_Link}
                  href={`/entry/${article.slug}`}
                >
                  <h1 className={styles.Article_Title}>{article.title}</h1>
                  <p className={styles.Article_Description}>
                    {getDescription(article.body, 200)}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.Empty}>
          <div className={styles.Empty_Emoji}>😵</div>
          <h1 className={styles.Empty_Title}>記事が見つかりませんでした</h1>
          <p className={styles.Empty_Description}>
            違うキーワードで検索してみてください🙏
          </p>
        </div>
      )}
    </main>
  )
}
