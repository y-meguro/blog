import { htmlToText } from 'html-to-text'

export const getDescription = (html: string, length: number = 100) => {
  let description = htmlToText(html, {
    selectors: [{ selector: 'img', format: 'skip' }],
  })
  description = description.replace(/\[[^\]]+\]/g, '')
  description = description.replace(
    /https?:\/\/[\w!\?/\+\-_~=;\.,\*&@#\$%\(\)'\[\]]+/g,
    '',
  )
  description = description.slice(0, length)
  return description
}
