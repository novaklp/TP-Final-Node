# 🚀 Proyecto Final Backend - API REST

API RESTful desarrollada con Node.js, Express y Firebase (Firestore) para la gestión de productos y usuarios. Incluye autenticación segura con JWT y validación de datos con Zod (no es obligatorio, pero lo agregue para practicar).

## 🛠️ Tecnologías

- **Node.js** & **Express**
- **Firebase (Firestore)** - Base de Datos en la Nube
- **JWT (JsonWebToken)** - Autenticación
- **Bcrypt** - Encriptación de contraseñas
- **Zod** - Validación de datos
- **Dotenv** - Variables de entorno


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
    "precio": 250,
    "category" : "Electronica",
    "stock": 10
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
