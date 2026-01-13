import { pool } from "../config/db.js";


const addToCart = async (userId, productId, quantity = 1) => {
    try {
        const [rows] = await pool.query(
            "SELECT * FROM cart WHERE user_id = ? AND product_id = ?",
            [userId, productId]
        );

        if (rows.length > 0) {
            await pool.query(
                "UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?",
                [quantity, userId, productId]
            );
        } else {
            await pool.query(
                "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)",
                [userId, productId, quantity]
            );
        }

        return { success: true };
    } catch (error) {
        console.error("Error adding to cart:", error);
        throw error;
    }
}


export const getCartByUser = async (userId) => {
    try {
        const [rows] = await pool.query(
            `
        SELECT
        c.id AS cart_id,
        c.quantity,
        c.created_at,
        c.updated_at,
        p.id AS product_id,
        p.name,
        p.price,
        p.img_url,
        p.seller,
        p.color
        FROM cart c
        JOIN products p ON c.product_id = p.id
        WHERE c.user_id = ?
      `,
            [userId]
        );

        return rows;
    } catch (error) {
        console.error("Error fetching cart:", error);
        throw error;
    }
};



const removeFromCart = async (userId, productId) => {
    try {
        await pool.query(
            "DELETE FROM cart WHERE user_id = ? AND product_id = ?",
            [userId, productId]
        );
        return { success: true };
    } catch (error) {
        console.error("Error removing from cart:", error);
        throw error;
    }
}

export const getQuantity = async (userId, productId) => {
    try {
        const [rows] = await pool.query(
            "SELECT quantity FROM cart WHERE user_id = ? AND product_id = ?",
            [userId, productId]
        );

        if (rows.length > 0) {
            return rows[0].quantity;
        } else {
            return 0;
        }
    } catch (error) {
        console.error("Error fetching quantity:", error);
        throw error;
    }
};


export const updateQuantity = async (userId, productId, quantity) => {
    try {
        await pool.query(
            "UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?",
            [quantity, userId, productId]
        );
        return { success: true };
    } catch (error) {
        console.error("Error updating quantity:", error);
        throw error;
    }
}

export const Cart = {
    addToCart,
    getCartByUser,
    removeFromCart,
    updateQuantity,
    getQuantity
};
