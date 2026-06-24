const express = require('express');
const router = express.Router();
const { getMyLinks } = require('../controllers/linksController');

/**
 * @route   GET /api/links/my-links
 * @desc    Get all links created by the logged-in user
 * @access  Private (will be protected in the next task)
 */
router.get('/my-links',auth,getMyLinks, (req, res) => {
      res.status(200).json({ success: true, message: 'My Links route is working!' });

    res.status(200).json({
    success: true,
    message: 'My Links route is working! (Middleware was applied)',
  
    });
    });

module.exports = router;