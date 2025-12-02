const mongoose = require('mongoose');

const ZoneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la zona es obligatorio']
    },
    color: {
        type: String,
        default: '#3388ff'
    },
    geometry: {
        type: {
            type: String,
            enum: ['Polygon'],
            default: 'Polygon'
        },
        coordinates: {
            type: [[[Number]]],
            required: true
        }
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Zone', ZoneSchema);