// config/firebase.js
const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const { getApps } = require("firebase-admin/app");

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } catch (err) {
    console.error("Error parsing FIREBASE_SERVICE_ACCOUNT env variable:", err);
    throw err;
  }
} else {
  try {
    serviceAccount = require("../serviceAccountKey.json");
  } catch (err) {
    console.error("Firebase serviceAccountKey.json not found and FIREBASE_SERVICE_ACCOUNT env variable is missing!");
    throw err;
  }
}

if (getApps().length === 0) {
  admin.initializeApp({
    credential: admin.cert(serviceAccount)
  });
  console.log("Firebase Database Connected!");
}

module.exports = () => getFirestore();
