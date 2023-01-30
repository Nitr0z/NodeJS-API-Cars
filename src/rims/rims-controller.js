const firestore = require('../config/firebase-config');

exports.addRim = async (req, res) => {
    //#swagger.tags = ['Rims']
    //#swagger.description = 'Service to register a new rim'
    //#swagger.summary = 'Service to register a new rim'
    /*#swagger.security = [{
                "Bearer": []
    }]*/
    const {
        model, brand, year, price, description
    } = req.body;
    firestore.collection('rims').add({
        "model": model,
        "brand": brand,
        "year": year,
        "price": price,
        "description": description
    }).then((docRef) => {
        res.status(200).send({"Successful addition! Rim id :" :docRef.id });
    }).catch((error) => {
        res.status(400).send(error.message);
    }
    );
}

exports.updateRim = async (req, res) => {
    //#swagger.tags = ['Rims']
    //#swagger.description = 'Service to update a rim'
    //#swagger.summary = 'Service to update a rim'
    /*#swagger.security = [{
            "Bearer": []
    }]*/
    const {
        model, brand, year, price, description
    } = req.body;
    const { id } = req.params;
    try {
        const rimRef = await firestore.collection('rims').doc(id).get();
        if (rimRef.exists) {
            await firestore.collection('rims').doc(id).update({
                "model": model,
                "brand": brand,
                "year": year,
                "price": price,
                "description": description
            });
            res.status(200).send({"Update of the id :" :id +"successful"});
        } else {
            res.status(404).send({ message: 'rim not found' });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.deleteRim = async (req, res) => {
    //#swagger.tags = ['Rims']
    //#swagger.description = 'Service to delete a rim'
    //#swagger.summary = 'Service to delete a rim'
    /*#swagger.security = [{
            "Bearer": []
    }]*/
    try {
        const { id } = req.params;
        const rimRef = await firestore.collection('rims').doc(id).delete();
        res.status(200).send({"Suppression of the id :" :id +"successful"});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.deleteAllRim = async (req, res) => {
    //#swagger.tags = ['Rims']
    //#swagger.description = 'Service to delete all rims'
    //#swagger.summary = 'Service to delete all rims'
    /*#swagger.security = [{
            "Bearer": []
    }]*/
    try {
        const rimsRef = await firestore.collection('rims').get();
        const rims = rimsRef.docs.map(doc => doc.data());
        rims.forEach(async rim => {
            await firestore.collection('rims').doc(rim.id).delete();
        });
        res.status(200).send({ message: 'All rims deleted' });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.getRim = async (req, res) => {
    //#swagger.tags = ['Rims']
    //#swagger.description = 'Service to get a rim'
    //#swagger.summary = 'Service to get a rim'
    try {
        const { id } = req.params;
        const rimRef = await firestore.collection('rims').doc(id).get();
        const rim = rimRef.data();
        res.status(200).send(rim);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.getAllRim = async (req, res) => {
    //#swagger.tags = ['Rims']
    //#swagger.description = 'Service to get all rims'
    //#swagger.summary = 'Service to get all rims'
    try {
        const rimsRef = await firestore.collection('rims').get();
        const rims = rimsRef.docs.map(doc => doc.data());
        res.status(200).send(rims);
    } catch (error) {
        res.status(400).send(error.message);
    }
}