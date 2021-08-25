const { model } = require('mongoose');
const { Categorie, Product } = require('../models');
const Roles = require('../models/roleModel');
const { User } = require('../models/usersModel');

const dbValidatorRole = async(rol = '') => {

    const existRole = await Roles.findOne({ rol });
    if (!existRole) {
        throw new Error(`The Role ${rol} isn't registred on databases`);
    }
}

const dbValidator_EmailExist = async(mail = '') => {
    const mailExist = await User.findOne({ mail });
    if (mailExist) {
        throw new Error(`the mail: ${mail} , is already registered`);
    }
}
const dbValidator_UserById_Exists = async(id = '') => {
    const user = await User.findById(id);
    if (!user) {
        throw new Error(`Not exist a user by id: ${id}`);
    }
}

//helpers para categorie 
const categorieExist = async(categorie) => {

    //console.log(`${categorie.toUpperCase()}`);
    const categoriedb = await Categorie.findOne({ name: categorie.toUpperCase() });
    if (!categoriedb) {
        throw new Error(`Categorie ${categorie.toUpperCase()} not found on databases`);
    }
}

//helper by product
const productExist = async(id) => {
    const productdb = Product.findById(id)
    if (!productdb) {
        throw new Error(`Product not found with id ${id}`);
    }
}


const collectionAllowed = async(collection = '', collectionsAllowed = []) => {

    const include = collectionsAllowed.includes(collection);
    //console.log(`inside to collection`);
    if (!include) {
        throw new Error(`collection not found with id ${collection}`);
    }
    return true;
}



module.exports = {
    dbValidatorRole,
    dbValidator_EmailExist,
    dbValidator_UserById_Exists,
    categorieExist,
    productExist,
    collectionAllowed
};