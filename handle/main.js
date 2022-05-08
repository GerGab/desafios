const express = require('express')
const { apiController  } = require('./apiControllers/apiController.js')

const app = express()

app.get('/productos', apiController.products)
app.get('/productoRandom', apiController.random)

const PORT = 8080;
const server = app.listen(PORT, () =>{
    console.log(`Servidor http escuchando en el puerto: ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))
