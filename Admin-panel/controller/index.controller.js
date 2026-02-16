const Admin = require('../model/admin.model');
const bcrypt = require('bcrypt');

exports.dashboardPage = async (req, res) => {
    try {
        if (req.cookies && req.cookies.admin && req.cookies.admin._id != undefined) {
            let user = req.cookies.admin;
            return res.render('dashboard', { user });
        }
        return res.redirect('/')
    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
};

exports.logInPage = async (req, res) => {
    try {
        if (req.cookies && req.cookies.admin && req.cookies.admin._id != undefined) {
            return res.redirect('/dashboard');
        }

        return res.render('logIn');

    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
};

exports.logIn = async (req, res) => {
    try {
        let admin = await Admin.findOne({ email: req.body.email });
        if (!admin) {
            console.log("Admin not found..");
            return res.redirect('/');
        }

        let matchPass = await bcrypt.compare(req.body.password, admin.password);
        if (!matchPass) {
            console.log('Invalid Credential');
            return res.redirect('/');
        }
        res.cookie('admin', admin);
        return res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
}

exports.myProfile = async (req, res) => {
    try {
        if (req.cookies && req.cookies.admin && req.cookies.admin._id != undefined) {
            let user = req.cookies.admin;
            return res.render('My Profile', { user });
        } else {
            return res.redirect('/');
        }
    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
}

exports.changePasswordPage = async (req, res) => {
    try {
        if (req.cookies && req.cookies.admin && req.cookies.admin._id != undefined) {
            let user = req.cookies.admin;
            return res.render('changePassword', { user });
        } else {
            return res.redirect('/');
        }

    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
}

exports.changePassword = async (req, res) => {
    try {
        const { curPass, newPass, conPass } = req.body;
        const user = req.cookies.admin;
        const verifyPass = await bcrypt.compare(curPass, user.password);

        if (!verifyPass) {
            console.log('Current Password is not matched');
            return res.redirect('/change-password');
        };
        if (newPass == curPass) {
            console.log('Current and New Password are matched');
            return res.redirect('/change-password');
        };
        if (newPass != conPass) {
            console.log('New and Confirm Password is not matched');
            return res.redirect('/change-password');
        }

        let hashPass = await bcrypt.hash(newPass, 10);
        await Admin.findByIdAndUpdate(user._id, { password: hashPass }, { new: true });

        console.log('Password Changed...');
        return res.redirect('/');

    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
}
exports.logout = async (req, res) => {
    try {
        res.clearCookie('admin');
        return res.redirect('/');
    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
}