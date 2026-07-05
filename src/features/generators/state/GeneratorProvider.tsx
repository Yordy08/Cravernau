import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'

export interface ImagePosition {
  /** object-position horizontal (0–100 %). */
  x: number
  /** object-position vertical (0–100 %). */
  y: number
}

interface GeneratorContextValue {
  category: string
  headline: string
  /** Imagen compartida entre plantillas, como dataURL (serializable/persistible). */
  imageDataUrl: string | null
  setCategory: (v: string) => void
  setHeadline: (v: string) => void
  setImageFile: (file: File | null) => void
  /** Posición del encuadre, INDEPENDIENTE por plantilla (`templateId`). */
  getPosition: (templateId: string) => ImagePosition
  setPosition: (templateId: string, pos: ImagePosition) => void
}

const DEFAULT_POSITION: ImagePosition = { x: 50, y: 50 }
const TEXT_KEY = 'cravernau:generator:text'
const IMAGE_KEY = 'cravernau:generator:image'

const GeneratorContext = createContext<GeneratorContextValue | null>(null)

type Positions = Record<string, ImagePosition>

interface PersistedText {
  category?: string
  headline?: string
  positions?: Positions
}

function loadText(): PersistedText {
  try {
    return JSON.parse(localStorage.getItem(TEXT_KEY) ?? '{}') as PersistedText
  } catch {
    return {}
  }
}

/**
 * Provee el estado del generador (categoría, titular, imagen y posiciones) de
 * forma COMPARTIDA entre todas las plantillas, para que la imagen y los textos
 * se mantengan al cambiar entre pestañas (Noticia ↔ Historia). Las posiciones
 * del encuadre se guardan por plantilla.
 *
 * Persiste en localStorage: los textos/posiciones en una clave y la imagen
 * (dataURL) en otra, para no reescribir la imagen pesada en cada tecla o
 * arrastre. Si la imagen supera la cuota, se conserva en memoria igualmente.
 */
export function GeneratorProvider({ children }: { children: ReactNode }) {
  const initialText = useRef(loadText()).current
  const [category, setCategory] = useState(initialText.category ?? 'Última hora')
  const [headline, setHeadline] = useState(initialText.headline ?? '')
  const [positions, setPositions] = useState<Positions>(initialText.positions ?? {})
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(
    () => localStorage.getItem(IMAGE_KEY),
  )

  // Persistir textos + posiciones (payload pequeño).
  useEffect(() => {
    try {
      localStorage.setItem(TEXT_KEY, JSON.stringify({ category, headline, positions }))
    } catch {
      /* cuota llena: se mantiene en memoria */
    }
  }, [category, headline, positions])

  // Persistir la imagen por separado (solo cuando cambia).
  useEffect(() => {
    try {
      if (imageDataUrl) localStorage.setItem(IMAGE_KEY, imageDataUrl)
      else localStorage.removeItem(IMAGE_KEY)
    } catch {
      /* imagen demasiado pesada para localStorage: solo en memoria */
    }
  }, [imageDataUrl])

  const setImageFile = useCallback((file: File | null) => {
    if (!file) {
      setImageDataUrl(null)
      return
    }
    const reader = new FileReader()
    reader.onload = () => setImageDataUrl(typeof reader.result === 'string' ? reader.result : null)
    reader.readAsDataURL(file)
  }, [])

  const getPosition = useCallback(
    (templateId: string) => positions[templateId] ?? DEFAULT_POSITION,
    [positions],
  )

  const setPosition = useCallback((templateId: string, pos: ImagePosition) => {
    setPositions((prev) => ({ ...prev, [templateId]: pos }))
  }, [])

  const value: GeneratorContextValue = {
    category,
    headline,
    imageDataUrl,
    setCategory,
    setHeadline,
    setImageFile,
    getPosition,
    setPosition,
  }

  return <GeneratorContext.Provider value={value}>{children}</GeneratorContext.Provider>
}

export function useGenerator(): GeneratorContextValue {
  const ctx = useContext(GeneratorContext)
  if (!ctx) throw new Error('useGenerator debe usarse dentro de <GeneratorProvider>')
  return ctx
}
