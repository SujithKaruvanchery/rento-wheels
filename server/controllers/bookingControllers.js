const bookingDB = require("../models/bookingModel")
const carDB = require("../models/carModel")

const createBooking = async (req, res) => {
    try {
        const userId = req.user.id;
        const { carId, startDate, endDate } = req.body;

        if (!carId || !startDate || !endDate) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const car = await carDB.findById(carId);
        if (!car) return res.status(404).json({ error: "Car not found." });

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start > end) {
            return res.status(400).json({ error: "End date must be after start date." });
        }

        const timeDiff = end.getTime() - start.getTime();
        const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;

        const totalPrice = car.rentPerDay * days;

        const newBooking = await bookingDB.create({
            car: carId,
            user: userId,
            startDate: start,
            endDate: end,
            totalPrice
        });

        res.status(201).json({ message: "Booking created successfully.", data: newBooking });

    } catch (error) {
        console.error("Create Booking Error:", error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

const cancelBooking = async (req, res) => {
    try {
        const userId = req.user.id;
        const { bookingId } = req.params;

        const booking = await bookingDB.findById(bookingId);
        if (!booking) return res.status(404).json({ error: "Booking not found." });

        if (booking.user.toString() !== userId) {
            return res.status(403).json({ error: "Unauthorized to cancel this booking." });
        }

        booking.status = "Cancelled";
        await booking.save();

        res.status(200).json({ message: "Booking cancelled successfully.", data: booking });

    } catch (error) {
        console.error("Cancel Booking Error:", error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

const getMyBookings = async (req, res) => {
    try {
        const userId = req.user.id;
        const bookings = await bookingDB.find({ user: userId }).populate('car');
        res.status(200).json({ message: "Bookings fetched successfully.", data: bookings });
    } catch (error) {
        console.error("Get My Bookings Error:", error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

const getBookingsForOwner = async (req, res) => {
    try {
        const ownerId = req.user.id;
        const cars = await carDB.find({ owner: ownerId }).select('_id');
        const carIds = cars.map(car => car._id);

        const bookings = await bookingDB.find({ car: { $in: carIds } }).populate('car user');
        res.status(200).json({ message: "Bookings fetched successfully.", data: bookings });
    } catch (error) {
        console.error("Get Owner Bookings Error:", error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

const markBookingAsCompleted = async (req, res) => {
    try {
        const ownerId = req.user.id;
        const { bookingId } = req.params;

        const booking = await bookingDB.findById(bookingId).populate('car');
        if (!booking) return res.status(404).json({ error: "Booking not found." });

        if (booking.car.owner.toString() !== ownerId) {
            return res.status(403).json({ error: "Unauthorized to update this booking." });
        }

        booking.status = "Completed";
        await booking.save();

        res.status(200).json({ message: "Booking marked as completed.", data: booking });

    } catch (error) {
        console.error("Mark Booking Completed Error:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = {
    createBooking,
    cancelBooking,
    getMyBookings,
    getBookingsForOwner,
    markBookingAsCompleted
}