const express = require('express');
const path = require('path');
const routerProducts = require('./routes/products.js');
const routerCart = require('./routes/carts.js');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', routerProducts);
app.use('/api/carts', routerCart);

app.use('*', (req, res) => {
    path = req.params;
    const method = req.method;
    res.send({
        error: -2,
        description: `ruta '${path[0]}' método '${method}' no implementada`
    });
});

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});
server.on('error', error => { console.log(`Error ${error}`) });