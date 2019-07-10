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

    //DODANIE nowej treści do bazy danych
    // const newsData = new News({ title: "Nowy artykuł", description: "Opis" });
    // newsData.save(err => console.log(err))

    res.render('admin/index', { title: 'Admin' });
});

router.get('/news/add', (req, res) => {
    res.render('admin/news-form', { title: 'Dodaj news' });
})

module.exports = router;
