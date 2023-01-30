const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const apiEndpointsFiles = ['src/api-endpoints.js']

const doc = {
    info: {
        version: "1.0.1",
        title: "Cars API documentation",
        description: "Our car API provides comprehensive information about various vehicles, including make, model, year, specifications, and more. With this API, you can easily search for any car, compare different models, and access accurate technical data to help with your research or project. Whether you're a car enthusiast, researcher, or developer, our API is designed to be a one-stop solution for all your car-related needs. Start exploring the world of cars today with our powerful and user-friendly API.",
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