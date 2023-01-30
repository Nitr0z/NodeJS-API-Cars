const firestore = require('../config/firebase-config');

exports.addGarage = async (req, res) => {
    //#swagger.tags = ['Garages']
    //#swagger.description = 'Service to register a new garage'
    //#swagger.summary = 'Service to register a new garage'
    const {
        name, address, city, postalCode, phone, email, website, description
    } = req.body;

    firestore.collection('garages').add({
        "name": name,
        "address": address,
        "city": city,
        "postalCode": postalCode,
        "phone": phone,
        "email": email,
        "website": website,
        "description": description
    }).then((docRef) => {
        res.status(200).send({"Ajout reussi ! Id du garage :" :docRef.id });
    }).catch((error) => {
        res.status(400).send(error.message);
    }
    );
}

exports.updateGarage = async (req, res) => {
    //#swagger.tags = ['Garages']
    //#swagger.description = 'Service to update a garage'
    //#swagger.summary = 'Service to update a garage'
    const {
        name, address, city, postalCode, phone, email, website, description
    } = req.body;
    const { id } = req.params;
    try {
        const carRef = await firestore.collection('garages').doc(id).get();
        if (carRef.exists) {
            await firestore.collection('garages').doc(id).update({
                "name": name,
                "address": address,
                "city": city,
                "postalCode": postalCode,
                "phone": phone,
                "email": email,
                "website": website,
                "description": description
            });
            res.status(200).send({"Mise à jour de l'id :" :id +"reussite"});
        } else {
            res.status(404).send({ message: 'Garage not found' });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.deleteGarage = async (req, res) => {
    //#swagger.tags = ['Garages']
    //#swagger.description = 'Service to delete a garage'
    //#swagger.summary = 'Service to delete a garage'
    try {
        const { id } = req.params;
        const carRef = await firestore.collection('garages').doc(id).delete();
        res.status(200).send({"Supression de l'id :" :id +"reussite"});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.deleteAllGarage = async (req, res) => {
    //#swagger.tags = ['Garages']
    //#swagger.description = 'Service to delete all garages'
    //#swagger.summary = 'Service to delete all garages'
    try {
        const garagesRef = await firestore.collection('garages').get();
        const garages = garagesRef.docs.map(doc => doc.data());
        garages.forEach(async car => {
            await firestore.collection('garages').doc(car.id).delete();
        });
        res.status(200).send({ message: 'All garages deleted' });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.getGarage = async (req, res) => {
    //#swagger.tags = ['Garages']
    //#swagger.description = 'Service to get a garage'
    //#swagger.summary = 'Service to get a garage'
    try {
        const { id } = req.params;
        const carRef = await firestore.collection('garages').doc(id).get();
        const car = carRef.data();
        res.status(200).send(car);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.getAllGarage = async (req, res) => {
    //#swagger.tags = ['Garages']
    //#swagger.description = 'Service to get all garages'
    //#swagger.summary = 'Service to get all garages'
    try {
        const garagesRef = await firestore.collection('garages').get();
        const garages = garagesRef.docs.map(doc => doc.data());
        res.status(200).send(garages);
    } catch (error) {
        res.status(400).send(error.message);
    }
}