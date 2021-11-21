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
    db.food.findAll()
   .then(foods => {
    res.render('meals/newMeal', {foods: foods})
   })
   .catch(error => {
    console.log(error)
   })
})



module.exports = router