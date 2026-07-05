import { useRef, type ChangeEvent } from 'react'
import type { NewsTemplateData } from '../types'

interface EditorFormProps {
  data: NewsTemplateData
  onCategoryChange: (value: string) => void
  onHeadlineChange: (value: string) => void
  onImageChange: (file: File | null) => void
  onExport: () => void
  isExporting: boolean
  exportError?: string | null
}

/**
 * Formulario del panel izquierdo. Es genérico respecto a la plantilla:
 * solo edita categoría, titular e imagen, y dispara la exportación.
 */
export default function EditorForm({
  data,
  onCategoryChange,
  onHeadlineChange,
  onImageChange,
  onExport,
  isExporting,
  exportError,
}: EditorFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    onImageChange(e.target.files?.[0] ?? null)
  }

  const labelClass = 'mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-300'
  const fieldClass =
    'w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 ' +
    'outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/40'

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label htmlFor="category" className={labelClass}>
          Categoría
        </label>
        <input
          id="category"
          type="text"
          value={data.category}
          onChange={(e) => onCategoryChange(e.target.value)}
          placeholder="Ej: ÚLTIMA HORA"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="headline" className={labelClass}>
          Titular
        </label>
        <textarea
          id="headline"
          value={data.headline}
          onChange={(e) => onHeadlineChange(e.target.value)}
          placeholder="Escribe aquí el titular de la noticia…"
          rows={4}
          className={`${fieldClass} resize-none`}
        />
      </div>

      <div>
        <span className={labelClass}>Imagen principal</span>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full rounded-lg border border-dashed border-slate-600 bg-slate-900/60 px-4 py-3 text-slate-200 transition hover:border-red-500 hover:text-white"
        >
          {data.imageUrl ? 'Cambiar imagen' : 'Subir imagen'}
        </button>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={onExport}
          disabled={isExporting}
          className="w-full rounded-lg bg-red-600 px-4 py-3 font-semibold text-white shadow-lg shadow-red-900/40 transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isExporting ? 'Exportando…' : 'Exportar PNG'}
        </button>
        {exportError && <p className="mt-2 text-sm text-red-400">{exportError}</p>}
      </div>
    </div>
  )
}
