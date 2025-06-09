// src/app/layout.tsx

import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tótem Informativo | Santo Tomás',
  description: 'Sistema de información del Área Informática de Santo Tomás',
  icons: {
    icon: [
      // Cuando tengas el logo, usar:
      // { url: '/images/favicon.ico' },
      { url: '/images/icon.png', type: 'image/png' },
    ],
    // También puedes agregar un apple-touch-icon para dispositivos iOS
    // apple: [{ url: '/images/apple-icon.png' }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
