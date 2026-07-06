import { type RefObject } from 'react'
import { useFitScale } from '../hooks/useFitScale'
import type {
  ForegroundTransform,
  ImagePosition,
  NewsTemplateData,
  TemplateDefinition,
} from '../types'

interface TemplateStageProps {
  definition: TemplateDefinition
  data: NewsTemplateData
  /** Ref al nodo a tamaño nativo, usado por la exportación PNG. */
  exportRef: RefObject<HTMLDivElement | null>
  imagePosition: ImagePosition
  onPositionChange: (pos: ImagePosition) => void
  resizeMode: boolean
  foreground: ForegroundTransform
  onForegroundChange: (t: ForegroundTransform) => void
  headlineScale: number
}

/**
 * Muestra la plantilla a tamaño nativo pero escalada para caber en el panel,
 * conservando exactamente la relación de aspecto del diseño. El nodo nativo
 * (`exportRef`) es el que captura la exportación, por lo que la vista previa y
 * el PNG resultante son idénticos.
 */
export default function TemplateStage({
  definition,
  data,
  exportRef,
  imagePosition,
  onPositionChange,
  resizeMode,
  foreground,
  onForegroundChange,
  headlineScale,
}: TemplateStageProps) {
  const { size, Component } = definition
  const { containerRef, scale } = useFitScale(size)

  return (
    <div
      ref={containerRef}
      className="flex h-full w-full items-center justify-center overflow-hidden p-4"
    >
      {/* Caja escalada: reserva el espacio visual real tras aplicar scale. */}
      <div
        style={{
          width: size.width * scale,
          height: size.height * scale,
        }}
        className="shadow-2xl shadow-black/50"
      >
        <div
          style={{
            width: size.width,
            height: size.height,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          {/* Nodo nativo capturado en la exportación. */}
          <div ref={exportRef} style={{ width: size.width, height: size.height }}>
            <Component
              data={data}
              imagePosition={imagePosition}
              onPositionChange={onPositionChange}
              resizeMode={resizeMode}
              foreground={foreground}
              onForegroundChange={onForegroundChange}
              headlineScale={headlineScale}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
