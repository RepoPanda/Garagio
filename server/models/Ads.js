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
    location: {
        type: String,
    },
    sold: {
        type: Boolean,
    },
});


const Ads = model('Ads', adsSchema)

module.exports = Ads;