import { pool } from '../config/db.js';

const getAllProducts = async () => {

  try {
    const [rows] = await pool.query(
      'SELECT * FROM products'
    );
    return rows;

  } catch (error) {

    throw error;
  }
}

const getProductById = async (productId) => {

  try {
    const [rows] = await pool.query(
      "SELECT * FROM products WHERE id = ?",
      [productId]
    );

    return rows[0];

  } catch (error) {

    throw error;
  }
};


export const Products = {
  getAllProducts,
  getProductById
};