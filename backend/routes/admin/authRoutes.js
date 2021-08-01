const { Router } = require('express');
const authController=require('../../controllers/admin/authController');
const { validateUserLogin, validateUserRegister, isRequestValidated}=require('../../validators/authValidator')

const {requireSignIn} = require('../../middleware/auth')

const router = Router();

router.get('/admin',requireSignIn,authController.checkUser);
router.post('/admin/register',validateUserRegister, isRequestValidated,authController.register_post);
router.post('/admin/login',validateUserLogin,isRequestValidated,authController.login_post);
router.post('/admin/logout',requireSignIn,authController.logout_post);
module.exports = router;
