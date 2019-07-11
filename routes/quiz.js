const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz')

/* GET home page. */

router.get('/', (req, res) => {
    const show = !req.session.vote      //jeśli głos nie został oddany, pokazujemy pytanie
    Quiz.find({}, (err, data) => {
        let sum = 0;
        data.forEach((item) => {

            sum += item.vote;
        })
        res.render('quiz', { title: 'Quiz', data, show });
    })
});

router.post('/', (req, res) => {
    const id = req.body.quiz;

    Quiz.findOne({ _id: id }, (err, data) => {
        data.vote = data.vote + 1;
        data.save((err) => {
            req.session.vote = 1;            //gdy głos został oddany
            res.redirect('/quiz');
        })


    })
});

module.exports = router;
