const { Router } = require('express');
const authController=require('../controllers/authController.js');
const { validateUserLogin, validateUserRegister, isRequestValidated}=require('../validators/authValidator')
const {requireSignIn} = require('../middleware/auth')

const router = Router();

router.get('/',requireSignIn,authController.checkUser);
router.post('/register',validateUserRegister, isRequestValidated,authController.register_post);
router.post('/login',validateUserLogin,isRequestValidated,authController.login_post);
module.exports = router;
