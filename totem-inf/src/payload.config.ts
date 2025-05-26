// storage-adapter-import-placeholder
import { cloudinaryStorage } from 'payload-cloudinary'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
//import { Media } from './collections/Media'
import Imagenes from './collections/Imagenes'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Imagenes],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    cloudinaryStorage({
      config: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME! || '',
        api_key: process.env.CLOUDINARY_API_KEY! || '',
        api_secret: process.env.CLOUDINARY_API_SECRET! || '',
      },
      collections: {
        'imagenes': true, // Enable Cloudinary for Imagenes collection
       },
       folder: 'totem-inf',
       disableLocalStorage: true,
       enabled: true,
    }),
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
