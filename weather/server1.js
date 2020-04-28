const express=require('express')
const app=express()
const _=require('lodash')
const path=require('path')
const hbs=require('hbs')

//path
const staticPath=path.join(__dirname,'public')
const viewPath=path.join(__dirname,'templates/views')
const partialPath=path.join(__dirname,'templates/partials')

//express config
app.use(express.static(staticPath))


//hsb config
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'The weather app',
        name:'haha'
    })
})











app.get('*',(req,res)=>{
    res.send('404')
})


app.listen(3000,()=>{
    console.log("The server is running on port 3000")
})