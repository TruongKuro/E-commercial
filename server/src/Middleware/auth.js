const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const protect = asyncHandler(async (req, res, next) => {
    try {
		let token = req.headers.authorization;
		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		req.user = await User.findById(decoded.id).select('-password')

		next()
	} catch (error) {
		console.error(error)
		res.status(401)
		throw new Error('Not authorized, token failed')
	}

    if (!token) {
		res.status(401)
		throw new Error('Not authorized, no token')
	}    
})

const admin = asyncHandler(async (req, res, next) => {
    try {
        
    } catch (error) {
        console.error(error)
		res.status(401)
    }
})

module.exports= {protect, admin};