const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const port = 4000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

mongoose.connect('mongodb+srv://diego_db_user:afB7s1AK96fIAUKm@georef-map.vfu1gpa.mongodb.net/?retryWrites=true&w=majority&appName=georef-map')
.then(() => {
    console.log('Conexión a MongoDB exitosa');
})
.catch(err => {
    console.error('No se puede conectar a MongoDB:', err);
});

