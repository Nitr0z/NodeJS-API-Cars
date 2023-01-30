module.exports = app => {
    const rims = require('./rims-controller');
    const router = require('express').Router();
    const jwtMiddleware = require('../auth/jwt-middleware');

    router.post("/rims/add", jwtMiddleware.checkJwtTokenMiddleware, rims.addRim); // path to add a rim

    router.put("/rims/update/:id", jwtMiddleware.checkJwtTokenMiddleware, rims.updateRim); // path to update a rim

    router.delete("/rims/delete/:id", jwtMiddleware.checkJwtTokenMiddleware, rims.deleteRim); // path to delete a rim

    router.delete("/rims/delete", jwtMiddleware.checkJwtTokenMiddleware, rims.deleteAllRim); // path to delete all rim

    router.get("/rims/get/:id", rims.getRim); // path to get a rim

    router.get("/rims/get", rims.getAllRim); // path to get all rims

    // -- To declare the prefix path of your API service
    app.use("/v1", router);
}