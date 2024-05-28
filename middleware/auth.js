const User = require('../database/models/User');

module.exports = async (req, res, next) => {
    try {
        // fetch user from database
        const user = await User.findById(req.session.userId);

        if (!user) {
            return res.redirect('/');
        }

        // if user is valid, permit request
        next();
    } catch (error) {
        // if there is an error, redirect
        return res.redirect('/');
    }
};
