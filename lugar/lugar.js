const axios = require('axios')

let getLugarLatLng = async  (direccion) => {
  let encodeURL = encodeURI(direccion)
  const key = "AIzaSyAhvC3rIiMvEM4JUPAl4fG1xNPRKoRnoTg"
  
  let resp = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURL}&key=${key}`)
  if( resp.data.status === 'ZERO_RESULTS' ) {
    throw new Error(`No hay resultados para la cuidad ${ direccion }`)
  }

  let results = resp.data.results[0]
  return {
    direccion: results.formatted_address,
    lat: results.geometry.location.lat,
    lng: results.geometry.location.lng
  }
}

let getClima = async (lat, lng) => {
  let resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=ade83d0ca7f5319f717f8c24c45fa4c9`)

  return resp.data.main.temp;
}

let getInfo = async (direccion) => {
  let coords = await getLugarLatLng(direccion);
  let temp   = await getClima(coords.lat, coords.lng)

  return `El clima en ${ coords.direccion } es de ${ temp } °C`
}

module.exports = {
  getInfo,
  getClima,
  getLugarLatLng
}