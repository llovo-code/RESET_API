const { Router } = require('express');
const { check } = require('express-validator');


const router = Router();


const { login, googleSignIn } = require('../controllers/loginController');
const { validarCampos } = require('../middlewares');



router.get('/', (req, res) => {
    res.json({
        msg: "On Auth"
    })
});

router.post('/login', [
    check('mail', 'this mail is obligatory').isEmail(),
    check('password', 'This password is obligatory').not().isEmpty(),
    validarCampos
], login);


router.post('/google', [
    check('id_token', 'Se requiere el id token de google').not().isEmpty(),
    validarCampos
], googleSignIn);


//router.post('/goo', googleSignIn);

module.exports = router;