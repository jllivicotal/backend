# 🚀 API GraphQL de Gestión de Empleados

Backend completo con Express, MongoDB, GraphQL (Apollo Server) y REST API para la gestión de empleados.

## 📋 Tabla de Contenidos

- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Endpoints](#endpoints)
- [API GraphQL](#api-graphql)
  - [Tipos](#tipos)
  - [Queries](#queries)
  - [Mutations](#mutations)
- [Ejemplos Completos](#ejemplos-completos)
- [API REST](#api-rest)

---

## 🔧 Instalación

```bash
npm install
```

## ⚙️ Configuración

1. Crea un archivo `.env` en la raíz del proyecto:

```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/database?retryWrites=true&w=majority
PORT=3000
```

2. Reemplaza `usuario`, `password`, `cluster` y `database` con tus credenciales de MongoDB.

## 🚀 Ejecución

### Modo desarrollo (con auto-reload):
```bash
npm run dev
```

### Modo producción:
```bash
npm start
```

El servidor iniciará en `http://localhost:3000`

- **REST API**: `http://localhost:3000/api`
- **GraphQL API**: `http://localhost:3000/graphql`
- **GraphQL Playground**: `http://localhost:3000/graphql` (interfaz interactiva)

---

## 🌐 Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/empleados` | Obtener todos los empleados (REST) |
| POST | `/api/empleados` | Crear empleado (REST) |
| GET | `/api/empleados/:id` | Obtener empleado por ID (REST) |
| PUT | `/api/empleados/:id` | Actualizar empleado (REST) |
| DELETE | `/api/empleados/:id` | Eliminar empleado (REST) |
| POST | `/graphql` | Endpoint GraphQL (queries y mutations) |

---

## 🎯 API GraphQL

### 📊 Tipos

#### Empleado
```graphql
type Empleado {
  id: ID!
  nombre: String!
  cargo: String!
  departamento: String!
  sueldo: Float!
  createdAt: String
  updatedAt: String
}
```

#### Inputs
```graphql
input EmpleadoInput {
  nombre: String!
  cargo: String!
  departamento: String!
  sueldo: Float!
}

input EmpleadoUpdateInput {
  nombre: String
  cargo: String
  departamento: String
  sueldo: Float
}

input EmpleadoFilterInput {
  nombre: String
  cargo: String
  departamento: String
  sueldoMin: Float
  sueldoMax: Float
}
```

---

### 🔍 Queries

#### 1. **Obtener todos los empleados**

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

#### 2. **Obtener un empleado por ID**

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

#### 3. **Buscar empleados con filtros**

```graphql
# Buscar por nombre
query {
  buscarEmpleados(filtros: { nombre: "Juan" }) {
    id
    nombre
    cargo
    departamento
    sueldo
  }
}

# Buscar por departamento
query {
  buscarEmpleados(filtros: { departamento: "Tecnología" }) {
    id
    nombre
    cargo
    sueldo
  }
}

# Buscar por rango salarial
query {
  buscarEmpleados(filtros: { sueldoMin: 3000, sueldoMax: 6000 }) {
    id
    nombre
    cargo
    sueldo
  }
}

# Búsqueda combinada
query {
  buscarEmpleados(
    filtros: {
      departamento: "Tecnología"
      sueldoMin: 4000
    }
  ) {
    id
    nombre
    cargo
    sueldo
  }
}
```

#### 4. **Obtener empleados por departamento**

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

#### 5. **Obtener empleados por rango salarial**

```graphql
query {
  empleadosPorSueldo(min: 3000, max: 6000) {
    id
    nombre
    cargo
    departamento
    sueldo
  }
}
```

#### 6. **Obtener estadísticas de empleados**

```graphql
query {
  estadisticasEmpleados {
    total
    sueldoPromedio
    sueldoMinimo
    sueldoMaximo
    sueldoTotal
  }
}
```

#### 7. **Obtener lista de departamentos únicos**

```graphql
query {
  departamentos
}
```

#### 8. **Obtener lista de cargos únicos**

```graphql
query {
  cargos
}
```

---

### ✏️ Mutations

#### 1. **Crear un empleado**

```graphql
mutation {
  crearEmpleado(
    input: {
      nombre: "Juan Pérez"
      cargo: "Desarrollador Senior"
      departamento: "Tecnología"
      sueldo: 5000
    }
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

#### 2. **Actualizar un empleado**

```graphql
mutation {
  actualizarEmpleado(
    id: "507f1f77bcf86cd799439011"
    input: {
      cargo: "Arquitecto de Software"
      sueldo: 6500
    }
  ) {
    id
    nombre
    cargo
    sueldo
    updatedAt
  }
}
```

#### 3. **Eliminar un empleado**

```graphql
mutation {
  eliminarEmpleado(id: "507f1f77bcf86cd799439011") {
    message
    success
  }
}
```

#### 4. **Crear múltiples empleados**

```graphql
mutation {
  crearEmpleados(
    input: [
      {
        nombre: "María García"
        cargo: "Gerente de Proyectos"
        departamento: "Administración"
        sueldo: 7000
      }
      {
        nombre: "Carlos Rodríguez"
        cargo: "Analista de Datos"
        departamento: "Finanzas"
        sueldo: 4500
      }
      {
        nombre: "Ana López"
        cargo: "Desarrolladora Frontend"
        departamento: "Tecnología"
        sueldo: 4800
      }
    ]
  ) {
    id
    nombre
    cargo
    departamento
    sueldo
  }
}
```

#### 5. **Eliminar empleados por departamento**

```graphql
mutation {
  eliminarEmpleadosPorDepartamento(departamento: "Tecnología") {
    message
    success
  }
}
```

#### 6. **Aumentar sueldo por departamento**

```graphql
# Aumentar 10% el sueldo del departamento de Tecnología
mutation {
  aumentarSueldoPorDepartamento(
    departamento: "Tecnología"
    porcentaje: 10
  ) {
    id
    nombre
    cargo
    sueldo
  }
}
```

---

## 📝 Ejemplos Completos

### Ejemplo 1: Workflow completo - Crear y consultar empleados

```graphql
# 1. Crear varios empleados
mutation CrearEmpleados {
  crearEmpleados(
    input: [
      {
        nombre: "Juan Pérez"
        cargo: "Desarrollador Senior"
        departamento: "Tecnología"
        sueldo: 5000
      }
      {
        nombre: "María García"
        cargo: "Gerente de Proyectos"
        departamento: "Administración"
        sueldo: 7000
      }
      {
        nombre: "Carlos Rodríguez"
        cargo: "Analista de Datos"
        departamento: "Finanzas"
        sueldo: 4500
      }
    ]
  ) {
    id
    nombre
    cargo
  }
}

# 2. Consultar todos los empleados
query ObtenerTodos {
  empleados {
    id
    nombre
    cargo
    departamento
    sueldo
  }
}

# 3. Ver estadísticas
query Estadisticas {
  estadisticasEmpleados {
    total
    sueldoPromedio
    sueldoMinimo
    sueldoMaximo
  }
}
```

### Ejemplo 2: Gestión de departamento

```graphql
# 1. Ver empleados de Tecnología
query EmpleadosTecnologia {
  empleadosPorDepartamento(departamento: "Tecnología") {
    id
    nombre
    cargo
    sueldo
  }
}

# 2. Aumentar 15% sueldo a Tecnología
mutation AumentarSueldoTecnologia {
  aumentarSueldoPorDepartamento(
    departamento: "Tecnología"
    porcentaje: 15
  ) {
    id
    nombre
    cargo
    sueldo
  }
}

# 3. Ver estadísticas actualizadas
query EstadisticasActualizadas {
  estadisticasEmpleados {
    sueldoPromedio
    sueldoMaximo
  }
}
```

### Ejemplo 3: Búsqueda avanzada

```graphql
# Buscar empleados con sueldo entre 4000 y 6000 en Tecnología
query BusquedaAvanzada {
  buscarEmpleados(
    filtros: {
      departamento: "Tecnología"
      sueldoMin: 4000
      sueldoMax: 6000
    }
  ) {
    id
    nombre
    cargo
    sueldo
  }
}
```

---

## 🔗 Usando GraphQL desde código

### Con JavaScript (fetch)

```javascript
const query = `
  query {
    empleados {
      id
      nombre
      cargo
      sueldo
    }
  }
`;

fetch('http://localhost:3000/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query })
})
  .then(res => res.json())
  .then(data => console.log(data.data.empleados));
```

### Con JavaScript (mutation)

```javascript
const mutation = `
  mutation($input: EmpleadoInput!) {
    crearEmpleado(input: $input) {
      id
      nombre
      cargo
    }
  }
`;

const variables = {
  input: {
    nombre: "Pedro Sánchez",
    cargo: "DevOps Engineer",
    departamento: "Tecnología",
    sueldo: 5500
  }
};

fetch('http://localhost:3000/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query: mutation, variables })
})
  .then(res => res.json())
  .then(data => console.log(data.data.crearEmpleado));
```

### Con cURL

```bash
# Query
curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ empleados { id nombre cargo sueldo } }"}'

# Mutation
curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation($input: EmpleadoInput!) { crearEmpleado(input: $input) { id nombre cargo } }",
    "variables": {
      "input": {
        "nombre": "Pedro Sánchez",
        "cargo": "DevOps Engineer",
        "departamento": "Tecnología",
        "sueldo": 5500
      }
    }
  }'
```

---

## 🔌 API REST (Endpoints tradicionales)

### Obtener todos los empleados
```bash
curl http://localhost:3000/api/empleados
```

### Crear empleado
```bash
curl -X POST http://localhost:3000/api/empleados \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "cargo": "Desarrollador",
    "departamento": "Tecnología",
    "sueldo": 5000
  }'
```

### Obtener empleado por ID
```bash
curl http://localhost:3000/api/empleados/507f1f77bcf86cd799439011
```

### Actualizar empleado
```bash
curl -X PUT http://localhost:3000/api/empleados/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "cargo": "Senior Developer",
    "sueldo": 6000
  }'
```

### Eliminar empleado
```bash
curl -X DELETE http://localhost:3000/api/empleados/507f1f77bcf86cd799439011
```

---

## 🎨 Ventajas de GraphQL vs REST

### GraphQL
- ✅ Obtén exactamente los datos que necesitas
- ✅ Una sola petición para múltiples recursos
- ✅ Fuertemente tipado con introspección
- ✅ Documentación automática
- ✅ Playground interactivo incluido

### REST
- ✅ Simple y familiar
- ✅ Cacheable con HTTP
- ✅ Ampliamente soportado

---

## 🧪 Probar en GraphQL Playground

1. Inicia el servidor: `npm run dev`
2. Abre tu navegador en: `http://localhost:3000/graphql`
3. Usa el editor interactivo para ejecutar queries y mutations
4. Explora la documentación automática en el panel derecho

---

## 📦 Estructura del Proyecto

```
backend/
├── src/
│   ├── controllers/
│   │   └── empleados.controller.js
│   ├── models/
│   │   └── Empleado.js
│   ├── routes/
│   │   └── empleados.routes.js
│   └── graphql/
│       ├── typeDefs.js       # Definiciones de tipos GraphQL
│       └── resolvers.js      # Resolvers para queries y mutations
├── app.js                     # Configuración de Express
├── index.js                   # Servidor principal con Apollo Server
├── database.js                # Conexión a MongoDB
├── package.json
└── .env                       # Variables de entorno
```

---

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **Apollo Server** - Servidor GraphQL
- **GraphQL** - Lenguaje de consultas
- **dotenv** - Variables de entorno
- **Morgan** - Logger HTTP
- **CORS** - Cross-Origin Resource Sharing

---

## 📄 Licencia

ISC

---

## 👨‍💻 Autor

Backend desarrollado con Express, GraphQL y MongoDB
