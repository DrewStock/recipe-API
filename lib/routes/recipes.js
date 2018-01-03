const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Recipe = require('../models/recipe');

router
    .get('/', (req, res, next) => {

        Recipe.find()
            .then(recipes => res.send(recipes))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Recipe.findById(req.params.id)
            .then(recipe => res.send(recipe))
            .catch(next);
    })
    
    .post('/', bodyParser, (req, res, next) => {
        new Recipe(req.body).save()
            .then(saved => res.send(saved))
            .catch(next);
    })

    .put('/:id', bodyParser, (req, res, next) => {
        Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(updated => res.send(updated))
            .catch(next);
    })
    
    .delete('/:id', (req, res, next) => {
        Recipe.findByIdAndRemove(req.params.id)
            .then(deleted => res.send(deleted))
            .catch(next);
    });

module.exports = router;
