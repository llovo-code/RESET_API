const { response, request } = require('express');

const { Categorie } = require('../models');


const categoriesGet = async(req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const [total, categorias] = await Promise.all([
        Categorie.countDocuments({ state: true }),
        Categorie.find({ state: true })
        .skip(Number(from))
        .limit(Number(limit))
        .populate('user', 'Name')
    ]);
    res.json({
        msg: 'Categori OK',
        total,
        categorias
    });
}


const categorybyId = async(req = request, res = response) => {

    const { id } = req.params;
    const categorie = await Categorie.findById(id).populate('user', 'Name');
    res.json({
        msg: 'Categoria por id OK',
        categorie
    });
}


const categoryCreate = async(req = request, res = response) => {

    const name = req.body.name.toUpperCase();
    const categoryDB = await Categorie.findOne({ name });

    if (categoryDB) {
        return res.status(400).json({
            msg: `La Categoria ${categoryDB.name } ya existe!`
        });
    }
    //generar la data a grabar 
    const data = {
        name,
        user: req.user._id
    }
    const category = new Categorie(data);
    await category.save();

    res.json({
        msg: 'create category OK',
        category
    });
}

const categoryUpdateById = async(req = request, res = response) => {
    const { id } = req.params;
    const name = req.body.name.toUpperCase();
    const user = req.user._id;

    const data = {
        name,
        user
    }

    //console.log(`data : `, data);
    const categories = await Categorie.findByIdAndUpdate(id, data, { new: true });

    res.json({
        msg: 'Categoria actualizada OK',
        categories
    });
}

const categoryDeleteById = async(req = request, res = response) => {

    const { id } = req.params;

    //const categorie = await Categorie.findByIdAndUpdate(id, { state: false });
    const categorie = await Categorie.findByIdAndUpdate(id, { state: false });
    res.json({
        msg: 'categoria borrada OK',
        categorie
    });
}






module.exports = {
    categoriesGet,
    categorybyId,
    categoryDeleteById,
    categoryUpdateById,
    categoryCreate
};