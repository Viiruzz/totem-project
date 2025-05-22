// src/app/layout.tsx

import React from 'react'
import './styles/globals.css' // ✅ tu CSS global
import './styles/totem-slider.css' // ✅ tu nuevo CSS personalizado

export const metadata = {
  title: 'Totem Invernadero',
  description: 'Carrusel de imágenes para la plataforma de monitoreo de invernadero',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <main className="totem-container">{children}</main>
      </body>
    </html>
  )
}
