const { Router } = require('express');
const categoryController=require('../controllers/categoryController');
const {  adminMiddleware, requireSignIn} = require('../middleware/auth')

const router = Router();
router.post('/category/create',requireSignIn,adminMiddleware,categoryController.addCategory_post);
router.get('/category/getcategory',categoryController.getCategories_get);

module.exports = router;