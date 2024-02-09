const express  = require('express');
const CategoryController = require('../controllers/category.controller');

const router = express.Router();
const  categoryController = new CategoryController();

// validate('createItem'), 
router.get('/',categoryController.getAllItems);
router.get('/:id',categoryController.getSingleItem);
router.put('/:id', categoryController.updateItem);
router.post('/', categoryController.addItem);
router.delete('/:id', categoryController.deleteItem);


module.exports = router;