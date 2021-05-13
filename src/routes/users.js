const { Router, response } = require('express');

const { UsersDELETE, UsersPOST, UsersPUT, UsersGET, UsersPATCH } = require('../controllers/usersController')
const router = Router();


router.get('/', UsersGET);

router.put('/:id', UsersPUT);

router.post('/', UsersPOST);

router.delete('/', UsersDELETE);

router.patch('/', UsersPATCH)
module.exports = router;