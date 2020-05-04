const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast= require('./utils/forecast')

console.log(__dirname)


const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

 

//Setup static directory to serve
app.get('',(req,res)=>{
    res.render('index.hbs',{
        title: 'Weather app',
        name:'Caio Vinícius Bornatto'
    })
}) 

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About me',
        name: 'Caio Vinícius Bornatto'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name: 'Caio Vinícius Bornatto'
    })
})



app.get('/weather',(req,res)=>{
   
   if(!req.query.address){
       return res.send({
        error : 'You must provide an address!'
       } )
      }
    geocode(req.query.address,(error,data)=>{
        if (error){
            return res.send({error})
        }
   
       forecast(data.latitude,data.longitude,(error,forecastData) =>{
           
           if(error){
               return res.send({
                   error: error
               })
           }
           res.send({
            location: data.location,
            latitude:data.latitude,
            longitude: data.longitude,
            forecastData,
            address: req.query.address
          }) 
       })

        
    })

    

})

app.get('/products',(req,res)=>{
   if(!req.query.search){
      return res.send({
           error : 'You must provide search term'
       })
   }
   
    console.log(req.query.search)
    res.send({
        products:[]
    })
})  

app.get('/help/*',(req, res)=>{
    res.render('404',{
        title: '404 | Help article not found ',
        name: 'Caio Vinícius Bornatto'
    })
})

app.get('*',(req, res)=>{
    res.render('404',{
        title: '404| Page not found',
        name: 'Caio Vinícius Bornatto'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port' + port)
})