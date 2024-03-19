// fill this file based on the normaController.js file
// and the model in models/educacion.js
//
const Educacion = require('../models/educacion');

module.exports = {    
    async getAll(req, res, next) {
        try {
            const data = await Educacion.getAll();
            return res.status(200).json(data);
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success:false,
                message: 'Error al obtener las normas'
            });
        }
    },
    async register(req, res ,next) {
        try {
            const educacion = req.body;
            const data = await Educacion.create(educacion);

            return res.status(201).json({
                success:true,
                message: 'El registro se realizo correctamente',
                data: data.id
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status({
                success: false,
                message: 'Hubo un error con el registro de la tarea',
                error: error
            });
        }
    },
    async findById(req, res, next) {
        try {
            const id = req.params.id;

            const data = await Educacion.findByTaskId(id);    
            console.log(`Educacion: ${data}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener el usuario por ID'
            });
        }
    },
    async update(req, res, next) {
        try {
            
            const educacion = req.body;
            console.log(`Datos enviados del usuario: ${JSON.stringify(user)}`);
            await Educacion.update(educacion);
            return res.status(201).json({
                success: true,
                message: 'El registro se actualizo correctamente'
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al actualizar el registro'
            });
        }
    },
    async delete(req, res, next) {
        try {
            const id = req.params.id;
            await Educacion.delete(id);
            return res.status(201).json({
                success: true,
                message: 'El registro se elimino correctamente'
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al eliminar el registro'
            });
        }
    }
};