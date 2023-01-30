module.exports = app => {
    const colors = require('./colors-controller');
    const router = require('express').Router();

    router.post("/colors/add", colors.addColor); // path to add a color

    router.put("/colors/update/:id", colors.updateColor); // path to update a color

    router.delete("/colors/delete/:id", colors.deleteColor); // path to delete a color

    router.delete("/colors/delete", colors.deleteAllColor); // path to delete all color

    router.get("/colors/get/:id", colors.getColor); // path to get a color

    router.get("/colors/get", colors.getAllColor); // path to get all colors

    // -- To declare the prefix path of your API service
    app.use("/v1", router);
}