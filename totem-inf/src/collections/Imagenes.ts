import { CollectionConfig } from 'payload'

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
        height: 600,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
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
}

export default Imagenes
