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
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'],
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      required: true,
      label: 'Nombre de la imagen',
    },
    {
      name: 'descripcion',
      type: 'textarea',
      required: false,
      label: 'Descripción (opcional)',
    },
    {
      name: 'activo',
      type: 'checkbox',
      label: 'Mostrar en el carrusel',
      defaultValue: true,
    },
    {
      name: 'orden',
      type: 'number',
      label: 'Orden de aparición',
      admin: {
        description: 'Las imágenes se mostrarán de menor a mayor según este número',
      },
    },
  ],

  hooks: {
    afterDelete: [
      async ({ doc }) => {
        const publicId = doc?.cloudinary?.public_id;
        if (publicId) {
          try {
            await cloudinary.uploader.destroy(publicId, {
              invalidate: true,
              resource_type: 'image',
            });
            console.log(`Imagen eliminada de Cloudinary: ${publicId}`);
          } catch (error) {
            console.error('Error al eliminar imagen de Cloudinary:', error);
          }
        } else {
          console.warn('No se encontró public_id en el documento eliminado');
        }
      },
    ],
  }


}

export default Imagenes
