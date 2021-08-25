const helpers = require('./helpers');

const dbquery = require('./dbQyuery');

const googleAuth = require('./google-auth')

const Categorydb = require('./Validate_Categorty');

const generateJWT = require('./generate-JWT');

const helpersFile = require('./helpersToFile')


module.exports = {

    // db Validaciones 
    ...helpers,
    //Busquedas 
    ...dbquery,
    //google search
    ...googleAuth,
    //categoria Validaciones 
    ...Categorydb,
    // JWT Token
    ...generateJWT,
    // files helper 
    ...helpersFile
}