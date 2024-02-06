const httpStatusCodes = require('http-status-codes');
const Category = require('../models/category.model');

// const db = await getDb();
// const admin = db.collection('categories');
class CategoryController{
    getAll = async (req, res) => {
        try {
          const categories = await Category.find({});
          res.json(categories);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      }
      

    add = (req, res) => {
        const body = req.body;
        Category.create(body).then(doc => {
            return res.status(httpStatusCodes.StatusCodes.CREATED).send(doc);
        }).catch(err => {
            return res.status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).send(err);
        });
    }
}

module.exports = CategoryController;