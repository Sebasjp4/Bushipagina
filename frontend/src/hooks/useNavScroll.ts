import { useEffect, useState } from 'react'

/**
 * Retorna `true` cuando la página ha sido scrolleada más de `threshold` px.
 * Pensado para activar estados visuales en navegaciones fijas.
 */
export function useNavScroll(threshold = 40) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}
