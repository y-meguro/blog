import axios from 'axios'
import { load } from 'cheerio'
import styles from './styles.module.css'

export async function LinkCard({ url }: { url: string }) {
  try {
    const res = await axios.get(url)
    const _$ = load(res.data)
    const title =
      _$("meta[property='og:title']").attr('content') || _$('title').text()
    const description = _$("meta[property='og:description']").attr('content')

    let imageSrc = _$("meta[property='og:image']").attr('content') ?? ''
    try {
      const { status } = await axios.get(imageSrc)
      imageSrc = status < 400 ? imageSrc : ''
    } catch (err) {
      imageSrc = ''
    }

    let icon =
      _$('link[rel="shortcut icon"]').attr('href') ||
      _$('link[rel="icon"]').attr('href') ||
      ''
    if (icon && !icon.startsWith('http')) {
      if (icon.startsWith('/')) {
        icon = new URL(url).origin + icon
      } else {
        icon = url + icon
      }
    }
    try {
      const { status } = await axios.get(icon)
      icon = status < 400 ? icon : ''
    } catch (err) {
      icon = ''
    }

    const hostname = new URL(url).hostname

    return (
      <div className={styles.Card_Container}>
        <a href={url} target="_brank">
          <div className={styles.Card_Main}>
            {title && <div className={styles.Card_Title}>{title}</div>}
            {description && (
              <div className={styles.Card_Description}>{description}</div>
            )}
            <div className={styles.LinkCard_Url}>
              {icon && <img src={icon} width="16" height="16" alt="" />}
              <div>{hostname}</div>
            </div>
          </div>
          {imageSrc && (
            <div className={styles.LinkCard_Thumbnail}>
              <img src={imageSrc} alt={title} />
            </div>
          )}
        </a>
      </div>
    )
  } catch (err) {
    console.log(url, err)
    return null
  }
}
