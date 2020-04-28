const axios=require('axios')

// ;(async function(){
//     const url='https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibGVlc2Fta3kiLCJhIjoiY2sxZW9vNW40MGQ3dDNpbnlnNXFzaGFiaiJ9.MZEXQ3qAV2tieT8QFqqJiQ&limit=1'
//     const weatherUrl='https://api.darksky.net/forecast/82b7740332a0f469035b75cc9aa9aed1/37.8267,-122.4233'
//     try{
//         const response=await axios.get(weatherUrl)
//         if(response.data.error){
//             throw Error('wrong input')
//         }
//         console.log(response.data)
//     }catch(e){
//         console.error(e)
//     }
// })()

async function weather([longitude,latitude]=[]){
    const URL=`https://api.darksky.net/forecast/82b7740332a0f469035b75cc9aa9aed1/${latitude},${longitude}?units=si`
    try{
        const response=await axios.get(URL)

        const ret=response.data.currently
        ret.longitude=longitude
        ret.latitude=latitude
        return ret
    }catch(e){
        console.error(e)
    }
}

async function geoLocation(place){
    const URL=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json?access_token=pk.eyJ1IjoibGVlc2Fta3kiLCJhIjoiY2sxZW9vNW40MGQ3dDNpbnlnNXFzaGFiaiJ9.MZEXQ3qAV2tieT8QFqqJiQ&limit=1`
    try{
        const response=await axios.get(URL)

        return response.data.features[0].center
    }catch(e){
        console.error(e)
    }
}

async function getWeather(place){
    const geo=await geoLocation(place)
    return await weather(geo)
}

module.exports=getWeather