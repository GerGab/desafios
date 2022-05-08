const fs = require('fs');

class fileContainer {

    constructor(file){
        this.file = file;
    }

    async save(object){
        let objects = await this.readFromFile();
        objects.push(object);
        await this.writeInFile(objects)
    }

    async getById(id){
        let objects = await this.readFromFile()
        let object = objects.find(object => object.id === id)
        return object ?? null  
    }

    async getRandom(){
        let objects = await this.readFromFile()
        let index = Math.trunc(Math.random()*objects.length)
        return objects[index]
    }

    async getAll(){
        let objects = await this.readFromFile()
        return objects
    }

    async deleteById(id){
        const objects =  await this.readFromFile()
        const filterObjects = objects.filter(item => item.id !== id);
        await this.writeInFile(filterObjects)
    }

    async deleteAll(){
        await this.writeInFile([])
    }

    async writeInFile(content){
        try{
            await fs.promises.writeFile(this.file,JSON.stringify(content,null,2))
        }
        catch(err){
            console.log(`Error en escritura: ${err}`)
        }
    }

    async readFromFile(){
        try{
            let content = await fs.promises.readFile(this.file)
            return JSON.parse(content)
        }
        catch(err){
            console.log(`Error en lectura: ${err}`)
        }
    }
}

module.exports = {fileContainer}