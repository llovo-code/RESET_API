const validJWT = require('../middlewares/Valid-jwt');
const validarCampos = require('../middlewares/valid-field');
const validRole = require('../middlewares/valid_role')
const ValidFiles = require('../middlewares/valid-file');

module.exports = {
    ...validJWT,
    ...validarCampos,
    ...validRole,
    ...ValidFiles
};