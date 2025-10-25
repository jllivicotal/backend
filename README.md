# 🏢 Sistema de Gestión de Empleados - Backend

API REST y GraphQL para la gestión integral de empleados construida con Node.js, Express, MongoDB y Apollo Server.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [API REST](#api-rest)
- [API GraphQL](#api-graphql)
- [Pruebas Unitarias](#pruebas-unitarias)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Scripts Disponibles](#scripts-disponibles)

## ✨ Características

- ✅ **API REST completa** con operaciones CRUD
- ✅ **API GraphQL** con queries y mutations
- ✅ **Base de datos MongoDB** con Mongoose
- ✅ **Pruebas unitarias** con Jest y Supertest (96% cobertura)
- ✅ **Variables de entorno** con dotenv
- ✅ **Validación de datos** con Mongoose schemas
- ✅ **CORS habilitado** para desarrollo
- ✅ **Logging** con Morgan
- ✅ **Hot reload** con Nodemon

## 🛠️ Tecnologías

### Core
- **Node.js** - Runtime de JavaScript
- **Express 5** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose 8** - ODM para MongoDB

### GraphQL
- **Apollo Server 5** - Servidor GraphQL
- **graphql** - Librería GraphQL
- **graphql-tag** - Parser de queries GraphQL

### Testing
- **Jest 30** - Framework de pruebas
- **Supertest 7** - Testing de endpoints HTTP
- **MongoDB Memory Server** - BD en memoria para tests

### Utilidades
- **dotenv** - Manejo de variables de entorno
- **cors** - Cross-Origin Resource Sharing
- **morgan** - HTTP request logger
- **nodemon** - Auto-reload en desarrollo

## 📦 Instalación

### Prerrequisitos

- Node.js >= 18.x
- npm >= 9.x
- MongoDB Atlas account (o MongoDB local)

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/jllivicotal/backend.git
   cd backend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   # Crear archivo .env
   copy .env.template .env  # Windows
   # o
   cp .env.template .env    # Linux/Mac
   ```

4. **Editar .env con tu conexión de MongoDB**
   ```env
   MONGOOSE_CONNECTION=mongodb+srv://user:pass@cluster.mongodb.net/?retryWrites=true&w=majority
   PORT=3000
   ```

5. **Iniciar el servidor**
   ```bash
   npm run dev
   ```

El servidor estará disponible en `http://localhost:3000`

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# MongoDB
MONGOOSE_CONNECTION=mongodb+srv://user:password@cluster.mongodb.net/?retryWrites=true&w=majority
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/?retryWrites=true&w=majority

# Server
PORT=3000
NODE_ENV=development
```

### Archivo .env.template

El proyecto incluye un `.env.template` con las variables necesarias.

## 🚀 Uso

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm start
```

### Pruebas
```bash
npm test
```

### Pruebas en modo watch
```bash
npm run test:watch
```

## 🌐 API REST

### Base URL
```
http://localhost:3000/api
```

### Endpoints

| Método | Endpoint              | Descripción                    |
|--------|-----------------------|--------------------------------|
| GET    | `/api/empleados`      | Obtener todos los empleados    |
| POST   | `/api/empleados`      | Crear un nuevo empleado        |
| GET    | `/api/empleados/:id`  | Obtener un empleado por ID     |
| PUT    | `/api/empleados/:id`  | Actualizar un empleado         |
| DELETE | `/api/empleados/:id`  | Eliminar un empleado           |

### Ejemplos de Uso

#### Obtener todos los empleados
```bash
curl http://localhost:3000/api/empleados
```

#### Crear un empleado
```bash
curl -X POST http://localhost:3000/api/empleados \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "cargo": "Desarrollador Senior",
    "departamento": "Tecnología",
    "sueldo": 5000
  }'
```

#### Actualizar un empleado
```bash
curl -X PUT http://localhost:3000/api/empleados/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "sueldo": 6000
  }'
```

#### Eliminar un empleado
```bash
curl -X DELETE http://localhost:3000/api/empleados/507f1f77bcf86cd799439011
```

### Estructura de Datos

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "nombre": "Juan Pérez",
  "cargo": "Desarrollador Senior",
  "departamento": "Tecnología",
  "sueldo": 5000,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

## 🔷 API GraphQL

### GraphQL Playground
```
http://localhost:3000/graphql
```

El playground de Apollo Server está disponible en modo desarrollo para probar queries y mutations.

### Queries

#### Obtener todos los empleados
```graphql
query {
  empleados {
    id
    nombre
    cargo
    departamento
    sueldo
    createdAt
    updatedAt
  }
}
```

#### Obtener un empleado por ID
```graphql
query {
  empleado(id: "507f1f77bcf86cd799439011") {
    id
    nombre
    cargo
    departamento
    sueldo
  }
}
```

#### Buscar empleados por departamento
```graphql
query {
  empleadosPorDepartamento(departamento: "Tecnología") {
    id
    nombre
    cargo
    sueldo
  }
}
```

#### Obtener estadísticas de empleados
```graphql
query {
  estadisticasEmpleados {
    total
    sueldoPromedio
    sueldoMaximo
    sueldoMinimo
    empleadosPorDepartamento {
      departamento
      cantidad
    }
  }
}
```

### Mutations

#### Crear un empleado
```graphql
mutation {
  crearEmpleado(
    nombre: "Juan Pérez"
    cargo: "Desarrollador Senior"
    departamento: "Tecnología"
    sueldo: 5000
  ) {
    id
    nombre
    cargo
    departamento
    sueldo
    createdAt
  }
}
```

#### Actualizar un empleado
```graphql
mutation {
  actualizarEmpleado(
    id: "507f1f77bcf86cd799439011"
    nombre: "Juan Pérez Actualizado"
    sueldo: 6000
  ) {
    id
    nombre
    sueldo
    updatedAt
  }
}
```

#### Eliminar un empleado
```graphql
mutation {
  eliminarEmpleado(id: "507f1f77bcf86cd799439011") {
    success
    message
  }
}
```

📖 **Documentación completa de GraphQL:** Ver `GRAPHQL_README.md`

## 🧪 Pruebas Unitarias

### Ejecutar Pruebas

```bash
# Todas las pruebas con cobertura
npm test

# Modo watch (desarrollo)
npm run test:watch

# Ver cobertura en HTML
start coverage/lcov-report/index.html
```

### Resultados

```
✅ 22/22 pruebas pasando
✅ 96.61% cobertura de código
✅ 100% branches
✅ 100% funciones
```

### Cobertura por Módulo

| Archivo                      | Statements | Branches | Functions | Lines  |
|------------------------------|------------|----------|-----------|--------|
| app.js                       | 100%       | 100%     | 100%      | 100%   |
| empleados.controller.js      | 94.28%     | 100%     | 100%      | 93.75% |
| Empleado.js                  | 100%       | 100%     | 100%      | 100%   |
| empleados.routes.js          | 100%       | 100%     | 100%      | 100%   |

📖 **Documentación completa de tests:** Ver `TESTING_README.md`  
⚡ **Guía rápida:** Ver `TESTING_QUICKSTART.md`

## 📁 Estructura del Proyecto

```
backend/
├── __tests__/                    # Pruebas unitarias
│   ├── dbHandler.js              # Helper para BD en memoria
│   ├── empleados.test.js         # 22 tests del CRUD
│   └── ejemplos-extension.test.js # Ejemplos para extender
│
├── src/
│   ├── controllers/
│   │   └── empleados.controller.js  # Lógica de negocio REST
│   │
│   ├── graphql/
│   │   ├── typeDefs.js           # Esquema GraphQL
│   │   └── resolvers.js          # Resolvers GraphQL
│   │
│   ├── models/
│   │   └── Empleado.js           # Modelo Mongoose
│   │
│   └── routes/
│       └── empleados.routes.js   # Rutas REST
│
├── coverage/                     # Reportes de cobertura (auto-generado)
├── node_modules/                 # Dependencias (auto-generado)
│
├── .env                          # Variables de entorno (NO en Git)
├── .env.template                 # Template de variables
├── .gitignore                    # Archivos ignorados por Git
│
├── app.js                        # Configuración Express
├── database.js                   # Conexión MongoDB
├── index.js                      # Punto de entrada
│
├── jest.config.js                # Configuración Jest
├── package.json                  # Dependencias y scripts
├── package-lock.json             # Lock de dependencias
│
├── GRAPHQL_README.md             # Documentación GraphQL
├── TESTING_README.md             # Documentación de tests
├── TESTING_SUMMARY.md            # Resumen de tests
├── TESTING_QUICKSTART.md         # Guía rápida de tests
└── README.md                     # Este archivo
```

## 📜 Scripts Disponibles

### Desarrollo
```bash
npm run dev          # Inicia servidor con nodemon (hot reload)
```

### Producción
```bash
npm start            # Inicia servidor en modo producción
```

### Testing
```bash
npm test             # Ejecuta todas las pruebas con cobertura
npm run test:watch   # Modo watch para desarrollo de tests
```

### GraphQL (deprecated)
```bash
npm run grafbase      # Inicia Grafbase (no en uso actualmente)
npm run grafbase:build # Build de Grafbase (no en uso actualmente)
```

## 🔐 Seguridad

- ✅ Variables de entorno para credenciales
- ✅ `.env` en `.gitignore`
- ✅ Validación de datos con Mongoose
- ⚠️ CORS abierto en desarrollo (configurar para producción)
- ⚠️ Sin autenticación JWT (pendiente implementar)

## 🚧 Roadmap

- [ ] Implementar autenticación con JWT
- [ ] Agregar paginación en endpoints REST
- [ ] Agregar filtros y búsqueda
- [ ] Implementar rate limiting
- [ ] Agregar compresión gzip
- [ ] Implementar caché con Redis
- [ ] Agregar documentación OpenAPI/Swagger
- [ ] Pruebas de GraphQL
- [ ] Pruebas de integración E2E
- [ ] CI/CD con GitHub Actions

## 📝 Notas Importantes

1. **Base de Datos**: Requiere MongoDB Atlas o MongoDB local
2. **Puerto**: Por defecto usa el puerto 3000 (configurable en `.env`)
3. **CORS**: Habilitado para todos los orígenes en desarrollo
4. **Timestamps**: Los modelos incluyen `createdAt` y `updatedAt` automáticamente
5. **GraphQL**: Apollo Server Playground solo disponible en desarrollo

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

ISC

## 👤 Autor

**jllivicotal**

- GitHub: [@jllivicotal](https://github.com/jllivicotal)

## 📞 Soporte

Para preguntas o problemas, abre un issue en GitHub.

---

**¿Necesitas ayuda?** Revisa la documentación específica:
- REST API: Este README
- GraphQL: `GRAPHQL_README.md`
- Testing: `TESTING_README.md` o `TESTING_QUICKSTART.md`
