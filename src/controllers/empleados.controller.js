const empleadoCtrl={}; 
const Empleado=require('../models/Empleado');
 
empleadoCtrl.getEmpleados=async (req,res)=>{
    try {
        const empleados=await Empleado.find();
        res.json(empleados);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
} 
empleadoCtrl.createEmpleado=async (req,res)=>{
    try {
        const nuevoEmpleado=new Empleado({
            nombre:req.body.nombre,
            cargo:req.body.cargo,
            departamento:req.body.departamento,
            sueldo:req.body.sueldo
        });
        await nuevoEmpleado.save();
        res.status(201).json(nuevoEmpleado);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
} 
empleadoCtrl.getEmpleado=async (req,res)=>{
    try {
        const empleado=await Empleado.findById(req.params.id);
        if(!empleado) return res.status(404).json({message:'Empleado no encontrado'});
        res.json(empleado);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
} 
empleadoCtrl.editEmpleado=async (req,res)=>{
    try {
        const empleado=await Empleado.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!empleado) return res.status(404).json({message:'Empleado no encontrado'});
        res.json(empleado);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
} 
empleadoCtrl.deleteEmpleado=async (req,res)=>{
    try {
        const empleado=await Empleado.findByIdAndDelete(req.params.id);
        if(!empleado) return res.status(404).json({message:'Empleado no encontrado'});
        res.json({message:'Empleado eliminado'});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
} 
 
module.exports=empleadoCtrl; 