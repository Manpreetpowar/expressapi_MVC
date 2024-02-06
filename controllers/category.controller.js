const httpStatusCodes = require('http-status-codes');
const Category = require('../models/category.model');

const { validationResult } = require('express-validator');
// const db = await getDb();
// const admin = db.collection('categories');
class CategoryController{
  
  //GET ALL RECORDS ********************
  getAllItems = async (req, res) => {
        try {
          const categories = await Category.find({});
          res.json(categories);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
    }
      
    //ADD SINGLE RECORD ********************
    addItem = (req, res) => {
      const body_data = req.body;
        Category.create(body_data).then(doc => {
            return res.status(httpStatusCodes.StatusCodes.CREATED).send(doc);
        }).catch(err => {
            return res.status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).send(err);
        });
    }

    //SINGLE RECORD FETCHING ********************
    getSingleItem = async (req, res) => {
      try {
        const item = await Category.findById(req.params.id);
        if(!item){
          return res.status(httpStatusCodes.StatusCodes.NOT_FOUND);
        }
        return res.status(httpStatusCodes.StatusCodes.OK).send(item);
      } catch (error) {
        return res.status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).send(error);
      }
    }

    //UPDATE ITEM*****************
    updateItem = async (req, res) => {
        try {
          const updatedItem = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
          if (!updatedItem) {
            return res.status(httpStatusCodes.StatusCodes.NOT_FOUND);
          }
          return res.status(httpStatusCodes.StatusCodes.OK).send(updatedItem);
        } catch (error) {
          return res.status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).send(error);
        }
    }

    deleteItem = async(req, res) => {
      try {
        const deletedItem = await Category.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
          return res.status(httpStatusCodes.StatusCodes.NOT_FOUND).json({ error: 'Item not found' });
        }
        res.status(httpStatusCodes.StatusCodes.OK).json({ message: 'Item deleted successfully' });
      } catch (error) {
        return res.status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).send(error);
      }
    }
}

module.exports = CategoryController;