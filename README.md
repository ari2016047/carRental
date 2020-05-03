# carRental
Hosted At: https://car-rental-white-panda.herokuapp.com

Postman Collection link: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/0434d94a2b278f50cbb3)

Postman JSON File: carRental/project1.postman_collection.json

# add a car : 

router.post('/add-cars',feedController.addCars);

# show all cars :

router.get('/cars',feedController.showCars);

# filter cars to check availablity and capacity :

router.post('/filter-cars',feedController.filterCars);

# book a filtered car : 

router.post('/book-cars/:carId',feedController.bookCars);

# get a specific car and its current active booking : 

router.get('/cars/:carId',feedController.getCar);

# delete a car : 

router.post('/cars/delete/:carId',feedController.deleteCar);

# update a car : 

router.post('/cars/update/:carId',feedController.updateCar);

