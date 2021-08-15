const { response, request } = require('express');

const { GJsonWebToken } = require('../helpers/generate-JWT');
const { googleAuth } = require('../helpers/google-auth');
const User = require('../models/usersModel');
const bcrypt = require('bcryptjs');




const login = async(req = request, res = response, ) => {

    const { mail, password } = req.body

    try {
        //verify is email exist 
        const user = await User.findOne({ mail });
        if (!user) {

            return res.status(400).json({
                msg: `user / pass isn't correct - mail `
            });
        }
        //verify if this user is active 
        if (user.state === false) {
            return res.status(400).json({
                msg: `user / pass isn't correct - state:false `
            })
        }
        //verify password 
        //========//
        //comparando los hash del password
        const validpass = bcrypt.compareSync(password, user.password);
        if (!validpass) {
            return res.status(400).json({
                msg: `user / pass isn't correct - password:Incorrect `
            });
        }
        //generate JWT
        const token = await GJsonWebToken(user.id);
        res.json({
            msg: `login OK `,
            user,
            token
        });


    } catch (error) {
        console.log(`${error}`);
        return res.status(500).json({
            msg: "A problem was ocurred"
        });
    }


}


const googleSignIn = async(req = request, res = response) => {
    // const token = req.body
    const { id_token } = req.body

    try {

        const { Name, img, mail } = await googleAuth(id_token);
        let userdb = await User.findOne({ mail });
        if (!userdb) {
            const data = {
                Name,
                mail,
                password: 'l',
                img,
                googleAuth: true
            };

            userdb = new User(data);
            await userdb.save();
        }

        if (!userdb.state) {
            return res.status(401).json({
                msg: 'Hable con el administrado , User:Block'
            });
        }

        const token = await GJsonWebToken(userdb.id);
        res.json({
            msg: 'Google Sign In ok',
            userdb,
            token
        });




    } catch (error) {
        console.log(`err: `, error);
        res.status(401).json({
            msg: 'Invalid google Token'
        })
    }

}

module.exports = {
    login,
    googleSignIn
};