import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { useFitScale } from '../hooks/useFitScale'
import reelFrameSrc from '../../../../assets/reeluno.png'

const REEL_SIZE = { width: 1080, height: 1920 }
const FONT_HEADLINE =
  "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, system-ui, sans-serif"

export default function VideoReelEditor() {
  const [category, setCategory] = useState('Categoría')
  const [headline, setHeadline] = useState('Titular ejemplo aquí de la noticia.')
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { containerRef, scale } = useFitScale(REEL_SIZE)

  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl)
    }
  }, [videoUrl])

  const handleVideo = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const nextUrl = URL.createObjectURL(file)
    setVideoUrl((current) => {
      if (current) URL.revokeObjectURL(current)
      return nextUrl
    })
  }

  const labelClass = 'mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-300'
  const fieldClass =
    'w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 ' +
    'outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/40'

  const displayCategory = category.trim() || 'CATEGORÍA'
  const displayHeadline = headline.trim() || 'Escribe aquí el titular del video.'

  return (
    <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[380px_1fr]">
      <aside className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
        <h2 className="mb-1 text-xl font-bold text-white">Video 9:16</h2>
        <p className="mb-6 text-sm text-slate-400">
          {REEL_SIZE.width} × {REEL_SIZE.height} px
        </p>

        <div className="flex flex-col gap-6">
          <div>
            <label htmlFor="video-category" className={labelClass}>
              Categoría
            </label>
            <input
              id="video-category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Ej: ÚLTIMA HORA"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="video-headline" className={labelClass}>
              Titular
            </label>
            <textarea
              id="video-headline"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="Escribe aquí el titular del video…"
              rows={4}
              className={`${fieldClass} resize-none`}
            />
          </div>

          <div>
            <span className={labelClass}>Video vertical</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleVideo}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full rounded-lg border border-dashed border-slate-600 bg-slate-900/60 px-4 py-3 text-slate-200 transition hover:border-red-500 hover:text-white"
            >
              {videoUrl ? 'Cambiar video' : 'Subir video'}
            </button>
          </div>
        </div>
      </aside>

      <section className="min-h-[60vh] rounded-2xl border border-slate-800 bg-slate-950/60 lg:min-h-0">
        <div ref={containerRef} className="flex h-full w-full items-center justify-center overflow-hidden p-4">
          <div
            className="shadow-2xl shadow-black/50"
            style={{ width: REEL_SIZE.width * scale, height: REEL_SIZE.height * scale }}
          >
            <div
              className="relative overflow-hidden bg-black"
              style={{
                width: REEL_SIZE.width,
                height: REEL_SIZE.height,
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
              }}
            >
              {videoUrl ? (
                <video
                  src={videoUrl}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-black text-center text-4xl font-semibold uppercase tracking-[0.25em] text-white/30">
                  Sube un video 9:16
                </div>
              )}

              <img
                src={reelFrameSrc}
                alt=""
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
              />

              <div
                style={{
                  position: 'absolute',
                  left: 56,
                  top: 1112,
                  minWidth: 306,
                  height: 69,
                  display: 'inline-flex',
                  alignItems: 'center',
                  paddingLeft: 20,
                  paddingRight: 20,
                  boxSizing: 'border-box',
                  borderRadius: '0 16px 0 16px',
                  border: '2px solid #ffffff',
                  background: 'linear-gradient(90deg, #d0202c 0%, #c11a26 45%, #2c0510 76%, #050102 100%)',
                  boxShadow: '0 6px 14px rgba(0,0,0,0.45)',
                  pointerEvents: 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_HEADLINE,
                    fontWeight: 800,
                    fontSize: 42,
                    lineHeight: 1,
                    letterSpacing: 1,
                    color: '#fff',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    textShadow: '0 2px 3px rgba(0,0,0,0.45)',
                  }}
                >
                  {displayCategory}
                </span>
              </div>

              <h1
                style={{
                  position: 'absolute',
                  left: 58,
                  top: 1198,
                  width: 970,
                  minHeight: 198,
                  margin: 0,
                  padding: '28px 18px 28px 18px',
                  borderRadius: 18,
                  boxSizing: 'border-box',
                  background: 'rgba(0,0,0,0.65)',
                  fontFamily: FONT_HEADLINE,
                  fontWeight: 800,
                  fontSize: 72,
                  lineHeight: '66px',
                  color: '#fff',
                  textShadow: '0 3px 14px rgba(0,0,0,0.65), 0 1px 2px rgba(0,0,0,0.6)',
                  pointerEvents: 'none',
                }}
              >
                {displayHeadline}
              </h1>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
