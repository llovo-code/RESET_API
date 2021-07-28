const express = require('express');
const cors = require('cors');
const path = require('path');

const { dbConnection } = require('../database/config')
class Server {

    constructor() {
        //inits
        this.app = express();
        this.port = process.env.PORT;
        this.UsersRoutePath = '/api/users';
        this.AuthPath = '/api/auth'

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
    }

    routes() {



        this.app.use(this.AuthPath, require('../routes/auth'));
        this.app.use(this.UsersRoutePath, require('../routes/users'));
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