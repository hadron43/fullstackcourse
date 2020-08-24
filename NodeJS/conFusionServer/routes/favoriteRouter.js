const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const cors = require('./cors');

const Favorites = require('../models/favorite');

const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

//Route for favorites/
favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.find({user: req.user._id})
    .populate('user')
    .populate('favoriteDishes')
    .then((favorites) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorites);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({user: req.user._id})
    .then((favorites) => {
        if(favorites == null){
            Favorites.create({user: req.user._id, favoriteDishes: req.body.map(((obj) => {
                return obj._id;
            }))})
            .then((fav) => {
                console.log('Favorites Created ', fav);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(fav);
            }, (err) => next(err))
            .catch((err) => next(err));
        }
        else{
            for(dish in favorites.favoriteDishes){
                if(favorites.favoriteDishes.indexOf(dish._id) < 0)
                    favorites.favoriteDishes.push(dish._id);
            }
            favorites.save()
            .then((fav) => {
                Favorites.findOne({user: req.user._id})
                    .populate('user')
                    .populate('favoriteDishes')
                    .then((dish) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(dish);
                    });
            }, (err) => next(err));
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})

.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})

.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.remove({user: req.user._id})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

//Route for /favorite/:dishId
favoriteRouter.route('/:dishId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({user: req.user._id})
    .then((favorites) => {
        if(favorites == null){
            Favorites.create({user: req.user._id, favoriteDishes: [req.params.dishId]})
            .then((fav) => {
                console.log('Favorites Created ', fav);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(fav);
            }, (err) => next(err))
            .catch((err) => next(err));
        }
        else{
            if(favorites.favoriteDishes.indexOf(req.params.dishId) < 0){
                favorites.favoriteDishes.push(req.params.dishId);
                favorites.save()
                .then((fav) => {
                    Favorites.findOne({user: req.user._id})
                        .populate('user')
                        .populate('favoriteDishes')
                        .then((dish) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(dish);
                        });
                }, (err) => next(err));
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorites);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})

.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({user: req.user._id})
    .then((favorites) => {
        if(favorites == null)
            return next(new Error('Favorites not found!'));
        
        if(favorites.favoriteDishes.indexOf(req.params.dishId) < 0)
            return next(new Error('Dish '+req.params.dishId+' not found'));
        
        favorites.favoriteDishes.splice(favorites.favoriteDishes.indexOf(req.params.dishId), 1);

        favorites.save()
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
    }, (err) => next(err))
    .catch((err) => next(err));
})

module.exports = favoriteRouter;