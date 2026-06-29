// models/url.js
const initializeFirebase = require('../config/firebase');
const db = initializeFirebase();
const Urls = db.collection('urls');

const Url = {
  findOne: async (query) => {
    try {
      const key = Object.keys(query)[0];
      const val = query[key];
      const snapshot = await Urls.where(key, '==', val).limit(1).get();
      if (snapshot.empty) return null;
      
      const doc = snapshot.docs[0];
      const data = doc.data();
      return {
        id: doc.id,
        _id: doc.id,
        clicks: data.clicks || 0,
        ...data,
        save: async function() {
          await Urls.doc(doc.id).update({
            clicks: this.clicks
          });
        }
      };
    } catch (err) {
      console.error("Firestore findOne error:", err);
      throw err;
    }
  },

  create: async (data) => {
    try {
      const newDoc = {
        ...data,
        clicks: 0,
        date: new Date().toISOString()
      };
      const docRef = await Urls.add(newDoc);
      return {
        id: docRef.id,
        _id: docRef.id,
        ...newDoc
      };
    } catch (err) {
      console.error("Firestore create error:", err);
      throw err;
    }
  },

  find: (query) => {
    const key = Object.keys(query)[0];
    const val = query[key];
    
    const promise = (async () => {
      try {
        const snapshot = await Urls.where(key, '==', val).get();
        const results = [];
        snapshot.forEach(doc => {
          results.push({
            id: doc.id,
            _id: doc.id,
            ...doc.data()
          });
        });
        return results;
      } catch (err) {
        console.error("Firestore find error:", err);
        throw err;
      }
    })();

    promise.sort = (sortQuery) => {
      return (async () => {
        const results = await promise;
        return results.sort((a, b) => new Date(b.date) - new Date(a.date));
      })();
    };

    return promise;
  }
};

module.exports = Url;