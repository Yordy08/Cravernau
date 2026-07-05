import type { TemplateComponentProps, FrameLayout } from '../../types'
import NewsFrameTemplate from '../../components/NewsFrameTemplate'
import frameSrc from '../../assets/noticia-frame.png'

/**
 * PlantillaNoticia45 — noticia Burbuja Política, formato feed 4:5 (1080×1350).
 * Diseño fijo provisto por el marco PNG. Solo cambian categoría, titular e imagen.
 */
const layout: FrameLayout = {
  frameSrc,
  badge: {
    left: 74,
    top: 100,
    minWidth: 300,
    height: 78,
    fontSize: 42,
    paddingX: 30,
    borderRadius: '0 18px 0 18px',
  },
  headline: {
    left: 74,
    top: 198,
    right: 74,
    fontSize: 72,
    lineHeight: 70,
    fontWeight: 800,
  },
}

export default function PlantillaNoticia45(props: TemplateComponentProps) {
  return <NewsFrameTemplate {...props} layout={layout} />
}
