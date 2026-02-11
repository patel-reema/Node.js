const Admin = require('../model/admin.model');

exports.addAdminPage = async (req, res) => {
    try {
        return res.render('admin/addAdmin');
    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
}

exports.addAdmin = async (req, res) => {
    try {
        let imgPath = req.file ? `/uploads/${req.file.filename}` : '';
        let admin = await Admin.create({
            ...req.body,
            profileimg: imgPath
        });
        console.log('Admin Added');
        return res.redirect('/admin/add-admin');
    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
}

exports.viewAllAdmin = async (req, res) => {
    try {
        let admins = await Admin.find();
        return res.render('admin/viewAdmin', { admins });
    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
}
