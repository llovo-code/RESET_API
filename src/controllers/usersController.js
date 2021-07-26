const { response, request } = require('express')
    //importanto del Schema o modelo de base de datos 
let { User } = require('../models/usersModel');
//importando paquetes para encriptar el password
const bcrypt = require('bcryptjs');

//importando paquete de express-validator 

const UsersGET = async(req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;

    //const users = await User.find({ state: true }).skip(Number(from)).limit(Number(limit));

    //const total = await User.countDocuments({ state: true });

    const [total, users] = await Promise.all([
        User.countDocuments({ state: true }),
        User.find({ state: true })
        .skip(Number(from))
        .limit(Number(limit))
    ])
    res.json({
        total,
        users
    });
}

//done
const UsersPOST = async(req = request, res = response) => {

        const { Name, mail, password, role } = req.body;
        const usuario = new User({ Name, mail, password, role });

        //Encriptando el passwd
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //Guardando en la base de datos 
        await usuario.save();

        res.json({
            msg: 'POST API - controller',
            usuario
        });
    }
    //done
const UsersPUT = async(req = request, res = response) => {

    const { id } = req.params;
    const { _id, password, google, mail, ...data } = req.body;

    // console.log(`${id}`);
    //TODO valid to databases

    if (password) {
        const salt = bcrypt.genSaltSync();
        data.password = bcrypt.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, data);

    res.json({ user });
}

const UsersDELETE = async(req = request, res = response) => {

    const { id } = req.params;

    //borrado fisicamente

    //const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(id, { state: false });
    res.json({
        msg: 'DELETE API - controller',
        user
    })
}


const UsersPATCH = (req = request, res = response) => {
    res.json({
        msg: 'PATCH API - controller'
    })
}





module.exports = {
    UsersGET,
    UsersPOST,
    UsersPUT,
    UsersDELETE,
    UsersPATCH
};