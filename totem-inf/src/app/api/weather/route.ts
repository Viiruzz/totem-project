import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const weatherApiKey = process.env.WEATHER_API

  if (!weatherApiKey) {
    console.error('Faltan variable de entorno (WEATHER_API)')
    return NextResponse.json(
      { error: 'Error interno de servidor: Faltan variable de entorno (WEATHER_API)' },
      { status: 500 },
    )
  }

  const weatherApiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Chill%C3%A1n%2C%20NB%2C%20CL?unitGroup=metric&key=${weatherApiKey}&contentType=json`

  try {
    // We add revalidation to cache the response on the server for 10 minutes
    const response = await fetch(weatherApiUrl, {
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
