const Product=require('../models/Product');
const Category=require('../models/Category');
const Review=require('../models/Review');
const Cart=require('../models/Cart');
const jwt = require('jsonwebtoken');

class ProductController {
    

    async show(req, res, next) {
        //console.log(req.session.user);
        try {
            Product.find().then((product) => {
                res.json(product);
            });
        } catch (error) {
            console.log(error);
        }
    }
    async showCategory(req, res, next) {
         try {
            Category.find().then((category) => {
                res.json(category);
            });
        } catch (error) {
            console.log(error);
        }
    }
    async detail(req, res, next) {
        
        try {
           Product.findOne({_id: req.params.id})
           .then((product)=>{
                res.json(product);
           });
        } catch (error) {
             console.log(error);
        }
    }

    async review(req, res, next) {
        // Review.find({productId: req.body.productId})
        // .populate("userId","avatar name")
        // .exec((review)=>{
        //     res.json(review);
        // });
    }

    async addReview(req, res, next){
        const {userId, productId, starNumber, content}=req.body;
        const  review = new Review({});
        review.productId=productId;
        review.items.push({
            userId: userId,
            starNumber: starNumber,
            content:content,   
        })
        await review.save();
        return res.json(review);
    }

    async addToCart (req, res, next) {
        
        var {shopId,customerId, productId, quantity}=req.body;
        //const product = await Product.findOne({ _id: productId });
        const cart = await Cart.findOne({ shopId: shopId }).and({ customerId: customerId });
        try {
            quantity=Number.parseInt(quantity, 10);
            if (cart != null){
                const index = cart.items.findIndex((p) => p.productId == productId);
                if (index > -1) {
                    var qty=cart.items[index].quantity+quantity;
                    if(qty>99){
                        cart.items[index].quantity=99;
                    }else{
                        cart.items[index].quantity+=quantity
                    }
                    cart.items[index].date=Date.now();
                    cart.createDate=Date.now();
                    console.log("Cập nhật số lượng cho sản phẩm!");
                } else {
                    cart.items.push({
                        productId: productId,
                        quantity: quantity,
                    });
                    cart.createDate=Date.now();
                    console.log("Chưa có thì thêm mới!");
                }
                await cart.save();
                res.json(cart);
            }else{
                //User chưa chọn sản phẩm nào của shop
                const newCart = new Cart({})
                newCart.shopId = shopId;
                newCart.customerId = customerId;
                newCart.items.push({
                    productId: productId,
                    quantity: quantity,
                });
                await newCart.save();
                res.json(newCart);
                console.log("User chưa đặt sp của shop này lần nào!");
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new ProductController;