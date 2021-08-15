const { request, response } = require("express");
const { ObjectId } = require('mongoose').Types;
const { User, Categorie, Product } = require('../models')
const { searchByIdModel, searchAnyDModel, isMongoId } = require('../helpers/dbQyuery');

const DBCollections = [
    'user',
    'categorie',
    'product'
];

const searchUsers = async(term = '', res = response) => {
    if (isMongoId(term)) {
        const user = await searchByIdModel(User, term);
        return res.json({
            results: (user && user.state === true) ? [user] : []
        })
    }
    const user = await searchAnyDModel(User, term);
    res.json({
        results: user
    })

}
const searchCategorie = async(term = '', res = response) => {
    if (isMongoId(term)) {
        const categorie = await searchByIdModel(Categorie, term);
        return res.json({
            results: (categorie && categorie.state) ? [categorie] : []
        })
    }
    const categorie = await searchAnyDModel(Categorie, term);
    res.json({
        results: categorie
    });
}



const searchProduct = async(term = '', res = response) => {

    if (isMongoId(term)) {
        let object = { path: 'categorie', select: 'name' }
        let product = await searchByIdModel(Product, term, true, object);
        if (!product) {
            const categoriedb = await searchByIdModel(Categorie, term);
            product = await searchAnyDModel(Product, term, categoriedb);
        }
        return res.json({ results: (product) ? [product] : [] })
    }
    const product = await searchAnyDModel(Product, term);
    res.json({
        results: product
    });
}

const search = (req = request, res = response) => {
    const { collection, term } = req.params;
    const Iscollection = DBCollections.includes(collection.toLowerCase());
    if (!Iscollection) {
        return res.json({
            msg: `la collection no es valida `
        });
    }

    switch (collection.toLowerCase()) {
        case 'user':
            searchUsers(term, res);
            break;
        case 'categorie':
            searchCategorie(term, res);
            break;
        case 'product':
            searchProduct(term, res);
            break;
        default:
            res.status(500).json({
                msg: `Server problems`
            })
            break;
    }

}

module.exports = {
    search
}