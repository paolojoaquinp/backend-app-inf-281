const Notificacion = require('../models/notificaciones');
module.exports = {
    async getAll(req, res, next) {
        try {
            const data = await Notificacion.getAll();
            return res.status(200).json(data);
        } catch (error) {
            console.log(`Error: ${error}`);

        }
    },
    async register(req, res ,next) {
        try {
            const notificacion = req.body;
            const data = await Notificacion.create(notificacion);

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

            const data = await Notificacion.getAllById(id);    
            console.log(`Notificacion: ${data}`);
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
    async findByType(req, res, next) {
        try {
            const type = req.params.type;

            const data = await Notificacion.getByType(type);
            console.log(`Notificacion: ${data}`);
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
            
            const notificacion = req.body;
            console.log(`Datos enviados del usuario: ${JSON.stringify(notificacion.sender_id)}`);
            await Notificacion.update(notificacion);

            return res.status(201).json({
                success: true,
                message: 'Los datos de la tarea se actualizaron correctamente'
            });

        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con la actualizacion de datos',
                error: error
            });
        }
    },
    async remove(req, res, next) {
        try {
            const id = req.params.id;
            await Notificacion.remove(id);

            return res.status(201).json({
                success: true,
                message: 'Los datos se borraron correctamente'
            });

        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con la ejecución',
                error: error
            });
        }
    },
    async readNotification(req, res, next) {
        try {
            const idNotification = req.params.idNotification;
            console.log(`Datos enviados de la notificacion: ${idNotification}`);
            await Notificacion.read(idNotification);

            return res.status(201).json({
                success: true,
                message: 'Los datos de la tarea se actualizaron correctamente'
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con la actualizacion de datos',
                error: error
            });
        }
    }
};