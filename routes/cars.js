const express = require('express');

const feedController = require('../controllers/cars');

const router = express.Router();

//show all cars 
router.get('/cars',feedController.showCars);

//add a car
router.post('/add-cars',feedController.addCars);

// filter cars to check availablity and capacity
router.post('/filter-cars',feedController.filterCars);

//book a filtered car
router.post('/book-cars/:carId',feedController.bookCars);

//get a specific car and its current active booking
router.get('/cars/:carId',feedController.getCar);

router.post('/cars/delete/:carId',feedController.deleteCar);

router.post('/cars/update/:carId',feedController.updateCar);


module.exports = router;