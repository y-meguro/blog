import { createClient } from 'newt-client-js'
import 'server-only'

export const productionClient = createClient({
  spaceUid: process.env.NEWT_SPACE_UID + '',
  token: process.env.NEWT_CDN_TOKEN + '',
  apiType: 'cdn',
})

export const previewClient = createClient({
  spaceUid: process.env.NEWT_SPACE_UID + '',
  token: process.env.NEWT_API_TOKEN + '',
  apiType: 'api',
})
