import styles from './features.module.css'

const items = [
  {
    title: 'Edición en tiempo real',
    description:
      'Cambia categoría, titular e imagen y ve el resultado al instante. Sin botón de actualizar.',
  },
  {
    title: 'Varios formatos',
    description:
      'Noticia 4:5 e Historia 9:16. La misma imagen se reencuadra a cada formato, con posición independiente.',
  },
  {
    title: 'Exporta en alta calidad',
    description:
      'Descarga un PNG a resolución nativa (1080×1350 o 1080×1920), listo para publicar.',
  },
  {
    title: 'Imagen movible',
    description:
      'Arrastra la foto en la vista previa para ajustar el encuadre. Se guarda localmente entre plantillas.',
  },
]

export default function Features() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.h2}>¿Qué puedes hacer?</h2>
        <div className={styles.grid}>
          {items.map((it) => (
            <div key={it.title} className={styles.card}>
              <div className={styles.cardTitle}>{it.title}</div>
              <div className={styles.cardDesc}>{it.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
