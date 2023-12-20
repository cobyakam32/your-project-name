const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/protected', verifyToken, (req, res) => {
  res.json({ success: true, message: 'You have access to this protected route!' });
});

module.exports = router;
