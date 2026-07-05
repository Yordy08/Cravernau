import { useCallback, useState, type RefObject } from 'react'
import { toPng } from 'html-to-image'
import type { TemplateSize } from '../types'

interface UseExportPngOptions {
  /** Nodo a tamaño nativo (sin escalar) que se capturará. */
  nodeRef: RefObject<HTMLElement | null>
  size: TemplateSize
  fileName: string
}

/**
 * Exporta el nodo referenciado a un PNG de resolución exacta `size` y dispara
 * la descarga. Captura siempre el nodo a tamaño nativo, de modo que la escala
 * usada en la vista previa no afecta la resolución final.
 */
export function useExportPng({ nodeRef, size, fileName }: UseExportPngOptions) {
  const [isExporting, setIsExporting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const exportPng = useCallback(async () => {
    const node = nodeRef.current
    if (!node || isExporting) return

    setIsExporting(true)
    setError(null)
    try {
      // Aseguramos que las fuentes web estén listas antes de rasterizar.
      if (document.fonts?.ready) {
        await document.fonts.ready
      }

      const dataUrl = await toPng(node, {
        width: size.width,
        height: size.height,
        pixelRatio: 1,
        // No usamos cacheBust: añadiría un query string que rompe los
        // object URLs (blob:) de la imagen cargada y saldría en blanco.
        cacheBust: false,
        // Neutralizamos cualquier transform/escala heredada del preview.
        style: { transform: 'none', transformOrigin: 'top left', margin: '0' },
      })

      const link = document.createElement('a')
      link.download = `${fileName}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo exportar la imagen.')
    } finally {
      setIsExporting(false)
    }
  }, [nodeRef, size.width, size.height, fileName, isExporting])

  return { exportPng, isExporting, error }
}
