const { fileContainer } = require("../dataBases/fileContainer.js")
const prodContainer = new fileContainer("./dataBases/products.txt",["title","price","thumbnail","id"]); 

const apiController =  {
    getProducts: async (req, res) => {
        try{
            const products = await prodContainer.getAll()
            let show = products.length >0
            res.render('index',{products,show});
        }
        catch (err){
            let products = []
            let show = products.length >0
            res.render('index',{products,show});
        }

    },
    postProduct: async (req, res) => {
        const object = req.body
        await prodContainer.createProd(object)
        res.redirect('/productos')
    },
    toogle: (req,res) =>{
        form =!form
        res.redirect('/productos')
    }
}

module.exports = {apiController}