const express = require('express')
const app = express();
const cors = require('cors')


// middlewares
app.use(express.json())
app.use(cors())

//Routers
const UserRouter = require("./routers/user.router")
const ProductRouter = require("./routers/product.router")
const OrderRouter = require("./routers/order.router")
const InvoiceRouter = require("./routers/invoice.router")




app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});
// create product route
app.use('/api/v1/user', UserRouter)
app.use('/api/v1/product', ProductRouter)
app.use('/api/v1/order', OrderRouter)
app.use('/api/v1/invoice', InvoiceRouter)


// exports app module
module.exports = app;
