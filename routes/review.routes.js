const express  = require('express');
const ReviewController = require('../controllers/review.controller');
const {AddReviewValidate} = require('../utils/reviewValidation');
const router = express.Router();
const  reviewController = new ReviewController();

const multer = require('multer');
const uploadNone = multer().none();

router.post('/',uploadNone,AddReviewValidate, reviewController.addReview);




module.exports = router;