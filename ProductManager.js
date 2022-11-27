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

async function run() {

    const productosControlador = new ProductManager("productos.json")
    console.table(await productosControlador.getProducts())

    await productosControlador.addProduct("Batidora", "Batidora para tus postres favoritos", 300, "http://url.com", 12521, 30)
    await productosControlador.addProduct("Oso de peluche", "Oso color rojo", 50, "http://url.com", 33244, 43)
    await productosControlador.addProduct("Lapicera con luz", "Lapicera de punta fina con luz", 4, "http://url.com", 24432, 100)

    console.table(await productosControlador.getProducts())

    // Intentando ingresar sin el campo stock.
    await productosControlador.addProduct("Lapicera con luz", "Lapicera de punta fina con luz", 4, "http://url.com", 24432)

    //Intentando ingresar el mismo producto con el 'code' repetido.
    await productosControlador.addProduct("Lapicera Negra", "Para escribir lo que quieras", 2, "http://url.com", 24432, 100)

    // Actualizando datos de un producto.
    await productosControlador.updateProductById(3, "Lapicera roja", "Para escribir lo que quieras", 2, "http://url.com", 24432, 100);
    console.table(await productosControlador.getProductById(3));

    //Not found
    console.table(await productosControlador.getProductById(4));

    console.table(await productosControlador.getProducts())

    // Eliminar producto con Id 3
    await productosControlador.deleteProductById(3)

    console.table(await productosControlador.getProducts())

    console.table(await productosControlador.getProductById(3));
}

run()