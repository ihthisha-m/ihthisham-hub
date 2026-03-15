'use client'

import { useEffect, useState } from 'react'

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const total = document.body.scrollHeight - window.innerHeight
      const percent = total > 0 ? (scrolled / total) * 100 : 0
      setProgress(Math.min(percent, 100))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="progress-bar" aria-hidden="true">
      <div
        className="progress-fill"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
