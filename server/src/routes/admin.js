const router = require("express").Router();
const adminController = require('../controllers/AdminController');
const asyncHandler = require('express-async-handler');

router.get('/show-product',asyncHandler(adminController.showProduct));
router.get('/show-user',asyncHandler(adminController.showUser));
router.post('/post/add-category',asyncHandler(adminController.addCategory));
router.get('/show-order',asyncHandler(adminController.showOrder));
router.post('/edit-status',asyncHandler(adminController.editStatus));

module.exports = router;