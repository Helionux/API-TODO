const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');



router.get('/admin', auth, admin, authCtrl.getAllUsers)



router.get('/users', auth, admin, authCtrl.getAllUsers);
router.post('/signup', authCtrl.signup);
router.post('/login', authCtrl.login);




module.exports = router;