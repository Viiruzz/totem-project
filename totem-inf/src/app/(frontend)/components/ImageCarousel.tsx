'use client'

import React, { useMemo, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Keyboard } from 'swiper/modules'
import Image from 'next/image'

// Importar los estilos de Swiper
import 'swiper/css'

interface ImageItem {
  id: string
  nombre?: string | null
  descripcion?: string | null
  url?: string | null
  filename?: string | null
  activo?: boolean | null
  orden?: number | null
  sizes?: {
    thumbnail?: {
      url: string
      width?: number
      height?: number
    } | null
    carrusel?: {
      url: string
      width?: number
      height?: number
    } | null
  } | null
  cloudinary?: {
    secure_url?: string
    public_id?: string
  } | null
}

interface ImageCarouselProps {
  images: ImageItem[]
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const getImageUrl = useMemo(
    () => (image: ImageItem) => {
      if (image.cloudinary?.secure_url) return image.cloudinary.secure_url
      if (image.url && !image.url.startsWith('/api/imagenes/file/')) return image.url
      if (image.url) return image.url
      return '/placeholder-image.jpg'
    },
    [],
  )

  const imageUrls = useMemo(() => images.map(img => getImageUrl(img)), [images, getImageUrl])

  const isGif = (url: string) => {
    return url.toLowerCase().endsWith('.gif')
  }

  const handleSlideChange = (swiper: any) => {
    // Corregir el índice cuando hay loop activado
    const realIndex = swiper.realIndex
    setCurrentSlide(realIndex)
  }

  if (images.length === 0) {
    return (
      <div className="carousel-wrapper">
        <div className="carousel-header">
          <h2>Galería Digital</h2>
          <div className="carousel-info">
            <span className="slide-counter">0 / 0</span>
          </div>
        </div>
        <div className="carousel-main">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            flexDirection: 'column',
            gap: '1rem',
            color: 'rgba(255, 255, 255, 0.6)'
          }}>
            <div style={{ fontSize: '3rem' }}>📸</div>
            <h3>No hay imágenes disponibles</h3>
            <p>Agrega algunas imágenes al sistema para mostrar aquí</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="carousel-wrapper">
      <div className="carousel-header">
        <h2>Galería Digital</h2>
        <div className="carousel-info">
          <span className="slide-counter">
            {currentSlide + 1} / {images.length}
          </span>
          <div className="carousel-status">
            <div className="status-dot"></div>
            <span>En vivo</span>
          </div>
        </div>
      </div>

      <div className="carousel-main">
        <Swiper
          modules={[Autoplay, Keyboard]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          loop={images.length > 1}
          keyboard={{ enabled: true, onlyInViewport: true }}
          slidesPerView={1}
          speed={800}
          onSlideChange={handleSlideChange}
          style={{ width: '100%', height: '100%' }}
          observer={true}
          observeParents={true}
        >
          {images.map((img, idx) => (
            <SwiperSlide key={`${img.id || 'slide'}-${idx}`}>
              <div className="slide-content">
                <div className="image-container">
                  <Image
                    src={imageUrls[idx]}
                    alt={img.nombre || 'Imagen del carrusel'}
                    fill
                    style={{ objectFit: 'contain' }}
                    priority={idx === 0}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    quality={75}
                    unoptimized={isGif(imageUrls[idx])}
                  />

                  {(img.descripcion) && (
                    <>
                      <div className="image-overlay"></div>
                      <div className="image-info">
                        {/* Nombre de la imagen comentado para uso futuro */}
                        {/* {img.nombre && (
                          <h3 className="image-title">{img.nombre}</h3>
                        )} */}
                        {img.descripcion && (
                          <p className="image-description">{img.descripcion}</p>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default ImageCarousel