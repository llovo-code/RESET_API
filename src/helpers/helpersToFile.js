const { v4: uuid } = require('uuid');
const path = require('path');

const uploadFile = (files, extAllowed = ['png', 'jpg', 'jpeg', 'gif'], pathDir = '') => {


    return new Promise((resolve, reject) => {

        const { file } = files;
        const nameShort = file.name.split('.');
        const extension = nameShort[nameShort.length - 1];

        //Validar extensiones
        if (!extAllowed.includes(extension)) {
            reject('La extension ' + extension + ' no esta permitida');
        }

        const tmpName = uuid() + '.' + extension;
        const uploadPath = path.join(__dirname, '../upload/', pathDir, tmpName);

        file.mv(uploadPath, function(err) {
            if (err) {
                reject(err);
            }
            resolve(tmpName);
        });
    });
}


module.exports = { uploadFile }