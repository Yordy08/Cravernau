import { Link } from 'react-router-dom'
import styles from './hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.badge}>Cravernau · Burbuja Política</div>
        <h1 className={styles.title}>Crea tus plantillas de noticias en segundos</h1>
        <p className={styles.subtitle}>
          Generador de publicaciones para las redes de Burbuja Política. Elige una plantilla,
          cambia la categoría, el titular y la imagen, reencuádrala en tiempo real y expórtala
          en PNG de alta calidad. Sin editores complejos: solo el contenido cambia, el diseño
          se mantiene siempre impecable.
        </p>
        <div className={styles.actions}>
          <Link className={styles.primary} to="/generador/noticia">
            Generador Noticia 4:5
          </Link>
          <Link className={styles.secondary} to="/generador/historia">
            Historia 9:16
          </Link>
        </div>
      </div>
    </section>
  )
}
