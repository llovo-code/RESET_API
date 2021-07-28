const { Router } = require('express');
const { check } = require('express-validator');


const router = Router();


const { login } = require('../controllers/loginController');
const { validarCampos } = require('../middlewares');



router.get('/', (req, res) => {
    res.json({
        msg: "On Auth"
    })
})

router.post('/login', [
    check('mail', 'this mail is obligatory').isEmail(),
    check('password', 'This password is obligatory').not().isEmpty(),
    validarCampos
], login);


module.exports = router;