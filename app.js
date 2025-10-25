const express=require('express'); 
const morgan=require('morgan'); 
const cors=require('cors');
const path=require('path');
const app=express(); 

// Configuración de CORS - Permite peticiones desde cualquier cliente
const corsOptions = {
    origin: '*', // Permite cualquier origen
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: false, // Cambiar a true si necesitas cookies
    optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); 

//settings 
app.set('puerto',process.env.PORT|| 3000); 
app.set('nombreApp','Gestión de empleados'); 

// Servir archivos estáticos de Angular
// La carpeta 'public' contendrá la build de producción de Angular
app.use(express.static(path.join(__dirname, 'public')));

// API Routes - Deben ir ANTES de las rutas de Angular
app.use('/api/empleados',require('./src/routes/empleados.routes.js')); 

// Ruta para servir la SPA de Angular
// Todas las rutas que no sean /api/* devolverán el index.html de Angular
// Esto permite que Angular maneje el routing del lado del cliente
app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
 
module.exports=app; 