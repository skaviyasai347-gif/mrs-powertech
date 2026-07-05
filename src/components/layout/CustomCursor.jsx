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

    let ringX = 0, ringY = 0

    const move = (e) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
      ringX = e.clientX
      ringY = e.clientY
    }

    const animateRing = () => {
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`
      }
      requestAnimationFrame(animateRing)
    }

    const onOver = (e) => {
      if (e.target.closest('a, button, input, textarea, select, [role="button"]')) setHovering(true)
    }
    const onOut = (e) => {
      if (e.target.closest('a, button, input, textarea, select, [role="button"]')) setHovering(false)
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mouseout', onOut)
    const raf = requestAnimationFrame(animateRing)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(raf)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div ref={dotRef} className="fixed top-0 left-0 w-2 h-2 rounded-full bg-gold pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2" />
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border border-gold pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-[width,height,opacity] duration-300 ease-out ${
          hovering ? 'w-12 h-12 opacity-60' : 'w-8 h-8 opacity-30'
        }`}
      />
    </>
  )
}
