// fill this file based on the normaController.js file
// and the model in models/evento.js

const Evento = require('../models/evento');

module.exports = {

    async getAll(req, res, next) {
        try {
            const data = await Evento.getAll();
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
            const evento = req.body;
            const data = await Evento.create(evento);

            return res.status(201).json({
                success:true,
                message: 'El registro se realizo correctamente',
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

            const data = await Evento.findByTaskId(id);    
            console.log(`Evento: ${data}`);
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

            const evento = req.body;
            console.log(`Datos enviados del usuario: ${JSON.stringify(evento.idAdministrador)}`);
            await Evento.update(evento);
            return res.status(201).json({
                success: true,
                message: 'El usuario se actualizo correctamente'
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al actualizar el usuario'
            });
        }
    },
    async remove(req, res, next) {
        try {
            const id = req.params.id;
            console.log(id);
            /* const idAdministrador = req.params.idAdministrador; */
            await Evento.remove(id);
            return res.status(201).json({
                success: true,
                message: 'El evento se elimino correctamente'
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con la ejecución',
                error: error
            });
        }
    },
};

