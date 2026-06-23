require('dotenv').config();
const express = require('express');
const app = express();
const initializeFirebase = require('./config/firebase');

initializeFirebase();

app.get('/', (req, res) => {
    res.send('Api Running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});