const express=require('express'); 
const morgan=require('morgan'); 
const cors=require('cors');
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

// Routes
app.use('/api/empleados',require('./src/routes/empleados.routes.js')); 
 
module.exports=app; 