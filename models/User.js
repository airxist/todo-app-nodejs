const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'please input name'],
        minlength: [5, 'username should be at least 5 characters'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'please input password'],
        minlength: 6
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
})

module.exports = mongoose.model('User', UserSchema);