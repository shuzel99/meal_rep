const express = require('express')
const router = express.Router()
const axios = require('axios')



router.get('/results', function(req, res){
    let food = req.query.food_name
    axios.get(`https://api.nutritionix.com/v1_1/search/${food}?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=${process.env.appId}&appKey=${process.env.appKey}`)
    .then(apiResults => {
        console.log(apiResults.data.Search)
        const results = apiResults.data.Search
        res.render('results', {results: results})
    })
    .catch(error => {
        console.log(error)
    })
})

module.exports = router