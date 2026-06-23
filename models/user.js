// models/user.js
const initializeFirebase = require('../config/firebase');
const db = initializeFirebase();

// Collection reference for Users in Firestore
const Users = db.collection('users');

/**
 * Helper to validate user data structure before saving to Firestore
 * (Since Firestore is schema-less, we validate documents in application logic)
 */
const validateUser = (user) => {
    const errors = [];
    if (!user.name) errors.push("Name is required");
    
    if (!user.email) {
        errors.push("Email is required");
    } else {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(user.email)) {
            errors.push("Please provide a valid email address");
        }
    }
    
    if (!user.password || user.password.length < 6) {
        errors.push("Password must be at least 6 characters long");
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
};

module.exports = {
    Users,
    validateUser
};