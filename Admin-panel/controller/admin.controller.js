const Admin = require('../model/admin.model');
const bcrypt = require('bcrypt')
const path = require('path');
const fs = require('fs');

exports.addAdminPage = async (req, res) => {
    try {
        if (req.cookies && req.cookies.admin && req.cookies.admin._id != undefined) {
            let user = req.cookies.admin;
            return res.render('admin/addAdmin', { user });
        } else {
            return res.redirect('/');
        }
    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
}

exports.addAdmin = async (req, res) => {
    try {
        let imgPath = req.file ? `/uploads/${req.file.filename}` : '';
        let hashedPass = await bcrypt.hash(req.body.password, 10);

        let admin = await Admin.create({
            ...req.body,
            password: hashedPass,
            profileimg: imgPath
        });
        console.log('Admin Added', admin);
        return res.redirect('/admin/view-admin');
    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
}

exports.viewAllAdmin = async (req, res) => {
    try {   
        if (req.cookies && req.cookies.admin && req.cookies.admin._id != undefined) {
            let admins = await Admin.find();
            let user = req.cookies.admin;
            return res.render('admin/viewAdmin', { admins, user });
        } else
            return res.redirect('/');

    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
}

exports.deleteAdmin = async (req, res) => {
    let id = req.params.id;
    let admin = await Admin.findById(id);

    if (!admin) {
        console.log("Admin not found..");
        return res.redirect('/');
    }

    if (admin.profileimg != "") {
        let imgpath = path.join(__dirname, "..", admin.profileimg);
        try {
            fs.unlinkSync(imgpath);
        } catch (error) {
            console.log('Something is missing');
        }
    }

    await Admin.findByIdAndDelete(id);
    return res.redirect('/admin/view-admin');
}

exports.editAdmin = async (req, res) => {
    let admin = await Admin.findById(req.params.id);
    if (!admin) {
        console.log("Admin not found...");
        return res.redirect('/');
    }
    return res.render('admin/addAdmin', { admin }); 
}

exports.updateAdmin = async (req, res) => {
    let admin = await Admin.findById(req.params.id);

    if (!admin) {
        console.log('Admin is not found...')
        return res.redirect('/admin/view-admin');
    }

    let imgpath;

    if (req.file) {
        if (admin.profileimg != "") {
            imgpath = path.join(__dirname, '..', admin.profileimg);
            try {
                fs.unlinkSync(imgpath);
            } catch {
                console.log('file missing');
            }
        }

        imgpath = `/uploads/${req.file.filename}`;
    }
    else {
        imgpath = admin.profileimg;
    }

    admin = await Admin.findByIdAndUpdate(admin._id, { ...req.body, profileimg: imgpath }, { new: true });
    return res.redirect('/admin/view-admin');
}
