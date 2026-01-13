import { Products } from '../models/products.js'
import HTTP_STATUS from "../utils/httpStatus.js"


export const products = async (req, res, next) => {

    try {
        const allProducts = await Products.getAllProducts();
        return res.status(HTTP_STATUS.OK).json({ products: allProducts });
    } catch (error) {

        next(error);
    }
}

