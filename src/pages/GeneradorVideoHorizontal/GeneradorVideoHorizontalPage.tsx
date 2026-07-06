import vhorizonFrameSrc from '../../../assets/vhorizon.png'
import VideoReelEditor, { type VideoTemplateConfig } from '../../features/generators/components/VideoReelEditor'
import { GeneratorShell } from '../GeneradorNoticia/GeneradorNoticiaPage'

const videoHorizontalConfig: VideoTemplateConfig = {
  title: 'Video Horizontal',
  frameSrc: vhorizonFrameSrc,
  size: { width: 1080, height: 1350 },
  exportFileName: 'video-horizontal-vhorizon.webm',
  initialHeadline: 'Titular aquí ejemplo aquí de la noticia.',
  placeholder: 'Sube un video',
  badge: { left: 78, top: 108, minWidth: 368, height: 64, paddingX: 28, fontSize: 48 },
  headlineBox: { left: 73, top: 206, width: 910, minHeight: 132, paddingX: 0, paddingY: 0, radius: 0 },
  headlineBg: 'transparent',
  exportHeadlineBg: 'transparent',
  headlineSize: { initial: 66, min: 44, max: 86 },
  videoBox: { left: 0, top: 350, width: 1080, height: 720, radius: 0 },
}

/** Módulo generador de video usando la plantilla noticia. */
export default function GeneradorVideoHorizontalPage() {
  return (
    <GeneratorShell>
      <VideoReelEditor config={videoHorizontalConfig} />
    </GeneratorShell>
  )
}
