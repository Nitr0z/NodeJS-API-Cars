const express = require('express'); // -- To build our rest API routes, requests and responses
const bodyParser = require('body-parser'); // -- To convert json to javascript object
const cors = require('cors'); // -- For rest API headers
const helmet = require('helmet'); // -- To secure our api against common vulnerabilities like xss
const morgan = require('morgan'); // -- To log our express rest api 
const swaggerUi = require('swagger-ui-express'); // -- Importing swagger dependency and swagger json file generated
const swaggerFile = require('../swagger_output.json');
let port = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));

// -- Root service to welcome in our API
app.get('/', (req, res) => {
    res.send({"message": "Welcome to our API"});
});

require("./auth/auth-routes")(app);
require("./cars/cars-routes")(app);
require("./colors/colors-routes")(app);
require("./garages/garages-routes")(app);
require("./options/options-routes")(app);
require("./rims/rims-routes")(app);
require("./consumers/consumers-routes")(app);

// -- Setup swagger in our doc with uri /doc
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
// -- Importing api endpoints
require('./api-endpoints')(app)

app.listen(port, () => {
    console.log("Server started and listening on port "+port);
});
