import type { TemplateDefinition } from '../types'
import { plantillaNoticia45 } from './PlantillaNoticia45'
import { plantillaHistoria } from './PlantillaHistoria'

/**
 * Registro central de plantillas disponibles.
 *
 * Para añadir un generador nuevo:
 *   1. Crear el marco PNG en `assets/` y su componente en `templates/<Nombre>/`.
 *   2. Exportar su `TemplateDefinition` (con su `FrameLayout`).
 *   3. Añadirlo a este arreglo y crear su página/ruta.
 * El editor, los hooks y la exportación se reutilizan sin cambios.
 */
export const templates: TemplateDefinition[] = [plantillaNoticia45, plantillaHistoria]

export function getTemplateById(id: string): TemplateDefinition | undefined {
  return templates.find((t) => t.id === id)
}
