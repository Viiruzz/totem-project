// src/collections/Imagenes.ts - VERSIÓN SIMPLIFICADA SIN ERRORES
import dotenv from 'dotenv'
dotenv.config()
import { CollectionConfig } from 'payload'
import { v2 as cloudinary } from 'cloudinary'

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

const Imagenes: CollectionConfig = {
  slug: 'imagenes',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  admin: {
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'activo', 'orden', 'updatedAt'],
    listSearchableFields: ['nombre', 'descripcion'],
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'carrusel',
        width: 1200,
        height: 800,
        position: 'centre',
      },
    ],
  },

  fields: [
    {
      name: 'nombre',
      type: 'text',
      required: true,
      label: 'Nombre de la imagen',
      admin: {
        description: 'Título descriptivo para la imagen',
      },
    },
    {
      name: 'descripcion',
      type: 'textarea',
      required: false,
      label: 'Descripción (opcional)',
      admin: {
        description: 'Descripción que aparecerá sobre la imagen en el carrusel',
        rows: 3,
      },
    },
    {
      name: 'activo',
      type: 'checkbox',
      label: 'Mostrar en el carrusel',
      defaultValue: true,
      admin: {
        description: 'Desmarcar para ocultar temporalmente la imagen',
      },
    },
    {
      name: 'orden',
      type: 'number',
      label: 'Orden de aparición',
      defaultValue: 1,
      min: 1,
      admin: {
        description: 'Las imágenes se mostrarán de menor a mayor según este número',
        step: 1,
      },
    },
  ],

  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        // Verificar que data existe y no es undefined
        if (!data) return data

        // Limpiar espacios en blanco
        if (data.nombre) {
          data.nombre = data.nombre.trim()
        }
        if (data.descripcion) {
          data.descripcion = data.descripcion.trim()
        }

        return data
      },
    ],

    beforeChange: [
      ({ data, operation, req }) => {
        // Verificar que data existe
        if (!data) return data

        console.log(`🔄 [${operation.toUpperCase()}] Procesando imagen:`, {
          nombre: data.nombre,
          hasFile: !!req.file,
          hasCloudinary: !!data.cloudinary,
          url: data.url,
        })

        return data
      },
    ],

    afterChange: [
      ({ doc, operation, req }) => {
        console.log(`✅ [${operation.toUpperCase()}] Imagen procesada:`, {
          id: doc.id,
          nombre: doc.nombre,
          activo: doc.activo,
          cloudinaryPublicId: doc.cloudinary?.public_id,
          cloudinaryUrl: doc.cloudinary?.secure_url,
          localUrl: doc.url,
          filename: doc.filename,
        })

        // Verificar consistencia de datos
        if (doc.cloudinary?.public_id && doc.cloudinary?.secure_url) {
          console.log(`📁 Archivo guardado correctamente en Cloudinary: ${doc.cloudinary.public_id}`)
        } else if (doc.url && doc.url.startsWith('/api/')) {
          console.log(`⚠️  Archivo solo en local storage: ${doc.url}`)
        } else {
          console.log(`❌ Posible problema con archivo de imagen`)
        }
      },
    ],

    afterDelete: [
      async ({ doc }) => {
        console.log(`🗑️ Eliminando imagen: ${doc.nombre} (ID: ${doc.id})`)

        // Eliminar de Cloudinary si existe
        const publicId = doc?.cloudinary?.public_id
        if (publicId) {
          try {
            const result = await cloudinary.uploader.destroy(publicId, {
              invalidate: true,
              resource_type: 'image',
            })

            if (result.result === 'ok') {
              console.log(`✅ Imagen eliminada de Cloudinary: ${publicId}`)
            } else {
              console.log(`⚠️  Respuesta inesperada de Cloudinary:`, result)
            }
          } catch (error) {
            console.error(`❌ Error al eliminar imagen de Cloudinary (${publicId}):`, error)
          }
        } else {
          console.log(`⚠️  No se encontró public_id de Cloudinary para eliminar`)
        }
      },
    ],
  },
}

export default Imagenes