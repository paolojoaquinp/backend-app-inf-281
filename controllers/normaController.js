const Norma = require('../models/norma');
module.exports = {
    async getAll(req, res, next) {
        try {
            const data = await Norma.getAll();
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
            const norma = req.body;
            const data = await Norma.create(norma);

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

            const data = await Norma.findByTaskId(id);    
            console.log(`Norma: ${data}`);
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
            
            const norma = req.body;
            console.log(`Datos enviados del usuario: ${JSON.stringify(norma.idAdministrador)}`);
            await Norma.update(norma);

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
            await Norma.remove(id);

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