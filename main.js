const express = require('express')
const {Server: HttpServer} = require('http')
const {Server: SocketServer} = require('socket.io')
const {getProducts,addProduct, getMessages,addMessage} = require('./helpers/Async_helper.js')
const app = express()
const httpServer = new HttpServer(app)
const io = new SocketServer(httpServer)

app.use(express.static("Public"))


app.get('/',(req,res)=>{
    res.send("index.html")
})

io.on("connection", async (socket) =>{
    const products = await getProducts()
    const messages = await getMessages()
    
    socket.emit("products",{products})
    socket.emit("messages",{messages})
    socket.on("addMessage",async (message)=>{
        await addMessage(message.message)
        const messages = await getMessages()
        io.sockets.emit("messages",{messages})
    })
    socket.on("addProduct",async (product)=>{
        await addProduct(product.product)
        const products = await getProducts()
        io.sockets.emit("products",{products})
    })
    
})


const PORT = 8080;
const server = httpServer.listen(PORT, () =>{
    console.log(`Servidor http escuchando en el puerto: ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))
