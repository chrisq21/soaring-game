'use client'

import Image from 'next/image'
import {Inter} from 'next/font/google'
import styles from './page.module.css'
import {Canvas} from '@react-three/fiber'
import PlaygroundScene from './components/PlaygroundScene'
const inter = Inter({subsets: ['latin']})

export default function Home() {
  return (
    <main className={styles.main}>
      <Canvas shadows flat linear>
        <PlaygroundScene />
      </Canvas>
    </main>
  )
}
