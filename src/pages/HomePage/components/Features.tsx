import React from 'react'
import styles from './features.module.css'

const items = [
  {
    title: 'Estructura clara',
    description: 'Página principal con componentes reutilizables.',
  },
  {
    title: 'Routing incluido',
    description: 'Ruta / y /home con fallback 404.',
  },
  {
    title: 'Estilos listos',
    description: 'CSS modules y estilos globales.',
  },
]

export default function Features() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.h2}>Dependencias y componentes</h2>
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

