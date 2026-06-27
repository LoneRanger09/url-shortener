// models/user.js
const initializeFirebase = require('../config/firebase');
const db = initializeFirebase();
const Users = db.collection('users');

const User = {
  findOne: (query) => {
    const key = Object.keys(query)[0];
    const val = query[key];
    
    const promise = (async () => {
      try {
        const snapshot = await Users.where(key, '==', val).limit(1).get();
        if (snapshot.empty) return null;
        const doc = snapshot.docs[0];
        return {
          id: doc.id,
          _id: doc.id,
          ...doc.data()
        };
      } catch (err) {
        console.error("Firestore User findOne error:", err);
        throw err;
      }
    })();
    
    promise.select = (selectFields) => {
      return promise;
    };
    
    return promise;
  },

  create: async (data) => {
    try {
      const docRef = await Users.add({
        ...data,
        date: new Date().toISOString()
      });
      const doc = await docRef.get();
      return {
        id: doc.id,
        _id: doc.id,
        ...doc.data()
      };
    } catch (err) {
      console.error("Firestore User create error:", err);
      throw err;
    }
  }
};

module.exports = User;