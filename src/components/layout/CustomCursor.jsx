import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches
    const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches

    if (!isDesktop || noMotion || !hasFinePointer) return

    setEnabled(true)
    document.body.classList.add('has-custom-cursor')

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0

    const move = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${mouseX}px, ${mouseY}px)`
      }
    }

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.15
      ringY += (mouseY - ringY) * 0.15

      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ringX}px, ${ringY}px)`
      }

      requestAnimationFrame(animateRing)
    }

    const handleHover = (e) => {
      const target = e.target.closest(
        'a, button, input, textarea, select, [role="button"]'
      )

      setHovering(Boolean(target))
    }

    const hideCursor = () => {
      if (dotRef.current) dotRef.current.style.opacity = 0
      if (ringRef.current) ringRef.current.style.opacity = 0
    }

    const showCursor = () => {
      if (dotRef.current) dotRef.current.style.opacity = 1
      if (ringRef.current) ringRef.current.style.opacity = 1
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', handleHover)
    window.addEventListener('mouseleave', hideCursor)
    window.addEventListener('mouseenter', showCursor)

    const animation = requestAnimationFrame(animateRing)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', handleHover)
      window.removeEventListener('mouseleave', hideCursor)
      window.removeEventListener('mouseenter', showCursor)

      cancelAnimationFrame(animation)

      document.body.classList.remove('has-custom-cursor')
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      {/* Gold cursor dot */}
      <div
        ref={dotRef}
        className="
          fixed top-0 left-0
          w-2 h-2
          rounded-full
          bg-gold
          pointer-events-none
          z-[9999]
          -translate-x-1/2
          -translate-y-1/2
          shadow-[0_0_12px_rgba(212,175,55,0.8)]
          transition-opacity duration-300
        "
      />

      {/* Outer glowing ring */}
      <div
        ref={ringRef}
        className={`
          fixed top-0 left-0
          rounded-full
          border border-gold
          pointer-events-none
          z-[9998]
          -translate-x-1/2
          -translate-y-1/2
          transition-all duration-300 ease-out
          ${
            hovering
              ? 'w-14 h-14 opacity-70 bg-gold/10'
              : 'w-8 h-8 opacity-40'
          }
        `}
      />
    </>
  )
}