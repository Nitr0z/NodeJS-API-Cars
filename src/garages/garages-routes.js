module.exports = app => {
    const garages = require('./garages-controller');
    const router = require('express').Router();

    router.post("/garages/add", garages.addGarage); // path to add a garage

    router.put("/garages/update/:id", garages.updateGarage); // path to update a garage

    router.delete("/garages/delete/:id", garages.deleteGarage); // path to delete a garage

    router.delete("/garages/delete", garages.deleteAllGarage); // path to delete all garage

    router.get("/garages/get/:id", garages.getGarage); // path to get a garage

    router.get("/garages/get", garages.getAllGarage); // path to get all garages

    // -- To declare the prefix path of your API service
    app.use("/v1", router);
}