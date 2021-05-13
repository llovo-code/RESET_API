const { response, request } = require('express')

const UsersGET = (req = request, res = response) => {

    const { q, name, apikey } = req.query;
    res.json({
        msg: 'GET API - controllers',
        q,
        name,
        apikey
    });
}

const UsersPOST = (req = request, res = response) => {

    const body = req.body;
    res.json({
        msg: 'POST API - controller',
        body
    })
}

const UsersPUT = (req = request, res = response) => {

    const id = req.params.id;
    res.json({
        msg: 'PUT API - controller',
        id
    })
}

const UsersDELETE = (req = request, res = response) => {
    res.json({
        msg: 'DELETE API - controller'
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