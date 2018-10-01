const { getInfo} = require('./lugar/lugar')

const argv = require('yargs').options({
  direccion: {
    alias: 'd',
    desc: 'Direccion de la cuidad para obtener el clima',
    demand: true
  }
}).argv

getInfo(argv.direccion)
  .then(message => {
    console.log(message)
  })
  .catch(e => console.log(e))
