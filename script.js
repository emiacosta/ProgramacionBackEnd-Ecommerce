class ProductManager {
    constructor() {
        this.products = []
    }

    getNextId = () => {
        const count = this.products.length

        if (count == 0) return 1

        const lastProduct = this.products[count - 1]
        const lastId = lastProduct.id
        const nextId = lastId + 1

        return nextId
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        const id = this.getNextId()
        const product = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
            this.products.push(product)    
    }
}

const manager = new ProductManager()
const getProducts = () => { console.log(manager.products) }
getProducts();

manager.addProduct("Naranja", "Fruta", 1, "Sin imagen")
manager.addProduct("Mandarina", "Fruta", 15, "Sin imagen")
getProducts();