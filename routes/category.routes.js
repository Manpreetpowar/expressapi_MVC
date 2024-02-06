const express  = require('express');
const CategoryController = require('../controllers/category.controller');

const router = express.Router();
const  categoryController = new CategoryController();
const { body, validationResult } = require('express-validator');

// Validation middleware
const validate = (method) => {
  switch (method) {
    case 'createItem':
      return [
        body('name').notEmpty().withMessage('Name is required'),
        body('category_type').notEmpty().withMessage('Price is required'),
      ];
    case 'updateItem':
      return [
        body('name').optional().notEmpty().withMessage('Name is required'),
        body('price').optional().notEmpty().withMessage('Price is required').isNumeric().withMessage('Price should be a number'),
      ];
  }
};
// validate('createItem'), 
router.get('/',categoryController.getAllItems);
router.get('/:id',categoryController.getSingleItem);
router.put('/:id', categoryController.updateItem);
router.post('/', categoryController.addItem);
router.delete('/:id', categoryController.deleteItem);


module.exports = router;