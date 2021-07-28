const jwt = require('jsonwebtoken');


const GJsonWebToken = (uid = '') => {

    return new Promise((resolve, rejeact) => {

        const payload = { uid };
        const spk = process.env.SECRET_OR_PUBLIC_KEY;


        jwt.sign(payload, spk, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(`${err}`);
                rejeact('No se Pudo Generar el Token')
            } else {
                resolve(token);
            }
        });

    });
}


module.exports = {
    GJsonWebToken
};