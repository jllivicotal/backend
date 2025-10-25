const request = require('supertest');
const app = require('../app');
const Empleado = require('../src/models/Empleado');
const dbHandler = require('./dbHandler');

/**
 * Pruebas para los endpoints REST de Empleados
 */
describe('Empleados REST API - CRUD Operations', () => {
  
  // Conectar a la BD en memoria antes de todas las pruebas
  beforeAll(async () => {
    await dbHandler.connect();
  });

  // Limpiar la BD después de cada prueba
  afterEach(async () => {
    await dbHandler.clearDatabase();
  });

  // Cerrar la conexión después de todas las pruebas
  afterAll(async () => {
    await dbHandler.closeDatabase();
  });

  // Datos de prueba
  const empleadoValido = {
    nombre: 'Juan Pérez',
    cargo: 'Desarrollador Senior',
    departamento: 'Tecnología',
    sueldo: 5000
  };

  const empleadoActualizado = {
    nombre: 'Juan Pérez Actualizado',
    cargo: 'Arquitecto de Software',
    departamento: 'Tecnología',
    sueldo: 6500
  };

  /**
   * TESTS PARA GET /api/empleados
   */
  describe('GET /api/empleados', () => {
    
    test('Debe retornar un array vacío cuando no hay empleados', async () => {
      const response = await request(app)
        .get('/api/empleados')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual([]);
      expect(Array.isArray(response.body)).toBe(true);
    });

    test('Debe retornar todos los empleados cuando existen', async () => {
      // Crear empleados de prueba
      await Empleado.create(empleadoValido);
      await Empleado.create({
        nombre: 'María García',
        cargo: 'Gerente de Proyectos',
        departamento: 'Administración',
        sueldo: 7000
      });

      const response = await request(app)
        .get('/api/empleados')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('nombre');
      expect(response.body[0]).toHaveProperty('cargo');
      expect(response.body[0]).toHaveProperty('departamento');
      expect(response.body[0]).toHaveProperty('sueldo');
      expect(response.body[0]).toHaveProperty('_id');
      expect(response.body[0]).toHaveProperty('createdAt');
      expect(response.body[0]).toHaveProperty('updatedAt');
    });

    test('Debe retornar empleados con todos los campos correctos', async () => {
      await Empleado.create(empleadoValido);

      const response = await request(app)
        .get('/api/empleados')
        .expect(200);

      expect(response.body[0].nombre).toBe(empleadoValido.nombre);
      expect(response.body[0].cargo).toBe(empleadoValido.cargo);
      expect(response.body[0].departamento).toBe(empleadoValido.departamento);
      expect(response.body[0].sueldo).toBe(empleadoValido.sueldo);
    });
  });

  /**
   * TESTS PARA POST /api/empleados
   */
  describe('POST /api/empleados', () => {
    
    test('Debe crear un nuevo empleado con datos válidos', async () => {
      const response = await request(app)
        .post('/api/empleados')
        .send(empleadoValido)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toHaveProperty('_id');
      expect(response.body.nombre).toBe(empleadoValido.nombre);
      expect(response.body.cargo).toBe(empleadoValido.cargo);
      expect(response.body.departamento).toBe(empleadoValido.departamento);
      expect(response.body.sueldo).toBe(empleadoValido.sueldo);
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
    });

    test('Debe guardar el empleado en la base de datos', async () => {
      await request(app)
        .post('/api/empleados')
        .send(empleadoValido)
        .expect(201);

      const empleados = await Empleado.find();
      expect(empleados).toHaveLength(1);
      expect(empleados[0].nombre).toBe(empleadoValido.nombre);
    });

    test('Debe retornar error 500 cuando faltan campos requeridos', async () => {
      const empleadoInvalido = {
        nombre: 'Test',
        // Falta cargo, departamento y sueldo
      };

      const response = await request(app)
        .post('/api/empleados')
        .send(empleadoInvalido)
        .expect('Content-Type', /json/)
        .expect(500);

      expect(response.body).toHaveProperty('message');
    });

    test('Debe crear múltiples empleados correctamente', async () => {
      await request(app)
        .post('/api/empleados')
        .send(empleadoValido)
        .expect(201);

      await request(app)
        .post('/api/empleados')
        .send({
          nombre: 'Ana López',
          cargo: 'Diseñadora UX',
          departamento: 'Diseño',
          sueldo: 4500
        })
        .expect(201);

      const empleados = await Empleado.find();
      expect(empleados).toHaveLength(2);
    });
  });

  /**
   * TESTS PARA GET /api/empleados/:id
   */
  describe('GET /api/empleados/:id', () => {
    
    test('Debe retornar un empleado por su ID', async () => {
      const empleado = await Empleado.create(empleadoValido);

      const response = await request(app)
        .get(`/api/empleados/${empleado._id}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body._id).toBe(empleado._id.toString());
      expect(response.body.nombre).toBe(empleadoValido.nombre);
      expect(response.body.cargo).toBe(empleadoValido.cargo);
    });

    test('Debe retornar 404 cuando el empleado no existe', async () => {
      const idInexistente = '507f1f77bcf86cd799439011';

      const response = await request(app)
        .get(`/api/empleados/${idInexistente}`)
        .expect('Content-Type', /json/)
        .expect(404);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Empleado no encontrado');
    });

    test('Debe retornar 500 cuando el ID es inválido', async () => {
      const idInvalido = 'id-invalido-123';

      const response = await request(app)
        .get(`/api/empleados/${idInvalido}`)
        .expect('Content-Type', /json/)
        .expect(500);

      expect(response.body).toHaveProperty('message');
    });

    test('Debe retornar el empleado con todos sus campos', async () => {
      const empleado = await Empleado.create(empleadoValido);

      const response = await request(app)
        .get(`/api/empleados/${empleado._id}`)
        .expect(200);

      expect(response.body).toHaveProperty('_id');
      expect(response.body).toHaveProperty('nombre');
      expect(response.body).toHaveProperty('cargo');
      expect(response.body).toHaveProperty('departamento');
      expect(response.body).toHaveProperty('sueldo');
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
    });
  });

  /**
   * TESTS PARA PUT /api/empleados/:id
   */
  describe('PUT /api/empleados/:id', () => {
    
    test('Debe actualizar un empleado existente', async () => {
      const empleado = await Empleado.create(empleadoValido);

      const response = await request(app)
        .put(`/api/empleados/${empleado._id}`)
        .send(empleadoActualizado)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body._id).toBe(empleado._id.toString());
      expect(response.body.nombre).toBe(empleadoActualizado.nombre);
      expect(response.body.cargo).toBe(empleadoActualizado.cargo);
      expect(response.body.sueldo).toBe(empleadoActualizado.sueldo);
    });

    test('Debe actualizar el empleado en la base de datos', async () => {
      const empleado = await Empleado.create(empleadoValido);

      await request(app)
        .put(`/api/empleados/${empleado._id}`)
        .send(empleadoActualizado)
        .expect(200);

      const empleadoActualizadoDB = await Empleado.findById(empleado._id);
      expect(empleadoActualizadoDB.nombre).toBe(empleadoActualizado.nombre);
      expect(empleadoActualizadoDB.cargo).toBe(empleadoActualizado.cargo);
    });

    test('Debe retornar 404 cuando el empleado no existe', async () => {
      const idInexistente = '507f1f77bcf86cd799439011';

      const response = await request(app)
        .put(`/api/empleados/${idInexistente}`)
        .send(empleadoActualizado)
        .expect('Content-Type', /json/)
        .expect(404);

      expect(response.body.message).toBe('Empleado no encontrado');
    });

    test('Debe actualizar solo los campos enviados', async () => {
      const empleado = await Empleado.create(empleadoValido);

      const actualizacionParcial = {
        sueldo: 8000
      };

      const response = await request(app)
        .put(`/api/empleados/${empleado._id}`)
        .send(actualizacionParcial)
        .expect(200);

      expect(response.body.sueldo).toBe(8000);
      expect(response.body.nombre).toBe(empleadoValido.nombre); // No cambia
      expect(response.body.cargo).toBe(empleadoValido.cargo); // No cambia
    });

    test('Debe actualizar el campo updatedAt', async () => {
      const empleado = await Empleado.create(empleadoValido);
      const updatedAtAnterior = empleado.updatedAt;

      // Esperar un poco para asegurar que el timestamp cambie
      await new Promise(resolve => setTimeout(resolve, 10));

      const response = await request(app)
        .put(`/api/empleados/${empleado._id}`)
        .send(empleadoActualizado)
        .expect(200);

      const updatedAtNuevo = new Date(response.body.updatedAt);
      expect(updatedAtNuevo.getTime()).toBeGreaterThan(updatedAtAnterior.getTime());
    });
  });

  /**
   * TESTS PARA DELETE /api/empleados/:id
   */
  describe('DELETE /api/empleados/:id', () => {
    
    test('Debe eliminar un empleado existente', async () => {
      const empleado = await Empleado.create(empleadoValido);

      const response = await request(app)
        .delete(`/api/empleados/${empleado._id}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Empleado eliminado');
    });

    test('Debe eliminar el empleado de la base de datos', async () => {
      const empleado = await Empleado.create(empleadoValido);

      await request(app)
        .delete(`/api/empleados/${empleado._id}`)
        .expect(200);

      const empleadoEliminado = await Empleado.findById(empleado._id);
      expect(empleadoEliminado).toBeNull();
    });

    test('Debe retornar 404 cuando el empleado no existe', async () => {
      const idInexistente = '507f1f77bcf86cd799439011';

      const response = await request(app)
        .delete(`/api/empleados/${idInexistente}`)
        .expect('Content-Type', /json/)
        .expect(404);

      expect(response.body.message).toBe('Empleado no encontrado');
    });

    test('Debe retornar 500 cuando el ID es inválido', async () => {
      const idInvalido = 'id-invalido-123';

      const response = await request(app)
        .delete(`/api/empleados/${idInvalido}`)
        .expect('Content-Type', /json/)
        .expect(500);

      expect(response.body).toHaveProperty('message');
    });

    test('Debe reducir el conteo de empleados después de eliminar', async () => {
      await Empleado.create(empleadoValido);
      const empleado2 = await Empleado.create({
        nombre: 'María García',
        cargo: 'Gerente',
        departamento: 'Ventas',
        sueldo: 6000
      });

      let empleados = await Empleado.find();
      expect(empleados).toHaveLength(2);

      await request(app)
        .delete(`/api/empleados/${empleado2._id}`)
        .expect(200);

      empleados = await Empleado.find();
      expect(empleados).toHaveLength(1);
    });
  });

  /**
   * TESTS DE INTEGRACIÓN - Flujo completo CRUD
   */
  describe('Flujo completo CRUD', () => {
    
    test('Debe ejecutar un flujo completo: crear, leer, actualizar y eliminar', async () => {
      // 1. Crear
      const createResponse = await request(app)
        .post('/api/empleados')
        .send(empleadoValido)
        .expect(201);

      const empleadoId = createResponse.body._id;
      expect(empleadoId).toBeDefined();

      // 2. Leer uno
      const getOneResponse = await request(app)
        .get(`/api/empleados/${empleadoId}`)
        .expect(200);

      expect(getOneResponse.body.nombre).toBe(empleadoValido.nombre);

      // 3. Leer todos
      const getAllResponse = await request(app)
        .get('/api/empleados')
        .expect(200);

      expect(getAllResponse.body).toHaveLength(1);

      // 4. Actualizar
      const updateResponse = await request(app)
        .put(`/api/empleados/${empleadoId}`)
        .send(empleadoActualizado)
        .expect(200);

      expect(updateResponse.body.nombre).toBe(empleadoActualizado.nombre);

      // 5. Eliminar
      await request(app)
        .delete(`/api/empleados/${empleadoId}`)
        .expect(200);

      // 6. Verificar eliminación
      await request(app)
        .get(`/api/empleados/${empleadoId}`)
        .expect(404);
    });
  });
});
