const socket  = io()

const form = document.getElementById("form")
const productsDiv = document.getElementById("products")
const chat = document.getElementById("chat")
const MessForm = document.getElementById("messageForm")

socket.on("products",products=>{
    plotProducts(products)
})
socket.on("messages",messages=>{
    plotMessages(messages)
})

async function plotProducts(products){
    const template = await fetch('./views/show.ejs')
    const text = await template.text()
    const functionTemplate = ejs.render(text, products)
    productsDiv.innerHTML = functionTemplate
}

async function plotMessages(messages){
    const MessTemplate = await fetch('./views/chat.ejs')
    const messageText = await MessTemplate.text()
    const functionMessage = ejs.render(messageText,messages)
    chat.innerHTML = functionMessage
    chat.scrollTop = chat.scrollHeight
}

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const product = {
        "title" : e.target.elements.title.value,
        "price": e.target.elements.price.value,
        "thumbnail": e.target.elements.thumbnail.value
    }
    socket.emit("addProduct",{product})
    form.reset()
})

MessForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    const message = {
        "name" : e.target.elements.name.value,
        "message": e.target.elements.message.value,
    }
    socket.emit("addMessage",{message})
    MessForm.reset()
})