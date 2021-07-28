const { Schema, model } = require('mongoose');


const UserSchema = Schema({
    Name: {
        type: String,
        required: [true, 'Name is required']
    },
    mail: {
        type: String,
        required: [true, 'mail is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: [true, 'role is required'],
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    googleAuth: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.toJSON = function() {

    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}



const User = model('User', UserSchema);

module.exports = {
    User
}