const express  = require('express');
const CategoryController = require('../controllers/category.controller');

const router = express.Router();
const  categoryController = new CategoryController();

router.get('/', categoryController.getAll);
router.post('/', categoryController.add);

module.exports = router;