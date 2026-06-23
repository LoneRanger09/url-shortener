// config/firebase.js
const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.cert(serviceAccount)
});

console.log("Firebase Database Connected!");

module.exports = () => getFirestore();
