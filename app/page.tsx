import { ArticleCard } from '@/components/ArticleCard'
import { Pagination } from '@/components/Pagination'
import { Side } from '@/components/Side'
import { getArticles } from '@/lib/newt'
import styles from '@/styles/ArticleList.module.css'

export default async function Page() {
  const { articles, total } = await getArticles({
    limit: Number(process.env.NEXT_PUBLIC_PAGE_LIMIT) || 10,
  })
  const headingText = 'Recent Articles'

  return (
    <div className={styles.Container}>
      <div className={styles.Container_Inner}>
        <main className={styles.Articles}>
          <div className={styles.Articles_Inner}>
            <h2 className={styles.Articles_Heading}>{headingText}</h2>
            {articles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
          <Pagination total={total} current={1} basePath={'/page'} />
        </main>
        <Side />
      </div>
    </div>
  )
}
