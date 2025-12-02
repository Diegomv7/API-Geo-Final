const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre del lugar es obligatorio'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'], 
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: [true, 'Las coordenadas son obligatorias']
        }
    },
    visited: { 
        type: Boolean,
        default: false
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

PlaceSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Place', PlaceSchema);