module.exports = app => {
    const cars = require('./cars-controller');
    const router = require('express').Router();

    router.post("/cars/add", cars.addCar);

    router.post("/cars/update", cars.updateCar);

    router.post("/cars/delete", cars.deleteCar);

    router.get("/cars/get", cars.getCar);

    // -- To declare the prefix path of your API service
    app.use("/v1", router);
}