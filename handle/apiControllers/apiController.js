const { fileContainer } = require("../dataBases/fileContainer.js")
const prodContainer = new fileContainer("./dataBases/products.txt"); 

const apiController =  {
    products: async (req, res) => {
        res.json( await prodContainer.getAll())
    },
    random: async (req, res) => {
        res.json( await prodContainer.getRandom())
    }
}

module.exports = {apiController}