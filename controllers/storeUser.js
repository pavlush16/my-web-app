const User = require('../database/models/User');

module.exports = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.redirect('/');
    } catch (error) {

        const registrationErrors = Object.keys(error.errors).map(key => error.errors[key].message)

        req.flash('registrationErrors', registrationErrors);

        if (error.code === 11000) {
            // Duplicate key error
            console.error('Email already exists:', req.body.email);
            return res.redirect('/auth/register');
        }
        // console.error('Error creating user:', error);
        res.redirect('/auth/register');
    }
};
