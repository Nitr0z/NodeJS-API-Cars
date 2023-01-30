const firestore = require('../config/firebase-config');

exports.addCar = async (req, res) => {
    //#swagger.tags = ['Cars']
    //#swagger.description = 'Service to register a new car'
    //#swagger.summary = 'Service to register a new car'
    try {
        const { car } = req.body;
        const carRef = await firestore.collection('cars').add(car);
        res.status(200).send({ id: carRef.id });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.updateCar = async (req, res) => {
    //#swagger.tags = ['Cars']
    //#swagger.description = 'Service to update a car'
    //#swagger.summary = 'Service to update a car'
    try {
        const { car } = req.body;
        const carRef = await firestore.collection('cars').doc(car.id).update(car);
        res.status(200).send({ id: car.id });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.deleteCar = async (req, res) => {
    //#swagger.tags = ['Cars']
    //#swagger.description = 'Service to delete a car'
    //#swagger.summary = 'Service to delete a car'
    try {
        const { id } = req.body;
        const carRef = await firestore.collection('cars').doc(id).delete();
        res.status(200).send({ id: id });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.getCar = async (req, res) => {
    //#swagger.tags = ['Cars']
    //#swagger.description = 'Service to get a car'
    //#swagger.summary = 'Service to get a car'
    try {
        const { id } = req.body;
        const carRef = await firestore.collection('cars').doc(id).get();
        const car = carRef.data();
        res.status(200).send(car);
    } catch (error) {
        res.status(400).send(error.message);
    }
}