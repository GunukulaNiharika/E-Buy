const Product = require("../models/product");
const slugify = require("slugify");
const shortid = require('shortid');
const Category = require('../models/Category');

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

module.exports.getProductsBySlug = async(req,res) => {
    try{
    const { slug }=req.params;
    const category=await Category.findOne({ slug: slug}).select('_id');
    if(category){
        
        const products=await Product.find({ category: category._id});
        if(products.length>0){
            res.status(200).json({
                products,
                productsByPrice: {
                    under5k: products.filter((product) => product.price <= 5000),
                    under10k: products.filter(
                      (product) => product.price > 5000 && product.price <= 10000
                    ),
                    under15k: products.filter(
                      (product) => product.price > 10000 && product.price <= 15000
                    ),
                    under20k: products.filter(
                      (product) => product.price > 15000 && product.price <= 20000
                    ),
                    under30k: products.filter(
                      (product) => product.price > 20000 && product.price <= 30000
                    ),
                  },
            });
        }
    }
    
    }
    catch(error){
        console.log(error.message);
        res.status(400).json({error});
    }
}