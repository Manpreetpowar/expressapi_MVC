const httpStatusCodes = require('http-status-codes');
const Category = require('../models/category.model');
const ApiResponse = require('./api.response');
const { validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs').promises;
const {paginate} = require('../utils/paginate');
class CategoryController{
  
  //GET ALL RECORDS ********************
  getAllItems = async (req, res) => {
        try {
          const page = parseInt(req.query.page) || 1;
          const pageSize = parseInt(req.query.pageSize) || 10;
          const {items, pagination} = await paginate(Category, {}, page, pageSize);

          // const categories = await Category.find({});
          const response = new ApiResponse(200, 'Categories list', { items, pagination });
          response.send(res);
        } catch (error) {
          const response = new ApiResponse(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR, error.message, {});
          response.send(res);
        }
    }
      
    //ADD SINGLE RECORD ********************
    addItem = async (req, res) => {
      const body_data = req.body;
       const existCategory = await Category.findOne({name:req.body.name});
        if(existCategory){
          const response = new ApiResponse(httpStatusCodes.StatusCodes.CONFLICT, 'Category name is already exists', {});
         return response.send(res);
        }
          if (req.file) {
            body_data.image = req.file.filename; // Assuming 'profile_image' is the field name in the model
        }
        Category.create(body_data).then(doc => {
          const response = new ApiResponse(httpStatusCodes.StatusCodes.CREATED, 'Category has been created', doc);
          response.send(res);
        }).catch(error => {
            const response = new ApiResponse(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR, error.message, {});
            response.send(res);
        });
    }

    //SINGLE RECORD FETCHING ********************
    getSingleItem = async (req, res) => {
      try {
        const item = await Category.findById(req.params.id);
        let statusCode, message, data;
        if (!item) {
          statusCode = httpStatusCodes.StatusCodes.NOT_FOUND;
          message = 'Category not found';
          data = {};
        } else {
          statusCode = httpStatusCodes.StatusCodes.OK;
          message = 'Category data';
          data = item;
        }
        const response = new ApiResponse(statusCode, message, data);
         response.send(res);
      } catch (error) {
            // Customize the error message based on the error type
          let errorMessage;
          if (error.name === 'CastError') {
            errorMessage = 'Invalid category ID format';
          } else {
            errorMessage = 'Internal Server Error';
          }

          const response = new ApiResponse(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR, errorMessage, {});
          response.send(res);
      }
    }

    //UPDATE ITEM*****************
    updateItem = async (req, res) => {
        try {
          const existCategory = await Category.findOne({ name: req.body.name, type: { $ne: req.params.id} });
          if(existCategory){
            const response = new ApiResponse(httpStatusCodes.StatusCodes.CONFLICT, 'Category name is already exists', {});
           return response.send(res);
          }
          
          const updatedItem = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
          let statusCode, message, data;
          if (!updatedItem) {
            statusCode = httpStatusCodes.StatusCodes.NOT_FOUND;
            message = 'Category not found';
            data = {};
          } else {
            statusCode = httpStatusCodes.StatusCodes.OK;
            message = 'Category has been updated';
            data = updatedItem;
          }
          const response = new ApiResponse(statusCode, message, data);
          response.send(res);
        } catch (error) {
          let errorMessage;
          if (error.name === 'CastError') {
            errorMessage = 'Invalid category ID format';
          } else {
            errorMessage = 'Internal Server Error';
          }

          const response = new ApiResponse(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR, errorMessage, {});
          response.send(res);
        }
    }

    deleteItem = async(req, res) => {
      try {
        const deletedItem = await Category.findByIdAndDelete(req.params.id);
        let statusCode, message, data;
        if (!deletedItem) {
          statusCode = httpStatusCodes.StatusCodes.NOT_FOUND;
          message = 'Category not found';
          data = {};
        } else {
          statusCode = httpStatusCodes.StatusCodes.OK;
          message = 'Category has been deleted';
          data = deletedItem;
        }
         // Construct the path to the image file
         const imagePath = path.join(__dirname, '../uploads', deletedItem.image);

         // Check if the image file exists before attempting to delete it
         try {
             await fs.access(imagePath, fs.constants.F_OK);
             // File exists, delete it
             await fs.unlink(imagePath);
         } catch (error) {
             if (error.code !== 'ENOENT') {
                 // Handle other errors (excluding 'ENOENT' which indicates file not found)
                 console.error('Error deleting image:', error);
             }
         }

        const response = new ApiResponse(statusCode, message, data);
        response.send(res);
      } catch (error) {
        const response = new ApiResponse(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR, error.message, {});
        response.send(res);
      }
    }
}

module.exports = CategoryController;