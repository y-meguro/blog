import type { Content, Image } from 'newt-client-js'

interface Career {
  _id: string
  company: string
  startYear: string
  endYear?: string
}

interface Link {
  _id: string
  title: string
  url: string
}

export interface Author extends Content {
  name: string
  profileImage: Image
  biography: string
  careers: Career[]
  links: Link[]
}
