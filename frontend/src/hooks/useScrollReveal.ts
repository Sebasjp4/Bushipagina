import { useEffect } from 'react'

/**
 * Agrega la clase `is-revealed` a cualquier elemento con `data-reveal`
 * cuando entra al viewport. El elemento debe definir su propia transición
 * (opacity, translate, etc.) y leer `is-revealed` para llegar al estado final.
 */
export function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-reveal]')
    if (els.length === 0) return

    els.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 3) * 0.08}s`
    })

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.14 },
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}
