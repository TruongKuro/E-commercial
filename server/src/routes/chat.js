const router = require("express").Router();
const chatController = require('../controllers/ChatController');
const asyncHandler = require('express-async-handler');


router.post('/list-chat', asyncHandler(chatController.listChat));
router.post('/show', asyncHandler(chatController.show));
router.post('/add-chat', asyncHandler(chatController.addChat));

module.exports = router;