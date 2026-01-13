import { pool } from '../config/db.js';

const createUser = async (user) => {

  try {
    const { name, email, password } = user;
    await pool.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    )

  } catch (error) {

    throw error;
  }
}


const getUserByEmail = async (email) => {

  try {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];

  } catch (error) {

    throw error;
  }
}


const getUserByOtp = async (otp) => {

  try {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE otp = ?',
      [otp]
    );
    return rows[0];

  } catch (error) {

    throw error;
  }
};

const updateOtp = async (email, otp, otpExpire) => {

  try {
    await pool.query(
      'UPDATE users SET otp = ?, otp_expire = ? WHERE email = ?',
      [otp, otpExpire, email]
    );

  } catch (error) {

    throw error;
  }
};


const clearOtp = async (email) => {

  try {
    await pool.query(
      'UPDATE users SET otp = NULL, otp_expire = NULL WHERE email = ?',
      [email]
    );

  } catch (error) {

    throw error;
  }
};


const getUserById = async (id) => {

  try {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    return rows[0];

  } catch (error) {

    throw error;
  }
};

const updateData = async (email, gender, id) => {

  try {
    await pool.query(
      'UPDATE users SET email = ?, gender = ? WHERE id = ?',
      [email, gender, id]
    );
  } catch (error) {

    throw error;
  }
};

const updateImage = async (img_Url, id) => {

  try {
    await pool.query(
      "UPDATE users SET img_url = ? WHERE id = ?",
      [img_Url, id]
    );
  } catch (error) {

    throw error;
  }
};


export const User = {
  createUser,
  getUserByEmail,
  getUserByOtp,
  updateOtp,
  clearOtp,
  getUserById,
  updateData,
  updateImage
};