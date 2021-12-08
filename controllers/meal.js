const express = require('express')
const isLoggedIn = require('../middleware/isLoggedIn')
const router = express.Router()
const db = require('../models')
const { route } = require('./auth')
const nutritionix = require('nutritionix-api')
fs = require('fs')

const appId = '425d3159'
const appKey = '605175cc6f2051329c74998dc68fc1d7'

nutritionix.init(appId, appKey)

//shows all logged meal
router.get('/all', isLoggedIn, (req, res) => {
    db.meal.findAll() 
    .then(meal => {
        console.log('this is meal', meal) 
            res.render('meals/indexMeal', {meals: meal})
        })
})

// Create a new meal
router.post('/', isLoggedIn, (req, res) => {
    // const data = JSON.parse(JSON.stringify(req.body))
    console.log('FOOD FORM: ADDED NEW', req.body)
    db.meal.create({
        name: req.body.name,
        content: req.body.content,
        ingredients: req.body.content, //just added
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

//show form for making new meal
router.get('/newMeal', isLoggedIn, (req, res) => {
   db.food.findAll()
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
router.get('/edit/:id', (req, res)=> {
    let meals = fs.readFileSync('./meals.json')
    let mealData = JSON.parse(meals)
    console.log('this is mealData', mealData)//unexpected end of JSON idk this can go to hell
    res.render('meals/edit.ejs', {mealId: req.params.idx, dino: mealData[req.params.idx]})
})

//update meal
router.put('/:id', (req, res)=> {
    let meals = fs.readFileSync('./meals.json')
    let mealData = JSON.parse(meals)

    mealData[req.params.idx].name = req.body.name
    mealData[req.params.idx].content = req.body.content

    fs.writeFileSync('./meals.json', JSON.stringify(mealData))
    res.redirect('meals/indexMeal')
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
        console.error
    })
})

//display individual meal name notes and foods
router.get('/:id', (req, res) => {
    console.log("this is the meal id\n", req.params.id)
    db.meal.findOne({
        where: { id: req.params.id },
        include: [db.food]
    })
    .then(foundMeal => {
    console.log('this is found meal', foundMeal)
        res.render('meals/show', { foundMeal: foundMeal})
    })
    .catch(error => {
        console.log(error)
})
})





module.exports = router