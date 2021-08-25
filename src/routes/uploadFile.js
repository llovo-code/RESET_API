const { Router } = require('express');
const { check } = require('express-validator');

const { uploadFiles, updatePhotoToUser, showImage, updatePhotoToUserCLOUDINARY } = require('../controllers/uploadFileController');
const { validarCampos, validJWT, validFile } = require('../middlewares')
const { collectionAllowed } = require('../helpers');
const router = Router();

router.post('/', [
    validJWT,
    validarCampos
], uploadFiles);


router.put('/:collection/:id', [
    validFile,
    check('id', `isn't mongoId`).isMongoId(),
    check('collection').custom(c => collectionAllowed(c, ['users', 'products'])),
    validarCampos
], updatePhotoToUserCLOUDINARY);


router.get('/:collection/:id', [
    check('id', `isn't mongoId`).isMongoId(),
    check('collection').custom(c => collectionAllowed(c, ['users', 'products'])),
    validarCampos
], showImage)

module.exports = router;