class ProductManager{
    constructor(){
        this.products = [];
    }

    getProducts = () => {return this.products}

    getNextId = () =>{
        const count = this.products.length;
        return (count>0) ? this.products[count-1].id + 1 : 1;
    }

    getProductbyId = (id) => {
        return this.products.find((prod) => prod.id == id) ?? "Not Found";
    }

    addProduct(title, description, price, thumnail, code, stock) {
        const newProduct={
            id: this.getNextId(),
            title,
            description,
            price,
            thumnail,
            code,
            stock
        }
        this.#errorCheck(newProduct).length == 0 ? this.products.push(newProduct) : this.#errorCheck(newProduct).forEach(error=> console.error(error))
    }
    #errorCheck(newProduct){
        const errors = [];
        this.products.forEach(element => {if (element.code == newProduct.code) errors.push(`El código "${newProduct.code}" ya existe.`)})
        if (Object.values(newProduct).includes(undefined)) errors.push('Hay campos vacíos. Todos los campos son obligatorios.')
        return errors
    }
}

const productsManager = new ProductManager();
console.log(productsManager.getProducts());

productsManager.addProduct("Pepsi", "Gaseosa sabor cola con altos niveles de azúcares", 200, "https://thumbs.dreamstime.com/b/una-lata-y-un-vaso-de-pepsi-156479329.jpg", 1, 10000);

console.log("\n Lista de productos");
console.log(productsManager.getProducts());
console.log("\n-----------------------------------------------\n");
console.log("\n Probando que todos los campos sean obligatorios. Agrego un producto sin stock:\n");
productsManager.addProduct("Coca-Cola", "Gaseosa con altos niveles de azúcares", 350, "https://alemaxikiosco.com.ar/wp-content/uploads/2022/02/coca-cola-ret-2l.jpg", 2);
console.log("\n-----------------------------------------------\n");
console.log(productsManager.getProducts());
console.log("\n-----------------------------------------------\n");
console.log("\n Probando que no se repita la propiedad code. Agrego un codigo repetido en el Fernet:\n");
productsManager.addProduct("Coca-Cola", "Gaseosa con altos niveles de azúcares", 350, "https://alemaxikiosco.com.ar/wp-content/uploads/2022/02/coca-cola-ret-2l.jpg", 2, 10000);
productsManager.addProduct("Fernet Branca 1L", "Bebida alcoholica para acompañar una Coca-Cola", 1200, "https://http2.mlstatic.com/D_NQ_NP_839815-MLA42105294550_062020-O.jpg", 1, 10000);
console.log("\n-----------------------------------------------\n");
console.log("\n Lista de productos (Actualizada)");
console.log(productsManager.getProducts());
console.log("\n-----------------------------------------------\n");
console.log("Obtener elementos por id");
console.log("\n-----------------------------------------------\n");
console.log(productsManager.getProductbyId(1));
console.log("\n-----------------------------------------------\n");
console.log(productsManager.getProductbyId(2));
console.log("\n-----------------------------------------------\n");
console.log(productsManager.getProductbyId(8));
console.log("\n-----------------------------------------------\n");
console.log("Fin.");