const express = require('express');
const router = express.Router();

router.use('/categories', require('./category.routes'));
router.use('/users', require('./user.routes'));
router.use('/reviews', require('./review.routes'));


module.exports = router;