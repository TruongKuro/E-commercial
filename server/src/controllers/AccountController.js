const User=require('../models/User');
const Address=require('../models/Address');
const Order=require('../models/Order');
const Cart=require('../models/Cart');
const bcrypt=require("bcrypt");

class AccountController {
    async editProfile(req, res, next) {
        const {userId, image, name, phoneNumber, gender, day, month, year}=req.body;

        const user= await User.findOne({_id: userId});

        user.avatar=image;
        user.name=name;
        user.phoneNumber=phoneNumber;
        user.gender=gender;
        user.day=day;
        user.month=month;
        user.year=year;
        
        await user.save();
        res.json(user);
    }

    async addAddress(req, res, next) {
        try {
            const {userId, name, phoneNumber, valueCity, valueDistrict, valueWard, detail, type}=req.body;
            console.log(req.body);
            const address=await Address.create({
                userId: userId,
                name: name,
                phoneNumber: phoneNumber,
                city: valueCity,
                district: valueDistrict,
                ward: valueWard,
                detail: detail,
                type: type,
            });

            res.json(address);
        } catch (error) {
            console.log(error);
        }
    }

    async showAddress (req, res, next) {
        Address.find({userId: req.body.userId})
        .then((address)=>{
            res.json(address);
        }).catch(error=> {
            console.log(error);
        })
    } 

    async deleteAddress(req, res, next) {
        try {
            await Address.deleteOne({_id: req.body.addressId});
        } catch (error) {
            console.log(error);
        }
    }
    async changePassword (req, res, next) {
        const oldPass = req.body.oldPassword;
        const newPass = req.body.newPassword;
        const errors=[];
        try {
            User.findOne({ _id: req.body.userId }).then((user) => {
            bcrypt.compare(oldPass, user.password, function(err, result) {
                if (result) {
                    errors.push({ msg: 'Mật khẩu cũ khác mật khẩu hiện tại của bạn!' });
                    
                } else {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newPass, salt, (err, hash) => {
                            if (err) throw err;
                            user.password = hash;
                            user.save();
                        });
                    });     
                }
            });
                res.json(user);
            });
        } catch (error) {
            console.log(error);
        }
       

    }
    async showOrder (req, res, next) {
        try {
            Order.find({customerId: req.body.userId})
            .populate("items.productId")
            .populate("shopId").then((order)=>{
                res.json(order);
            })
        } catch (error) {
            console.log(error);
        }
    }

    async cancelOrder (req, res, next) {
        try {
            const order = await Order.findOne({_id: req.body.orderId});
            console.log(order); 
            order.status='cancelled';
            order.dateUpdate=Date.now();

            await order.save();
            res.json(order);
        } catch (error) {
            console.log(error);
        }
    }
    async repurchase (req, res, next) {
        try {
            const {shopId, customerId, orderId}=req.body;
            const cart = await Cart.findOne({ shopId: shopId }).and({ customerId: customerId });
            const order = await Order.findOne({orderId: orderId});
            if (cart != null){
                // for(var i=0; i<order.items.length;i++){
                //     const index = cart.items.findIndex((p) => p.productId == order.items[i].productId);
                //     console.log(cart.items.findIndex((p) => p.productId == order.items[i].productId))
                // }
                // await cart.save();
                // res.json(cart);
                for(var i=0; i<order.items.length; i++){
                    var index = cart.items.findIndex(p => p.productId !== order.items[i].productId);
                    if (index > -1) {
                        cart.items[index].quantity+=order.items[i].quantity;
                        cart.items[index].date=Date.now();
                        cart.createDate=Date.now();
                    }else{
                        cart.items.push({
                            productId: order.items[i].productId,
                            quantity: order.items[i].quantity,
                        });
                        cart.createDate=Date.now();
                    }
                }
                await cart.save();
                res.json(cart);
            }else {
                const newCart=new Cart({});
                newCart.shopId=shopId;
                newCart.customerId=customerId;
                for(var i=0; i<order.items.length;i++){
                    newCart.items.push({
                        productId: order.items[i].productId,
                        quantity: order.items[i].quantity,
                    });
                }
                await newCart.save();
                res.json(newCart);
            }

        } catch (error) {
            console.log(error);
        }
    }

    async showProductReview (req, res, next) {
        try {    
            const orderItem=req.body.itemId;
            const order = await Order.findOne({_id: req.body.orderId});
            const index = order.items.findIndex((p) => p._id == orderItem);
            const product = await order.items[index];
            res.json(product);
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = new AccountController;