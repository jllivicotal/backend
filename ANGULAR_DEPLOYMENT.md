# 📦 Configuración para Servir SPA de Angular

## ✅ Configuración Completada

El servidor Express está configurado para servir contenido estático y manejar rutas de una SPA (Single Page Application) de Angular.

---

## 🏗️ Arquitectura de Rutas

### **Rutas de la API (Backend)**
- Todas las rutas que comienzan con `/api/*` son manejadas por Express
- Ejemplos:
  - `GET /api/empleados` → REST API
  - `POST /api/empleados` → REST API
  - `PUT /api/empleados/:id` → REST API

### **Rutas del Frontend (Angular)**
- Todas las demás rutas devuelven `index.html` para que Angular maneje el routing
- Ejemplos:
  - `/` → Angular SPA
  - `/empleados` → Angular routing
  - `/dashboard` → Angular routing
  - `/login` → Angular routing

---

## 📁 Estructura de Carpetas

```
backend/
├── public/                    ← Contenido estático de Angular
│   ├── index.html            ← Entry point de Angular
│   ├── main.js               ← Bundle principal
│   ├── polyfills.js          ← Polyfills
│   ├── runtime.js            ← Runtime
│   ├── styles.css            ← Estilos compilados
│   └── assets/               ← Recursos estáticos (imágenes, etc.)
│       ├── images/
│       └── ...
├── src/
│   ├── controllers/
│   ├── models/
│   └── routes/
├── app.js                     ← Configuración Express
└── index.js                   ← Entry point del servidor
```

---

## 🚀 Pasos para Desplegar tu App Angular

### **1. Construir tu Proyecto Angular**

Desde la carpeta de tu proyecto Angular:

```bash
# Build de producción
ng build --configuration production

# O build de desarrollo
ng build
```

Esto generará una carpeta `dist/nombre-de-tu-app/` con todos los archivos compilados.

### **2. Copiar Archivos al Backend**

#### **Opción A: Copiar manualmente**

```bash
# Windows (PowerShell)
Copy-Item -Path "ruta/a/tu/angular-app/dist/nombre-app/*" -Destination "backend/public/" -Recurse -Force

# Linux/Mac
cp -r ruta/a/tu/angular-app/dist/nombre-app/* backend/public/
```

#### **Opción B: Configurar outputPath en angular.json**

Edita `angular.json` de tu proyecto Angular:

```json
{
  "projects": {
    "tu-app": {
      "architect": {
        "build": {
          "options": {
            "outputPath": "../backend/public",
            "baseHref": "/"
          }
        }
      }
    }
  }
}
```

Ahora al hacer `ng build`, los archivos se generarán directamente en `backend/public/`.

### **3. Iniciar el Servidor**

```bash
cd backend
npm run dev
```

### **4. Acceder a la Aplicación**

Abre tu navegador en:
- **Frontend Angular**: `http://localhost:3000`
- **REST API**: `http://localhost:3000/api/empleados`
- **GraphQL**: `http://localhost:4000/graphql`

---

## ⚙️ Configuración de Angular

### **1. angular.json**

```json
{
  "projects": {
    "tu-app": {
      "architect": {
        "build": {
          "options": {
            "outputPath": "dist/tu-app",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": ["zone.js"],
            "tsConfig": "tsconfig.app.json",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.css"
            ],
            "scripts": [],
            "baseHref": "/"
          }
        }
      }
    }
  }
}
```

### **2. Environments (src/environments/)**

**environment.ts** (desarrollo):
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  graphqlUrl: 'http://localhost:4000/graphql'
};
```

**environment.production.ts** (producción):
```typescript
export const environment = {
  production: true,
  apiUrl: '/api',  // Ruta relativa en producción
  graphqlUrl: 'http://tu-servidor.com:4000/graphql'
};
```

### **3. Servicio HTTP en Angular**

**empleados.service.ts:**
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  private apiUrl = `${environment.apiUrl}/empleados`;

  constructor(private http: HttpClient) { }

  getEmpleados(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getEmpleado(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createEmpleado(empleado: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, empleado);
  }

  updateEmpleado(id: string, empleado: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, empleado);
  }

  deleteEmpleado(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
```

### **4. Routing en Angular**

**app-routing.module.ts:**
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'empleados', component: EmpleadosListComponent },
  { path: 'empleados/nuevo', component: EmpleadoFormComponent },
  { path: 'empleados/:id', component: EmpleadoDetailComponent },
  { path: '**', redirectTo: '/dashboard' }  // Wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

---

## 🔧 Script de Build Automático

Puedes crear un script para automatizar el proceso:

### **build-and-deploy.sh** (Linux/Mac):
```bash
#!/bin/bash

# Navegar al proyecto Angular
cd ../frontend-angular

# Build de producción
ng build --configuration production

# Copiar archivos al backend
cp -r dist/tu-app/* ../backend/public/

echo "✅ Build completado y archivos copiados a backend/public/"
```

### **build-and-deploy.ps1** (Windows PowerShell):
```powershell
# Navegar al proyecto Angular
Set-Location ..\frontend-angular

# Build de producción
ng build --configuration production

# Copiar archivos al backend
Copy-Item -Path "dist\tu-app\*" -Destination "..\backend\public\" -Recurse -Force

Write-Host "✅ Build completado y archivos copiados a backend/public/" -ForegroundColor Green
```

### **package.json** (en proyecto Angular):
```json
{
  "scripts": {
    "build": "ng build",
    "build:prod": "ng build --configuration production",
    "deploy": "ng build --configuration production && npm run copy",
    "copy": "xcopy /E /Y dist\\tu-app\\* ..\\backend\\public\\"
  }
}
```

Luego solo ejecuta:
```bash
npm run deploy
```

---

## 🧪 Pruebas

### **1. Verificar que el servidor sirve archivos estáticos:**

```bash
curl http://localhost:3000
```

Debería devolver el contenido de `index.html`.

### **2. Verificar que la API funciona:**

```bash
curl http://localhost:3000/api/empleados
```

Debería devolver la lista de empleados en JSON.

### **3. Verificar que las rutas de Angular funcionan:**

Navega a estas URLs en el navegador:
- `http://localhost:3000/` → Debe cargar Angular
- `http://localhost:3000/empleados` → Angular debe manejar esta ruta
- `http://localhost:3000/dashboard` → Angular debe manejar esta ruta

---

## 🔒 Consideraciones de Seguridad

1. **No incluir archivos sensibles en /public**
   - El contenido de `/public` es accesible públicamente
   - No coloques archivos de configuración, .env, etc.

2. **CORS en producción**
   - Configura CORS para aceptar solo tu dominio:
   ```javascript
   origin: ['https://tudominio.com']
   ```

3. **HTTPS en producción**
   - Usa un proxy reverso como Nginx
   - Configura certificados SSL/TLS

---

## 📊 Configuración Adicional

### **Servir diferentes builds según el entorno:**

```javascript
// app.js
const isProduction = process.env.NODE_ENV === 'production';
const publicPath = isProduction ? 'public' : 'public-dev';

app.use(express.static(path.join(__dirname, publicPath)));
```

### **Cache de archivos estáticos:**

```javascript
// app.js
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1d',  // Cache por 1 día
  etag: true,
  lastModified: true
}));
```

### **Comprimir respuestas:**

```bash
npm install compression
```

```javascript
// app.js
const compression = require('compression');
app.use(compression());
```

---

## 🐛 Troubleshooting

### **Problema: Las rutas de Angular no funcionan (404)**
**Solución:** Asegúrate de que la ruta catch-all (`app.get('*')`) esté DESPUÉS de todas las rutas de la API.

### **Problema: Los archivos CSS/JS no cargan**
**Solución:** Verifica que `baseHref` en `angular.json` sea `"/"`.

### **Problema: La API retorna HTML en lugar de JSON**
**Solución:** Las rutas de la API deben estar definidas ANTES de la ruta catch-all.

### **Problema: Error 404 en archivos estáticos**
**Solución:** Verifica que los archivos estén en la carpeta `public/` correcta.

---

## ✅ Checklist de Despliegue

- [ ] Build de Angular completado (`ng build --configuration production`)
- [ ] Archivos copiados a `backend/public/`
- [ ] `baseHref: "/"` configurado en `angular.json`
- [ ] Variables de entorno configuradas en Angular
- [ ] Servidor iniciado (`npm run dev` o `npm start`)
- [ ] Ruta raíz (`/`) carga la aplicación Angular
- [ ] Rutas de Angular funcionan correctamente
- [ ] API REST accesible en `/api/*`
- [ ] CORS configurado correctamente
- [ ] Sin errores en la consola del navegador

---

## 📚 Recursos Adicionales

- [Angular Deployment](https://angular.io/guide/deployment)
- [Express Static Files](https://expressjs.com/en/starter/static-files.html)
- [Angular Production Guide](https://angular.io/guide/deployment#production)

---

**¡Todo listo para servir tu aplicación Angular! 🚀**
