import { Cart } from '../models/cart.js'
import { Products } from '../models/products.js'
import HTTP_STATUS from "../utils/httpStatus.js"

export const add = async (req, res, next) => {

    const userId = req.session.user.id;
    const { productId, quantity } = req.body;
    try {
        const productData = await Products.getProductById(productId)
        if (productData.quantity < 1) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "product Unavailable" })
        }
        await Cart.addToCart(userId, productId, quantity)
        return res.status(HTTP_STATUS.OK).json({ message: "Added to cart" })

    } catch (error) {

        next(error);
    }
}

export const getCart = async (req, res, next) => {

    const userId = req.session?.user?.id;
    try {
        const cartItem = await Cart.getCartByUser(userId)

        const cartData = cartItem.map(row => ({
            id: row.id,
            quantity: row.quantity,
            product: {
                id: row.product_id,
                name: row.name,
                color: row.color,
                price: row.price,
                seller: row.seller,
                img_url: row.img_url
            }
        }));

        return res.status(HTTP_STATUS.OK).json({ cart: cartData })
    } catch (error) {

        next(error);
    }

}


export const remove = async (req, res, next) => {

    const userId = req.session.user.id;
    const { productId } = req.body;

    try {
        await Cart.removeFromCart(userId, productId)
        return res.status(HTTP_STATUS.OK).json({ message: "Removed product from cart" })

    } catch (error) {

        next(error);
    }
}


export const updateQuantity = async (req, res, next) => {

    try {
        const userId = req.session.user.id;
        const { productId, quantity } = req.body;

        if (quantity <= 0) {

            await Cart.removeFromCart(userId, productId)
            return res.status(HTTP_STATUS.OK).json({ message: "Item removed from cart" });
        }

        await Cart.updateQuantity(userId, productId, quantity)
        return res.status(HTTP_STATUS.OK).json({ message: "Quantity updated" })

    } catch (error) {

        next(error);
    }
};


