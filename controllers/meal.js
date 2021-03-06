const express = require('express')
const isLoggedIn = require('../middleware/isLoggedIn')
const router = express.Router()
const db = require('../models')
const { route } = require('./auth')
const nutritionix = require('nutritionix-api')
const { create } = require('domain')
fs = require('fs')

const appId = '425d3159'
const appKey = '605175cc6f2051329c74998dc68fc1d7'

nutritionix.init(appId, appKey)

//shows all logged meal
router.get('/all', isLoggedIn, (req, res) => {
    db.meal.findAll({
        where: {userId: res.locals.currentUser.id}
    }) 
    .then(meal => {
        console.log('this is res.locals', res.locals.currentUser.id) 
            res.render('meals/indexMeal', {meals: meal})
        })
        .catch(error => {
            console.log(error)
        })
})

// Create a new meal
router.post('/', isLoggedIn, (req, res) => {
    // const data = JSON.parse(JSON.stringify(req.body))
    console.log('FOOD FORM: ADDED NEW', req.body)
    db.meal.create({
        userId: res.locals.currentUser.id,
        where: {userId: res.locals.currentUser.id},
        name: req.body.name,
        content: req.body.content,
        ingredient: req.body.ingredients, //just added
    })
    .then(post => {
        console.log("create a new meal post", post)
        res.redirect(`/meal/all`)
    })
    .catch(error => {
        console.log(error)
})
})

//show form for making new meal
router.get('/newMeal', isLoggedIn, (req, res) => {
   db.food.findAll({
        where: {userId: res.locals.currentUser.id}
   })
   .then(ingredients => {
    console.log('these are ingredients', ingredients)
    // console.log('this is curry goat', ingredients[0].food_name)
       res.render('meals/newMeal', {ingredients: ingredients})
   })
   .catch(error => {
    console.log(error)
   })
})

//edit route for meal 
router.get('/edit/:idx', (req, res)=> {
   db.meal.findOne({
      where: {id: req.params.idx}
   })
    .then(createdMeals => {
        let parsedMeals = createdMeals.dataValues
        console.log('this is meals data', createdMeals.dataValues)
        res.render('meals/edit', {meal: parsedMeals, mealId: req.params.idx})
       // console.log("this is the ingredient arrray", ingredients)
    })
    .catch(error => {
        console.log(error)
       })
})


//update meal
router.put('/:idx', (req, res)=> {
    db.meal.update(
        {name: req.body.name,
        content: req.body.content},  
        {where: {id: req.params.idx}}
     )
    .then(meal => {
        console.log("THIS IS MEAL IN PUT", meal)
        res.redirect('/meal/all')
    })
    .catch(error => {
        console.log(error)
    })

   
})

// delete meal 
router.delete('/:id', (req, res) => {
    db.meal.destroy({
        where: {id: req.params.id}
    })
    .then(deletedMeal => {
        console.log("you deleted", deletedMeal)
        res.redirect('/meal/all')
    })
    .catch(error => {
        console.log(error)
    })
})

//display individual meal name notes and foods
router.get('/:id', (req, res) => {
    //console.log("this is the meal id\n", req.params.id)
    db.meal.findOne({
        where: { id: req.params.id },
        include: [db.food]
    })
    .then(foundMeal => {
    // console.log('this is found meal', foundMeal)
        res.render('meals/show', { foundMeal: foundMeal})
    })
    .catch(error => {
        console.log(error)
})
})





module.exports = router