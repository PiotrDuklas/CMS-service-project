var express = require('express');
var router = express.Router();
var News = require('../models/news');
const defaultSort = -1;

/* GET home page. */
router.get('/', function (req, res) {

    const search = req.query.search || '';           //szukana fraza
    let sort = req.query.sort || defaultSort;

    if (sort !== -1 || sort !== 1) {
        sort = defaultSort;
    }

    const findNews = News
        .find({ title: new RegExp(search.trim(), 'i') })       //wyszukiwanie bez podziału na wielkie/małe litery
        .sort({ created: sort })
        .select('_id title description')                        //wybieramy pozycje jsona, które mają być zwrócone

    findNews.exec((err, data) => {
        res.json(data);
    })

});

router.get('/:id', function (req, res) {

    const id = req.params.id;

    const findNews = News
        .findById(id)       //wyszukiwanie bez podziału na wielkie/małe litery
        .select('_id title description')

    findNews.exec((err, data) => {
        res.json(data);
    })

});

module.exports = router;
