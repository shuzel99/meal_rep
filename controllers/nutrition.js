const express = require('express')
const router = express.Router()
const axios = require('axios')
const nutritionix = require('nutritionix-api')

const appId = '425d3159'
const appKey = '605175cc6f2051329c74998dc68fc1d7'

nutritionix.init(appId, appKey)

router.get('/results', function(req, res){
    let food = req.query.itemSearch
    console.log(req.query)
    console.log(food)
    //testing for api response 
    nutritionix.natural.search(req.query.itemSearch)
        .then(apiResults => {
        console.log(apiResults)
        // console.log(apiResults.foods[0].photo.highres)
        // const results = (apiResults)
        let name = apiResults.foods[0].food_name
        let servingsz = apiResults.foods[0].serving_qty
        let servingut = apiResults.foods[0].serving_unit
        let photo = apiResults.foods[0].photo.highres
        res.render('results', {name: name, servingsz: servingsz, servingut: servingut, photo: photo})
    })
    .catch(error => {
        console.log(error)
    })
})
//branded and restaurant foods
// router.get('/results', function(req, res){
//     let brand = req.query.brandSearch
//     axios.get(`https://nutritionix.com/v2/search/brands?q=${brand}&limit=1&offset=0&type=1`)
    // console.log(req.query)
    // console.log(brand)
    //testing for api response 
    // nutritionix.brand_search(brand)
        // q: brand,
        // limit: 10,
        // offset: 0,
        // type: 1
//         .then(results => {
//             const name = results.name

//         // console.log(results)
//     })
//     .catch(error => {
//         console.log(error)
//     })
// })



module.exports = router