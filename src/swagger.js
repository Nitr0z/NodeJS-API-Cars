const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const apiEndpointsFiles = ['src/api-endpoints.js']

const doc = {
    info: {
        version: "3.0.0",
        title: "Cars API documentation",
        description: "Documentation of Cars API",
        termsOfService: "http://swagger.io/terms/",
        contact: {
            email: "contact@cars-api.com"
        },
        license: {
            name: "Apache 2.0",
            url: "http://www.apache.org/licenses/LICENSE-2.0.html"
        },
    },
    servers: [
        { 
            url: "http://localhost:8080/v1/" 
        }
    ],
    host: "localhost:8080/v1",
    basePath: "/",
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: "authorization",
            scheme: 'bearer',
            bearerFormat: 'JWT',
            in: 'header'
        }
    },
}

swaggerAutogen(outputFile, apiEndpointsFiles, doc).then(() => {
    // -- For auto generating swagger_output.json file
    require('./app.js')
});