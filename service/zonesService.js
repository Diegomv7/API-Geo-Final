const Zone = require('../models/Zone');

const obtenerZonasPorUsuario = async (userId) => {
    return await Zone.find({ author: userId });
};

const crearZona = async (zoneData, userId) => {
    const { name, color, coordinates } = zoneData;
    
    const newZone = new Zone({
        name,
        color,
        geometry: {
            type: 'Polygon',
            coordinates: coordinates
        },
        author: userId
    });

    return await newZone.save();
};

const actualizarZona = async (zoneId, zoneData, userId) => {
    let zone = await Zone.findById(zoneId);
    
    if (!zone) throw new Error('Zona no encontrada');
    if (zone.author.toString() !== userId) throw new Error('No autorizado');

    const { name, color, coordinates } = zoneData;
    
    if (name) zone.name = name;
    if (color) zone.color = color;
    if (coordinates) {
        zone.geometry = {
            type: 'Polygon',
            coordinates: coordinates
        };
    }

    return await zone.save();
};

const eliminarZona = async (zoneId, userId) => {
    let zone = await Zone.findById(zoneId);
    
    if (!zone) throw new Error('Zona no encontrada');
    if (zone.author.toString() !== userId) throw new Error('No autorizado');

    await Zone.findByIdAndDelete(zoneId);
    return { msg: 'Zona eliminada' };
};

module.exports = {
    obtenerZonasPorUsuario,
    crearZona,
    actualizarZona,
    eliminarZona
};