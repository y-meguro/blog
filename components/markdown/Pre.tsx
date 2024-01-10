import { AmazonCard } from './AmazonCard'
import { LinkCard } from './LinkCard'
import type { ClassAttributes, HTMLAttributes } from 'react'
import type { ExtraProps } from 'react-markdown'
import type { Article } from '@/types/article'

export function Pre({
  children,
  article,
  ...props
}: ClassAttributes<HTMLPreElement> &
  HTMLAttributes<HTMLPreElement> &
  ExtraProps & { article: Article }) {
  if (!children || typeof children !== 'object') {
    return <code {...props}>{children}</code>
  }

  const childType = 'type' in children ? children.type : ''
  if (childType !== 'code') {
    return <code {...props}>{children}</code>
  }

  const childProps = 'props' in children ? children.props : {}
  const { className, children: rawUrl } = childProps
  const url = rawUrl.trim()

  const isAmazon = className === 'language-link-amazon'
  if (isAmazon) {
    return <AmazonCard url={url} article={article} />
  }

  return <LinkCard url={url} />
}
