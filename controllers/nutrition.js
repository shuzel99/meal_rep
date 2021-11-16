const express = require('express')
const router = express.Router()
const axios = require('axios')
const nutritionix = require('nutritionix-api')

const appId = '425d3159'
const appKey = '605175cc6f2051329c74998dc68fc1d7'

nutritionix.init(appId, appKey)

router.get('/results', function(req, res){
    let food = req.query.userSearch
    console.log(req.query)
    console.log(food)
    //testing for api response 
    nutritionix.natural.search(req.query.userSearch)
        .then(results => {
        console.log(results)
    })
    // axios.get(`https://api.nutritionix.com/v1_1/search/${food}?&appId=${process.env.appId}&appKey=${process.env.appKey}`)
    // .then(apiResults => {
    //     // console.log(apiResults.data.Search)
    //     const results = apiResults.data.Search
    //     res.render('results', {results: results})
    // })
    .catch(error => {
        console.log(error)
    })
})

module.exports = router