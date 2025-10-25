# 🚀 Guía Rápida - Pruebas Unitarias

## ⚡ Comandos Esenciales

```bash
# Ejecutar todas las pruebas
npm test

# Modo desarrollo (auto-rerun)
npm run test:watch

# Ver cobertura en HTML
start coverage/lcov-report/index.html
```

## ✅ Estado Actual

```
✅ 22/22 pruebas pasando
✅ 96.61% cobertura (objetivo: 70%)
✅ 0 vulnerabilidades
✅ Base de datos en memoria configurada
```

## 📊 Resultados

| Métrica    | Alcanzado | Objetivo |
|------------|-----------|----------|
| Statements | **96.61%** | 70% ✅ |
| Branches   | **100%**   | 70% ✅ |
| Functions  | **100%**   | 70% ✅ |
| Lines      | **96.42%** | 70% ✅ |

## 🧪 Pruebas Implementadas

### REST API Endpoints (22 pruebas)
- ✅ GET /api/empleados (3)
- ✅ POST /api/empleados (4)
- ✅ GET /api/empleados/:id (4)
- ✅ PUT /api/empleados/:id (5)
- ✅ DELETE /api/empleados/:id (5)
- ✅ Flujo completo CRUD (1)

## 📁 Archivos Clave

```
__tests__/
├── empleados.test.js          # 22 pruebas del CRUD
├── ejemplos-extension.test.js # Ejemplos para extender
└── dbHandler.js               # Helper de BD en memoria

TESTING_README.md              # Documentación completa
TESTING_SUMMARY.md             # Resumen ejecutivo
TESTING_QUICKSTART.md          # Esta guía
jest.config.js                 # Configuración Jest
```

## 🎯 Qué Cubre

✅ Códigos HTTP (200, 201, 404, 500)  
✅ Validación de campos  
✅ Persistencia en BD  
✅ Timestamps automáticos  
✅ Casos de error  
✅ Flujo end-to-end  

## 📖 Documentación

- **TESTING_README.md** → Documentación detallada de cada prueba
- **TESTING_SUMMARY.md** → Resumen ejecutivo y métricas
- **ejemplos-extension.test.js** → Ejemplos de cómo agregar más pruebas

## 🛠️ Tecnologías

- Jest v30.2.0
- Supertest v7.1.4
- MongoDB Memory Server v9.x
- TypeScript Types incluidos

## 💡 Tips

1. Usa `test.only()` para ejecutar solo una prueba
2. Usa `test.skip()` para omitir temporalmente
3. Los ejemplos en `ejemplos-extension.test.js` están skipeados
4. La BD se limpia automáticamente entre pruebas
5. No necesitas MongoDB instalado

## 🔗 Enlaces

- [Jest Docs](https://jestjs.io/)
- [Supertest GitHub](https://github.com/visionmedia/supertest)

---

**¿Problemas?** Revisa `TESTING_README.md` para más detalles.
