const firestore = require('../config/firebase-config');

exports.addConsumer = async (req, res) => {
    //#swagger.tags = ['Consumers']
    //#swagger.description = 'Service to register a new consumer'
    //#swagger.summary = 'Service to register a new consumer'
    /*#swagger.security = [{
                "Bearer": []
    }]*/
    const {
        name, email, phone, address, city, zipCode, country
    } = req.body;
    firestore.collection('consumers').add({
        "name": name,
        "email": email,
        "phone": phone,
        "address": address,
        "city": city,
        "zipCode": zipCode,
        "country": country
    }).then((docRef) => {
        res.status(200).send({"Successful addition! consumer id :" :docRef.id });
    }).catch((error) => {
        res.status(400).send(error.message);
    }
    );
}

exports.updateConsumer = async (req, res) => {
    //#swagger.tags = ['Consumers']
    //#swagger.description = 'Service to update a consumer'
    //#swagger.summary = 'Service to update a consumer'
    /*#swagger.security = [{
            "Bearer": []
    }]*/
    const {
        name, email, phone, address, city, zipCode, country
    } = req.body;
    const { id } = req.params;
    try {
        const consumerRef = await firestore.collection('consumers').doc(id).get();
        if (consumerRef.exists) {
            await firestore.collection('consumers').doc(id).update({
                "name": name,
                "email": email,
                "phone": phone,
                "address": address,
                "city": city,
                "zipCode": zipCode,
                "country": country
            });
            res.status(200).send({"Update of the id :" :id +"successful"});
        } else {
            res.status(404).send({ message: 'consumer not found' });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.deleteConsumer = async (req, res) => {
    //#swagger.tags = ['Consumers']
    //#swagger.description = 'Service to delete a consumer'
    //#swagger.summary = 'Service to delete a consumer'
    /*#swagger.security = [{
            "Bearer": []
    }]*/
    try {
        const { id } = req.params;
        const consumerRef = await firestore.collection('consumers').doc(id).delete();
        res.status(200).send({"Suppression of the id  :" :id +"successful"});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.deleteAllConsumer = async (req, res) => {
    //#swagger.tags = ['Consumers']
    //#swagger.description = 'Service to delete all consumers'
    //#swagger.summary = 'Service to delete all consumers'
    /*#swagger.security = [{
            "Bearer": []
    }]*/
    try {
        const consumersRef = await firestore.collection('consumers').get();
        const consumers = consumersRef.docs.map(doc => doc.data());
        consumers.forEach(async consumer => {
            await firestore.collection('consumers').doc(consumer.id).delete();
        });
        res.status(200).send({ message: 'All consumers deleted' });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.getConsumer = async (req, res) => {
    //#swagger.tags = ['Consumers']
    //#swagger.description = 'Service to get a consumer'
    //#swagger.summary = 'Service to get a consumer'
    try {
        const { id } = req.params;
        const consumerRef = await firestore.collection('consumers').doc(id).get();
        const consumer = consumerRef.data();
        res.status(200).send(consumer);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.getAllConsumer = async (req, res) => {
    //#swagger.tags = ['Consumers']
    //#swagger.description = 'Service to get all consumers'
    //#swagger.summary = 'Service to get all consumers'
    try {
        const consumersRef = await firestore.collection('consumers').get();
        const consumers = consumersRef.docs.map(doc => doc.data());
        res.status(200).send(consumers);
    } catch (error) {
        res.status(400).send(error.message);
    }
}