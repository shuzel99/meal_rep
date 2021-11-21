const express = require('express')
const isLoggedIn = require('../middleware/isLoggedIn')
const router = express.Router()
const db = require('../models')
const { route } = require('./auth')

router.get('/', isLoggedIn, (req, res) => {
    db.meal.findAll({
        where: {userId: res.locals.currentUser.id}
    })
    .then(meals => {
        res.render('meal/indexMeals', {results: meals})
    })
})

router.post('/addMeal', isLoggedIn, (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body))
    // console.log('this is data', data.food_name)
    db.meal.create({
        name: data.name,
        description: data.description,
        userId : res.locals.currentUser.id,
        where: {userId: res.locals.currentUser.id}
    })
    .then(createdMeal => {
        console.log('db instance created: \n', createdLog)
        res.redirect(`/meal/${createdMeal.id}`)
    })
    .catch(error => {
        console.log(error)
    })
})



module.exports = router