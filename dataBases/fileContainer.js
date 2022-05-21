const fs = require('fs');

// clase general capaz de configurarse por constructor para distintos textos planos


class fileContainer {

    constructor(file,keys){
        this.file = file;
        this.keys = keys;
    }

    validate (object,database = []){
        // verificar que la cantida de campos es la debida
        if (Object.keys(object).length>this.keys.length) {
            const error = new Error("cantidad de campos excesivos")
            throw error
        }
        else{
            // verificar que lo campos son los correctos y estan completos
            const fields = this.keys.map(key => {
                if (!object[key] || object[key].length===0) return 0; else return 1
            });
            const result = fields.reduce((total,next)=>total*next)
            if(result===0){
                const error = new Error("campos erroneos o incompletos")
                throw error
            }
        }
        if (parseFloat(object["price"])<0||isNaN(object["price"])){
            const error = new Error("Precio no valido")
            throw error
        }
        // validación de producto por id repetido
        const repeated = database.find(data => data.id === object.id)
        if (repeated) {
            const error = new Error("producto ya existente")
            throw error
        }
    }

    // función save para guardar un producto por medio de Post
    async createProd(object){
        let objects = await this.readFromFile();
        try{
            true//this.validate(object,objects)

        }catch(err){
            console.log(err.message)
            const error = new Error( err.message)
            error.type = "error de validacion"
            throw error
        }
        objects.push(object);
        await this.writeInFile(objects)
        return object
    }

    // funcion para obtener por metodo Get/:id
    async getById(id){
        let objects = await this.readFromFile()
        let object = objects.find(object => object.id === id)
        if (!object){
            const error = new Error(`no existe un producto con id: ${id}`)
            error.type = "db not found"
            throw error
        } 
        return  object
    }

    // función para obtener todos los productos por Get
    async getAll(){
        let objects = await this.readFromFile()
        return objects
    }

    // función para borar un objeto por DELETE/:id
    async deleteById(id){
        const objects =  await this.readFromFile()
        const filterObjects = objects.filter(item => item.id !== id);
        if(filterObjects.length == objects.length){
            const error = new Error(`No se pudo borrar el producto. No existe un producto con id: ${id}`)
            error.type = "db not found"
            throw error
        }else{
            await this.writeInFile(filterObjects)
        }
    }

    // funcion para modificar un objeto ya creado PUT/:id
    async modById(id,object){
        try{
            this.validate(object)
        }catch(err){
            const error = new Error( err.message)
            error.type = "error de validacion"
            throw error
        }
        const objects = await this.readFromFile();
        const index = objects.findIndex(item => item.id === id);
        if(index<0){
            const error = new Error(`no existe un producto con id: ${id}`)
            error.type = "db not found"
            throw error
        }else{
            objects[index] = object
            await this.writeInFile(objects)
        }
        return object
    }

    // función no utilizada por el momento
    async deleteAll(){
        await this.writeInFile([])
    }

    // función para callback manejo del archivo de texto plano
    async writeInFile(content){
        try{
            await fs.promises.writeFile(this.file,JSON.stringify(content,null,2))
        }
        catch(err){
            const error = new Error(`no se pudo leer el fichero`)
            error.type = "fichero inexistente"
            throw error
        }
    }

    // función para callback manejo del archivo de texto plano
    async readFromFile(){
        try{
            let content = await fs.promises.readFile(this.file)
            return JSON.parse(content)
        }
        catch(err){
            const error = new Error(`no se pudo leer el fichero`)
            error.type = "fichero inexistente"
            throw error
        }
    }
}

module.exports = {fileContainer}