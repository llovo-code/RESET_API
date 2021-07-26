const { Router, response } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/valid-field');
const {
    dbValidatorRole,
    dbValidator_EmailExist,
    dbValidator_UserById_Exists
} = require('../helpers/helpers');
const {
    UsersDELETE,
    UsersPOST,
    UsersPUT,
    UsersGET,
    UsersPATCH
} = require('../controllers/usersController')
const router = Router();


router.get('/', UsersGET);

router.put('/:id', [

    check('id', 'no es un id valido').isMongoId(),
    check('id').custom(dbValidator_UserById_Exists),
    check('role').custom(dbValidatorRole),
    validarCampos
], UsersPUT);

router.post('/', [
    check('mail', `The mail isn't valid`).isEmail(),
    check('mail').custom(dbValidator_EmailExist),
    check('Name', `The name is obligatory`).not().isEmpty(),
    check('password', `the password must contain at least 6 letters or more`).isLength({ min: 6 }),
    //check('role', `No es un Rol Permitido`).isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(dbValidatorRole),
    validarCampos
], UsersPOST);

router.delete('/:id', [
    check('id', 'No es un id Valido').isMongoId(),
    check('id').custom(dbValidator_UserById_Exists),
    validarCampos
], UsersDELETE);

router.patch('/', UsersPATCH)
module.exports = router;