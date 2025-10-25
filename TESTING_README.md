# 🧪 Pruebas Unitarias - API REST de Empleados

Este documento describe las pruebas unitarias implementadas para los endpoints REST del CRUD de empleados.

## 📋 Índice

- [Instalación](#instalación)
- [Ejecutar las Pruebas](#ejecutar-las-pruebas)
- [Estructura de las Pruebas](#estructura-de-las-pruebas)
- [Cobertura de Código](#cobertura-de-código)
- [Descripción de las Pruebas](#descripción-de-las-pruebas)

## 🚀 Instalación

Las dependencias de prueba ya están instaladas en el proyecto:

```json
{
  "devDependencies": {
    "@types/jest": "^30.0.0",
    "@types/supertest": "^6.0.3",
    "jest": "^30.2.0",
    "mongodb-memory-server": "^9.x.x",
    "supertest": "^7.1.4"
  }
}
```

## ▶️ Ejecutar las Pruebas

### Ejecutar todas las pruebas con cobertura:
```bash
npm test
```

### Ejecutar pruebas en modo watch (desarrollo):
```bash
npm run test:watch
```

### Ejecutar solo un archivo de pruebas:
```bash
npx jest __tests__/empleados.test.js
```

### Ejecutar pruebas con más detalles:
```bash
npx jest --verbose
```

## 📁 Estructura de las Pruebas

```
backend/
├── __tests__/
│   ├── dbHandler.js           # Helper para base de datos en memoria
│   └── empleados.test.js      # Pruebas de endpoints REST
├── jest.config.js             # Configuración de Jest
└── package.json               # Scripts de prueba
```

## 📊 Cobertura de Código

El proyecto está configurado con los siguientes umbrales de cobertura:

- **Statements (Sentencias):** 70%
- **Branches (Ramas):** 70%
- **Functions (Funciones):** 70%
- **Lines (Líneas):** 70%

### Ver reporte de cobertura:

Después de ejecutar `npm test`, se genera un reporte en la carpeta `coverage/`:

```bash
# Ver reporte HTML en el navegador
start coverage/lcov-report/index.html   # Windows
open coverage/lcov-report/index.html    # macOS
xdg-open coverage/lcov-report/index.html # Linux
```

## 🧪 Descripción de las Pruebas

### **Total de Pruebas: 22**

---

### 1. **GET /api/empleados** (3 pruebas)

#### ✅ Debe retornar un array vacío cuando no hay empleados
- **Objetivo:** Verificar que el endpoint retorna un array vacío cuando no hay datos
- **Método:** GET
- **Endpoint:** `/api/empleados`
- **Status esperado:** 200
- **Validaciones:**
  - El body debe ser un array
  - El array debe estar vacío

#### ✅ Debe retornar todos los empleados cuando existen
- **Objetivo:** Verificar que retorna todos los empleados correctamente
- **Método:** GET
- **Endpoint:** `/api/empleados`
- **Status esperado:** 200
- **Setup:** Crea 2 empleados de prueba
- **Validaciones:**
  - El array debe tener 2 elementos
  - Cada empleado debe tener los campos: `_id`, `nombre`, `cargo`, `departamento`, `sueldo`, `createdAt`, `updatedAt`

#### ✅ Debe retornar empleados con todos los campos correctos
- **Objetivo:** Validar que los valores de los campos son correctos
- **Método:** GET
- **Endpoint:** `/api/empleados`
- **Status esperado:** 200
- **Validaciones:**
  - Los valores de nombre, cargo, departamento y sueldo coinciden con los datos creados

---

### 2. **POST /api/empleados** (4 pruebas)

#### ✅ Debe crear un nuevo empleado con datos válidos
- **Objetivo:** Verificar la creación exitosa de un empleado
- **Método:** POST
- **Endpoint:** `/api/empleados`
- **Status esperado:** 201
- **Body enviado:**
```json
{
  "nombre": "Juan Pérez",
  "cargo": "Desarrollador Senior",
  "departamento": "Tecnología",
  "sueldo": 5000
}
```
- **Validaciones:**
  - El response debe contener `_id`
  - Todos los campos deben coincidir con los enviados
  - Debe incluir timestamps (`createdAt`, `updatedAt`)

#### ✅ Debe guardar el empleado en la base de datos
- **Objetivo:** Confirmar que el empleado se persiste en MongoDB
- **Método:** POST
- **Endpoint:** `/api/empleados`
- **Status esperado:** 201
- **Validaciones:**
  - La BD debe contener 1 empleado
  - El nombre del empleado debe coincidir

#### ✅ Debe retornar error 500 cuando faltan campos requeridos
- **Objetivo:** Validar que se manejan errores de validación
- **Método:** POST
- **Endpoint:** `/api/empleados`
- **Status esperado:** 500
- **Body enviado:** Solo `nombre` (faltan campos requeridos)
- **Validaciones:**
  - El response debe contener un mensaje de error

#### ✅ Debe crear múltiples empleados correctamente
- **Objetivo:** Verificar que se pueden crear varios empleados
- **Método:** POST (2 veces)
- **Endpoint:** `/api/empleados`
- **Status esperado:** 201
- **Validaciones:**
  - La BD debe contener 2 empleados

---

### 3. **GET /api/empleados/:id** (4 pruebas)

#### ✅ Debe retornar un empleado por su ID
- **Objetivo:** Verificar la obtención de un empleado específico
- **Método:** GET
- **Endpoint:** `/api/empleados/{id}`
- **Status esperado:** 200
- **Validaciones:**
  - El `_id` debe coincidir
  - Los campos nombre y cargo deben ser correctos

#### ✅ Debe retornar 404 cuando el empleado no existe
- **Objetivo:** Validar manejo de empleado inexistente
- **Método:** GET
- **Endpoint:** `/api/empleados/507f1f77bcf86cd799439011`
- **Status esperado:** 404
- **Validaciones:**
  - El mensaje debe ser "Empleado no encontrado"

#### ✅ Debe retornar 500 cuando el ID es inválido
- **Objetivo:** Validar manejo de ID con formato incorrecto
- **Método:** GET
- **Endpoint:** `/api/empleados/id-invalido-123`
- **Status esperado:** 500
- **Validaciones:**
  - Debe retornar un mensaje de error

#### ✅ Debe retornar el empleado con todos sus campos
- **Objetivo:** Confirmar que se retornan todos los campos del modelo
- **Método:** GET
- **Endpoint:** `/api/empleados/{id}`
- **Status esperado:** 200
- **Validaciones:**
  - Debe tener todos los campos: `_id`, `nombre`, `cargo`, `departamento`, `sueldo`, `createdAt`, `updatedAt`

---

### 4. **PUT /api/empleados/:id** (5 pruebas)

#### ✅ Debe actualizar un empleado existente
- **Objetivo:** Verificar la actualización completa de un empleado
- **Método:** PUT
- **Endpoint:** `/api/empleados/{id}`
- **Status esperado:** 200
- **Body enviado:**
```json
{
  "nombre": "Juan Pérez Actualizado",
  "cargo": "Arquitecto de Software",
  "departamento": "Tecnología",
  "sueldo": 6500
}
```
- **Validaciones:**
  - El `_id` no cambia
  - Los nuevos valores se reflejan en el response

#### ✅ Debe actualizar el empleado en la base de datos
- **Objetivo:** Confirmar que los cambios se persisten
- **Método:** PUT
- **Endpoint:** `/api/empleados/{id}`
- **Status esperado:** 200
- **Validaciones:**
  - Los valores actualizados deben estar en la BD

#### ✅ Debe retornar 404 cuando el empleado no existe
- **Objetivo:** Validar actualización de empleado inexistente
- **Método:** PUT
- **Endpoint:** `/api/empleados/507f1f77bcf86cd799439011`
- **Status esperado:** 404
- **Validaciones:**
  - El mensaje debe ser "Empleado no encontrado"

#### ✅ Debe actualizar solo los campos enviados
- **Objetivo:** Verificar actualización parcial (solo sueldo)
- **Método:** PUT
- **Endpoint:** `/api/empleados/{id}`
- **Status esperado:** 200
- **Body enviado:** `{ "sueldo": 8000 }`
- **Validaciones:**
  - El sueldo debe ser 8000
  - Los demás campos no deben cambiar

#### ✅ Debe actualizar el campo updatedAt
- **Objetivo:** Confirmar que el timestamp se actualiza
- **Método:** PUT
- **Endpoint:** `/api/empleados/{id}`
- **Status esperado:** 200
- **Validaciones:**
  - El `updatedAt` nuevo debe ser mayor que el anterior

---

### 5. **DELETE /api/empleados/:id** (5 pruebas)

#### ✅ Debe eliminar un empleado existente
- **Objetivo:** Verificar la eliminación exitosa
- **Método:** DELETE
- **Endpoint:** `/api/empleados/{id}`
- **Status esperado:** 200
- **Validaciones:**
  - El mensaje debe ser "Empleado eliminado"

#### ✅ Debe eliminar el empleado de la base de datos
- **Objetivo:** Confirmar que el empleado ya no existe en la BD
- **Método:** DELETE
- **Endpoint:** `/api/empleados/{id}`
- **Status esperado:** 200
- **Validaciones:**
  - Buscar el empleado debe retornar `null`

#### ✅ Debe retornar 404 cuando el empleado no existe
- **Objetivo:** Validar eliminación de empleado inexistente
- **Método:** DELETE
- **Endpoint:** `/api/empleados/507f1f77bcf86cd799439011`
- **Status esperado:** 404
- **Validaciones:**
  - El mensaje debe ser "Empleado no encontrado"

#### ✅ Debe retornar 500 cuando el ID es inválido
- **Objetivo:** Validar manejo de ID con formato incorrecto
- **Método:** DELETE
- **Endpoint:** `/api/empleados/id-invalido-123`
- **Status esperado:** 500
- **Validaciones:**
  - Debe retornar un mensaje de error

#### ✅ Debe reducir el conteo de empleados después de eliminar
- **Objetivo:** Verificar que el conteo disminuye correctamente
- **Método:** DELETE
- **Endpoint:** `/api/empleados/{id}`
- **Status esperado:** 200
- **Setup:** Crear 2 empleados
- **Validaciones:**
  - Inicialmente debe haber 2 empleados
  - Después de eliminar debe haber 1

---

### 6. **Flujo Completo CRUD** (1 prueba)

#### ✅ Debe ejecutar un flujo completo: crear, leer, actualizar y eliminar
- **Objetivo:** Prueba de integración del flujo completo
- **Pasos:**
  1. **Crear** un empleado (POST) → 201
  2. **Leer uno** por ID (GET) → 200
  3. **Leer todos** (GET) → 200, debe haber 1
  4. **Actualizar** (PUT) → 200
  5. **Eliminar** (DELETE) → 200
  6. **Verificar eliminación** (GET) → 404

---

## 🛠️ Herramientas de Prueba

### **Jest**
Framework de pruebas con las siguientes características:
- Assertions y matchers
- Mocking automático
- Cobertura de código
- Modo watch para desarrollo
- Paralelización de pruebas

### **Supertest**
Librería para pruebas HTTP:
- Simulación de requests sin levantar servidor
- Chainable assertions
- Soporte para async/await
- Testing de middleware

### **MongoDB Memory Server**
Base de datos en memoria para pruebas:
- No requiere MongoDB instalado
- Limpieza automática entre pruebas
- Rápida y aislada
- Ideal para CI/CD

---

## 📝 Ejemplo de Salida de Pruebas

```
PASS  __tests__/empleados.test.js
  Empleados REST API - CRUD Operations
    GET /api/empleados
      ✓ Debe retornar un array vacío cuando no hay empleados (340 ms)
      ✓ Debe retornar todos los empleados cuando existen (140 ms)
      ✓ Debe retornar empleados con todos los campos correctos (104 ms)
    POST /api/empleados
      ✓ Debe crear un nuevo empleado con datos válidos (246 ms)
      ✓ Debe guardar el empleado en la base de datos (89 ms)
      ✓ Debe retornar error 500 cuando faltan campos requeridos (42 ms)
      ✓ Debe crear múltiples empleados correctamente (115 ms)
    GET /api/empleados/:id
      ✓ Debe retornar un empleado por su ID (40 ms)
      ✓ Debe retornar 404 cuando el empleado no existe (28 ms)
      ✓ Debe retornar 500 cuando el ID es inválido (22 ms)
      ✓ Debe retornar el empleado con todos sus campos (121 ms)
    PUT /api/empleados/:id
      ✓ Debe actualizar un empleado existente (60 ms)
      ✓ Debe actualizar el empleado en la base de datos (24 ms)
      ✓ Debe retornar 404 cuando el empleado no existe (27 ms)
      ✓ Debe actualizar solo los campos enviados (20 ms)
      ✓ Debe actualizar el campo updatedAt (36 ms)
    DELETE /api/empleados/:id
      ✓ Debe eliminar un empleado existente (19 ms)
      ✓ Debe eliminar el empleado de la base de datos (20 ms)
      ✓ Debe retornar 404 cuando el empleado no existe (14 ms)
      ✓ Debe retornar 500 cuando el ID es inválido (37 ms)
      ✓ Debe reducir el conteo de empleados después de eliminar (45 ms)
    Flujo completo CRUD
      ✓ Debe ejecutar un flujo completo (96 ms)

Test Suites: 1 passed, 1 total
Tests:       22 passed, 22 total
Snapshots:   0 total
Time:        12.971 s
```

---

## 🎯 Buenas Prácticas Implementadas

1. **Aislamiento de pruebas:** Cada prueba es independiente
2. **Base de datos en memoria:** No afecta la BD de desarrollo
3. **Limpieza entre pruebas:** `afterEach` limpia la BD
4. **Nombres descriptivos:** Los nombres de las pruebas explican qué hacen
5. **Estructura AAA:** Arrange (preparar), Act (actuar), Assert (verificar)
6. **Datos de prueba realistas:** Empleados con datos válidos
7. **Casos de éxito y error:** Pruebas positivas y negativas
8. **Prueba de integración:** Flujo completo CRUD

---

## 🚦 Comandos Útiles

```bash
# Ejecutar todas las pruebas
npm test

# Modo watch (auto-rerun en cambios)
npm run test:watch

# Ver cobertura detallada
npm test -- --coverage

# Ejecutar solo pruebas de empleados
npx jest empleados

# Actualizar snapshots
npx jest -u

# Modo verbose (más detalles)
npx jest --verbose

# Limpiar caché de Jest
npx jest --clearCache
```

---

## 📌 Notas Importantes

- Las pruebas usan **MongoDB Memory Server**, no requieren MongoDB instalado
- La configuración está en `jest.config.js`
- Los helpers están en `__tests__/dbHandler.js`
- Todas las pruebas pasan antes de hacer commit (CI/CD)
- La cobertura mínima es 70% (configurable en `jest.config.js`)

---

## 🔗 Enlaces Útiles

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Supertest GitHub](https://github.com/visionmedia/supertest)
- [MongoDB Memory Server](https://github.com/nodkz/mongodb-memory-server)
- [Testing Best Practices](https://testingjavascript.com/)

---

**✅ Todas las 22 pruebas pasaron exitosamente!**
