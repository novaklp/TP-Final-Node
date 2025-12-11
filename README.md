# 🚀 Proyecto Final Backend - API REST

API RESTful desarrollada con Node.js, Express y Firebase (Firestore) para la gestión de productos y usuarios. Incluye autenticación segura con JWT y validación de datos con Zod.

## 🛠️ Tecnologías

- **Node.js** & **Express**
- **Firebase (Firestore)** - Base de Datos en la Nube
- **JWT (JsonWebToken)** - Autenticación
- **Bcrypt** - Encriptación de contraseñas
- **Zod** - Validación de datos
- **Dotenv** - Variables de entorno

## ⚙️ Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/novaklp/TP-Final-Node.git
   cd TP-Final-Node
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno:
   Crea un archivo `.env` en la raíz y agrega tus credenciales de Firebase:
   ```env
   JWT_SECRET=tu_clave_secreta
   FIREBASE_API_KEY=...
   FIREBASE_AUTH_DOMAIN=...
   FIREBASE_PROJECT_ID=...
   # (Resto de variables de Firebase)
   ```

4. Iniciar el servidor:
   ```bash
   npm run dev  # Modo desarrollo
   npm start    # Modo producción
   ```

## 📚 Documentación de la API

### 🔐 Autenticación

#### Registrar Usuario
- **POST** `/auth/register`
- **Body:**
  ```json
  {
    "username": "ivan",
    "email": "ivan@test.com",
    "password": "123456"
  }
  ```

#### Iniciar Sesión
- **POST** `/auth/login`
- **Body:**
  ```json
  {
    "username": "ivan",
    "password": "123456"
  }
  ```
- **Respuesta:** Devuelve un `token` que debes usar en los Headers (`Authorization: Bearer TOKEN`).

---

### 📦 Productos (Requiere Token)

#### Obtener todos
- **GET** `/api/products`

#### Obtener uno
- **GET** `/api/products/:id`

#### Crear Producto
- **POST** `/api/products/create`
- **Body:**
  ```json
  {
    "nombre": "Monitor 24",
    "precio": 250
  }
  ```

#### Actualizar Producto
- **PUT** `/api/products/:id`
- **Body:** (Campos a actualizar)
  ```json
  {
    "precio": 200
  }
  ```

#### Eliminar Producto
- **DELETE** `/api/products/:id`
