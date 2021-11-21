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
    // const data = JSON.parse(JSON.stringify(req.body))
    db.meal.create({
        name: req.body.name,
        content: req.body.content,
        userId: req.body.userId,
        where: {userId: res.locals.currentUser.id}
    })
    .then(post => {
        res.redirect(`/`)
    })
    .catch(error => {
        console.log(error)
})
})

router.get('/newMeal', isLoggedIn, (req, res) => {
   db.food.findAll()
   .then(ingredients => {
    console.log('these are ingredients', ingredients)
    console.log('this is curry goat', ingredients[0].food_name)

       res.render('meals/newMeal', {ingredients: ingredients})
   })
   .catch(error => {
    console.log(error)
   })
})

//after add to meals button is clicked
router.get('/:id', (req, res) => {
    console.log("this is the meal id\n", req.params.id)
    db.meal.findOne({
        where: { id: req.params.id },
        include: [db.food]
    })
    .then(foundMeal => {
        res.render('meals/foundMeal', { foundMeal: foundMeal})
    })
    .catch(error => {
        console.log(error)
})
})





module.exports = router