const express = require('express')
const router = express.Router()
const db = require('../models')
const { route } = require('./auth')

//index route to see all logged items
router.get('/', (req, res) => {
    db.food.findAll()
        .then(fave => {
            res.render('indexFavorite', {results: fave})
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
 
module.exports = router