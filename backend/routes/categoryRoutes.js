const { Router } = require('express');
const categoryController=require('../controllers/categoryController');
const {  adminMiddleware, requireSignIn} = require('../middleware/auth');
const multer = require('multer');
const shortid= require('shortid');
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + "-" + file.originalname);
    },
});
const upload = multer({storage})

const router = Router();
router.post('/category/create',requireSignIn,adminMiddleware, upload.single('categoryImage'), categoryController.addCategory_post);
router.get('/category/getcategory',categoryController.getCategories_get);

module.exports = router;