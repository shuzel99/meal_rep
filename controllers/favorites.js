const express = require('express')
const isLoggedIn = require('../middleware/isLoggedIn')
const router = express.Router()
const db = require('../models')
const { route } = require('./auth')

//index route to see all logged items
router.get('/', isLoggedIn, (req, res) => {
    db.food.findAll({
        where: {userId: res.locals.currentUser.id}
    }) 
    .then(fave => {
            res.render('favorites/indexFavorite', {results: fave})
        })
})
//check current userId select * where fave userid = userId

//post route to save the entry
router.post('/addFave', isLoggedIn, (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body))
    // console.log('this is data', data.food_name)
    db.food.create({
        food_name: data.food_name,
        userId : res.locals.currentUser.id,
        where: {userId: res.locals.currentUser.id}
    })
    .then(createdLog => {
        console.log('db instance created: \n', createdLog)
        res.redirect(`/favorites/${createdLog.id}`)
    })
    .catch(error => {
        console.log(error)
    })
})

// deletion
router.delete('/:id', (req, res) => {
    db.food.destroy({
        where: {id: req.params.id}
    })
    .then(deletedItem => {
        console.log("you deleted", deletedItem)
        res.redirect('/favorites')
    })
    .catch(error => {
        console.error
    })
})

//show route for favorite
router.get('/:id', (req, res) => {
    console.log("this is the fave id\n", req.params.id)
    db.food.findOne({
        where: { id: req.params.id }
    })
    .then(foundFave => {
        res.render('favorites/foundFave', { name: foundFave.food_name, photo: foundFave.photo})
    })
})
 
module.exports = router