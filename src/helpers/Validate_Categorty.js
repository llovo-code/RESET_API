const { Categorie, Product } = require('../models');

const isExistCategory = async(id) => {
    const categorieDB = await Categorie.findById(id);
    if (!categorieDB) {
        throw new Error(`Category not found with id ${id}`);
    }

}


module.exports = {
    isExistCategory,

};