// src/app/(frontend)/page.tsx
import React, { Suspense } from 'react'
import ImageCarousel from './components/ImageCarousel'
export const dynamic = 'force-dynamic'


// Esta función obtiene los datos desde la API REST de Payload CMS
async function getData() {
  try {
    const res = await fetch(
  `https://${process.env.VERCEL_URL}/api/imagenes?where[activo][equals]=true&sort=orden&depth=1`,
      {
        cache: 'no-store',
      },
    )

    const data = await res.json()
    return { imagenes: data.docs || [] }
  } catch (error) {
    console.error('Error al obtener imágenes:', error)
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
    <div className="totem-layout">
      <h1 className="page-title">Totem Invernadero</h1>

      <div className="carousel-container">
        <Suspense fallback={<div className="loading">Cargando imágenes...</div>}>
          <ImageCarousel images={imageItems} key={imageItems.length} />
        </Suspense>
      </div>

      <div className="debug-info">
        <p>Imágenes encontradas: {imagenes.length}</p>
        {imagenes.length > 0 && <p>Primera imagen: {imagenes[0].nombre || 'Sin título'}</p>}
      </div>
    </div>
  )
}
