const firestore = require('../config/firebase-config');

exports.addOption = async (req, res) => {
    //#swagger.tags = ['Options']
    //#swagger.description = 'Service to register a new option'
    //#swagger.summary = 'Service to register a new option'
    /*#swagger.security = [{
                "Bearer": []
    }]*/
    const {
        brand, code, name, description, year
    } = req.body;
    firestore.collection('options').add({
        "brand": brand,
        "code": code,
        "name": name,
        "description": description,
        "year": year
    }).then((docRef) => {
        res.status(200).send({"Successful addition! Option id :" :docRef.id });
    }).catch((error) => {
        res.status(400).send(error.message);
    }
    );
}

exports.updateOption = async (req, res) => {
    //#swagger.tags = ['Options']
    //#swagger.description = 'Service to update a option'
    //#swagger.summary = 'Service to update a option'
    /*#swagger.security = [{
            "Bearer": []
    }]*/
    const {
        brand, code, name, description, year
    } = req.body;
    const { id } = req.params;
    try {
        const optionRef = await firestore.collection('options').doc(id).get();
        if (optionRef.exists) {
            await firestore.collection('options').doc(id).update({
                "brand": brand,
                "code": code,
                "name": name,
                "description": description,
                "year": year
            });
            res.status(200).send({"Update of the id :" :id +"successful"});
        } else {
            res.status(404).send({ message: 'option not found' });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.deleteOption = async (req, res) => {
    //#swagger.tags = ['Options']
    //#swagger.description = 'Service to delete a option'
    //#swagger.summary = 'Service to delete a option'
    /*#swagger.security = [{
            "Bearer": []
    }]*/
    try {
        const { id } = req.params;
        const optionRef = await firestore.collection('options').doc(id).delete();
        res.status(200).send({"Suppression of the id :" :id +"successful"});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.deleteAllOption = async (req, res) => {
    //#swagger.tags = ['Options']
    //#swagger.description = 'Service to delete all options'
    //#swagger.summary = 'Service to delete all options'
    /*#swagger.security = [{
            "Bearer": []
    }]*/
    try {
        const optionsRef = await firestore.collection('options').get();
        const options = optionsRef.docs.map(doc => doc.data());
        options.forEach(async option => {
            await firestore.collection('options').doc(option.id).delete();
        });
        res.status(200).send({ message: 'All options deleted' });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.getOption = async (req, res) => {
    //#swagger.tags = ['Options']
    //#swagger.description = 'Service to get a option'
    //#swagger.summary = 'Service to get a option'
    try {
        const { id } = req.params;
        const optionRef = await firestore.collection('options').doc(id).get();
        const option = optionRef.data();
        res.status(200).send(option);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.getAllOption = async (req, res) => {
    //#swagger.tags = ['Options']
    //#swagger.description = 'Service to get all options'
    //#swagger.summary = 'Service to get all options'
    try {
        const optionsRef = await firestore.collection('options').get();
        const options = optionsRef.docs.map(doc => doc.data());
        res.status(200).send(options);
    } catch (error) {
        res.status(400).send(error.message);
    }
}