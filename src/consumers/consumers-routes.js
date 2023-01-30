module.exports = app => {
    const consumers = require('./consumers-controller');
    const router = require('express').Router();
    const jwtMiddleware = require('../auth/jwt-middleware');

    router.post("/consumers/add", jwtMiddleware.checkJwtTokenMiddleware, consumers.addConsumer); // path to add a consumer

    router.put("/consumers/update/:id", jwtMiddleware.checkJwtTokenMiddleware, consumers.updateConsumer); // path to update a consumer

    router.delete("/consumers/delete/:id", jwtMiddleware.checkJwtTokenMiddleware, consumers.deleteConsumer); // path to delete a consumer

    router.delete("/consumers/delete", jwtMiddleware.checkJwtTokenMiddleware, consumers.deleteAllConsumer); // path to delete all consumer

    router.get("/consumers/get/:id", consumers.getConsumer); // path to get a consumer

    router.get("/consumers/get", consumers.getAllConsumer); // path to get all consumers

    // -- To declare the prefix path of your API service
    app.use("/v1", router);
}