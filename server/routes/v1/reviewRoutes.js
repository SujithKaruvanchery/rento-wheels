const { createReview, getReviewsByCar, deleteReview, updateReview } = require('../../controllers/reviewControllers');
const { userAuth } = require('../../middlewares/userAuth');

const reviewRouter = require('express').Router();

reviewRouter.post('/', userAuth, createReview);
reviewRouter.get('/:carId', getReviewsByCar);
reviewRouter.delete('/:reviewId', userAuth, deleteReview);
reviewRouter.put('/:reviewId', userAuth, updateReview);

module.exports = reviewRouter