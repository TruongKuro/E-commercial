const router = require("express").Router();
const accountController = require('../controllers/AccountController');
const asyncHandler = require('express-async-handler');

router.post('/edit-profile',asyncHandler(accountController.editProfile));
router.post('/add-address',asyncHandler(accountController.addAddress));
router.post('/show-address',asyncHandler(accountController.showAddress));
router.post('/delete-address',asyncHandler(accountController.deleteAddress));

router.post('/change-password',asyncHandler(accountController.changePassword));

router.post('/show-order',asyncHandler(accountController.showOrder));
router.post('/cancel-order',asyncHandler(accountController.cancelOrder));
router.post('/repurchase',asyncHandler(accountController.repurchase));

router.post('/show-product-review',asyncHandler(accountController.showProductReview));



module.exports = router;