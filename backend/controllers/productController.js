const Product = require("../models/product");
const slugify = require("slugify");
const shortid = require('shortid');

module.exports.createProduct_post = async (req,res) => {
    try{
    const { name, price, description, category, quantity, createdBy } = req.body;
    let productPictures = [];

    if (req.files.length > 0) {
        productPictures = req.files.map((file) => {
        return { img: file.filename };
        });
    }
    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        quantity,
        description,
        productPictures,
        category,
        createdBy: req.user.id,
      });
      await product.save();
      res.status(201).json({product});
    }
    catch(error){
        console.log(error.message);
        res.status(400).json({error})
    }
}