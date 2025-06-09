'use client'

import React, { useState, useEffect } from 'react'
import { FaTemperatureHigh } from 'react-icons/fa'
import { WiHumidity } from 'react-icons/wi'
import { BsSun } from 'react-icons/bs'
import { RiPlantLine } from 'react-icons/ri'
import { MdAir } from 'react-icons/md'

const WeatherInfo = () => {
  const [lastUpdate, setLastUpdate] = useState('')
  const [isClient, setIsClient] = useState(false)

  // Datos del clima
  const weatherData = {
    temperature: '24.8°C',
    humidity: '55%',
    uvIndex: '6 UV',
    airQuality: 'Buena',
    soilMoisture: '39%'
  }

  useEffect(() => {
    // Marcar que estamos en el cliente
    setIsClient(true)

    // Función para actualizar la hora
    const updateTime = () => {
      setLastUpdate(new Date().toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      }))
    }

    // Actualizar inmediatamente
    updateTime()

    // Actualizar cada minuto
    const interval = setInterval(updateTime, 60000)

    return () => clearInterval(interval)
  }, [])

  const weatherItems = [
    {
      icon: <FaTemperatureHigh className="weather-icon temperature" />,
      label: 'Temperatura',
      value: weatherData.temperature
    },
    {
      icon: <WiHumidity className="weather-icon humidity" />,
      label: 'Humedad',
      value: weatherData.humidity
    },
    {
      icon: <BsSun className="weather-icon uv" />,
      label: 'Índice UV',
      value: weatherData.uvIndex
    },
    {
      icon: <MdAir className="weather-icon air" />,
      label: 'Calidad del Aire',
      value: weatherData.airQuality
    },
    {
      icon: <RiPlantLine className="weather-icon soil" />,
      label: 'Humedad del Suelo',
      value: weatherData.soilMoisture
    }
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
            <div className="weather-icon-container">
              {item.icon}
            </div>
            <div className="weather-text">
              <span className="label">{item.label}</span>
              <span className="value">{item.value}</span>
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