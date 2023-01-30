const firestore = require('../config/firebase-config');

exports.addCar = async (req, res) => {
    //#swagger.tags = ['Cars']
    //#swagger.description = 'Service to register a new car'
    //#swagger.summary = 'Service to register a new car'
    const {
        model, brand, year, price, description
    } = req.body;

    firestore.collection('cars').add({
        "model": model,
        "brand": brand,
        "year": year,
        "price": price,
        "description": description
    }).then((docRef) => {
        res.status(200).send({"Ajout reussi ! Id du véhicule :" :docRef.id });
    }).catch((error) => {
        res.status(400).send(error.message);
    }
    );
}

exports.updateCar = async (req, res) => {
    //#swagger.tags = ['Cars']
    //#swagger.description = 'Service to update a car'
    //#swagger.summary = 'Service to update a car'
    const {
        model, brand, year, price, description
    } = req.body;
    const { id } = req.params;
    try {
        const carRef = await firestore.collection('cars').doc(id).get();
        if (carRef.exists) {
            await firestore.collection('cars').doc(id).update({
                "model": model,
                "brand": brand,
                "year": year,
                "price": price,
                "description": description
            });
            res.status(200).send({"Mise à jour de l'id :" :id +"reussite"});
        } else {
            res.status(404).send({ message: 'Car not found' });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.deleteCar = async (req, res) => {
    //#swagger.tags = ['Cars']
    //#swagger.description = 'Service to delete a car'
    //#swagger.summary = 'Service to delete a car'
    try {
        const { id } = req.params;
        const carRef = await firestore.collection('cars').doc(id).delete();
        res.status(200).send({"Supression de l'id :" :id +"reussite"});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.deleteAllCar = async (req, res) => {
    //#swagger.tags = ['Cars']
    //#swagger.description = 'Service to delete all cars'
    //#swagger.summary = 'Service to delete all cars'
    try {
        const carsRef = await firestore.collection('cars').get();
        const cars = carsRef.docs.map(doc => doc.data());
        cars.forEach(async car => {
            await firestore.collection('cars').doc(car.id).delete();
        });
        res.status(200).send({ message: 'All cars deleted' });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.getCar = async (req, res) => {
    //#swagger.tags = ['Cars']
    //#swagger.description = 'Service to get a car'
    //#swagger.summary = 'Service to get a car'
    try {
        const { id } = req.params;
        const carRef = await firestore.collection('cars').doc(id).get();
        const car = carRef.data();
        res.status(200).send(car);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.getAllCar = async (req, res) => {
    //#swagger.tags = ['Cars']
    //#swagger.description = 'Service to get all cars'
    //#swagger.summary = 'Service to get all cars'
    try {
        const carsRef = await firestore.collection('cars').get();
        const cars = carsRef.docs.map(doc => doc.data());
        res.status(200).send(cars);
    } catch (error) {
        res.status(400).send(error.message);
    }
}