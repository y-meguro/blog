import { draftMode } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import { FacebookShareButton } from '@/components/FacebookShareButton'
import { TwitterShareButton } from '@/components/TwitterShareButton'
import { Anchor } from '@/components/markdown/Anchor'
import { Img } from '@/components/markdown/Img'
import { Pre } from '@/components/markdown/Pre'
import { formatDate } from '@/lib/date'
import { getDescription } from '@/lib/htmlToText'
import {
  getArticles,
  getArticleBySlug,
  getPrevAndNextArticlesBySlug,
} from '@/lib/newt'
import styles from '@/styles/Article.module.css'

type Props = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const { articles } = await getArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { isEnabled } = draftMode()
  const { slug } = params
  const article = await getArticleBySlug(slug, isEnabled)

  const title = article?.meta?.title || article?.title
  const bodyDescription = getDescription(article?.body ?? '')
  const description = article?.meta?.description || bodyDescription
  const ogImage = article?.meta?.image?.src

  return {
    title,
    description,
    openGraph: {
      type: 'article',
      title,
      description,
      images: ogImage,
    },
  }
}

export default async function Page({ params }: Props) {
  const { isEnabled } = draftMode()
  const { slug } = params

  const article = await getArticleBySlug(slug, isEnabled)
  if (!article) {
    notFound()
  }

  const { prevArticle, nextArticle } = await getPrevAndNextArticlesBySlug(slug)

  const publishDate = article.createdAt || article._sys.createdAt

  return (
    <main className={styles.Container}>
      <article className={styles.Article}>
        <div className={styles.Article_Inner}>
          {isEnabled && (
            <div className={styles.Article_ClosePreview}>
              <img src="/close.svg" alt="" width={12} height={12} />
              <Link href="/api/disable-draft" prefetch={false}>
                Draft Modeをやめる
              </Link>
            </div>
          )}
          <div className={styles.Article_Header}>
            <div className={styles.Article_Emoji}>{article.emoji.value}</div>
            <h1 className={styles.Article_Title}>{article.title}</h1>
            <ul className={styles.Article_Tags}>
              {article.tags.map((tag) => (
                <li key={tag._id}>
                  <Link href={`/tags/${tag.slug}`}>#{tag.name}</Link>
                </li>
              ))}
            </ul>
            <div className={styles.Article_Row}>
              <time
                dateTime={formatDate(publishDate)}
                className={styles.Article_Date}
              >
                {formatDate(publishDate)}に公開
              </time>
              <div className={styles.Article_Share}>
                <ul className={styles.Article_ShareList}>
                  <li>
                    <TwitterShareButton title={article.title} />
                  </li>
                  <li>
                    <FacebookShareButton />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.Article_Body}>
            <ReactMarkdown
              components={{
                pre: ({ children }) => <Pre article={article}>{children}</Pre>,
                a: Anchor,
                img: Img,
              }}
              remarkPlugins={[remarkBreaks, remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {article.body}
            </ReactMarkdown>
          </div>
          <div className={styles.SnsShare}>
            <p className={styles.SnsShare_Label}>Share this post</p>
            <ul className={styles.SnsShare_List}>
              <li>
                <TwitterShareButton title={article.title} />
              </li>
              <li>
                <FacebookShareButton />
              </li>
            </ul>
          </div>
          <nav className={styles.Links}>
            {prevArticle && (
              <Link
                href={`/entry/${prevArticle.slug}`}
                className={styles.Links_Previous}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#333333"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" opacity=".87" />
                  <path d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z" />
                </svg>
                Previous post
              </Link>
            )}
            {nextArticle && (
              <Link
                href={`/entry/${nextArticle.slug}`}
                className={styles.Links_Next}
              >
                Next post
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 24 24"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#333333"
                >
                  <g>
                    <path d="M0,0h24v24H0V0z" fill="none" />
                  </g>
                  <g>
                    <polygon points="6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12" />
                  </g>
                </svg>
              </Link>
            )}
          </nav>
        </div>
      </article>
    </main>
  )
}
