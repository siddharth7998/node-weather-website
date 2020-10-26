const request= require('request')

const forecast= (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=0ab1678fef629b6719e5d564d66d5ffb&query='+ latitude +','+ longitude 

    request({url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to weather service!!',undefined)
        }
        else if(response.body.error){
            callback('Unable to find location!',undefined)
            console.log(response.body)
        }
        else{
            callback(undefined,response.body.current.temperature)
        }
        
    })

}


module.exports= forecast