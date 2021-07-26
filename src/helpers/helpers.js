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

module.exports = {
    dbValidatorRole,
    dbValidator_EmailExist,
    dbValidator_UserById_Exists
};