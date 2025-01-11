"use client"

import { useRouter } from 'next/navigation'
import { MouseEventHandler, useEffect } from 'react'

interface MyLinkProps {
  href: string
  prefetch?: boolean
  className: string
  children: any
}

const MyLink: React.FC<MyLinkProps> = ({ href, prefetch = true, className, children }) => {
  const router = useRouter()

  useEffect(() => {
    if (prefetch) {
      router.prefetch(href)
    }
  }, [href, prefetch, router])

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}

export default MyLink
