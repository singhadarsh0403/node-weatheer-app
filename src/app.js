const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
//__dirname(double underscore-dirname give the location of the reostory the file is in)
// path.join(agr 1 = for the repostitory we want to work on, the arg 2 is for the relativelocation like ../)


const app = express()
//this port for env(environment) works to run PORT for heroku or if heroku is not there then default 3000 will work good
const port = process.env.PORT || 3000

const dir = path.join(__dirname,'../public')
//the default express code runs always on the ../views directory by default
//to customise the default value we can store it and change it to views varible
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//to use templete we use the app.set fucn which is used to load the templete
//note:- the keywords used much matched with spaces and are case senistive
//rember that for hbs the directory used is 'view engine' coz hbs is a view engine

app.set('view engine','hbs')
//here we changed the templates to views so that it acts as it did for  default
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//setup express directory to work
app.use(express.static(dir))
//app.use is a function to serve-up the application static funcn is the function that renders up the application

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name: 'Adarsh'
    })
    //note the use of render here in place of send
    //the first arg is to the file that we want to dispaly
    //the second arg is the topics that we want to render(access)
    //also we need not put .hbs until it matchs files in views folder
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'weather',
        name:'Adee'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'need help?',
        title:'help',
        name:'Adarsh'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        res.send({
            error:'please provide addess'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error:'something wrong with geocode'})
        }
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error)
            {
                return res.send({error:'error in forecast'})
            }

            res.send({
              forecast:forecastdata,
              location,
              address: req.query.address 
            })
        })
    })
    // res.send({
    //     weather : 'cold',
    //     location: req.query.address
    // })
})


app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            note:'please give a search'
        })
    }
    res.send({
        product:'yoyo'
    })
})

//to render the 404 page, it always come in end
//it's put in end becoz the reading of file goes inline and if it findes some text then it stops looking further
//we use the wildcard char -'*' which goes for every page that is not found
//we can use the wildcard for all the things or specific page
//for spec page we have app.get('/help/*',()=>{})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        message404:'help not found',
        title:'help',
        name:'Adarsh'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        message404:'page not found',
        title:'help',
        name:'Adarsh'
    })
})

app.listen(port, ()=>{
    console.log('server is up on port '+ port)
})