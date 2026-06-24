const express = require('express');
const router = express.Router();
const { shortenUrl } = require('../controllers/urlController');
const auth = require('../middleware/auth');

/**
 * @route   POST /api/shorten
 * @desc    Create a new short URL
 * @access  Public
 */

router.post('/shorten',auth,shortenUrl);

module.exports = router;