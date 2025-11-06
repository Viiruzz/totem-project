'use client'

import React, { useState, useEffect } from 'react'
import { FaTemperatureHigh } from 'react-icons/fa'
import { WiHumidity } from 'react-icons/wi'
import { BsSun } from 'react-icons/bs'
import { RiPlantLine } from 'react-icons/ri'
import { MdAir } from 'react-icons/md'

interface EnvironmentalData {
  temperature: string | null
  humidity: string | null
  uvIndex: string | null
  airQuality: string | null
  soilMoisture: string | null
}

const decifrarCalidadAire = (index: number) => {
  switch (index) {
    case 1:
      return 'Buena'
    case 2:
      return 'Moderada'
    case 3:
      return 'Pobre'
    case 4:
      return 'Peligrosa'
  }
}

const WeatherInfo = () => {
  const [data, setData] = useState<EnvironmentalData>({
    temperature: null,
    humidity: null,
    uvIndex: null,
    airQuality: null,
    soilMoisture: null,
  })
  const [lastUpdate, setLastUpdate] = useState('')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Función para actualizar la hora
    const updateTime = () => {
      setLastUpdate(
        new Date().toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      )
    }

    const fetchAllData = async () => {
      try {
        const [weatherRes, airQualityRes, soilRes] = await Promise.all([
          fetch('/api/weather'),
          fetch('/api/airQuality'),
          fetch('/api/soil'),
        ])

        const weatherData = weatherRes.ok ? await weatherRes.json() : null
        const airQualityData = airQualityRes.ok ? await airQualityRes.json() : null
        const soilData = soilRes.ok ? await soilRes.json() : null

        setData({
          temperature: weatherData ? `${weatherData.currentConditions.temp}°C` : 'Error',
          humidity: weatherData ? `${weatherData.currentConditions.humidity}%` : 'Error',
          uvIndex: weatherData ? `${weatherData.currentConditions.uvindex} UV` : 'Error',
          airQuality: airQualityData
            ? (decifrarCalidadAire(airQualityData.list[0].main.aqi) ?? 'Error')
            : 'Error',
          soilMoisture: soilData ? `${Math.round(soilData.moisture * 100)}%` : 'Error',
        })
      } catch (error) {
        console.error('Failed to fetch environmental data:', error)
        setData({
          temperature: 'Error',
          humidity: 'Error',
          uvIndex: 'Error',
          airQuality: 'Error',
          soilMoisture: 'Error',
        })
      }
      updateTime()
    }

    // Initial fetch
    fetchAllData()
    updateTime()

    // Set up intervals
    const timeInterval = setInterval(updateTime, 60000) // Update time every minute
    const dataInterval = setInterval(fetchAllData, 3600000) // Update data every hour

    // Cleanup intervals on component unmount
    return () => {
      clearInterval(timeInterval)
      clearInterval(dataInterval)
    }
  }, [])

  const weatherItems = [
    {
      icon: <FaTemperatureHigh className="weather-icon temperature" />,
      label: 'Temperatura',
      value: data.temperature,
    },
    {
      icon: <WiHumidity className="weather-icon humidity" />,
      label: 'Humedad',
      value: data.humidity,
    },
    {
      icon: <BsSun className="weather-icon uv" />,
      label: 'Índice UV',
      value: data.uvIndex,
    },
    {
      icon: <MdAir className="weather-icon air" />,
      label: 'Calidad del Aire',
      value: data.airQuality,
    },
    {
      icon: <RiPlantLine className="weather-icon soil" />,
      label: 'Humedad del Suelo',
      value: data.soilMoisture,
    },
  ]

  return (
    <div className="weather-info-container">
      <div className="weather-header">
        <h2>Información Ambiental</h2>
        <div className="weather-subtitle">Datos en tiempo real</div>
      </div>

      <div className="weather-card">
        {weatherItems.map((item, index) => (
          <div key={index} className="weather-item">
            <div className="weather-icon-container">{item.icon}</div>
            <div className="weather-text">
              <span className="label">{item.label}</span>
              <span className="value">{item.value || 'Cargando...'}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="weather-footer">
        <div className="last-update">
          {isClient ? `Última actualización: ${lastUpdate}` : 'Cargando hora...'}
        </div>
      </div>
    </div>
  )
}

export default WeatherInfo
