const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete')

const Product = new Schema({
    shopId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String },
    description: { type: String },
    listPrice: { type: Number },
    percent: { type: Number },
    price: { type: Number },
    quantity: { type: Number },
    origin: { type: String},
    brand: { type: String},
    dateOfManufacture: { type: String},
    material: { type: String},
    list: { type: String},
    item: { type: String },
    child: { type: String },
    weight: { type: Number },
    status: { type: String },
    image1: { type: String },
    image2: { type: String },
    image3: { type: String },
    image4: { type: String },
    image5: { type: String },
    sold: { type: Number, default: 0 },
    review: { type: Number, default: 0 }

}, { collection: 'products' });

mongoose.plugin(slug);
Product.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('Product', Product);