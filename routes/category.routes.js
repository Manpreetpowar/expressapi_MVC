const express  = require('express');
const CategoryController = require('../controllers/category.controller');
const {CreateCategoryValidate,UpdateCategoryValidate} = require('../utils/categoryValidation');
const router = express.Router();
const  categoryController = new CategoryController();
const multer = require('multer');


// Set up Multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// validate('createItem'), 
router.get('/',categoryController.getAllItems);
router.get('/:id',categoryController.getSingleItem);
router.put('/:id',upload.single('image'),UpdateCategoryValidate, categoryController.updateItem);
router.post('/', upload.single('image'), CreateCategoryValidate,categoryController.addItem);
router.delete('/:id', categoryController.deleteItem);


module.exports = router;