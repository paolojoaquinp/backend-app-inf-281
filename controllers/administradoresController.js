const Administrador = require('../models/administradores');
module.exports = {
    async getAll(req, res, next) {
        try {
            const id = req.params.id;
            const data = await Administrador.getAllById(id);
            return res.status(200).json(data);
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success:false,
                message: 'Error al obtener los administradores'
            });
        }
    },
    async register(req, res ,next) {
        try {
            const administrador = req.body;
            const data = await Administrador.create(administrador);

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

            const data = await Administrador.findByTaskId(id);    
            console.log(`Administrador: ${data}`);
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
            const administrador = req.body;
            console.log(`Datos enviados del usuario: ${JSON.stringify(user)}`);
            await Administrador.update(administrador);

            return res.status(201).json({
                success: true,
                message: 'Los datos del administrador se actualizaron correctamente'
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
            const id = req.body.id;
            const idAdmin = req.body.idAdmin;
            await Administrador.remove(id,idAdmin);

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
};