import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const openweatherApiKey = process.env.OPENWEATHER_API

  const lat = -36.6066616
  const lon = -72.1033194

  if (!openweatherApiKey) {
    console.error('Faltan variable de entorno (OPENWEATHER_API)')
    return NextResponse.json(
      { error: 'Error interno de servidor: Faltan variable de entorno (OPENWEATHER_API)' },
      { status: 500 },
    )
  }

  const openweatherApiUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${openweatherApiKey}`

  try {
    // We add revalidation to cache the response on the server for 10 minutes
    const response = await fetch(openweatherApiUrl, {
      next: { revalidate: 600 }, // 10 minutes
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Error from weather API:', errorData)
      return NextResponse.json(
        { error: `Failed to fetch weather data: ${response.statusText}` },
        { status: response.status },
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in weather API route:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
