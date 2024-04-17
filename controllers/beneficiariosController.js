// fill this file based on the normaController.js file
// and the model in models/evento.js

const Beneficiario = require('../models/beneficiarios');

module.exports = {

    async getAll(req, res, next) {
        try {
            const data = await Beneficiario.getAll();
            return res.status(200).json(data);
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success:false,
                message: 'Error al obtener los beneficiarios'
            });
        }
    },
    async register(req, res ,next) {
        try {
            const beneficiario = req.body;
            const data = await Beneficiario.create(beneficiario);

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
    async getAllById(req, res, next) {
        try {
            const id = req.params.id;

            const data = await Beneficiario.getAllById(id);    
            console.log(`Beneficiario: ${data}`);
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
    async findById(req, res, next) {
        try {
            const id = req.params.id;

            const data = await Beneficiario.getById(id);    
            console.log(`Beneficiario: ${data}`);
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

            const beneficiario = req.body;
            console.log(`Datos enviados del usuario: ${JSON.stringify(beneficiario.idUser)}`);
            await Beneficiario.update(beneficiario);
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
            /* const idAdministrador = req.params.idAdministrador; */
            await Beneficiario.remove(id);
            return res.status(201).json({
                success: true,
                message: 'El beneficiario se elimino correctamente'
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

