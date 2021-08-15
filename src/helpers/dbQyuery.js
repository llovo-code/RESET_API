const { model, Types } = require('mongoose');


const searchByIdModel = async(_model = model, id, populate = false, object = null) => {
    const data = (populate) ? await _model.findById(id).populate(object) : await _model.findById(id);
    return data;
}



const searchAnyDModel = async(_model = model, dsearch, extra = null) => {
    const collection = _model.prototype.collection.modelName;
    const regex = new RegExp(dsearch, 'i');
    let data = null;
    switch (collection) {
        case 'User':
            data = await _model.find({
                $or: [{ Name: regex }, { mail: regex }],
                $and: [{ state: true }]
            });
            break;
        case 'Categorie':
            data = await _model.find({ name: regex, state: true });
            break;
        case 'Product':
            data = (extra) ? await _model.find({
                    $or: [{ name: regex }, { categorie: extra.id }],
                    $and: [{ state: true }]
                })
                .populate('categorie', 'name') :
                await _model.find({ name: regex, state: true })
                .populate('categorie', 'name');
            break;
    }

    return data;

}

const isMongoId = (id) => {
    const isMongooId = Types.ObjectId.isValid(id);
    if (isMongooId) {
        return true
    }
    return false
}

module.exports = {
    searchByIdModel,
    searchAnyDModel,
    isMongoId
}