const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide your username!'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email!'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide your password!'],
    },
});

UserSchema.pre('save', function(next) {
    const user = this;

    // Check if the password has been modified (or is new)
    if (!user.isModified('password')) return next();

    // Generate a salt and hash the password using bcrypt
    bcrypt.hash(user.password, 10, function(error, encrypted) {
        if (error) return next(error);

        user.password = encrypted;
        next();
    });
});

module.exports = mongoose.model('User', UserSchema);
