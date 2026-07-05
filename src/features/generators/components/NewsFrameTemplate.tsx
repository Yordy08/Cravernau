import { useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react'
import type { FrameLayout, ImagePosition, NewsTemplateData } from '../types'

interface NewsFrameTemplateProps {
  data: NewsTemplateData
  layout: FrameLayout
  imagePosition?: ImagePosition
  onPositionChange?: (pos: ImagePosition) => void
}

const FONT_HEADLINE =
  "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, system-ui, sans-serif"

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

/**
 * Renderizador genérico de plantillas de noticia basadas en un marco PNG.
 *
 * Estructura de capas (de abajo hacia arriba):
 *   1. Fotografía principal (full-bleed, object-fit: cover) — ARRASTRABLE.
 *   2. Marco PNG con todo el diseño fijo (transparente donde va la foto).
 *   3. Badge de categoría (editable) que cubre el badge del marco.
 *   4. Titular editable.
 *
 * Las dos plantillas (Noticia 4:5 e Historia 9:16) reutilizan este componente;
 * solo cambian el `layout` y el tamaño.
 */
export default function NewsFrameTemplate({
  data,
  layout,
  imagePosition,
  onPositionChange,
}: NewsFrameTemplateProps) {
  const { badge, headline } = layout
  const category = data.category.trim() || 'CATEGORÍA'
  const headlineText = data.headline.trim() || 'Escribe aquí el titular de la noticia.'

  const pos = imagePosition ?? { x: 50, y: 50 }
  const imgRef = useRef<HTMLImageElement>(null)
  const dragRef = useRef<{ x: number; y: number; px: number; py: number } | null>(null)
  const [dragging, setDragging] = useState(false)
  const draggable = Boolean(onPositionChange && data.imageUrl)

  const onPointerDown = (e: ReactPointerEvent<HTMLImageElement>) => {
    if (!draggable) return
    e.currentTarget.setPointerCapture(e.pointerId)
    dragRef.current = { x: e.clientX, y: e.clientY, px: pos.x, py: pos.y }
    setDragging(true)
  }

  const onPointerMove = (e: ReactPointerEvent<HTMLImageElement>) => {
    const d = dragRef.current
    const img = imgRef.current
    if (!d || !img || !onPositionChange) return
    const rect = img.getBoundingClientRect()
    const nW = img.naturalWidth
    const nH = img.naturalHeight
    if (!nW || !nH) return
    // object-fit: cover → escala y desbordamiento (en px de pantalla, escala del preview incluida)
    const s = Math.max(rect.width / nW, rect.height / nH)
    const overflowX = nW * s - rect.width
    const overflowY = nH * s - rect.height
    let x = d.px
    let y = d.py
    if (overflowX > 0) x = clamp(d.px - ((e.clientX - d.x) / overflowX) * 100, 0, 100)
    if (overflowY > 0) y = clamp(d.py - ((e.clientY - d.y) / overflowY) * 100, 0, 100)
    onPositionChange({ x, y })
  }

  const endDrag = (e: ReactPointerEvent<HTMLImageElement>) => {
    dragRef.current = null
    setDragging(false)
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      /* noop */
    }
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#000' }}>
      {/* 1. Fotografía principal (arrastrable) */}
      {data.imageUrl ? (
        <img
          ref={imgRef}
          src={data.imageUrl}
          alt=""
          draggable={false}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: `${pos.x}% ${pos.y}%`,
            cursor: draggable ? (dragging ? 'grabbing' : 'grab') : 'default',
            touchAction: 'none',
            userSelect: 'none',
          }}
        />
      ) : (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg,#20293b 0%,#111827 60%,#0b0f1a 100%)',
            color: 'rgba(255,255,255,0.28)',
            fontFamily: FONT_HEADLINE,
            fontSize: 40,
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}
        >
          Sube una imagen
        </div>
      )}

      {/* 2. Marco fijo */}
      <img
        src={layout.frameSrc}
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      />

      {/* 3. Badge de categoría: rectángulo con esquinas opuestas redondeadas,
             gradiente rojo→negro (60/40) y borde blanco. */}
      <div
        style={{
          position: 'absolute',
          left: badge.left,
          top: badge.top,
          minWidth: badge.minWidth,
          height: badge.height,
          display: 'inline-flex',
          alignItems: 'center',
          paddingLeft: badge.paddingX,
          paddingRight: badge.paddingX,
          boxSizing: 'border-box',
          borderRadius: badge.borderRadius,
          border: '2px solid #ffffff',
          background: 'linear-gradient(90deg, #d0202c 0%, #c11a26 46%, #2c0510 70%, #0a0204 100%)',
          boxShadow: '0 6px 14px rgba(0,0,0,0.45)',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: FONT_HEADLINE,
            fontWeight: 800,
            fontSize: badge.fontSize,
            lineHeight: 1,
            letterSpacing: 1,
            color: '#fff',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            textShadow: '0 2px 3px rgba(0,0,0,0.45)',
          }}
        >
          {category}
        </span>
      </div>

      {/* 4. Titular */}
      <h1
        style={{
          position: 'absolute',
          left: headline.left,
          top: headline.top,
          right: headline.right,
          margin: 0,
          fontFamily: FONT_HEADLINE,
          fontWeight: headline.fontWeight,
          fontSize: headline.fontSize,
          lineHeight: `${headline.lineHeight}px`,
          color: '#fff',
          textShadow: '0 3px 14px rgba(0,0,0,0.55), 0 1px 2px rgba(0,0,0,0.6)',
          pointerEvents: 'none',
        } as CSSProperties}
      >
        {headlineText}
      </h1>
    </div>
  )
}
