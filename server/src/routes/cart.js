const router = require("express").Router();
const cartController = require('../controllers/CartController');
const asyncHandler = require('express-async-handler');

router.post('/',asyncHandler(cartController.show));
router.post('/update/plus',asyncHandler(cartController.updatePlus));
router.post('/update/minus',asyncHandler(cartController.updateMinus));
router.post('/delete',asyncHandler(cartController.delete));

router.get('/checkout/:_id',asyncHandler(cartController.checkout));
router.post('/paying',asyncHandler(cartController.paying));


module.exports = router;