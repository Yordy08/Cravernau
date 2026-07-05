import type { TemplateDefinition } from '../../types'
import PlantillaNoticia45 from './PlantillaNoticia45'

/** Descriptor de la plantilla de noticia en formato 4:5 (feed). */
export const plantillaNoticia45: TemplateDefinition = {
  id: 'noticia-45',
  name: 'Noticia 4:5',
  size: { width: 1080, height: 1350 },
  Component: PlantillaNoticia45,
  exportFileName: 'burbuja-politica-noticia',
  defaults: {
    category: 'Última hora',
    headline: '',
    imageUrl: null,
  },
}
