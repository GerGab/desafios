const {Router} = require("express")
const express = require("express")
const { apiController  } = require('../apiControllers/apiController.js')
const routerProducts = new Router()
const {addId} = require("../middlewares/productMware.js")

// middlewares para manejo de peticiones
routerProducts.use(express.json())
routerProducts.use(express.urlencoded({extended:true}))

// routeo a apiController
routerProducts.get("/",apiController.getProducts)
routerProducts.post("/",addId,apiController.postProduct)

// exportación del modulo
module.exports = {routerProducts}