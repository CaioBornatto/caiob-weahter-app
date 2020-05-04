const request = require('request')

const geocode = (adress,callback)=>{
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1IjoiZHluYW1vNTYiLCJhIjoiY2s4eXdicHhxMWFybDN0c2Z1NDNkdDZmYyJ9.pf3yO8WPiYturdLCj3-Xsw&limit=1'  
  
  request( {url, json: true }, (error,response) =>{
   
    if(error){
      callback('Unable to conect to location service', undefined) 
    } else if(response.body.features.length === 0){
        callback('Unable to find location', undefined)        
    } else{
        callback(undefined,{
          latitude: response.body.features[0].center[1],
          longitude: response.body.features[0].center[0],
          location: response.body.features[0].place_name
        })
    }
  })

}

// const geocode = (adress, callback) =>{
//     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1IjoiZHluYW1vNTYiLCJhIjoiY2s4eXdicHhxMWFybDN0c2Z1NDNkdDZmYyJ9.pf3yO8WPiYturdLCj3-Xsw&limit=1'
//     request({url, json: true }, (error,response) =>{
//       console.log(response.body)

//       if(error){
//         callback('Unable to conect to location service', undefined) 
//       } else if(response.body.features.lenght === 0){
//          callback('Unable to find location', undefined)
//       } else{
//         callback(undefined, { 
//                        latitude: response.body.features[0].center[1],
//                        longitude: response.body.features[0].center[0],
//                        location: response.body.features[0].place_name
  //       })
//       }
        
//       }

  
   module.exports = geocode