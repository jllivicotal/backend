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
  });

  /**
   * TESTS PARA GET /api/empleados/:id
   */
  describe('GET /api/empleados/:id', () => {

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
  });
});
