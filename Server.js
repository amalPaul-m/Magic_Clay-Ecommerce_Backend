import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from "express-session";
import cookieParser from "cookie-parser";
import AuthRoute from './routes/auth.js';
import Products from './routes/products.js';
import Cart from './routes/cart.js';
import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const Frontend_URL = process.env.FRONTEND_URL || 'http://localhost:3001';

app.use(express.json());
app.use(logger); 

app.use(cors({
    origin: Frontend_URL,
    credentials: true
}));

app.use((err, req, res, next) => {
    console.error('GLOBAL ERROR:', err);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.use(
  session({
    name: "magic_clay_session",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24, 
    }
  })
);


app.use('/auth', AuthRoute);
app.use('/products', Products);
app.use('/cart', Cart);


app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port number ${PORT}......`)
});
