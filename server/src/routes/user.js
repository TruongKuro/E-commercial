const router = require("express").Router();
const userController = require('../controllers/UserController');
const asyncHandler = require('express-async-handler');

router.post('/register',asyncHandler(userController.register));
router.post('/login',asyncHandler(userController.login));
router.post('/logout',asyncHandler(userController.logout));


module.exports = router;