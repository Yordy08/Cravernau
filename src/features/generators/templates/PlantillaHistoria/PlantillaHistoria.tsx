import type { TemplateComponentProps, FrameLayout } from '../../types'
import NewsFrameTemplate from '../../components/NewsFrameTemplate'
import frameSrc from '../../assets/historia-frame.png'

/**
 * PlantillaHistoria — noticia Burbuja Política, formato Historia 9:16 (1080×1920).
 * Reutiliza el mismo renderizador que la plantilla 4:5; solo cambia el layout.
 */
const layout: FrameLayout = {
  frameSrc,
  badge: {
    left: 72,
    top: 152,
    minWidth: 220,
    height: 62,
    fontSize: 34,
    paddingX: 26,
    borderRadius: '16px 0 16px 0',
  },
  headline: {
    left: 82,
    top: 240,
    right: 74,
    fontSize: 80,
    lineHeight: 78,
    fontWeight: 800,
  },
}

export default function PlantillaHistoria(props: TemplateComponentProps) {
  return <NewsFrameTemplate {...props} layout={layout} />
}
