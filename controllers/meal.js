const express = require('express')
const isLoggedIn = require('../middleware/isLoggedIn')
const router = express.Router()
const db = require('../models')
const { route } = require('./auth')
const nutritionix = require('nutritionix-api')

const appId = '425d3159'
const appKey = '605175cc6f2051329c74998dc68fc1d7'

nutritionix.init(appId, appKey)

// Create a new meal
router.post('/', isLoggedIn, (req, res) => {
    db.meal.create({
        name: req.body.name,
        content: req.body.content,
        userId: req.body.userId,
        where: {userId: res.locals.currentUser.id}
    })
    .then(post => {
        res.redirect('/')
    })
    .catch(error => {
        console.log(error)
})
})

router.get('/newMeal', isLoggedIn, (req, res) => {
    let ingredient = req.query.ingredientSearch
    console.log(ingredient)
    nutritionix.natural.search(ingredient)
   .then(apiResults => {
    let name = apiResults.foods[0].food_name
    res.render('meals/newMeal', {name: name})
   })
   .catch(error => {
    console.log(error)
   })
})



module.exports = router