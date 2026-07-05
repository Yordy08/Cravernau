import type { TemplateDefinition } from '../../types'
import PlantillaHistoria from './PlantillaHistoria'

/** Descriptor de la plantilla de noticia en formato Historia 9:16. */
export const plantillaHistoria: TemplateDefinition = {
  id: 'historia-916',
  name: 'Historia 9:16',
  size: { width: 1080, height: 1920 },
  Component: PlantillaHistoria,
  exportFileName: 'burbuja-politica-historia',
  defaults: {
    category: 'Última hora',
    headline: '',
    imageUrl: null,
  },
}
