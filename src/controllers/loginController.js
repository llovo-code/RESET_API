const { response, request } = require('express');

const { GJsonWebToken } = require('../helpers/generate-JWT');
const { User } = require('../models/usersModel');
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
                msg: ''
            })
        }
        //verify password 
        //========//
        //comparando los hash del password
        const validpass = bcrypt.compareSync(password, user.password);
        if (!validpass) {
            return res.status(400).json({
                msg: `user / pass isn't correct - state:false `
            });
        }
        //generate JWT

        const token = await GJsonWebToken(user.id);
        res.json({
            msg: `login OK `,
            token
        });


    } catch (error) {
        console.log(`${error}`);
        return res.status(500).json({
            msg: "A problem was ocurred"
        });
    }


}



module.exports = {
    login
};