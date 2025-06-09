// src/app/(frontend)/layout.tsx
import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './styles/globals.css'  // Solo este import

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tótem Informativo | Santo Tomás',
  description: 'Sistema de información del Área Informática de Santo Tomás',
  icons: {
    icon: [
      { url: '/images/icon.png', type: 'image/png' },
    ],
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