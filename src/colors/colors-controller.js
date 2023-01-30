const firestore = require('../config/firebase-config');

exports.addColor = async (req, res) => {
    //#swagger.tags = ['Colors']
    //#swagger.description = 'Service to register a new color'
    //#swagger.summary = 'Service to register a new color'
    /*#swagger.security = [{
            "Bearer": []
    }]*/
    const {
        brand, year, name, hex, description
    } = req.body;

    firestore.collection('colors').add({
        "brand": brand,
        "year": year,
        "name": name,
        "hex": hex,
        "description": description
    }).then((docRef) => {
        res.status(200).send({"Successful addition! Color id :" :docRef.id });
    }).catch((error) => {
        res.status(400).send(error.message);
    }
    );
}

exports.updateColor = async (req, res) => {
    //#swagger.tags = ['Colors']
    //#swagger.description = 'Service to update a color'
    //#swagger.summary = 'Service to update a color'
    /*#swagger.security = [{
        "Bearer": []
    }]*/
    const {
        brand, year, name, hex, description
    } = req.body;
    const { id } = req.params;
    try {
        const carRef = await firestore.collection('colors').doc(id).get();
        if (carRef.exists) {
            await firestore.collection('colors').doc(id).update({
                "brand": brand,
                "year": year,
                "name": name,
                "hex": hex,
                "description": description
            });
            res.status(200).send({"Update of the id :" :id +"successful"});
        } else {
            res.status(404).send({ message: 'Color not found' });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.deleteColor = async (req, res) => {
    //#swagger.tags = ['Colors']
    //#swagger.description = 'Service to delete a color'
    //#swagger.summary = 'Service to delete a color'
    /*#swagger.security = [{
        "Bearer": []
    }]*/
    try {
        const { id } = req.params;
        const carRef = await firestore.collection('colors').doc(id).delete();
        res.status(200).send({"Suppression of the id :" :id +"successful"});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.deleteAllColor = async (req, res) => {
    //#swagger.tags = ['Colors']
    //#swagger.description = 'Service to delete all colors'
    //#swagger.summary = 'Service to delete all colors'
    /*#swagger.security = [{
        "Bearer": []
    }]*/
    try {
        const colorsRef = await firestore.collection('colors').get();
        const colors = colorsRef.docs.map(doc => doc.data());
        colors.forEach(async car => {
            await firestore.collection('colors').doc(car.id).delete();
        });
        res.status(200).send({ message: 'All colors deleted' });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.getColor = async (req, res) => {
    //#swagger.tags = ['Colors']
    //#swagger.description = 'Service to get a color'
    //#swagger.summary = 'Service to get a color'
    try {
        const { id } = req.params;
        const carRef = await firestore.collection('colors').doc(id).get();
        const car = carRef.data();
        res.status(200).send(car);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.getAllColor = async (req, res) => {
    //#swagger.tags = ['Colors']
    //#swagger.description = 'Service to get all colors'
    //#swagger.summary = 'Service to get all colors'
    try {
        const colorsRef = await firestore.collection('colors').get();
        const colors = colorsRef.docs.map(doc => doc.data());
        res.status(200).send(colors);
    } catch (error) {
        res.status(400).send(error.message);
    }
}