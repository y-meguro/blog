import Image from 'next/image'
import { notFound } from 'next/navigation'
import { dateToYear } from '@/lib/date'
import { getAuthor } from '@/lib/newt'
import styles from '@/styles/About.module.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `about | ymeguro's blog`,
  description:
    'ymeguroのプロフィールです。ヘッドレスCMS「Newt」の開発を行う、Newt株式会社でCTOとして働いています。',
  openGraph: {
    title: `about | ymeguro's blog`,
    description:
      'ymeguroのプロフィールです。ヘッドレスCMS「Newt」の開発を行う、Newt株式会社でCTOとして働いています。',
    images: '/ogp.jpg',
  },
}

export default async function Page() {
  const author = await getAuthor()
  if (!author) {
    notFound()
  }

  return (
    <div className={styles.About}>
      <div className={styles.About_Inner}>
        <div className={styles.About_Icon}>
          <Image src={author.profileImage.src} width={88} height={88} alt="" />
        </div>
        <div className={styles.About_Data}>
          <h1>{author.name}</h1>
          <div dangerouslySetInnerHTML={{ __html: author.biography }}></div>
          <h2>Career</h2>
          <ul>
            {author.careers.map((career) => {
              return (
                <li key={career._id}>
                  {career.company}（{dateToYear(career.startYear)}〜
                  {career.endYear && dateToYear(career.endYear)}）
                </li>
              )
            })}
          </ul>
          <h2>Link</h2>
          <ul>
            {author.links.map((link) => {
              return (
                <li key={link._id}>
                  <a href={link.url} rel="noreferrer noopener" target="_blank">
                    {link.title}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
