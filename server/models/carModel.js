const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
        trim: true
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true
    },
    fuelType: {
        type: String,
        enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
        required: true
    },
    transmission: {
        type: String,
        enum: ['Manual', 'Automatic'],
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    rentPerDay: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Car', carSchema);
