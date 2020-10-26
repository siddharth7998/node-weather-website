const path =require('path')
const express =  require('express')
const hbs = require('hbs')
const geocode =require('./utils/geocode')
const forecast =require('./utils/forecast')


const app = express()


//Defining Paths for Express 
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials') 

//setup handlebars engine and views
app.set('views',viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//Setup static Directory
app.use(express.static(path.join(__dirname,'../public')))



app.get('',(req,res)=>{

    res.render('index',{
        title: 'weather app',
        name:'Sid'
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Sid'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        help: 'This is a help pge.....and YOU Can use this',
        title: 'Help PAGE',
        name: 'Sid'
    })
})


app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Please enter an address '})
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={} )=>{
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
    
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        
        
        })


    })


    // res.send({
    //     forescast: 'Its sunny',
    //     location: 'Jaipur',
    //     address: req.query.address
    // })
})





app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name: 'sid',
        errorMessage:'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title:'404',
        name: 'sid',
        errorMessage:'Page not found'
    })
})

//app listen

app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})