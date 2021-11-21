require('dotenv').config()
const nutritionix = require('nutritionix-api')
const axios = require('axios')
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('./config/ppConfig')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')
const methodOverride = require('method-override')

//allows you to use put and delete
app.use(methodOverride('_method'))
// views (ejs and layouts) set up
app.set('view engine', 'ejs')
app.use(ejsLayouts)

// body parser middelware
app.use(express.urlencoded({extended:false}))

//set apiID & key
const appId = '425d3159'
const appKey = '605175cc6f2051329c74998dc68fc1d7'

nutritionix.init(appId, appKey)


// session middleware
app.use(session({
    secret: process.env.SUPER_SECRET_SECRET,
    resave: false,
    saveUninitialized: true
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// flash middleware (must go AFTER session middleware)
app.use(flash())

// custom middleware
app.use((req, res, next) => {
    // before every route, attach the flash messages and current user to res.locals
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    next()
})

// controllers middleware 
app.use('/auth', require('./controllers/auth'))

// profile route
app.get('/profile', isLoggedIn, (req, res)=>{
    res.render('profile')
})

//main index
app.get('/', (req, res)=>{
    let nutritionixURL = 'https://api.nutritionix.com/v1_1/search/'
    //calling the API
    axios.get(nutritionixURL).then(apiResponse => {
        let nutrition = apiResponse.data.results
        res.render('index', {nutrition: nutrition})
    })  
})


app.use('/nutrition', require('./controllers/nutrition'))
app.use('/favorites', require('./controllers/favorites'))


app.listen(3000, ()=>{
    console.log(`process.env.SUPER_SECRET_SECRET ${process.env.SUPER_SECRET_SECRET}`)
    console.log("auth_practice running on port 3000")
})
//are u changing?
//bootstrap to make it look cute
 //restorative
//create meals controller and views 
//ask how to make meals have customizable name
//create search bar for meals and ingredients
//change post routes to only be for meals and look at blog app to add meal names and descriptions and comments?