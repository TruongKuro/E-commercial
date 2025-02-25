const userRouter = require('./user');
const productRouter = require('./product');
const sellerRouter = require('./seller');
const cartRouter = require('./cart');
const adminRouter = require('./admin');
const uploadRouter = require('./upload');
const chatRouter = require('./chat');
const accountRouter = require('./account');

function route(app) {
    app.use('/user', userRouter);
    app.use('/product', productRouter);
    app.use('/seller', sellerRouter);
    app.use('/cart', cartRouter);
    app.use('/admin', adminRouter);
    app.use('/upload', uploadRouter);
    app.use('/chat', chatRouter);
    app.use('/account', accountRouter);
}
module.exports = route;