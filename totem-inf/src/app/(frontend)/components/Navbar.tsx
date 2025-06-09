'use client'

import React from 'react'
import Image from 'next/image'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <div className="logo-container">
            <Image
              src="/images/logo-santo-tomas.png"
              alt="Logo Santo Tomás"
              width={150}
              height={60}
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
        </div>

        <div className="navbar-right">
          <div className="logo-container">
            <Image
              src="/images/logo-lia.png"
              alt="Logo LIA"
              width={180}
              height={180}
              style={{
                maxHeight: '100%',
                width: 'auto',
                objectFit: 'contain',
                marginRight: '-20px'
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