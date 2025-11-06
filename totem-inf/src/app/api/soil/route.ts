import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const agromonApiKey = process.env.AGRO_API

  if (!agromonApiKey) {
    console.error('Faltan variable de entorno (AGRO_API)')
    return NextResponse.json(
      { error: 'Error interno de servidor: Faltan variable de entorno (WEATHER_API)' },
      { status: 500 },
    )
  }

  const agromonApiUrl = `https://api.agromonitoring.com/agro/1.0/soil?polyid=6907fc5b2a3899e02673a107&appid=${agromonApiKey}`

  try {
    // We add revalidation to cache the response on the server for 10 minutes
    const response = await fetch(agromonApiUrl, {
      next: { revalidate: 600 }, // 10 minutes
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Error from agromon API:', errorData)
      return NextResponse.json(
        { error: `Failed to fetch agromon data: ${response.statusText}` },
        { status: response.status },
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in agromon API route:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
