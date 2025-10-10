const express=require('express'); 
const morgan=require('morgan'); 
const cors=require('cors');
const app=express(); 

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); 

//settings 
app.set('puerto',process.env.PORT|| 3000); 
app.set('nombreApp','Gestión de empleados'); 

// Routes
app.use('/api/empleados',require('./src/routes/empleados.routes.js')); 
 
module.exports=app; 