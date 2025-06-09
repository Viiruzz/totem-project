'use client'

import React from 'react'
import { FaTemperatureHigh } from 'react-icons/fa'
import { WiHumidity } from 'react-icons/wi'
import { BsSun } from 'react-icons/bs'
import { RiPlantLine } from 'react-icons/ri'
import { AiOutlineCloud } from 'react-icons/ai'

const WeatherInfo = () => {
  // Simulación de datos del clima
  const weatherData = {
    temperature: '24.8°C',
    humidity: '55%',
    uvIndex: '6 UV',
    airQuality: 'Buena',
    soilMoisture: '39%'
  }

  return (
    <div className="weather-info-container">
      <div className="weather-card">
        <div className="weather-item">
          <FaTemperatureHigh className="weather-icon temperature" />
          <div className="weather-text">
            <span className="label">Temperatura</span>
            <span className="value">{weatherData.temperature}</span>
          </div>
        </div>

        <div className="weather-item">
          <WiHumidity className="weather-icon humidity" />
          <div className="weather-text">
            <span className="label">Humedad</span>
            <span className="value">{weatherData.humidity}</span>
          </div>
        </div>

        <div className="weather-item">
          <BsSun className="weather-icon uv" />
          <div className="weather-text">
            <span className="label">Índice UV</span>
            <span className="value">{weatherData.uvIndex}</span>
          </div>
        </div>

        <div className="weather-item">
          <AiOutlineCloud className="weather-icon air" />
          <div className="weather-text">
            <span className="label">Calidad del Aire</span>
            <span className="value">{weatherData.airQuality}</span>
          </div>
        </div>

        <div className="weather-item">
          <RiPlantLine className="weather-icon soil" />
          <div className="weather-text">
            <span className="label">Humedad del Suelo</span>
            <span className="value">{weatherData.soilMoisture}</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .weather-info-container {
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(10px);
          border-radius: 15px;
          padding: 1.5rem;
          color: white;
          width: 300px;
        }

        .weather-card {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .weather-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .weather-icon {
          font-size: 2rem;
          min-width: 2rem;
        }

        .weather-text {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .label {
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .value {
          font-size: 1.2rem;
          font-weight: 600;
        }

        .temperature { color: #ff6b6b; }
        .humidity { color: #4ecdc4; }
        .uv { color: #ffd93d; }
        .air { color: #95afc0; }
        .soil { color: #6ab04c; }
      `}</style>
    </div>
  )
}

export default WeatherInfo 