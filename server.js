require('dotenv').config();
const express = require('express');
const app = express();
const initializeFirebase = require('./config/firebase');
const urlRoutes = require('./routes/urls');
app.use(express.json());
app.use('/api', urlRoutes);


initializeFirebase();

app.get('/', (req, res) => {
    res.send('Api Running...');
});


const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const linksRoutes = require('./routes/links');
app.use('/api/links', linksRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});