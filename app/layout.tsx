import type { Metadata } from 'next'
import {
  Instrument_Serif,
  Bricolage_Grotesque,
  Manrope,
  Archivo_Black,
  JetBrains_Mono,
  Caveat,
} from 'next/font/google'
import './globals.css'

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

const bricolageGrotesque = Bricolage_Grotesque({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
})

const manrope = Manrope({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const archivioBlack = Archivo_Black({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-archivo-black',
  display: 'swap',
})

const jetBrainsMono = JetBrains_Mono({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

const caveat = Caveat({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Uncovered Conversations',
  description: 'A youth empowerment organisation — igniting one life at a time.',
}

const fontVars = [
  instrumentSerif.variable,
  bricolageGrotesque.variable,
  manrope.variable,
  archivioBlack.variable,
  jetBrainsMono.variable,
  caveat.variable,
].join(' ')

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVars}>
      <body className="hf-shell hybrid">
        {children}
      </body>
    </html>
  )
}
