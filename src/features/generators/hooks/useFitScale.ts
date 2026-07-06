import { useLayoutEffect, useRef, useState } from 'react'
import type { TemplateSize } from '../types'

const MAX_PREVIEW_SCALE = 0.72

/**
 * Calcula el factor de escala para mostrar una plantilla de tamaño nativo
 * (`size`) dentro de un contenedor responsivo, sin deformarla y sin recortarla.
 *
 * Devuelve un `ref` que se coloca en el contenedor y el `scale` a aplicar
 * mediante `transform: scale(...)` sobre la plantilla a tamaño real.
 */
export function useFitScale(size: TemplateSize) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const node = containerRef.current
    if (!node) return

    const update = () => {
      const { width, height } = node.getBoundingClientRect()
      if (width === 0 || height === 0) return
      const next = Math.min(width / size.width, height / size.height)
      // Dejamos aire alrededor del preview para que no consuma toda la pantalla.
      setScale(Math.min(next, MAX_PREVIEW_SCALE))
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(node)
    return () => observer.disconnect()
  }, [size.width, size.height])

  return { containerRef, scale }
}
