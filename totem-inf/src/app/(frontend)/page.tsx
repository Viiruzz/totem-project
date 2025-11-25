// src/app/(frontend)/page.tsx
import React from 'react'
import ImageCarouselSection from './components/ImageCarouselSection'
import Navbar from './components/Navbar'
import WeatherInfo from './components/WeatherInfo'
import type { ImageItem } from './components/ImageCarousel'
export const dynamic = 'force-dynamic'

// Función para obtener la URL base
const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000'
  }
  return `https://${process.env.NEXT_PUBLIC_SITE_URL || 'totem-project-rho.vercel.app'}`
}

// Esta función obtiene los datos desde la API REST de Payload CMS
type CarruselData = {
  imagenes: ImageItem[]
}

async function getData(): Promise<CarruselData> {
  const baseUrl = getBaseUrl()

  try {
    const res = await fetch(`${baseUrl}/api/carrusel`, {
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`)
    }

    const data = await res.json()
    return { imagenes: (data?.imagenes as ImageItem[]) ?? [] }
  } catch (error) {
    console.error('Error al obtener imágenes:', error)
    if (error instanceof Error) {
      console.error('Detalles del error:', error.message)
    }
    return { imagenes: [] }
  }
}

export default async function Home() {
  const { imagenes } = await getData()

  const imageItems: ImageItem[] = imagenes.map((img: ImageItem) => ({
    id: img.id,
    nombre: img.nombre ?? null,
    descripcion: img.descripcion ?? null,
    orden: img.orden ?? null,
    url: img.cloudinary?.secure_url ?? null,
    filename: img.filename ?? null,
    sizes: img.sizes ?? null,
    cloudinary: img.cloudinary ?? null,
  }))

  return (
    <>
      <Navbar />
      <main className="totem-container">
        <div className="carousel-container">
          <ImageCarouselSection initialImages={imageItems} />
        </div>
        <aside className="weather-container">
          <WeatherInfo />
        </aside>
      </main>
    </>
  )
}
