import React from 'react'
import styles from './hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.badge}>React + Vite</div>
        <h1 className={styles.title}>Vista principal lista y funcional</h1>
        <p className={styles.subtitle}>
          Instala dependencias, ejecuta el proyecto y navega a la ruta principal.
        </p>
        <div className={styles.actions}>
          <a className={styles.primary} href="/home">Ir a Home</a>
          <a className={styles.secondary} href="https://vitejs.dev" target="_blank" rel="noreferrer">
            Ver Vite
          </a>
        </div>
      </div>
    </section>
  )
}

