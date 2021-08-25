const { Schema, model } = require('mongoose');


const productSchema = Schema({

    name: {
        type: String,
        required: [true, 'The product name is required'],
    },
    price: {
        type: Number,
        default: 0
    },
    categorie: {
        type: Schema.Types.ObjectId,
        ref: 'Categorie',
        required: true
    },
    description: {
        type: String

    },
    available: {
        type: Boolean,
        default: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    img: { type: String }

});


module.exports = model('Product', productSchema);