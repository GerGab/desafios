const { fileContainer } = require("../dataBases/fileContainer.js")
const prodContainer = new fileContainer("./dataBases/products.txt")
const messageContainer = new fileContainer("./dataBases/messages.txt");

async function getProducts() {
    const products = await prodContainer.getAll()
    return products
}

async function addProduct(product){
    product.id = `${Date.now()}`
    await prodContainer.createProd(product)
}

async function getMessages() {
    const products = await messageContainer.getAll()
    return products
}

async function addMessage(message){
    let date = new Date(Date.now())
    date = date.toLocaleString()
    message.date = `${date}`
    await messageContainer.createProd(message)
}

module.exports = {getProducts,addProduct,getMessages,addMessage}