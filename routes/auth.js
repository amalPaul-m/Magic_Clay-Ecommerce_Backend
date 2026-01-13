import express from 'express';
import { login, register, verifyOtp, logout, checkAuthSession } from '../controllers/auth.js';

const router =  express.Router();

//Login Page

router.post('/login', login);

//check session

router.get("/me", checkAuthSession);

//Register Page

router.post('/register', register);

//Verify Otp

router.post('/verify-otp', verifyOtp);

//logout route

router.post('/logout', logout);

export default router;