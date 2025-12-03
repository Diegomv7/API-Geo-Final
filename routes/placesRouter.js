const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); 
const placesService = require('../service/placesService');

router.get('/', auth, async (req, res, next) => {
    try {
        const places = await placesService.obtenerLugaresPorUsuario(req.user.id);
        res.json(places);
    } catch (err) {
        next(err);
    }
});

router.post('/', auth, async (req, res, next) => {
    try {
        const place = await placesService.crearLugar(req.body, req.user.id);
        res.json(place);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', auth, async (req, res, next) => {
    const { id } = req.params;
    try {
        const place = await placesService.actualizarLugar(id, req.body, req.user.id);
        res.json(place);
    } catch (err) {
        if (err.message === 'Lugar no encontrado') 
            err.statusCode = 404;
        if (err.message === 'No autorizado') 
            err.statusCode = 401;
        next(err);
    }
});

router.delete('/:id', auth, async (req, res, next) => {
    const { id } = req.params;
    try {
        const resultado = await placesService.eliminarLugar(id, req.user.id);
        res.json(resultado);
    } catch (err) {
        if (err.message === 'Lugar no encontrado') err.statusCode = 404;
        if (err.message === 'No autorizado') err.statusCode = 401;
        next(err);
    }
});

module.exports = router;