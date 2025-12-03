const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const users = require('./routes/usersRouter');
const places = require('./routes/placesRouter');
const zones = require('./routes/zonesRouter');
const { logErrors, errorHandler } = require('./middleware/errorHandler');

const port = 4000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/api/users', users);
app.use('/api/places', places);
app.use('/api/zones', zones);
app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
        });
        console.log('Base de Datos Conectada');
    } catch (error) {
         console.error('No se puede conectar a MongoDB:', error);
    }
}

conectarDB();