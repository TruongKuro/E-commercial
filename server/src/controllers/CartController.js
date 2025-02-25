const Cart=require('../models/Cart');
const Order=require('../models/Order');

class CartController {

    async show(req, res, next) {
        try {
            Cart.find({customerId: req.body.userId})
                .populate("shopId")
                .populate("items.productId")
                .then((cart)=>{
                    return res.json(cart);
                })
        }catch(error){
            console.log(error);
        }
    }

    async updatePlus(req, res, next){
        try {
            const productId=req.body.productId;
            const cart= await Cart.findOne({ shopId: req.body.shopId }).and({ customerId: req.body.customerId });
            const index = cart.items.findIndex((p) => p.productId == productId);
            if(cart.items[index].quantity<99){
                cart.items[index].quantity+=1;
            }
            await cart.save();
            res.json(cart)
        } catch (error) {
            console.log(error);
        }
    }
    async updateMinus(req, res, next){
         try {
            const productId=req.body.productId;
            const cart= await Cart.findOne({ shopId: req.body.shopId }).and({ customerId: req.body.customerId });
            const index = cart.items.findIndex((p) => p.productId == productId);
            if(cart.items[index].quantity>1){
                cart.items[index].quantity-=1;
            }
            await cart.save();
            res.json(cart)
        } catch (error) {
            console.log(error);
        }
    }

    async delete(req, res, next) {
        try {
            const productId=req.body.productId;
            const cart= await Cart.findOne({ shopId: req.body.shopId }).and({ customerId: req.body.customerId });
            const index = cart.items.findIndex((p) => p.productId == productId);

            if(cart.items.length<=1){
                await cart.deleteOne();
            }else{
                await Cart.findOneAndUpdate({ _id: cart._id},{'$pull':{ 'items':{'_id': cart.items[index]._id }}});
            }
        } catch (error) {
            console.log(error);
        }
    }

    async checkout(req, res, next){
        Cart.findOne({_id: req.params._id})
        .populate("shopId")
        .populate("items.productId")
        .then((cart)=>{
            res.json(cart)
        }).catch((error)=>{
            console.log(error);
        })
    }

    async paying(req, res, next){
        
        const cart=await Cart.findOne({_id: req.body.cartId}).populate("items.productId");
        var total=0;
        try {
            const order=new Order({});
            order.shopId=cart.shopId;
            order.customerId=cart.customerId;
            for(var i=0; i<cart.items.length;i++){
                order.items.push({
                    productId:cart.items[i].productId,
                    image:cart.items[i].productId.image1,
                    name:cart.items[i].productId.name,
                    listPrice:cart.items[i].productId.listPrice,
                    price:cart.items[i].productId.price,
                    quantity:cart.items[i].quantity,
                    sum:cart.items[i].productId.price*cart.items[i].quantity,
                });
                total=cart.items[i].productId.price*cart.items[i].quantity+total;
            }
            order.total=total;
            //order.shippingFee=req.body.shippingFee;
            //order.totalPayment=total+req.body.shippingFee;
            //order.note=req.body.note;
            order.receiver=req.body.receiver;
            order.phoneNumber=req.body.phoneNumber;
            order.address=req.body.address;
            await cart.deleteOne();
            await order.save();
            res.json(order);
        } catch (error) {
            console.log(error);
        }
    }


}

module.exports = new CartController;