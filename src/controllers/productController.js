const { request, response } = require('express')
const { Categorie, Product } = require('../models')


const products = async(req = request, res = response) => {

    const [Total, products] = await Promise.all([
        Product.countDocuments({ state: true }),
        Product.find({ state: true })
        .populate('categorie', 'name')
        .populate('user', 'Name')
    ]);

    res.json({
        msg: `product ok`,
        Total,
        products
    })
}

const getProductbyId = (req = request, res = response) => {

    res.json({
        msg: `get by id ok`
    })
}



const createProduct = async(req = request, res = response) => {

    const { name, categorie, price, description = "" } = req.body;
    const user = req.user._id
    const categoriedb = await Categorie.findOne({ name: categorie.toUpperCase() });

    const productdb = await Product.findOne({ name: name.toUpperCase() });
    //console.log(`product `, productdb);
    if (productdb) {
        return res.status(400).json({
            msg: `This product ${name.toUpperCase()} is already exist`
        });
    }


    const data = {
        name: name.toUpperCase(),
        price,
        categorie: categoriedb._id,
        description,
        user
    }

    const product = new Product(data);
    await product.save();
    res.json({
        msg: `Prodcut Add Successfully`,
        product
    });
}


const updateProductById = async(req = request, res = response) => {

    const { id } = req.params;
    const { name, price, categorie, description, available = true, state = true } = req.body;
    const categoriedb = await Categorie.findOne({ name: categorie });
    const user = req.user._id;

    const data = {
        name,
        price,
        categorie: categoriedb._id,
        description,
        available,
        state,
        user
    };

    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    res.json({
        msg: `update successfully`,
        product
    });
}
const deleteProductById = async(req = request, res = response) => {

    const { id } = req.params;

    const productDb = await Product.findByIdAndUpdate(id, { new: true });
    res.json({
        msg: `delete successfully`,
        productDb
    });
}



module.exports = {
    products,
    getProductbyId,
    createProduct,
    updateProductById,
    deleteProductById
}