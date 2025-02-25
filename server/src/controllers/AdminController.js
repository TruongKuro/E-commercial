const Product=require('../models/Product');
const Category=require('../models/Category');
const User=require('../models/User');
const Order=require('../models/Order');

class AdminController {
    async showProduct (req, res, next) {
        Product.find({})
        .then((product)=>{
            res.json(product)
        }).catch((error)=>{
            console.log(error);
        })
    } 

    async showUser (req, res, next) {
        User.find({role: 'customer'})
        .then((user)=>{
            res.json(user)
        }).catch((error)=>{
            console.log(error);
        })
    } 

    async addCategory(req, res, next) {
        try {

            const category = await Category.create({
                name: req.body.name,
                image: req.body.file,
            });
            res.json(category);
        } catch (error) {
            console.log(error);
        }
    }

    async showOrder (req, res, next) {
        Order.find({})
        .then((order)=>{
            res.json(order);
        }).catch((error)=>{
            console.log(error);
        })
    } 

    async editStatus (req, res, next) {
        try {
            const order = await Order.findOne({_id: req.body.orderId});
            console.log(order); 
            order.status=req.body.status;
            order.dateUpdate=Date.now();

            await order.save();
            res.json(order);
        } catch (error) {
            console.log(error);
        }
    } 

}

module.exports = new AdminController;