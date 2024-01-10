export function Anchor({ node, children, ...props }: any) {
  try {
    const url = new URL(props.href ?? '')

    props.target = '_blank'
    if (url.protocol !== 'https:' || url.host !== 'blog.ymeguro.com') {
      props.rel = 'noopener noreferrer'
    }
  } catch {}

  return <a {...props}>{children}</a>
}
