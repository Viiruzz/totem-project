'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Keyboard } from 'swiper/modules'
import Image from 'next/image'

// Importar los estilos de Swiper
import 'swiper/css'
import 'swiper/css/pagination'

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
  const getImageUrl = (image: ImageItem) => {
    /*if (image.sizes?.carrusel?.url) return image.sizes.carrusel.url
    if (image.url) return image.url
    if (image.filename) return `/media/${image.filename}`*/
    if (image.cloudinary?.secure_url) return image.cloudinary.secure_url
    if (image.url && !image.url.startsWith('/api/imagenes/file/')) return image.url
    if (image.url) return image.url
    return '/placeholder-image.jpg'
  }

  return (
    <Swiper
      modules={[Autoplay, Pagination, Keyboard]}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop={true}
      pagination={{ clickable: true }}
      keyboard={{ enabled: true, onlyInViewport: true }}
      slidesPerView={1}
      style={{ width: '100%', height: '100%' }}
    >
      {images.map((img, idx) => (
        <SwiperSlide key={idx}>
          <div className="swiper-image-wrapper">
            <Image
              src={getImageUrl(img)}
              alt={img.nombre || 'Imagen del carrusel'}
              fill
              style={{ objectFit: 'contain' }}
              priority={idx === 0}
            />

            {img.descripcion && (
              <div className="carousel-caption">
                <div className="caption-background" />
                {img.descripcion && (
                  <div className="caption-text" key={img.id || idx}>
                    {img.descripcion}
                  </div>
                )}
              </div>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default ImageCarousel
