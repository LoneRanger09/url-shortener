// config/firebase.js
const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const { getApps } = require("firebase-admin/app");

if (getApps().length === 0) {
  let serviceAccount;
  try {
    serviceAccount = require("../serviceAccountKey.json");
  } catch (err) {
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      try {
        serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      } catch (parseErr) {
        console.error("Error parsing FIREBASE_SERVICE_ACCOUNT env variable:", parseErr);
        throw parseErr;
      }
    } else {
      console.error("Firebase serviceAccountKey.json not found and FIREBASE_SERVICE_ACCOUNT is missing!");
      throw err;
    }
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  console.log("Firebase Database Connected (url-shortener-09)!");
}

module.exports = () => getFirestore();


