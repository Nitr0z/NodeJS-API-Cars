module.exports = app => {
    const garages = require('./garages-controller');
    const router = require('express').Router();
    const jwtMiddleware = require('../auth/jwt-middleware');

    router.post("/garages/add", jwtMiddleware.checkJwtTokenMiddleware, garages.addGarage); // path to add a garage

    router.put("/garages/update/:id", jwtMiddleware.checkJwtTokenMiddleware, garages.updateGarage); // path to update a garage

    router.delete("/garages/delete/:id", jwtMiddleware.checkJwtTokenMiddleware, garages.deleteGarage); // path to delete a garage

    router.get("/garages/get/:id", garages.getGarage); // path to get a garage

    router.get("/garages/get", garages.getAllGarage); // path to get all garages

    // -- To declare the prefix path of your API service
    app.use("/v1", router);
}