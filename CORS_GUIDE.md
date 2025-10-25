# 🌐 Configuración CORS - Guía de Pruebas

## ✅ CORS Configurado Exitosamente

Ambos servidores (REST y GraphQL) ahora aceptan peticiones desde **cualquier cliente**.

### 📍 Endpoints Disponibles

- **REST API**: `http://localhost:3000/api/empleados`
- **GraphQL API**: `http://localhost:4000/graphql`

---

## 🧪 Pruebas desde diferentes clientes

### 1️⃣ **Desde el Navegador (Console)**

Abre la consola de desarrollador (F12) y ejecuta:

```javascript
// REST API - GET
fetch('http://localhost:3000/api/empleados')
  .then(res => res.json())
  .then(data => console.log('Empleados:', data))
  .catch(err => console.error('Error:', err));

// REST API - POST
fetch('http://localhost:3000/api/empleados', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nombre: 'Test CORS',
    cargo: 'Developer',
    departamento: 'IT',
    sueldo: 5000
  })
})
  .then(res => res.json())
  .then(data => console.log('Empleado creado:', data));

// GraphQL API
fetch('http://localhost:4000/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: `{
      empleados {
        id
        nombre
        cargo
        departamento
        sueldo
      }
    }`
  })
})
  .then(res => res.json())
  .then(data => console.log('GraphQL Response:', data));
```

### 2️⃣ **Desde React / Vue / Angular**

```javascript
// React ejemplo con axios
import axios from 'axios';

// REST API
const obtenerEmpleados = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/empleados');
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};

// GraphQL con fetch
const obtenerEmpleadosGraphQL = async () => {
  try {
    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: '{ empleados { nombre cargo } }'
      })
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### 3️⃣ **Desde Postman / Insomnia / Thunder Client**

**REST API:**
- URL: `http://localhost:3000/api/empleados`
- Método: GET / POST / PUT / DELETE
- Headers: `Content-Type: application/json`

**GraphQL API:**
- URL: `http://localhost:4000/graphql`
- Método: POST
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "query": "{ empleados { nombre cargo } }"
}
```

### 4️⃣ **Desde cURL (Terminal)**

```bash
# REST API - GET
curl http://localhost:3000/api/empleados

# REST API - POST
curl -X POST http://localhost:3000/api/empleados \
  -H "Content-Type: application/json" \
  -d "{\"nombre\":\"Test\",\"cargo\":\"Dev\",\"departamento\":\"IT\",\"sueldo\":5000}"

# GraphQL API
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d "{\"query\":\"{empleados{nombre cargo}}\"}"
```

### 5️⃣ **Desde Python**

```python
import requests

# REST API
response = requests.get('http://localhost:3000/api/empleados')
print(response.json())

# GraphQL API
query = """
{
  empleados {
    nombre
    cargo
    departamento
  }
}
"""
response = requests.post(
    'http://localhost:4000/graphql',
    json={'query': query}
)
print(response.json())
```

### 6️⃣ **Desde una aplicación móvil (React Native)**

```javascript
// React Native con fetch
const obtenerEmpleados = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/empleados');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
```

---

## ⚙️ Configuración CORS Actual

### **REST API (Express - Puerto 3000)**

```javascript
{
  origin: '*',           // Permite cualquier origen
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: false,    // Sin cookies por seguridad
  optionsSuccessStatus: 200
}
```

### **GraphQL API (Apollo Server - Puerto 4000)**

Apollo Server en modo `startStandaloneServer` maneja CORS automáticamente y acepta peticiones de cualquier origen por defecto.

---

## 🔒 Configuración para Producción (Recomendado)

Para producción, es recomendable restringir CORS a dominios específicos:

```javascript
// En app.js
const corsOptions = {
    origin: [
        'https://miapp.com',
        'https://www.miapp.com',
        'https://admin.miapp.com'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Si usas cookies/sesiones
    optionsSuccessStatus: 200
};
```

---

## 🧪 Verificar CORS Manualmente

### Probar preflight request (OPTIONS):

```bash
curl -X OPTIONS http://localhost:3000/api/empleados \
  -H "Origin: http://ejemplo.com" \
  -H "Access-Control-Request-Method: POST" \
  -v
```

Deberías ver en la respuesta:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
```

---

## 📝 Notas Importantes

1. **Desarrollo vs Producción**: `origin: '*'` es ideal para desarrollo, pero en producción deberías especificar dominios exactos.

2. **Credentials**: Si necesitas enviar cookies o headers de autenticación:
   ```javascript
   credentials: true
   origin: 'https://tudominio.com' // NO usar '*' con credentials
   ```

3. **Apollo Server**: Si necesitas más control sobre CORS en GraphQL, considera usar `expressMiddleware` en lugar de `startStandaloneServer`.

4. **Seguridad**: CORS no es una medida de seguridad del servidor, solo controla qué navegadores pueden hacer peticiones desde JavaScript.

---

## ✅ Estado Actual

- ✅ REST API acepta peticiones desde cualquier origen
- ✅ GraphQL API acepta peticiones desde cualquier origen
- ✅ Métodos HTTP permitidos: GET, POST, PUT, DELETE, PATCH, OPTIONS
- ✅ Headers personalizados permitidos: Content-Type, Authorization, X-Requested-With
- ✅ Servidor funcionando correctamente en los puertos 3000 (REST) y 4000 (GraphQL)

---

**¡CORS configurado exitosamente! 🎉**

Ahora puedes hacer peticiones desde cualquier aplicación cliente (navegador, móvil, Postman, etc.).
