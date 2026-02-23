const Blog = require('../model/blog.model');

exports.dashboardPage = async (req, res) => {
    try {
       return res.render('dashboard');
    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
};