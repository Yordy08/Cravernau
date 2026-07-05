import GeneratorEditor from '../../features/generators/components/GeneratorEditor'
import { plantillaHistoria } from '../../features/generators/templates/PlantillaHistoria'
import { GeneratorShell } from '../GeneradorNoticia/GeneradorNoticiaPage'

/** Módulo generador de la plantilla de Historia 9:16. */
export default function GeneradorHistoriaPage() {
  return (
    <GeneratorShell>
      <GeneratorEditor definition={plantillaHistoria} />
    </GeneratorShell>
  )
}
