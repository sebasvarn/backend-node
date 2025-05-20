# 🏨 Sistema de Reservas de Habitaciones

Proyecto para el segundo parcial de **Programación Web Backend**. Desarrollado con **Node.js**, **Express** y **Sequelize**, usando **PostgreSQL** como base de datos.

Incluye una interfaz web simple en **HTML + Bootstrap**, servida directamente desde el mismo backend.

---

## ⚙️ Requisitos

- Node.js ≥ 18.x  
- PostgreSQL  
- npm

---

## 🚀 Instalación y ejecución

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/backend-reservas.git
cd backend-reservas
```

ejemplo de .env:
 - DB_HOST=localhost
 - DB_PORT=5432
 - DB_NAME=hotel_db
 - DB_USER=postgres
 - DB_PASS=tu_contraseña
 - PORT=3000

### El frontend se sirve desde el mismo servidor Express. Accedé desde el navegador:

**http://localhost:3000/index.html → Búsqueda y reserva de habitaciones**

**http://localhost:3000/reservas.html → Listado y filtrado de reservas**
