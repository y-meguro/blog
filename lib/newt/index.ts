import { cache } from 'react'
import { productionClient, previewClient } from './client'
import type { AppMeta, GetContentsQuery } from 'newt-client-js'
import type { Archive, Article } from '@/types/article'
import type { Author } from '@/types/author'
import type { Tag, TagWithCount } from '@/types/tag'

export const getApp = cache(async (): Promise<AppMeta> => {
  const client = productionClient
  const app = await client.getApp({
    appUid: process.env.NEXT_PUBLIC_NEWT_APP_UID + '',
  })
  return app
})

export const getArticles = cache(
  async (
    query?: GetContentsQuery,
  ): Promise<{ articles: Article[]; total: number }> => {
    const client = productionClient
    const { items: articles, total } = await client.getContents<Article>({
      appUid: process.env.NEXT_PUBLIC_NEWT_APP_UID + '',
      modelUid: process.env.NEXT_PUBLIC_NEWT_ARTICLE_MODEL_UID + '',
      query: {
        depth: 2,
        ...query,
      },
    })
    return {
      articles,
      total,
    }
  },
)

export const getArticleBySlug = cache(
  async (slug: string, preview?: boolean): Promise<Article | null> => {
    const client = preview ? previewClient : productionClient
    const article = await client.getFirstContent<Article>({
      appUid: process.env.NEXT_PUBLIC_NEWT_APP_UID + '',
      modelUid: process.env.NEXT_PUBLIC_NEWT_ARTICLE_MODEL_UID + '',
      query: {
        depth: 2,
        slug,
      },
    })
    return article
  },
)

export const getPrevAndNextArticlesBySlug = cache(async (slug: string) => {
  const { articles } = await getArticles()
  const index = articles.findIndex((article) => article.slug === slug)
  if (index === -1) {
    return {
      prevArticle: null,
      nextArticle: null,
    }
  }

  const prevArticle = articles[index - 1]
  const nextArticle = articles[index + 1]
  return {
    prevArticle,
    nextArticle,
  }
})

export const getTags = cache(async (): Promise<TagWithCount[]> => {
  const client = productionClient
  const { items: tags } = await client.getContents<Tag>({
    appUid: process.env.NEXT_PUBLIC_NEWT_APP_UID + '',
    modelUid: process.env.NEXT_PUBLIC_NEWT_TAG_MODEL_UID + '',
  })

  const { items: articles } = await client.getContents<{
    tags: string[]
  }>({
    appUid: process.env.NEXT_PUBLIC_NEWT_APP_UID + '',
    modelUid: process.env.NEXT_PUBLIC_NEWT_ARTICLE_MODEL_UID + '',
    query: {
      depth: 0,
      select: ['tags'],
    },
  })

  const getTagCount = (tag: Tag) => {
    return articles.filter((article) => {
      return article.tags?.some((articleTag: string) => articleTag === tag._id)
    }).length
  }

  const popularTags: TagWithCount[] = tags
    .map((tag) => {
      return {
        ...tag,
        count: getTagCount(tag),
      }
    })
    .filter((tag) => {
      // 1件も記事のないタグは除外
      return tag.count > 0
    })
    .sort((a, b) => {
      return b.count - a.count
    })
    // 上位10件のみ取得
    .slice(0, 10)

  return popularTags
})

export const getTag = cache(async (slug: string): Promise<Tag | null> => {
  const client = productionClient
  const tag = await client.getFirstContent<Tag>({
    appUid: process.env.NEXT_PUBLIC_NEWT_APP_UID + '',
    modelUid: process.env.NEXT_PUBLIC_NEWT_TAG_MODEL_UID + '',
    query: {
      slug,
    },
  })
  return tag
})

export const getAuthor = async () => {
  const client = productionClient
  const author = await client.getFirstContent<Author>({
    appUid: process.env.NEXT_PUBLIC_NEWT_APP_UID + '',
    modelUid: process.env.NEXT_PUBLIC_NEWT_AUTHOR_MODEL_UID + '',
  })
  return author
}

export const getArchives = cache(async (): Promise<Archive[]> => {
  const client = productionClient
  const { items: articles } = await client.getContents<{
    createdAt: string
  }>({
    appUid: process.env.NEXT_PUBLIC_NEWT_APP_UID + '',
    modelUid: process.env.NEXT_PUBLIC_NEWT_ARTICLE_MODEL_UID + '',
    query: {
      select: ['createdAt'],
    },
  })
  const oldestArticle = articles.slice(-1)[0]
  const oldestYear = new Date(oldestArticle.createdAt).getFullYear()
  const currentYear = new Date().getFullYear()
  const years = Array.from(
    { length: currentYear - oldestYear + 1 },
    (_, index) => {
      return currentYear - index
    },
  )

  const getArchiveCount = (year: number) => {
    return articles.filter((article) => {
      return article.createdAt.startsWith(`${year}-`)
    }).length
  }

  const archives = years
    .map((year) => {
      return {
        year,
        count: getArchiveCount(year),
      }
    })
    .filter((archive) => {
      // 1件も記事のない年は除外
      return archive.count > 0
    })

  return archives
})
