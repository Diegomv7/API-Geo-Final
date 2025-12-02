const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const zonesService = require('../service/zonesService');

router.get('/', auth, async (req, res, next) => {
    try {
        const zones = await zonesService.obtenerZonasPorUsuario(req.user.id);
        res.json(zones);
    } catch (err) {
        next(err);
    }
});

router.post('/', auth, async (req, res, next) => {
    const { name, coordinates, color } = req.body; 
    try {
        const zone = await zonesService.crearZona({ name, coordinates, color }, req.user.id);
        res.json(zone);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', auth, async (req, res, next) => {
    const { id } = req.params;
    const { name, coordinates, color } = req.body;
    try {
        const zone = await zonesService.actualizarZona(id, { name, coordinates, color }, req.user.id);
        res.json(zone);
    } catch (err) {
        if (err.message === 'Zona no encontrada') 
            err.statusCode = 404;
        if (err.message === 'No autorizado') 
            err.statusCode = 401;
        next(err);
    }
});

router.delete('/:id', auth, async (req, res, next) => {
    const { id } = req.params;
    try {
        const resultado = await zonesService.eliminarZona(id, req.user.id);
        res.json(resultado);
    } catch (err) {
        if (err.message === 'Zona no encontrada') 
            err.statusCode = 404;
        if (err.message === 'No autorizado') 
            err.statusCode = 401;
        next(err);
    }
});

module.exports = router;
