'use client'

import useSWR from 'swr'

import ImageCarousel, { type ImageItem } from './ImageCarousel'

type CarruselResponse = {
  imagenes: ImageItem[]
}

const fetcher = async (url: string): Promise<ImageItem[]> => {
  const response = await fetch(url, { cache: 'no-store' })

  if (!response.ok) {
    throw new Error(`Error al obtener carrusel: ${response.status}`)
  }

  const data: CarruselResponse = await response.json()
  return data.imagenes ?? []
}

interface ImageCarouselSectionProps {
  initialImages: ImageItem[]
}

const ImageCarouselSection = ({ initialImages }: ImageCarouselSectionProps) => {
  const { data, error, isLoading, isValidating } = useSWR<ImageItem[]>('/api/carrusel', fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false,
    fallbackData: initialImages,
  })

  const images = data ?? initialImages

  if (error && !images.length) {
    return (
      <div className="carousel-wrapper">
        <div className="carousel-header">
          <h2>Galería Digital</h2>
          <div className="carousel-info">
            <span className="slide-counter">0 / 0</span>
          </div>
        </div>
        <div className="carousel-main">
          <div className="loading" style={{ gap: '1rem', textAlign: 'center' }}>
            <p>No pudimos cargar las imágenes.</p>
            <p>Reintentando…</p>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading && !images.length) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Cargando imágenes...</p>
      </div>
    )
  }

  const carouselKey =
    images.length > 0 ? images.map((img) => img.id ?? 'sin-id').join('-') : 'empty'

  return <ImageCarousel images={images} key={carouselKey} isRefreshing={isValidating} />
}

export default ImageCarouselSection
