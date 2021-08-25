const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { uploadFile } = require('../helpers')
const { User, Product } = require('../models')

const cloudinary = require('cloudinary').v2;

cloudinary.config(process.env.CLOUDINARY_URL)


const uploadFiles = async(req, res = response) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.estatus(404).json({
            msg: 'No Files were uploaded.'
        });
    }
    try {
        console.log(req.user.Name);
        const pathFile = await uploadFile(req.files, 'zip', req.user.Name);
        res.json({ paths: pathFile });
    } catch (error) {
        res.status(400).json({ error });
    }


}


const updatePhotoToUser = async(req, res = response) => {
    try {
        const { id, collection } = req.params;
        let model;
        switch (collection) {
            case 'users':
                model = await User.findById(id);
                if (!model) {
                    return res.status(400).json({ msg: `User not found by id ${id}` });
                }
                break;
            case 'products':
                model = await Product.findById(id);
                if (!model) {
                    return res.status(400).json({ msg: `Product not found by id ${id}` });
                }
                break;
            default:
                res.status(500).json({ msg: 'I Forget valid this' });
                break;
        }

        if (model.img) {

            const pathImage = path.join(__dirname, '../upload/', collection, model.img);
            if (fs.existsSync(pathImage)) {
                fs.unlinkSync(pathImage);
            }
        }
        const fileName = await uploadFile(req.files, undefined, collection);
        model.img = fileName;
        await model.save();

        res.json({
            msg: 'uploaded',
            model
        });

    } catch (error) {
        return res.status(400).json({ error });
    }
}



//////////CLOUDDINARY
const updatePhotoToUserCLOUDINARY = async(req, res = response) => {
    try {
        const { id, collection } = req.params;
        let model;
        switch (collection) {
            case 'users':
                model = await User.findById(id);
                if (!model) {
                    return res.status(400).json({ msg: `User not found by id ${id}` });
                }
                break;
            case 'products':
                model = await Product.findById(id);
                if (!model) {
                    return res.status(400).json({ msg: `Product not found by id ${id}` });
                }
                break;
            default:
                res.status(500).json({ msg: 'I Forget valid this' });
                break;
        }

        if (model.img) {
            //TODO:
            const url = model.img.split('/');
            const name = url[url.length - 1];
            const [public_id] = name.split('.');

            cloudinary.uploader.destroy(public_id);
            //console.log(`${public_id}`);

        }

        //console.log(req.files.file);
        const { tempFilePath } = req.files.file
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath)
            //const fileName = await uploadFile(req.files, undefined, collection);
        model.img = secure_url;
        await model.save();

        res.json({
            msg: 'uploaded',
            model
        });

    } catch (error) {
        return res.status(400).json({ error });
    }
}




const showImage = async(req, res = response) => {

    const { id, collection } = req.params;
    let model;
    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({ msg: `User not found by id ${id}` });
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({ msg: `Product not found by id ${id}` });
            }
            break;
        default:
            res.status(500).json({ msg: 'I Forget valid this' });
            break;
    }

    if (model.img) {

        //const pathImage = path.join(__dirname, '../upload/', collection, model.img);
        const url = model.img.split('/');
        const name = url[url.length - 1];
        const [public_id] = name.split('.');

        const cdurl = await cloudinary.url(name);
        return res.send(`<img  src = ${cdurl}></img>`);
    }

    const imgnotfound = path.join(__dirname, '../public/', 'no-image.jpg ');
    res.sendFile(imgnotfound);
}




module.exports = {
    uploadFiles,
    updatePhotoToUser,
    showImage,
    updatePhotoToUserCLOUDINARY
}