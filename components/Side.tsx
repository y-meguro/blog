import Link from 'next/link'
import { Suspense } from 'react'
import { getArchives, getTags } from '@/lib/newt'
import { SearchField, SearchFieldFallback } from './SearchField'
import styles from '@/styles/Side.module.css'

export async function Side() {
  const tags = await getTags()
  const archives = await getArchives()

  return (
    <aside className={styles.Side}>
      <div className={styles.Side_Row}>
        <h3 className={styles.Side_Heading}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          Search
        </h3>
        <Suspense fallback={<SearchFieldFallback />}>
          <SearchField />
        </Suspense>
      </div>
      <div className={styles.Side_Row}>
        <h3 className={styles.Side_Heading}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#333333"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM13 20.01L4 11V4h7v-.01l9 9-7 7.02z" />
            <circle cx="6.5" cy="6.5" r="1.5" />
          </svg>
          Popular Tags
        </h3>
        <ul className={styles.PopularTags}>
          {tags.map((tag) => (
            <li key={tag._id}>
              <Link href={`/tags/${tag.slug}`}>
                {tag.name} ({tag.count})
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.Side_Row}>
        <h3 className={styles.Side_Heading}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="26px"
            viewBox="0 0 26 26"
            width="26px"
            fill="#333333"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V10h16v11zm0-13H4V5h16v3z" />
          </svg>
          Archives
        </h3>
        <ul className={styles.Archives}>
          {archives.map((archive) => (
            <li key={archive.year}>
              <Link href={`/archives/${archive.year}`}>
                {archive.year} ({archive.count})
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
