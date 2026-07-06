import VideoReelEditor from '../../features/generators/components/VideoReelEditor'
import { GeneratorShell } from '../GeneradorNoticia/GeneradorNoticiaPage'

/** Módulo generador de video vertical 9:16 con plantilla reeluno. */
export default function GeneradorVideoPage() {
  return (
    <GeneratorShell>
      <VideoReelEditor />
    </GeneratorShell>
  )
}
