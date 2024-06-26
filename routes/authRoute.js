const express = require('express');
const router = express.Router();
const {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword
} = require('../controllers/authController');
const { authentication } = require('../middlewares/authentication');


router.post('/register', register);
router.post('/login', login);
router.delete('/logout', authentication, logout);
router.post('/forgotpassword', forgotPassword);
router.post('/resetpassword', resetPassword);


module.exports = router;