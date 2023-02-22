module.exports = function (app) {
    require("./cars/cars-routes")(app);
    require("./colors/colors-routes")(app);
    require("./garages/garages-routes")(app);
    require("./options/options-routes")(app);
    require("./rims/rims-routes")(app);
    require("./consumers/consumers-routes")(app);
    require("./auth/auth-routes")(app);
}