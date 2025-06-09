// src/app/(frontend)/page.tsx
import React, { Suspense } from 'react'
import ImageCarousel from './components/ImageCarousel'
import Navbar from './components/Navbar'
import WeatherInfo from './components/WeatherInfo'
export const dynamic = 'force-dynamic'

// Función para obtener la URL base
const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000'
  }
  return `https://${process.env.NEXT_PUBLIC_SITE_URL || 'totem-project-rho.vercel.app'}`
}

// Esta función obtiene los datos desde la API REST de Payload CMS
async function getData() {
  const baseUrl = getBaseUrl()

  try {
    const res = await fetch(
      `${baseUrl}/api/imagenes?where[activo][equals]=true&sort=orden&depth=1`,
      {
        next: { revalidate: 60 }, // Revalidar cada minuto
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
        },
      },
    )

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`)
    }

    const data = await res.json()
    return { imagenes: data.docs || [] }
  } catch (error) {
    console.error('Error al obtener imágenes:', error)
    if (error instanceof Error) {
      console.error('Detalles del error:', error.message)
    }
    // En caso de error, intentamos recuperar datos del caché si están disponibles
    try {
      const cachedRes = await fetch(
        `${baseUrl}/api/imagenes?where[activo][equals]=true&sort=orden&depth=1`,
        {
          next: { revalidate: 0 }, // No revalidar, usar caché si está disponible
          cache: 'force-cache',
        },
      )
      if (cachedRes.ok) {
        const cachedData = await cachedRes.json()
        return { imagenes: cachedData.docs || [] }
      }
    } catch (cacheError) {
      console.error('Error al intentar recuperar del caché:', cacheError)
    }
    return { imagenes: [] }
  }
}

export default async function Home() {
  const { imagenes } = await getData()

  const imageItems = imagenes.map((img: any) => ({
    id: img.id,
    nombre: img.nombre ?? null,
    descripcion: img.descripcion ?? null,
    activo: img.activo ?? null,
    orden: img.orden ?? null,
    url: img.cloudinary?.secure_url ?? null,
    filename: img.filename ?? null,
    sizes: img.sizes ?? null,
  }))

  return (
    <>
      <Navbar />
      <main className="totem-container">
        <div className="carousel-container">
          <Suspense
            fallback={
              <div className="loading">
                <div className="loading-spinner"></div>
                <p>Cargando imágenes...</p>
              </div>
            }
          >
            <ImageCarousel images={imageItems} key={imageItems.length} />
          </Suspense>
        </div>
        <aside className="weather-container">
          <WeatherInfo />
        </aside>
      </main>
    </>
  )
}
