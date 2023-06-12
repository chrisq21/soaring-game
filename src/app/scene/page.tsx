'use client'

import styles from '../page.module.css'
import {Canvas} from '@react-three/fiber'
import Scene from './Scene'

export default function Home() {
  return (
    <main className={styles.main}>
      <Canvas shadows flat linear>
        <Scene />
      </Canvas>
    </main>
  )
}
