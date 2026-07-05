import React from 'react'
import styles from './callToAction.module.css'

export default function CallToAction() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.box}>
          <div>
            <div className={styles.title}>Listo para correr</div>
            <div className={styles.desc}>
              Ejecuta: <span className={styles.code}>npm run dev</span>
            </div>
          </div>
          <a className={styles.link} href="/home">Abrir Home</a>
        </div>
      </div>
    </section>
  )
}

