const express = require('express');
const router = express.Router();
const ServiceController = require('../controllers/service.controller');

const serviceController = new ServiceController();
const multer = require('multer');
const uploadNone = multer().none();

router.post('/',uploadNone,serviceController.applyService);

module.exports = router;