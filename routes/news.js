var express = require('express');
var router = express.Router();
var News = require('../models/news');

/* GET home page. */
router.get('/', function (req, res) {

    const search = req.query.search || ''            //szukana fraza
    const findNews = News
        .find({ title: new RegExp(search.trim(), 'i') })       //wyszukiwanie bez podziału na wielkie/małe litery
        .sort({ created: -1 });

    findNews.exec((err, data) => {
        res.render('news', { title: 'News', data, search });
    })

});

module.exports = router;
