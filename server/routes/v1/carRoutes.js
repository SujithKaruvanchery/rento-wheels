const { addCar, getAllCars, getCarById, updateCar, deleteCar, getMyCars } = require('../../controllers/carControllers');
const { ownerAuth } = require('../../middlewares/ownerAuth');
const { upload } = require("../../middlewares/multer")

const carRouter = require('express').Router();

carRouter.post('/', ownerAuth, upload.array('images', 5), addCar);
carRouter.get('/', getAllCars);
carRouter.get('/:carId', getCarById);
carRouter.put('/:carId', ownerAuth, updateCar);
carRouter.delete('/:carId', ownerAuth, deleteCar);
carRouter.get('/my/listings', ownerAuth, getMyCars);

module.exports = carRouter