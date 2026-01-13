import express from 'express'
import { add, getCart, remove, updateQuantity } from '../controllers/cart.js'
import { checkSession } from '../middlewares/checkSession.js';

const router = express.Router();

router.post('/add', checkSession, add)
router.get('/getCart', checkSession, getCart)
router.patch('/remove', checkSession,  remove)
router.patch('/update-quantity', checkSession, updateQuantity)

export default router;