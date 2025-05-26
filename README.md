# 🌱 Plataforma de Monitoreo para Invernadero

Este proyecto tiene como objetivo desarrollar una plataforma web para la visualización de:

- Noticias, imágenes y vídeos en formato carrusel.
- Datos en tiempo real obtenidos desde sensores del invernadero (como temperatura y humedad).
- Información administrada de forma remota por un panel privado (Payload CMS).

---

## 🧩 Tecnologías utilizadas

| Área          | Herramienta             | Descripción                                                             |
| ------------- | ----------------------- | ----------------------------------------------------------------------- |
| Backend CMS   | Payload CMS             | Administración de contenido (noticias, imágenes, etc.)                  |
| Base de datos | MongoDB local           | Almacenamiento de datos de Payload CMS                                  |
| Almacenamiento de imagenes | Cloudinary | Para guardar las imagenes subidas a la web desde el adminstrador |
| Frontend web  | Payload CMS             | Renderizado de la web (pantalla fija con carrusel de imágenes/noticias) |
| Tiempo real   | Socket.IO               | Actualización en tiempo real sin recargar la página                     |
| IoT (futuro)  | ESP32 + MQTT + Node-RED | Sensado de datos ambientales, transmisión y transformación              |
| Acceso remoto | Tailscale               | Acceso desde otras redes vía VPN segura                                 |

---

## 🎯 Objetivo actual

> **Prioridad actual:** Mostrar imágenes (en formato carrusel) que suba el administrador desde el panel Payload CMS.  
> Más adelante se incorporarán noticias, datos en tiempo real y sensores del invernadero.

---

## 🚧 Estado del proyecto

✅ Fase 1: Panel de administración con Payload CMS  
⌛ Fase 2: Desarrollo del frontend con Payload CMS + Next.js  
✖️ Fase 3: Incorporación de sensores y tiempo real

## 📁 Estructura del proyecto

```bash
totem-project/
├── README.md              # Documentación general del proyecto
├── .gitignore             # Exclusiones para Git
<<<<<<< HEAD
└── totem-inf/           # Proyecto Payload CMS (frontend, backend(panel admin))
=======
<<<<<<< HEAD
└── payload-cms/           # Proyecto Payload CMS (frontend, backend(panel admin))
=======
└── totem-inf/           # Proyecto Payload CMS (frontend, backend(panel admin))
>>>>>>> 623ac8f (Separando proyecto en totem-inf)
>>>>>>> 1211f94 (Separando proyecto en totem-inf)
```

## 🛠️ Contribución

> Este proyecto es de uso académico. En caso de colaboración, contactar directamente con el desarrollador principal.
