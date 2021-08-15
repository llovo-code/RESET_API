const { Schema, model } = require('mongoose');

const categorieSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
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
    }

});


categorieSchema.methods.toJSON = function() {
    const { __v, state, ...data } = this.toObject();

    return data;
}

module.exports = model('Categorie', categorieSchema);