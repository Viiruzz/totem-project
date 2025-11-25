import configPromise from '@payload-config'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

export const revalidate = 60

export async function GET() {
  try {
    const payload = await getPayload({
      config: configPromise,
    })

    const { docs } = await payload.find({
      collection: 'imagenes',
      sort: 'orden',
      depth: 1,
    })

    return NextResponse.json({ imagenes: docs })
  } catch (error) {
    console.error('Error al obtener imágenes para el carrusel:', error)
    return NextResponse.json(
      { error: 'No se pudieron obtener las imágenes del carrusel' },
      { status: 500 },
    )
  }
}

