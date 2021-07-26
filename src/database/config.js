const mongoose = require('mongoose')

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_COFFE_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log(`database online`);
    } catch (error) {
        console.log(error)
        throw new Error('Fail connection to database')
    }
}

module.exports = {
    dbConnection
}