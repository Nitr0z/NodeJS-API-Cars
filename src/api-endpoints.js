module.exports = function (app) {
    require("./auth/auth-routes")(app);
    require("./cars/cars-routes")(app);
}