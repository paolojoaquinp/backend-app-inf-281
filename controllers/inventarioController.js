const Inventario = require('../models/inventario');

module.exports = {    
    async getAll(req, res, next) {
        try {
            const data = await Inventario.getAll();
            return res.status(200).json(data);
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success:false,
                message: 'Error al obtener los donantes'
            });
        }
    },
    async register(req, res ,next) {
        try {
            const donacion = req.body;
            const data = await Inventario.create(donacion);

            return res.status(201).json({
                success:true,
                message: 'El registro se realizo correctamente',
                data: data
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
            const data = await Inventario.getById(id);    
            console.log(`Inventario: ${data}`);
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
            
            const donacion = req.body;
            console.log(`Datos enviados del usuario: ${JSON.stringify(donacion.idDonante)}`);
            await Inventario.update(donacion);
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
    async remove(req, res, next) {
        try {
            const id = req.params.id;
            await Inventario.remove(id);
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