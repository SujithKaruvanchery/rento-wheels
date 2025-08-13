const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email']
    },
    mobile: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Phone number must be 10 digits'],
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 100
    },
    companyName: {
        type: String,
        trim: true,
        required: true,
        minLength: 6,
        maxLength: 100
    },
    location: {
        type: String,
        trim: true,
        required: true,
        minLength: 6,
        maxLength: 100
    },
    role: {
        type: String,
        enum: ['owner'],
        default: 'owner',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    profilePic: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
    },
    cars: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Owner', ownerSchema);
