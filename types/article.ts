import { Tag } from './tag'
import type { Content, Image } from 'newt-client-js'

interface Emoji {
  type: string
  value: string
}

interface AmazonLink {
  _id: string
  url: string
  title: string
  image: Image
  author?: string
  releasedAt: string
}

export interface Article extends Content {
  title: string
  emoji: Emoji
  slug: string
  meta: {
    title?: string
    description?: string
    image?: Image
  }
  body: string
  tags: Tag[]
  amazonLinks: AmazonLink[]
  createdAt: string
}

export type Archive = { year: number; count: number }
