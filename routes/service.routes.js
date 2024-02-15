const express = require('express');
const router = express.Router();
const ServiceController = require('../controllers/service.controller');

const serviceController = new ServiceController();

router.post('/',serviceController.applyService);

module.exports = router;