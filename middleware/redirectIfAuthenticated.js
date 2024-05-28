const User = require('../database/models/User');

module.exports = async (req, res, next) => {
    try {
        if (req.session.userId) {
            return res.redirect('/')
        }

        next()
    } catch (error) {
        // if there is an error, redirect
        return res.redirect('/');
    }
};
