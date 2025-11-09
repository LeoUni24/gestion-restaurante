Sistema de Gestión de Restaurante

Este proyecto es un sistema de gestión para un restaurante, desarrollado con Strapi en el backend y HTML/JS en el frontend. Permite manejar productos, ventas, reservaciones y control de caja de manera sencilla y eficiente. Contiene la siguiente estructura: backend/ con Strapi (api, config, package.json, package-lock.json, .env.example) y frontend/ con el index.html y script.js. No se incluyen las carpetas node_modules ni .tmp, que se generan al instalar dependencias.

Requisitos previos: Node.js ≥ 16, NPM ≥ 8, navegador web para probar el frontend y Git para clonar el repositorio.

Para configurar el backend: ir a la carpeta backend con cd backend, instalar dependencias con npm install, copiar y editar variables de entorno con cp .env.example .env y luego levantar Strapi en modo desarrollo con npm run develop. Por defecto el backend estará disponible en http://localhost:1337.

Para configurar el frontend: abrir frontend/index.html en el navegador y asegurarse de que la URL del API en script.js apunte al backend: const API_URL = "http://localhost:1337/api/productos";. Podrás agregar, editar, eliminar y visualizar productos del restaurante en tiempo real.

La API del backend tiene los siguientes endpoints principales para la gestión de productos: GET /api/productos para obtener todos los productos, POST /api/productos para crear un producto, PUT /api/productos/:id para actualizar un producto y DELETE /api/productos/:id para eliminar un producto. Los datos enviados y recibidos se manejan en formato JSON.

Enlace al repositorio: [Repositorio en GitHub](https://github.com/LeoUni24/gestion-restaurante)

Participación del equipo: Integrante 1: Leonardo Trejos. Integrante 2: Nahir Gutierrez. Integrante 3: Ilisch Miranda. Integrante 4: José Rivera.
