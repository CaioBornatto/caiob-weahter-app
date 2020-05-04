const request = require('request')


 const forecast = ( long ,lat , callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=95ba09d59b0649a836ec334e6a88e447&query='+long+','+ lat

    request(
        
        {url, json: true }, (error, {body}) =>{
            //debugger
            if(error){
             callback (console.log('Unable to conect to wether service'),undefined)
            }else if (body.error){
               if(error.code == 615 ){
                  callback('A api da weatherstack esta com prolemas. Codigo do erro:' +body.error.code)
               } else{
                  callback('Unable to find location!')
               }
             
            } else {
               callback (undefined,' The current temperature is ' +body.current.temperature + ' and the current weather is ' + body.current.weather_descriptions[0])
            } 
             
           })
 }

 module.exports = forecast

