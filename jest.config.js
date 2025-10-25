module.exports = {
  // Entorno de pruebas
  testEnvironment: 'node',

  // Patrones de archivos de prueba
  testMatch: [
    '**/__tests__/**/*.test.js',
    '**/__tests__/**/*.spec.js',
    '**/?(*.)+(spec|test).js'
  ],

  // Cobertura de código
  collectCoverageFrom: [
    'src/**/*.js',
    'app.js',
    '!src/graphql/**',
    '!src/**/*.test.js',
    '!src/**/*.spec.js',
    '!__tests__/**',
    '!node_modules/**'
  ],

  // Directorio de cobertura
  coverageDirectory: 'coverage',

  // Reportes de cobertura
  coverageReporters: [
    'text',
    'lcov',
    'html'
  ],

  // Umbral mínimo de cobertura
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },

  // Ignorar archivos/carpetas
  testPathIgnorePatterns: [
    '/node_modules/',
    '/coverage/'
  ],

  // Timeout para pruebas (útil para operaciones de BD)
  testTimeout: 10000,

  // Verbose output
  verbose: true,

  // Limpiar mocks automáticamente entre pruebas
  clearMocks: true,

  // Restaurar mocks automáticamente entre pruebas
  restoreMocks: true
};
