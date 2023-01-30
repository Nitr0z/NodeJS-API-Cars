module.exports = function (app) {
    require("./auth/auth-routes")(app);
    require("./cars/cars-routes")(app);
    require("./colors/colors-routes")(app);
    require("./garages/garages-routes")(app);
}