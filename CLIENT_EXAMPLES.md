# Ejemplos de Consumo de la API GraphQL

## 📋 Tabla de Contenidos
- [JavaScript/TypeScript](#javascripttypescript)
- [Python](#python)
- [cURL](#curl)
- [Postman](#postman)
- [React](#react)
- [Vue.js](#vuejs)
- [Angular](#angular)

---

## JavaScript/TypeScript

### Usando Fetch API

#### Query básica
```javascript
async function obtenerEmpleados() {
  const query = `
    query {
      empleados {
        id
        nombre
        cargo
        departamento
        sueldo
      }
    }
  `;

  const response = await fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query })
  });

  const { data } = await response.json();
  console.log(data.empleados);
  return data.empleados;
}

obtenerEmpleados();
```

#### Mutation con variables
```javascript
async function crearEmpleado(empleadoData) {
  const mutation = `
    mutation CrearEmpleado($input: EmpleadoInput!) {
      crearEmpleado(input: $input) {
        id
        nombre
        cargo
        departamento
        sueldo
      }
    }
  `;

  const variables = {
    input: empleadoData
  };

  const response = await fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: mutation, variables })
  });

  const { data } = await response.json();
  return data.crearEmpleado;
}

// Uso
crearEmpleado({
  nombre: "Juan Pérez",
  cargo: "Desarrollador Senior",
  departamento: "Tecnología",
  sueldo: 5000
}).then(empleado => console.log('Empleado creado:', empleado));
```

#### Búsqueda con filtros
```javascript
async function buscarEmpleados(filtros) {
  const query = `
    query BuscarEmpleados($filtros: EmpleadoFilterInput) {
      buscarEmpleados(filtros: $filtros) {
        id
        nombre
        cargo
        sueldo
      }
    }
  `;

  const response = await fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      query, 
      variables: { filtros } 
    })
  });

  const { data } = await response.json();
  return data.buscarEmpleados;
}

// Buscar empleados de tecnología con sueldo > 4000
buscarEmpleados({
  departamento: "Tecnología",
  sueldoMin: 4000
});
```

### Usando Axios
```javascript
const axios = require('axios');

async function obtenerEstadisticas() {
  const query = `
    query {
      estadisticasEmpleados {
        total
        sueldoPromedio
        sueldoMinimo
        sueldoMaximo
      }
    }
  `;

  const response = await axios.post('http://localhost:3000/graphql', {
    query
  });

  return response.data.data.estadisticasEmpleados;
}
```

---

## Python

### Usando requests
```python
import requests
import json

# Query básica
def obtener_empleados():
    query = """
    query {
      empleados {
        id
        nombre
        cargo
        departamento
        sueldo
      }
    }
    """
    
    response = requests.post(
        'http://localhost:3000/graphql',
        json={'query': query}
    )
    
    data = response.json()
    return data['data']['empleados']

# Mutation con variables
def crear_empleado(nombre, cargo, departamento, sueldo):
    mutation = """
    mutation CrearEmpleado($input: EmpleadoInput!) {
      crearEmpleado(input: $input) {
        id
        nombre
        cargo
        sueldo
      }
    }
    """
    
    variables = {
        'input': {
            'nombre': nombre,
            'cargo': cargo,
            'departamento': departamento,
            'sueldo': sueldo
        }
    }
    
    response = requests.post(
        'http://localhost:3000/graphql',
        json={'query': mutation, 'variables': variables}
    )
    
    return response.json()['data']['crearEmpleado']

# Uso
empleados = obtener_empleados()
print(f"Total de empleados: {len(empleados)}")

nuevo = crear_empleado(
    "María García",
    "Data Scientist",
    "Tecnología",
    6000
)
print(f"Empleado creado: {nuevo['nombre']}")
```

### Usando gql (graphql-request)
```python
from gql import gql, Client
from gql.transport.requests import RequestsHTTPTransport

# Configurar cliente
transport = RequestsHTTPTransport(
    url='http://localhost:3000/graphql'
)
client = Client(transport=transport, fetch_schema_from_transport=True)

# Query
query = gql("""
    query {
      empleados {
        id
        nombre
        cargo
        sueldo
      }
    }
""")

result = client.execute(query)
print(result['empleados'])

# Mutation
mutation = gql("""
    mutation CrearEmpleado($input: EmpleadoInput!) {
      crearEmpleado(input: $input) {
        id
        nombre
      }
    }
""")

variables = {
    'input': {
        'nombre': 'Pedro Sánchez',
        'cargo': 'DevOps',
        'departamento': 'Tecnología',
        'sueldo': 5500
    }
}

result = client.execute(mutation, variable_values=variables)
print(result['crearEmpleado'])
```

---

## cURL

### Query simple
```bash
curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ empleados { id nombre cargo sueldo } }"}'
```

### Query con formato
```bash
curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { empleados { id nombre cargo departamento sueldo } }"
  }' | json_pp
```

### Mutation con variables
```bash
curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation($input: EmpleadoInput!) { crearEmpleado(input: $input) { id nombre cargo } }",
    "variables": {
      "input": {
        "nombre": "Juan Pérez",
        "cargo": "Desarrollador",
        "departamento": "Tecnología",
        "sueldo": 5000
      }
    }
  }'
```

### Búsqueda con filtros
```bash
curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query($filtros: EmpleadoFilterInput) { buscarEmpleados(filtros: $filtros) { id nombre cargo sueldo } }",
    "variables": {
      "filtros": {
        "departamento": "Tecnología",
        "sueldoMin": 4000
      }
    }
  }'
```

---

## Postman

### Configuración
1. Crear nueva request POST
2. URL: `http://localhost:3000/graphql`
3. Headers: `Content-Type: application/json`
4. Body (raw, JSON):

### Query
```json
{
  "query": "query { empleados { id nombre cargo sueldo } }"
}
```

### Mutation con variables
```json
{
  "query": "mutation($input: EmpleadoInput!) { crearEmpleado(input: $input) { id nombre cargo } }",
  "variables": {
    "input": {
      "nombre": "Ana López",
      "cargo": "Frontend Developer",
      "departamento": "Tecnología",
      "sueldo": 4800
    }
  }
}
```

---

## React

### Con Apollo Client

#### Instalación
```bash
npm install @apollo/client graphql
```

#### Configuración
```javascript
// src/apollo/client.js
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
});

export default client;
```

#### App.js
```javascript
import { ApolloProvider } from '@apollo/client';
import client from './apollo/client';
import EmpleadosList from './components/EmpleadosList';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <EmpleadosList />
      </div>
    </ApolloProvider>
  );
}

export default App;
```

#### Componente con Query
```javascript
// src/components/EmpleadosList.jsx
import { useQuery, gql } from '@apollo/client';

const GET_EMPLEADOS = gql`
  query {
    empleados {
      id
      nombre
      cargo
      departamento
      sueldo
    }
  }
`;

function EmpleadosList() {
  const { loading, error, data } = useQuery(GET_EMPLEADOS);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Lista de Empleados</h2>
      <ul>
        {data.empleados.map(empleado => (
          <li key={empleado.id}>
            {empleado.nombre} - {empleado.cargo} - ${empleado.sueldo}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmpleadosList;
```

#### Componente con Mutation
```javascript
// src/components/CrearEmpleado.jsx
import { useMutation, gql } from '@apollo/client';
import { useState } from 'react';

const CREAR_EMPLEADO = gql`
  mutation CrearEmpleado($input: EmpleadoInput!) {
    crearEmpleado(input: $input) {
      id
      nombre
      cargo
      sueldo
    }
  }
`;

const GET_EMPLEADOS = gql`
  query {
    empleados {
      id
      nombre
      cargo
      departamento
      sueldo
    }
  }
`;

function CrearEmpleado() {
  const [formData, setFormData] = useState({
    nombre: '',
    cargo: '',
    departamento: '',
    sueldo: 0
  });

  const [crearEmpleado, { loading, error }] = useMutation(CREAR_EMPLEADO, {
    refetchQueries: [{ query: GET_EMPLEADOS }]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearEmpleado({
        variables: {
          input: {
            ...formData,
            sueldo: parseFloat(formData.sueldo)
          }
        }
      });
      alert('Empleado creado!');
      setFormData({ nombre: '', cargo: '', departamento: '', sueldo: 0 });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
      />
      <input
        type="text"
        placeholder="Cargo"
        value={formData.cargo}
        onChange={(e) => setFormData({...formData, cargo: e.target.value})}
      />
      <input
        type="text"
        placeholder="Departamento"
        value={formData.departamento}
        onChange={(e) => setFormData({...formData, departamento: e.target.value})}
      />
      <input
        type="number"
        placeholder="Sueldo"
        value={formData.sueldo}
        onChange={(e) => setFormData({...formData, sueldo: e.target.value})}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Creando...' : 'Crear Empleado'}
      </button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
}

export default CrearEmpleado;
```

---

## Vue.js

### Con Vue Apollo

#### Instalación
```bash
npm install @apollo/client graphql @vue/apollo-composable
```

#### Configuración
```javascript
// src/apollo.js
import { ApolloClient, InMemoryCache } from '@apollo/client/core';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
});

export default apolloClient;
```

#### main.js
```javascript
import { createApp } from 'vue';
import { DefaultApolloClient } from '@vue/apollo-composable';
import App from './App.vue';
import apolloClient from './apollo';

const app = createApp(App);
app.provide(DefaultApolloClient, apolloClient);
app.mount('#app');
```

#### Componente con Query
```vue
<!-- src/components/EmpleadosList.vue -->
<template>
  <div>
    <h2>Lista de Empleados</h2>
    <div v-if="loading">Cargando...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <ul v-else>
      <li v-for="empleado in empleados" :key="empleado.id">
        {{ empleado.nombre }} - {{ empleado.cargo }} - ${{ empleado.sueldo }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { computed } from 'vue';

const GET_EMPLEADOS = gql`
  query {
    empleados {
      id
      nombre
      cargo
      departamento
      sueldo
    }
  }
`;

const { result, loading, error } = useQuery(GET_EMPLEADOS);
const empleados = computed(() => result.value?.empleados ?? []);
</script>
```

---

## Angular

### Con Apollo Angular

#### Instalación
```bash
ng add apollo-angular
```

#### Configuración
```typescript
// src/app/graphql.module.ts
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({ uri: 'http://localhost:3000/graphql' }),
    cache: new InMemoryCache()
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink]
    }
  ]
})
export class GraphQLModule {}
```

#### Service
```typescript
// src/app/services/empleados.service.ts
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const GET_EMPLEADOS = gql`
  query {
    empleados {
      id
      nombre
      cargo
      departamento
      sueldo
    }
  }
`;

const CREAR_EMPLEADO = gql`
  mutation CrearEmpleado($input: EmpleadoInput!) {
    crearEmpleado(input: $input) {
      id
      nombre
      cargo
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  constructor(private apollo: Apollo) {}

  getEmpleados(): Observable<any[]> {
    return this.apollo
      .watchQuery({ query: GET_EMPLEADOS })
      .valueChanges
      .pipe(map((result: any) => result.data.empleados));
  }

  crearEmpleado(input: any): Observable<any> {
    return this.apollo
      .mutate({
        mutation: CREAR_EMPLEADO,
        variables: { input }
      })
      .pipe(map((result: any) => result.data.crearEmpleado));
  }
}
```

#### Componente
```typescript
// src/app/components/empleados/empleados.component.ts
import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';

@Component({
  selector: 'app-empleados',
  template: `
    <div>
      <h2>Lista de Empleados</h2>
      <ul>
        <li *ngFor="let empleado of empleados">
          {{ empleado.nombre }} - {{ empleado.cargo }} - ${{ empleado.sueldo }}
        </li>
      </ul>
    </div>
  `
})
export class EmpleadosComponent implements OnInit {
  empleados: any[] = [];

  constructor(private empleadosService: EmpleadosService) {}

  ngOnInit() {
    this.empleadosService.getEmpleados().subscribe(
      data => this.empleados = data
    );
  }
}
```

---

## 🎯 Tips y Mejores Prácticas

1. **Manejo de errores**: Siempre verifica `data` y `errors` en la respuesta
2. **Variables**: Usa variables en lugar de interpolar strings en las queries
3. **Fragmentos**: Reutiliza fragmentos para campos comunes
4. **Caché**: Configura correctamente el caché en el cliente
5. **Paginación**: Implementa paginación para grandes listas
6. **Optimistic UI**: Actualiza la UI optimistamente antes de la respuesta

---

## 📚 Recursos Adicionales

- [GraphQL.org](https://graphql.org/)
- [Apollo Client Docs](https://www.apollographql.com/docs/react/)
- [GraphQL Playground](https://github.com/graphql/graphql-playground)
