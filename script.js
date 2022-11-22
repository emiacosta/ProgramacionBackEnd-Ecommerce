class ProductManager{
    constructor(){
        this.products = [];
    }

    getProducts = () => {return this.products}

    getNextID = () =>{
        const count = this.products.length;
        return (count>0) ? this.products[count-1].id + 1 : 1;
    }

    existsProduct = (code) => { 
        return this.products.some((prod) => prod.code === code);
    }

    getProductbyId = (id) => {
        return this.products.find((prod) => prod.id == id) ?? "Not Found";
    }

    addProduct = (title, description, price, thumbnail, code, stock) =>{
        if(!this.existsProduct(code)){
            const product = {
                id: this.getNextID(),
                code: code,
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                stock: stock
            }
            this.products.push(product);
        }else{
            console.error(`Código de producto ${code} ya existe en la lista de productos.`);
        }
    }
}

const productsManager = new ProductManager();
console.log(productsManager.getProducts());

productsManager.addProduct("Pepsi", "Gaseosa sabor cola con altos niveles de azúcares", 200, "https://thumbs.dreamstime.com/b/una-lata-y-un-vaso-de-pepsi-156479329.jpg", 1, 10000);

console.log("\n Lista de productos");
console.log(productsManager.getProducts());

productsManager.addProduct("Coca-Cola", "Gaseosa con altos niveles de azúcares", 350, "https://alemaxikiosco.com.ar/wp-content/uploads/2022/02/coca-cola-ret-2l.jpg", 2, 10000);
productsManager.addProduct("Fernet Branca 1L", "Bebida alcoholica para acompañar una Coca-Cola", 1200, "https://http2.mlstatic.com/D_NQ_NP_839815-MLA42105294550_062020-O.jpg", 1, 10000);
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