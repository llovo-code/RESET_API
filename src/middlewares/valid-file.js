const { response } = require('express');


const validFile = (req, res = response, next) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(404).json({
            msg: 'No Files were uploaded.'
        });
    }

    next();
}


module.exports = { validFile };