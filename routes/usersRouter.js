const express = require('express');
const router = express.Router();
const usersService = require('../service/usersService');

router.post('/registro', async (req, res, next) => {
    try {
        const token = await usersService.registrarUsuario(req.body);
        res.json({ token });
    } catch (error) {
        if (error.message === 'El usuario ya existe') {
            error.statusCode = 400;
        }
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const token = await usersService.loginUsuario(req.body);
        res.json({ token });
    } catch (error) {
        if (error.message.includes('Credenciales')) {
            error.statusCode = 400;
        }
        next(error);
    }
});

module.exports = router;