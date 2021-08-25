const express = require('express');
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config')
class Server {

    constructor() {
        //inits
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            users: '/api/users',
            category: '/api/categorias',
            product: '/api/productos',
            search: '/api/search',
            uploads: '/api/uploads'
        };
        // this.UsersRoutePath = '/api/users';
        //this.AuthPath = '/api/auth'

        //connection to database
        this.ConnectionDB();
        //middlewares 
        this.middlewares();
        //rutas de mi aplicacion
        this.routes();

    }

    async ConnectionDB() {
        await dbConnection();
    }

    middlewares() {
        //directorio publico
        this.app.use(express.static(path.join(__dirname, '../public')));

        //CORS  
        this.app.use(cors());

        //Lectura y Parseo de el body
        this.app.use(express.json());

        //file uploads
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {



        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.users, require('../routes/users'));
        this.app.use(this.paths.category, require('../routes/categorie'));
        this.app.use(this.paths.product, require('../routes/product'));
        this.app.use(this.paths.search, require('../routes/search'))
        this.app.use(this.paths.uploads, require('../routes/uploadFile'));

        this.app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/PageNotFound.html'));
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    }
}


module.exports = Server;