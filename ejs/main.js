const express = require('express')
const {routerProducts} = require('./routers/routerProducts.js')
const { apiController  } = require('./apiControllers/apiController.js')
var path = require('path'); 
const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'));

app.use("/productos",routerProducts)
app.get('/toogle',apiController.toogle)



const PORT = 8080;
const server = app.listen(PORT, () =>{
    console.log(`Servidor http escuchando en el puerto: ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))
