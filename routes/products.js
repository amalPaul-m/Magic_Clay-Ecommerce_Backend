import express from 'express';
import { products } from '../controllers/products.js';
import { checkSession } from '../middlewares/checkSession.js';

const router =  express.Router();


router.get("/products", checkSession, products)

export default router