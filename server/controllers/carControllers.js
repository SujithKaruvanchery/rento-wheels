const { cloudinaryInstance } = require("../config/cloudinaryConfig");
const carDB = require("../models/carModel")

const addCar = async (req, res) => {
    try {
        const ownerId = req.user.id;
        const { brand, model, year, fuelType, transmission, seats, rentPerDay, location, description } = req.body;

        if (!brand || !model || !year || !fuelType || !transmission || !seats || !rentPerDay || !location) {
            return res.status(400).json({ error: "All required fields must be filled." });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "At least one image file is required." });
        }

        const uploadResults = await Promise.all(
            req.files.map(file => cloudinaryInstance.uploader.upload(file.path))
        );

        const imageUrls = uploadResults.map(result => result.secure_url);

        const newCar = new carDB({
            brand,
            model,
            year,
            fuelType,
            transmission,
            seats,
            rentPerDay,
            images: imageUrls,
            location,
            description,
            owner: ownerId
        });

        const savedCar = await newCar.save();
        res.status(201).json({ message: "Car added successfully.", data: savedCar });

    } catch (error) {
        console.error("Add Car Error:", error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

const getAllCars = async (req, res) => {
    try {
        const cars = await carDB.find().populate("owner", "name email");
        res.status(200).json({ message: "Cars fetched successfully.", data: cars });
    } catch (error) {
        console.error("Get All Cars Error:", error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

const getCarById = async (req, res) => {
    try {
        const { carId } = req.params;
        const car = await carDB.findById(carId).populate("owner", "name email");

        if (!car) {
            return res.status(404).json({ error: "Car not found." });
        }

        res.status(200).json({ message: "Car fetched successfully.", data: car });
    } catch (error) {
        console.error("Get Car By ID Error:", error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

const updateCar = async (req, res) => {
    try {
        const { carId } = req.params;
        const ownerId = req.user.id;

        const car = await carDB.findById(carId);
        if (!car) return res.status(404).json({ error: "Car not found." });

        if (car.owner.toString() !== ownerId) {
            return res.status(403).json({ error: "You are not authorized to update this car." });
        }

        const updatedCar = await carDB.findByIdAndUpdate(carId, req.body, {
            new: true,
            runValidators: true,
            context: 'query'
        });

        res.status(200).json({ message: "Car updated successfully.", data: updatedCar });
    } catch (error) {
        console.error("Update Car Error:", error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

const deleteCar = async (req, res) => {
    try {
        const { carId } = req.params;
        const ownerId = req.user.id;

        const car = await carDB.findById(carId);
        if (!car) return res.status(404).json({ error: "Car not found." });

        if (car.owner.toString() !== ownerId) {
            return res.status(403).json({ error: "You are not authorized to delete this car." });
        }

        await carDB.findByIdAndDelete(carId);
        res.status(200).json({ message: "Car deleted successfully." });
    } catch (error) {
        console.error("Delete Car Error:", error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

const getMyCars = async (req, res) => {
    try {
        const ownerId = req.user.id;
        const cars = await carDB.find({ owner: ownerId });
        res.status(200).json({ message: "Your cars fetched successfully.", data: cars });
    } catch (error) {
        console.error("Get My Cars Error:", error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

module.exports = {
    addCar,
    getAllCars,
    getCarById,
    updateCar,
    deleteCar,
    getMyCars
}