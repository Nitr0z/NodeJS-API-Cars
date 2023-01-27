var admin = require("firebase-admin");

var serviceAccount = require("../../ressources/private-key/apiboc-be989-firebase-adminsdk-5z6rc-e1705788be.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();

module.exports = firestore;