var express = require('express');
var router = express.Router();

router.all('*', (req, res, next) => {
    if (!req.session.admin) {
        res.redirect('login');
        return;
    }
    next();
})

/* GET home page. */
router.get('/', function (req, res) {
    res.render('admin', { title: 'Admin' });
});

module.exports = router;
