const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');
const { validarCampos, validJWT, isAdminRole, rolesRequiered } = require('../middlewares');
const { isExistCategory } = require('../helpers/Validate_Categorty');
const {
    categoriesGet,
    categorybyId,
    categoryCreate,
    categoryDeleteById,
    categoryUpdateById
} = require('../controllers/categoryController')

//get all category - methods public 
router.get('/', categoriesGet);



//het one category by id -- public methods 
router.get('/:id', [
    check('id', 'No es un Id Valido').isMongoId(),
    check('id').custom(isExistCategory),
    validarCampos
], categorybyId);

//add a category -private methods -any one with a valid token
router.post('/', [
    validJWT,
    isAdminRole,
    check('name', 'El nombre es requerido').not().isEmpty(),
    validarCampos
], categoryCreate);


//update category by id -- private methods 
router.put('/:id', [
    validJWT,
    check('id', 'No es un Id Valido').isMongoId(),
    check('id').custom(isExistCategory),
    check('name', 'Se requiere el nombre para actualizar'),
    validarCampos
], categoryUpdateById);

//delete a category --private methods -- just Administrator can be modify
router.delete('/:id', [
    validJWT,
    rolesRequiered('ADMIN_ROLE'),
    check('id', 'No es un id Valido').isMongoId(),
    check('id').custom(isExistCategory),
    validarCampos,
], categoryDeleteById);

module.exports = router;