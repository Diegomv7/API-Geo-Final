const Place = require('../models/Place');

const obtenerLugaresPorUsuario = async (userId) => {
    return await Place.find({ author: userId }).sort({ created: -1 });
};

const crearLugar = async (placeData, userId) => {
    const { name, description, latitude, longitude, visited } = placeData;

    const newPlace = new Place({
        name,
        description,
        visited: visited || false,
        location: {
            type: 'Point',
            coordinates: [longitude, latitude]
        },
        author: userId
    });

    return await newPlace.save();
};

const actualizarLugar = async (placeId, placeData, userId) => {
    let place = await Place.findById(placeId);

    if (!place) throw new Error('Lugar no encontrado');
    
    if (place.author.toString() !== userId) {
        throw new Error('No autorizado');
    }

    const { name, description, latitude, longitude, visited } = placeData;
    const placeFields = {};
    if (name) placeFields.name = name;
    if (description) placeFields.description = description;
    if (typeof visited !== 'undefined') placeFields.visited = visited;
    if (latitude && longitude) {
        placeFields.location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        };
    }

    place = await Place.findByIdAndUpdate(
        placeId,
        { $set: placeFields },
        { new: true }
    );

    return place;
};

const eliminarLugar = async (placeId, userId) => {
    let place = await Place.findById(placeId);

    if (!place) throw new Error('Lugar no encontrado');

    if (place.author.toString() !== userId) {
        throw new Error('No autorizado');
    }

    await Place.findByIdAndDelete(placeId);
    return { msg: 'Lugar eliminado correctamente' };
};

module.exports = {
    obtenerLugaresPorUsuario,
    crearLugar,
    actualizarLugar,
    eliminarLugar
};