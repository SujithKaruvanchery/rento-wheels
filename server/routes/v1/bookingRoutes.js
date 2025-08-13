const { createBooking, cancelBooking, getMyBookings, getBookingsForOwner, markBookingAsCompleted } = require('../../controllers/bookingControllers');
const { ownerAuth } = require('../../middlewares/ownerAuth');
const { userAuth } = require('../../middlewares/userAuth');

const bookingRouter = require('express').Router();

bookingRouter.post('/', userAuth, createBooking);
bookingRouter.put('/cancel/:bookingId', userAuth, cancelBooking);
bookingRouter.get('/my', userAuth, getMyBookings);
bookingRouter.get('/owner', ownerAuth, getBookingsForOwner);
bookingRouter.put('/complete/:bookingId', ownerAuth, markBookingAsCompleted);

module.exports = bookingRouter