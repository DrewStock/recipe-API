const express = require('express');
const router = express.Router();
// const bodyParser = require('body-parser').json();
const Recipe = require('../models/recipe');

router
    .get('/', (req, res, next) => {

        Recipe.find()
            // .select('username description houseId')
            // .populate({
            //     path: 'houseId',
            //     select: 'name'
            // })
            // .lean()
            .then(recipes => res.send(recipes))
            .catch(next);
    });

    // .put('/', bodyParser, (req, res, next) => {
    //     User.findByIdAndUpdate(req.user.id, req.body, {new: true})
    //         .then(updated => res.send(updated))
    //         .catch(next);
    // })
    //
    // .delete('/', (req, res, next) => {
    //     User.findByIdAndRemove(req.user.id)
    //         .then(deleted => res.send(deleted))
    //         .catch(next);
    // });


module.exports = router;
