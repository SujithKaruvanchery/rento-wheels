const reviewDB = require("../models/reviewModel")
const carDB = require("../models/carModel")

const createReview = async (req, res) => {
    try {
        const userId = req.user.id;
        const { carId, rating, comment } = req.body;

        if (!carId || !rating) {
            return res.status(400).json({ error: "Car ID and rating are required." });
        }

        const car = await carDB.findById(carId);
        if (!car) {
            return res.status(404).json({ error: "Car not found." });
        }

        const newReview = await reviewDB.create({
            car: carId,
            user: userId,
            rating,
            comment
        });

        res.status(201).json({ message: "Review added successfully.", data: newReview });
    } catch (error) {
        console.error("Create Review Error:", error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

const getReviewsByCar = async (req, res) => {
    try {
        const { carId } = req.params;

        const reviews = await reviewDB.find({ car: carId }).populate('user', 'name email');
        res.status(200).json({ message: "Reviews fetched successfully.", data: reviews });
    } catch (error) {
        console.error("Get Reviews Error:", error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

const deleteReview = async (req, res) => {
    try {
        const userId = req.user.id;
        const { reviewId } = req.params;

        const review = await reviewDB.findById(reviewId);
        if (!review) return res.status(404).json({ error: "Review not found." });

        if (review.user.toString() !== userId) {
            return res.status(403).json({ error: "Unauthorized to delete this review." });
        }

        await reviewDB.findByIdAndDelete(reviewId);
        res.status(200).json({ message: "Review deleted successfully." });
    } catch (error) {
        console.error("Delete Review Error:", error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

const updateReview = async (req, res) => {
    try {
        const userId = req.user.id;
        const { reviewId } = req.params;
        const { rating, comment } = req.body;

        if (!rating && !comment) {
            return res.status(400).json({ error: "Nothing to update." });
        }

        const review = await reviewDB.findById(reviewId);
        if (!review) return res.status(404).json({ error: "Review not found." });

        if (review.user.toString() !== userId) {
            return res.status(403).json({ error: "Unauthorized to update this review." });
        }

        if (rating) review.rating = rating;
        if (comment) review.comment = comment;

        await review.save();

        res.status(200).json({ message: "Review updated successfully.", data: review });
    } catch (error) {
        console.error("Update Review Error:", error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

module.exports = {
    createReview,
    getReviewsByCar,
    deleteReview,
    updateReview
}