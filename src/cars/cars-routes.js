module.exports = app => {
    const cars = require('./cars-controller');
    const router = require('express').Router();
    const jwtMiddleware = require('../auth/jwt-middleware');

    router.post("/cars/add", jwtMiddleware.checkJwtTokenMiddleware, cars.addCar); // path to add a car

    router.put("/cars/update/:id", jwtMiddleware.checkJwtTokenMiddleware, cars.updateCar); // path to update a car

    router.delete("/cars/delete/:id", jwtMiddleware.checkJwtTokenMiddleware, cars.deleteCar); // path to delete a car

    router.delete("/cars/delete", jwtMiddleware.checkJwtTokenMiddleware, cars.deleteAllCar); // path to delete all car

    router.get("/cars/get/:id", cars.getCar); // path to get a car

    router.get("/cars/get", cars.getAllCar); // path to get all cars

    // -- To declare the prefix path of your API service
    app.use("/v1", router);
}