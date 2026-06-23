const express = require('express');
const router = express.Router();
const { redirectToUrl } = require('../controllers/urlController');

// --- ADD THE NEW ROUTE DEFINITION BELOW ---

/**
 * @route   GET /:code
 * @desc    Redirect to the long/original URL
 * @access  Public
 */
router.get('/:code', (req, res) => {
      const { code } = req.params;

   res.status(200).json({
    success: true,
    message: 'Redirect route is working!',
    capturedCode: code,
  });
});
router.get('/:code', redirectToUrl);

module.exports = router;