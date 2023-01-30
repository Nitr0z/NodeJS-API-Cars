module.exports = app => {
    const options = require('./options-controller');
    const router = require('express').Router();
    const jwtMiddleware = require('../auth/jwt-middleware');

    router.post("/options/add", jwtMiddleware.checkJwtTokenMiddleware, options.addOption); // path to add a option

    router.put("/options/update/:id", jwtMiddleware.checkJwtTokenMiddleware, options.updateOption); // path to update a option

    router.delete("/options/delete/:id", jwtMiddleware.checkJwtTokenMiddleware, options.deleteOption); // path to delete a option

    router.delete("/options/delete", jwtMiddleware.checkJwtTokenMiddleware, options.deleteAllOption); // path to delete all option

    router.get("/options/get/:id", options.getOption); // path to get a option

    router.get("/options/get", options.getAllOption); // path to get all options

    // -- To declare the prefix path of your API service
    app.use("/v1", router);
}