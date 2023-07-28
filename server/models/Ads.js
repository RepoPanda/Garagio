const { model, Schema } = require('mongoose');

const adsSchema = new Schema({
    title: {
        type: String,
        required: true,
      },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
      },
    price: {
        type: Number,
    },
    quantity: {
        type: Number,
        min: 0,
        default: 0  
    },
    location: {
        type: String,
    },
    sold: {
        type: Boolean,
        default:false,
    },
});


const Ads = model('Ads', adsSchema)

module.exports = Ads;