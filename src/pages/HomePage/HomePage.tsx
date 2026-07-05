import React from 'react'
import styles from './homePage.module.css'
import Hero from './components/Hero'
import Features from './components/Features'
import CallToAction from './components/CallToAction'

export default function HomePage() {
  return (
    <div className={styles.page}>
      <Hero />
      <Features />
      <CallToAction />
    </div>
  )
}

