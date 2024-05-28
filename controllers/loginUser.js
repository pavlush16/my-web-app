const bcrypt = require('bcryptjs');
const User = require('../database/models/User');

module.exports = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Try to find the user
        const user = await User.findOne({ email });

        if (user) {
            // Compare passwords
            const same = await bcrypt.compare(password, user.password);

            if (same) {
                req.session.userId = user._id;

                res.redirect('/');
            } else {
                res.redirect('/auth/login');
            }
        } else {
            res.redirect('/auth/login');
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        res.redirect('/auth/login');
    }
};
