const express=require('express')
const _=require('lodash')
const hbs=require('hbs')
const app=express()
const getWeather=require('./app')
const path=require('path')


// paths for express config
const publicStaticPath=path.join(__dirname,'public')
const viewPath=path.join(__dirname,'templates/views')
const partialPath=path.join(__dirname,'templates/partials')

// handlebars engine and view location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicStaticPath))

app.get('/weather',async (req,res)=>{
    console.log(req.query.address)
    if(!req.query.address){
        return res.send({
            error:'You need to provide the address'
        })
    }
    const weather=await getWeather(req.query.address).catch(e=>{
        return {
            error:'your location does not find'
        }
    })
    return res.send({
        address:req.query.address,
        temperature:weather.temperature,
        rain:weather.precipProbability+"%",
        weather:weather.icon,
        longitude:weather.longitude,
        latitude:weather.latitude
    })
})

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Max Life'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        name:'Max Life',
        title:'The about page'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some helpful text.',
        title:'Help',
        name:'Max Life'
    })
})


//404
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:404,
        name:'Max life',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:404,
        name:'Max Life',
        errorMessage:'Page not found'
    })
})





app.listen(3000,()=>{
    console.log(`Server is running on port 3000`)
})