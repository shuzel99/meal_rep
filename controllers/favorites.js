const express = require('express')
const router = express.Router()
const db = require('../models')
const { route } = require('./auth')

//index route to see all logged items
router.get('/', (req, res) => {
    db.food.findAll()
        .then(fave => {
            res.render('mealrep/indexFavorite', {results: fave})
        })
})


//post route to save the entry
router.post('/addFave', (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body))
    // console.log('this is data', data.food_name)
    db.food.create({
        food_name: data.food_name
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
        res.render('mealrep/foundFave', { name: foundFave.food_name, photo: foundFave.photo})
    })
})
 
module.exports = router