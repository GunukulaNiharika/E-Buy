const { Router } = require('express');
const authController=require('../../controllers/admin/authController');
const auth = require('../../middleware/auth')

const router = Router();

router.get('/admin',auth,authController.checkUser);
router.post('/admin/register',authController.validateUserRegister,authController.register_post);
router.post('/admin/login',authController.validateUserLogin,authController.login_post);
module.exports = router;
