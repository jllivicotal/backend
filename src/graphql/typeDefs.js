const { gql } = require('graphql-tag');

const typeDefs = gql`
  """
  Representa un empleado en el sistema
  """
  type Empleado {
    """
    ID único del empleado (MongoDB ObjectId)
    """
    id: ID!
    
    """
    Nombre completo del empleado
    """
    nombre: String!
    
    """
    Cargo o posición del empleado en la empresa
    """
    cargo: String!
    
    """
    Departamento al que pertenece el empleado
    """
    departamento: String!
    
    """
    Salario del empleado
    """
    sueldo: Float!
    
    """
    Fecha de creación del registro
    """
    createdAt: String
    
    """
    Fecha de última actualización del registro
    """
    updatedAt: String
  }

  """
  Datos necesarios para crear un nuevo empleado
  """
  input EmpleadoInput {
    """
    Nombre completo del empleado
    """
    nombre: String!
    
    """
    Cargo o posición del empleado
    """
    cargo: String!
    
    """
    Departamento al que pertenece
    """
    departamento: String!
    
    """
    Salario del empleado
    """
    sueldo: Float!
  }

  """
  Datos para actualizar un empleado existente (todos opcionales)
  """
  input EmpleadoUpdateInput {
    """
    Nuevo nombre del empleado
    """
    nombre: String
    
    """
    Nuevo cargo del empleado
    """
    cargo: String
    
    """
    Nuevo departamento del empleado
    """
    departamento: String
    
    """
    Nuevo salario del empleado
    """
    sueldo: Float
  }

  """
  Filtros para búsqueda de empleados
  """
  input EmpleadoFilterInput {
    """
    Buscar por nombre (búsqueda parcial)
    """
    nombre: String
    
    """
    Filtrar por cargo
    """
    cargo: String
    
    """
    Filtrar por departamento
    """
    departamento: String
    
    """
    Salario mínimo
    """
    sueldoMin: Float
    
    """
    Salario máximo
    """
    sueldoMax: Float
  }

  """
  Estadísticas de empleados
  """
  type EstadisticasEmpleados {
    """
    Total de empleados
    """
    total: Int!
    
    """
    Salario promedio
    """
    sueldoPromedio: Float!
    
    """
    Salario mínimo
    """
    sueldoMinimo: Float!
    
    """
    Salario máximo
    """
    sueldoMaximo: Float!
    
    """
    Total de sueldos
    """
    sueldoTotal: Float!
  }

  """
  Respuesta de eliminación
  """
  type DeleteResponse {
    """
    Mensaje de confirmación
    """
    message: String!
    
    """
    Indica si la operación fue exitosa
    """
    success: Boolean!
  }

  """
  Consultas disponibles
  """
  type Query {
    """
    Obtener todos los empleados
    """
    empleados: [Empleado!]!
    
    """
    Obtener un empleado por su ID
    """
    empleado(id: ID!): Empleado
    
    """
    Buscar empleados con filtros
    """
    buscarEmpleados(filtros: EmpleadoFilterInput): [Empleado!]!
    
    """
    Obtener empleados por departamento
    """
    empleadosPorDepartamento(departamento: String!): [Empleado!]!
    
    """
    Obtener empleados por rango salarial
    """
    empleadosPorSueldo(min: Float!, max: Float!): [Empleado!]!
    
    """
    Obtener estadísticas generales de empleados
    """
    estadisticasEmpleados: EstadisticasEmpleados!
    
    """
    Obtener lista de departamentos únicos
    """
    departamentos: [String!]!
    
    """
    Obtener lista de cargos únicos
    """
    cargos: [String!]!
  }

  """
  Mutaciones disponibles
  """
  type Mutation {
    """
    Crear un nuevo empleado
    """
    crearEmpleado(input: EmpleadoInput!): Empleado!
    
    """
    Actualizar un empleado existente
    """
    actualizarEmpleado(id: ID!, input: EmpleadoUpdateInput!): Empleado
    
    """
    Eliminar un empleado
    """
    eliminarEmpleado(id: ID!): DeleteResponse!
    
    """
    Crear múltiples empleados
    """
    crearEmpleados(input: [EmpleadoInput!]!): [Empleado!]!
    
    """
    Eliminar todos los empleados de un departamento
    """
    eliminarEmpleadosPorDepartamento(departamento: String!): DeleteResponse!
    
    """
    Aumentar sueldo a todos los empleados de un departamento
    """
    aumentarSueldoPorDepartamento(departamento: String!, porcentaje: Float!): [Empleado!]!
  }
`;

module.exports = typeDefs;
