'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from '@/styles/SearchField.module.css'

export function SearchFieldFallback() {
  return (
    <form action="/search">
      <div className={styles.Search_Input}>
        <input name="q" type="search" placeholder="Search" />
      </div>
    </form>
  )
}

export function SearchField() {
  const searchParams = useSearchParams()
  const q = searchParams.get('q')

  const [searchText, setSearchText] = useState(q || '')

  useEffect(() => {
    if (q) {
      setSearchText(q)
    }
  }, [q])

  return (
    <form action="/search">
      <div className={styles.Search_Input}>
        <input
          name="q"
          type="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search"
        />
      </div>
    </form>
  )
}
