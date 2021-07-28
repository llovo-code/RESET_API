const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const { User } = require('../models/usersModel');

const validJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'no hay token en la peticion'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRET_OR_PUBLIC_KEY);
        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: 'Token no valido - User not found'
            });
        }
        if (!user.state) {
            return res.status(401).json({
                msg: 'Token no valido - User state:False'
            });
        }
        req.user = user;


        next();
    } catch (error) {
        console.log(`${error}`);

        let msg = null;

        if (error.message == "jwt expired") {
            msg = `Token Expirado `;
        } else {
            msg = 'Token no valido';
        }
        res.status(401).json({
            msg
        })
    }
}

module.exports = {
    validJWT
};






//     const jwtE = new jwt.TokenExpiredError();
//     console.log(`${jwtE.expiredAt() }`);
//const { uid, exp } = jwt.decode(token)
// console.log(`${exp*1000}`);
// console.log(`${new Date(exp*1000)}`);

// if (new Date(exp * 1000) < new Date()) {
//     return res.status(401).json({
//         msg: 'Token Expired'
//     });
// }