'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState('')
  const [currentDate, setCurrentDate] = useState('')

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()

      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }

      const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }

      setCurrentTime(now.toLocaleTimeString('es-ES', timeOptions))
      setCurrentDate(now.toLocaleDateString('es-ES', dateOptions))
    }

    updateDateTime()
    const interval = setInterval(updateDateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <div className="logo-container">
            <Image
              src="/images/logo-santo-tomas.png"
              alt="Logo Santo Tomás"
              width={160}
              height={70}
              style={{
                maxHeight: '100%',
                width: 'auto',
                objectFit: 'contain'
              }}
              priority
            />
          </div>
        </div>

        <div className="navbar-center">
          <h1>Tótem Informativo | Área Informática</h1>
          <div className="subtitle">Sistema de Información Digital</div>
        </div>

        <div className="navbar-right">
          <div className="datetime-container">
            <div className="time-display">{currentTime}</div>
            <div className="date-display">{currentDate}</div>
          </div>
          <div className="logo-container">
            <Image
              src="/images/logo-lia.png"
              alt="Logo LIA"
              width={200}
              height={200}
              style={{
                maxHeight: '100%',
                width: 'auto',
                objectFit: 'contain',
                marginRight: '-10px'
              }}
              priority
            />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar