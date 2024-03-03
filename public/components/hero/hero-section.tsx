import React from 'react'
import styles from './hero-section.module.css'



function HeroSection({label}: {label: string}) {
  return (
    <div className={styles.hero} data-testid="hero">
      <p className={styles.intro}>{label}</p>
    </div>
  )
}

export default HeroSection