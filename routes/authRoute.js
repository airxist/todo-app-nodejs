const express = require('express');
const router = express.Router();
const {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword
} = require('../controllers/authController');
const { requireAuth } = require('../middlewares/authentication');


router.post('/register', register);
router.post('/login', login);
router.delete('/logout', requireAuth, logout);
router.post('/forgotpassword', forgotPassword);
router.post('/resetpassword', resetPassword);


module.exports = router;