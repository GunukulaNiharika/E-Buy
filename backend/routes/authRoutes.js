const { Router } = require('express');
const authController=require('../controllers/authController.js')
const auth = require('../middleware/auth')

const router = Router();

router.get('/',auth,authController.checkUser);
router.post('/register',authController.validateUserRegister,authController.register_post);
router.post('/login',authController.validateUserLogin,authController.login_post);
module.exports = router;
