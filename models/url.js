// models/url.js
const initializeFirebase = require('../config/firebase');
const db = initializeFirebase();

// Collection reference for URLs in Firestore
const Urls = db.collection('urls');

/**
 * Helper to validate URL data structure before saving to Firestore
 */
const validateUrl = (url) => {
    const errors = [];
    if (!url.urlCode) errors.push("urlCode is required");
    if (!url.longUrl) errors.push("longUrl is required");
    if (!url.shortUrl) errors.push("shortUrl is required");
    return {
        isValid: errors.length === 0,
        errors
    };
};

module.exports = {
    Urls,
    validateUrl
};