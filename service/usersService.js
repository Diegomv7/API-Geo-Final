const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'Mapitas';



const registrarUsuario = async ({ name, email, password }) => {

    let user = await User.findOne({ email });
    if (user) {
        throw new Error('El usuario ya existe');
    }

    user = new User({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = { user: { id: user.id } };
    
    return new Promise((resolve, reject) => {
        jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 }, (error, token) => {
            if (error) reject(error);
            resolve(token);
        });
    });
};

const loginUsuario = async ({ email, password }) => {
    let user = await User.findOne({ email });
    if (!user) {
        throw new Error('Credenciales inválidas (Usuario no encontrado)');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Credenciales inválidas (Contraseña incorrecta)');
    }

    const payload = { user: { id: user.id } };

    return new Promise((resolve, reject) => {
        jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 }, (error, token) => {
            if (error) reject(error);
            resolve(token);
        });
    });
};

module.exports = { registrarUsuario,loginUsuario };