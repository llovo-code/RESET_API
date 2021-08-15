const { Router, response } = require('express');


//middlewares
const { check } = require('express-validator');
const { validJWT, validarCampos, rolesRequiered, isAdminRole } = require('../middlewares');

//helpers 
const { categorieExist, productExist } = require('../helpers/helpers');
//methods
const {
    products,
    getProductbyId,
    createProduct,
    updateProductById,
    deleteProductById
} = require('../controllers/productController');
const { isExistCategory } = require('../helpers/Validate_Categorty');


const router = Router();




router.get('/', products);

router.get('/:id', getProductbyId);

router.post('/', [
    validJWT,
    check('name', 'The product name is required').not().isEmpty(),
    check('price', 'The product price is required').not().isEmpty(),
    check('price', 'The price should be a numeric value').not().isString(),
    check('categorie', 'The product categorie is required').not().isEmpty(),
    check('categorie').custom(categorieExist),
    // check('price').custom(isNumber),
    validarCampos
], createProduct);

router.put('/:id', [
        validJWT,
        rolesRequiered('ADMIN_ROLE', 'VENTAS_ROLE'),
        check('id', 'id is required').not().isEmpty(),
        check('id', 'Id Invalid').isMongoId(),
        validarCampos,
        check('id').custom(productExist),
        check('name', 'The product name is required').not().isEmpty(),
        check('price', 'The product price is required').not().isEmpty(),
        check('price', 'The price should be a numeric value').not().isString(),
        check('categorie', 'The product categorie is required').not().isEmpty(),
        validarCampos,
        check('categorie').custom(categorieExist),
        check('available', 'This fields is required'),
        check('state', 'the product state is required for be update'),
        validarCampos,
    ],
    updateProductById);

router.delete('/:id', [
    validJWT,
    isAdminRole,
    check('id', 'se require u').isMongoId(),
    check('id', ).custom(productExist),
    validarCampos

], deleteProductById);


module.exports = router;