
const Product =require('../models/Product');

class SellerController {

    async addProduct(req, res, next) {

        try {
            const{
                shopId, 
                uploadImage1, 
                uploadImage2, 
                uploadImage3,
                uploadImage4,
                uploadImage5,
                name, 
                description, 
                listPrice, 
                price, 
                quantity,
                list,
                item,
                child,
                weight, 
                status,
                origin,
                brand,
                dateOfManufacture,
                material,
            }=req.body;
            //Tính ra phần trăm
            var listPriceNum=parseInt(listPrice,10);
            var priceNum=parseInt(price,10);
            var a=priceNum*100;
            var b=a/listPriceNum;
            var percentNum=100-b;
            var percentToFixed=percentNum.toFixed(0);
            console.log(shopId);

            const product=await Product.create({
                shopId: shopId,
                image1: uploadImage1,
                image2: uploadImage2,
                image3: uploadImage3,
                image4: uploadImage4,
                image5: uploadImage5,
                name: name,
                description: description,
                listPrice: listPrice,
                price: price,
                percent: percentToFixed,
                quantity: quantity,
                list:list,
                item:item,
                child:child,
                weight: weight,
                status: status,
                origin:origin,
                brand:brand,
                dateOfManufacture:dateOfManufacture,
                material:material,
            });
            res.json(product);
        } catch (error) {
            console.log(error);
        }
    }

    async showProduct (req, res, next) {
        Product.find({shopId: req.body.shopId})
        .then((product)=>{
            res.json(product)
        }).catch((error)=>{
            console.log(error);
        })
    } 
}


module.exports = new SellerController;