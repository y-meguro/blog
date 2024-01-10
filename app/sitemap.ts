import { getArchives, getArticles, getTags } from '@/lib/newt'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = []
  const limit = Number(process.env.NEXT_PUBLIC_PAGE_LIMIT) || 10

  // top
  routes.push({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  })

  // about
  routes.push({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
  })

  // entry
  const { articles } = await getArticles({
    select: ['slug', 'createdAt'],
  })
  const blogRoutes = articles.map((article) => {
    return {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/entry/${article.slug}`,
      lastModified: article.createdAt,
    }
  })
  routes.push(...blogRoutes)

  // page
  const { total } = await getArticles()
  const maxPage = Math.ceil(total / limit)
  const pages = Array.from({ length: maxPage }, (_, index) => index + 1)

  pages.forEach((page) => {
    routes.push({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/page/${page.toString()}`,
    })
  })

  // archives
  const archives = await getArchives()
  await archives.reduce(async (prevPromise, archive) => {
    await prevPromise

    const { total } = await getArticles({
      createdAt: {
        gte: archive.year.toString(),
        lt: (archive.year + 1).toString(),
      },
    })
    const maxPage = Math.ceil(total / limit)
    const pages = Array.from({ length: maxPage }, (_, index) => index + 1)

    routes.push({
      url: `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/archives/${archive.year.toString()}`,
    })
    pages.forEach((page) => {
      routes.push({
        url: `${
          process.env.NEXT_PUBLIC_BASE_URL
        }/archives/${archive.year.toString()}/${page.toString()}`,
      })
    })
  }, Promise.resolve())

  // tags
  const tags = await getTags()
  await tags.reduce(async (prevPromise, tag) => {
    await prevPromise

    const { total } = await getArticles({
      tags: tag._id,
    })
    const maxPage = Math.ceil(total / limit)
    const pages = Array.from({ length: maxPage }, (_, index) => index + 1)

    routes.push({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/tags/${tag.slug}`,
    })
    pages.forEach((page) => {
      routes.push({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/tags/${
          tag.slug
        }/${page.toString()}`,
      })
    })
  }, Promise.resolve())

  // search
  routes.push({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/search`,
  })

  return routes
}
