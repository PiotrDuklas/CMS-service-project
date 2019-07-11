var express = require('express');
var News = require('../models/news'); //dodanie szablonu wiadomości

var router = express.Router();

router.all('*', (req, res, next) => {   //dot. każdej metody http
    if (!req.session.admin) {
        res.redirect('login');      //przekierowanie na stronę logowania

        return;
    }
    next();             //po udanym logowaniu przechodzi dalej
})



/* GET home page. */
router.get('/', (req, res) => {
    News.find({}, (err, data) => {
        console.log(data);
        res.render('admin/index', { title: 'Admin', data });
    })
    //DODANIE nowej treści do bazy danych
    // const newsData = new News({ title: "Nowy artykuł", description: "Opis" });
    // newsData.save(err => console.log(err))


});

router.get('/news/add', (req, res) => {
    res.render('admin/news-form', { title: 'Dodaj news', body: {}, errors: {} });
})


router.post('/news/add', (req, res) => {        //przechwytywanie danych z formularza
    const body = req.body;

    const newsData = new News(body);
    const errors = newsData.validateSync();

    newsData.save((err) => {
        if (err) {
            res.render('admin/news-form', { title: 'Dodaj news', errors, body });
            return;
        }
        res.redirect('/admin')
    });


});

router.get('/news/delete/:id', (req, res) => {
    News.findByIdAndDelete(req.params.id, (err) => {
        res.redirect('/admin')
    })
})

module.exports = router;
