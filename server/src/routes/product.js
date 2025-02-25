const router = require("express").Router();
const productController = require('../controllers/ProductController');
const asyncHandler = require('express-async-handler');

router.get('/show-product', asyncHandler(productController.show));
router.get('/show-category', asyncHandler(productController.showCategory));
router.get('/detail/:id',asyncHandler(productController.detail));
router.get('/review/:id',asyncHandler(productController.review));
router.post('/add-review',asyncHandler(productController.addReview));
router.post('/add-to-cart',asyncHandler(productController.addToCart));


module.exports = router;