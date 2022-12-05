const fs = require('fs')

class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path;
        this.format = 'utf-8';
    }

    getNextId() {
        let size = this.products.length
        return size > 0 ? this.products[size - 1].id + 1 : 1
    }

    newProduct(id, title, description, price, thumbnail, code, stock) {
        const newProduct = {
            id: id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        return newProduct;
    }

    errorCheck(newProduct, operation) {
        const errors = [];
        if (operation == "add") {
            this.products.forEach(element => { if (element.code == newProduct.code) errors.push(`El código "${newProduct.code}" ya existe.`) })
        }
        if (Object.values(newProduct).includes(undefined)) errors.push('Hay campos vacíos.')
        return errors
    }

    async getIndex(id) {
        let index;
        let product = await this.getProductById(id)
        if (product != "Product Id no encontrado.") index = this.products.indexOf(product)
        else return console.log(product);
        return index
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        await this.getProducts()
        const newProduct = this.newProduct(this.getNextId(), title, description, price, thumbnail, code, stock)
        const errors = this.errorCheck(newProduct, "add")
        errors.length == 0 ? (this.products.push(newProduct), await fs.promises.writeFile(this.path, JSON.stringify(this.products))) : errors.forEach(error => console.error(error))

    }

    getProducts = async () => {
        try {
            let content = await fs.promises.readFile(this.path, this.format)
            this.products = JSON.parse(content)
            return this.products
        }
        catch (err) {
            return "No fue posible obtener productos."
        }

    }

    getProductById = async (id) => {
        await this.getProducts()
        return this.products.find(product => product.id == id) || "Product Id no encontrado.";

    }

    updateProductById = async (id, title, description, price, thumbnail, code, stock) => {
        const index = await this.getIndex(id)
        const updatedProduct = this.newProduct(id, title, description, price, thumbnail, code, stock)
        const errors = this.errorCheck(updatedProduct, "update")
        errors.length == 0 ? (this.products[index] = updatedProduct, await fs.promises.writeFile(this.path, JSON.stringify(this.products))) : errors.forEach(error => console.error(error))

    }

    deleteProductById = async (id) => {
        const index = await this.getIndex(id)
        if (index) (this.products.splice(index, 1), await fs.promises.writeFile(this.path, JSON.stringify(this.products)))

    }
}

module.exports = ProductManager;
