const httpStatusCodes = require('http-status-codes');
const Category = require('../models/category.model');
const ApiResponse = require('./api.response');
const { validationResult } = require('express-validator');
// const db = await getDb();
// const admin = db.collection('categories');
class CategoryController{
  
  //GET ALL RECORDS ********************
  getAllItems = async (req, res) => {
        try {
          const categories = await Category.find({});
          const response = new ApiResponse(200, 'Categories list', categories);
          response.send(res);
        } catch (error) {
          const response = new ApiResponse(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR, error.message, {});
          response.send(res);
        }
    }
      
    //ADD SINGLE RECORD ********************
    addItem = (req, res) => {
      const body_data = req.body;
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
          message = 'Data not found';
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
          const updatedItem = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
          let statusCode, message, data;
          if (!updatedItem) {
            statusCode = httpStatusCodes.StatusCodes.NOT_FOUND;
            message = 'Data not found';
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
          message = 'Data not found';
          data = {};
        } else {
          statusCode = httpStatusCodes.StatusCodes.OK;
          message = 'Category has been deleted';
          data = deletedItem;
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