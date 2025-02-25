const router = require("express").Router();
const sellerController = require('../controllers/SellerController');
const asyncHandler = require('express-async-handler');

router.post('/post/add-product',asyncHandler(sellerController.addProduct));
router.post('/show-product',asyncHandler(sellerController.showProduct));

module.exports = router;