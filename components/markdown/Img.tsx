export function Img({ src, alt }: any) {
  const srcUrl = new URL(src)
  const url = new URL(`${srcUrl.origin}${srcUrl.pathname}`)
  url.searchParams.set('format', 'auto')

  return <img src={url.toString()} alt={alt} />
}
