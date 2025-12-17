const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const connection = require('./config/db');
const userRouter = require('./routes/userroutes');
const sellerrouter = require('./routes/sellerroutes');
const connectcloudinary = require('./config/Cloudinary');
const productrouter = require('./routes/productroute');
const cartRouter = require('./routes/cartroutes');
const addressrouter = require('./routes/addressrouter');
const orderRouter = require('./routes/orderroutes');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));

app.get('/', (req, res) => res.send('api listening'));

app.use("/api/user", userRouter);
app.use("/api/seller", sellerrouter);
app.use("/api/product", productrouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressrouter);
app.use("/api/order", orderRouter);










const startServer = async () => {
    await connection();
    app.listen(port, () => console.log(`Server running on port ${port}`));
};

connectcloudinary();








startServer();
app.get("/test", (req, res) => {
  res.send("Postman is working!");
});
