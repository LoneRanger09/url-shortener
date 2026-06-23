const express = require('express');
const router = express.Router();
const { shortenUrl } = require('../controllers/urlController');

/**
 * @route   POST /api/shorten
 * @desc    Create a new short URL
 * @access  Public
 */

router.post('/shorten', (req, res) => {
  res.status(200).json({ success: true, message: 'Route is working! The controller logic is next.' });
});

router.post('/shorten', shortenUrl);

module.exports = router;