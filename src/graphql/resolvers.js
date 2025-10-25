const Empleado = require('../models/Empleado');

const resolvers = {
  Query: {
    /**
     * Obtener todos los empleados
     */
    empleados: async () => {
      try {
        const empleados = await Empleado.find().sort({ createdAt: -1 });
        return empleados;
      } catch (error) {
        throw new Error(`Error al obtener empleados: ${error.message}`);
      }
    },

    /**
     * Obtener un empleado por ID
     */
    empleado: async (_, { id }) => {
      try {
        const empleado = await Empleado.findById(id);
        if (!empleado) {
          throw new Error('Empleado no encontrado');
        }
        return empleado;
      } catch (error) {
        throw new Error(`Error al obtener empleado: ${error.message}`);
      }
    },

    /**
     * Buscar empleados con filtros
     */
    buscarEmpleados: async (_, { filtros }) => {
      try {
        const query = {};

        if (filtros) {
          if (filtros.nombre) {
            query.nombre = { $regex: filtros.nombre, $options: 'i' };
          }
          if (filtros.cargo) {
            query.cargo = { $regex: filtros.cargo, $options: 'i' };
          }
          if (filtros.departamento) {
            query.departamento = { $regex: filtros.departamento, $options: 'i' };
          }
          if (filtros.sueldoMin !== undefined || filtros.sueldoMax !== undefined) {
            query.sueldo = {};
            if (filtros.sueldoMin !== undefined) {
              query.sueldo.$gte = filtros.sueldoMin;
            }
            if (filtros.sueldoMax !== undefined) {
              query.sueldo.$lte = filtros.sueldoMax;
            }
          }
        }

        const empleados = await Empleado.find(query).sort({ createdAt: -1 });
        return empleados;
      } catch (error) {
        throw new Error(`Error al buscar empleados: ${error.message}`);
      }
    },

    /**
     * Obtener empleados por departamento
     */
    empleadosPorDepartamento: async (_, { departamento }) => {
      try {
        const empleados = await Empleado.find({
          departamento: { $regex: departamento, $options: 'i' }
        }).sort({ nombre: 1 });
        return empleados;
      } catch (error) {
        throw new Error(`Error al obtener empleados por departamento: ${error.message}`);
      }
    },

    /**
     * Obtener empleados por rango salarial
     */
    empleadosPorSueldo: async (_, { min, max }) => {
      try {
        const empleados = await Empleado.find({
          sueldo: { $gte: min, $lte: max }
        }).sort({ sueldo: -1 });
        return empleados;
      } catch (error) {
        throw new Error(`Error al obtener empleados por sueldo: ${error.message}`);
      }
    },

    /**
     * Obtener estadísticas de empleados
     */
    estadisticasEmpleados: async () => {
      try {
        const empleados = await Empleado.find();
        
        if (empleados.length === 0) {
          return {
            total: 0,
            sueldoPromedio: 0,
            sueldoMinimo: 0,
            sueldoMaximo: 0,
            sueldoTotal: 0
          };
        }

        const sueldos = empleados.map(e => e.sueldo);
        const sueldoTotal = sueldos.reduce((acc, sueldo) => acc + sueldo, 0);
        const sueldoPromedio = sueldoTotal / empleados.length;
        const sueldoMinimo = Math.min(...sueldos);
        const sueldoMaximo = Math.max(...sueldos);

        return {
          total: empleados.length,
          sueldoPromedio,
          sueldoMinimo,
          sueldoMaximo,
          sueldoTotal
        };
      } catch (error) {
        throw new Error(`Error al calcular estadísticas: ${error.message}`);
      }
    },

    /**
     * Obtener lista de departamentos únicos
     */
    departamentos: async () => {
      try {
        const departamentos = await Empleado.distinct('departamento');
        return departamentos.sort();
      } catch (error) {
        throw new Error(`Error al obtener departamentos: ${error.message}`);
      }
    },

    /**
     * Obtener lista de cargos únicos
     */
    cargos: async () => {
      try {
        const cargos = await Empleado.distinct('cargo');
        return cargos.sort();
      } catch (error) {
        throw new Error(`Error al obtener cargos: ${error.message}`);
      }
    }
  },

  Mutation: {
    /**
     * Crear un nuevo empleado
     */
    crearEmpleado: async (_, { input }) => {
      try {
        const nuevoEmpleado = new Empleado(input);
        await nuevoEmpleado.save();
        return nuevoEmpleado;
      } catch (error) {
        throw new Error(`Error al crear empleado: ${error.message}`);
      }
    },

    /**
     * Actualizar un empleado existente
     */
    actualizarEmpleado: async (_, { id, input }) => {
      try {
        const empleado = await Empleado.findByIdAndUpdate(
          id,
          input,
          { new: true, runValidators: true }
        );
        
        if (!empleado) {
          throw new Error('Empleado no encontrado');
        }
        
        return empleado;
      } catch (error) {
        throw new Error(`Error al actualizar empleado: ${error.message}`);
      }
    },

    /**
     * Eliminar un empleado
     */
    eliminarEmpleado: async (_, { id }) => {
      try {
        const empleado = await Empleado.findByIdAndDelete(id);
        
        if (!empleado) {
          throw new Error('Empleado no encontrado');
        }
        
        return {
          message: `Empleado ${empleado.nombre} eliminado correctamente`,
          success: true
        };
      } catch (error) {
        throw new Error(`Error al eliminar empleado: ${error.message}`);
      }
    },

    /**
     * Crear múltiples empleados
     */
    crearEmpleados: async (_, { input }) => {
      try {
        const empleados = await Empleado.insertMany(input);
        return empleados;
      } catch (error) {
        throw new Error(`Error al crear empleados: ${error.message}`);
      }
    },

    /**
     * Eliminar todos los empleados de un departamento
     */
    eliminarEmpleadosPorDepartamento: async (_, { departamento }) => {
      try {
        const resultado = await Empleado.deleteMany({
          departamento: { $regex: departamento, $options: 'i' }
        });
        
        return {
          message: `${resultado.deletedCount} empleado(s) eliminado(s) del departamento ${departamento}`,
          success: true
        };
      } catch (error) {
        throw new Error(`Error al eliminar empleados: ${error.message}`);
      }
    },

    /**
     * Aumentar sueldo por departamento
     */
    aumentarSueldoPorDepartamento: async (_, { departamento, porcentaje }) => {
      try {
        const empleados = await Empleado.find({
          departamento: { $regex: departamento, $options: 'i' }
        });

        if (empleados.length === 0) {
          throw new Error(`No se encontraron empleados en el departamento ${departamento}`);
        }

        const aumentados = [];
        
        for (const empleado of empleados) {
          empleado.sueldo = empleado.sueldo * (1 + porcentaje / 100);
          await empleado.save();
          aumentados.push(empleado);
        }

        return aumentados;
      } catch (error) {
        throw new Error(`Error al aumentar sueldos: ${error.message}`);
      }
    }
  },

  // Field resolvers personalizados
  Empleado: {
    // Asegurar que el ID se mapee correctamente desde _id de MongoDB
    id: (parent) => parent._id.toString(),
    createdAt: (parent) => parent.createdAt ? parent.createdAt.toISOString() : null,
    updatedAt: (parent) => parent.updatedAt ? parent.updatedAt.toISOString() : null
  }
};

module.exports = resolvers;
