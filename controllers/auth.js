import { User } from '../models/user.js';
import bcrypt from 'bcryptjs';
import { generateOtp } from '../utils/generateOtp.js';
import HTTP_STATUS from "../utils/httpStatus.js";

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {

        const userData = await User.getUserByEmail(email)
        if (!userData) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Invalid Email or Password' });
        }
        const isMatch = await bcrypt.compare(password, userData.password);
        if (!isMatch) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Invalid Email or Password' });
        }

        req.session.user = {
            id: userData.id,
            email: userData.email
        };
        return res.status(HTTP_STATUS.OK).json({ message: 'Login successful' });


    } catch (error) {

        next(error);
    }
}



export const register = async (req, res, next) => {

    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'All fields are required' });
        }

        const userData = await User.getUserByEmail(email);

        if (userData) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'User Already Exists' });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            name,
            email,
            password: encryptedPassword
        };

        await User.createUser(newUser);
        await generateOtp(email);

        return res.status(HTTP_STATUS.CREATED).json({ message: 'User Registered Successfully' });

    } catch (error) {

        next(error);
    }
}



export const verifyOtp = async (req, res, next) => {

    const { otp } = req.body;

    try {
        const userData = await User.getUserByOtp(otp);
        if (!userData) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'user not found' })
        }

        if (userData.otp !== otp || userData.otpExpire < Date.now()) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Invalid Otp' })
        }

        await User.clearOtp(userData.email);
        return res.status(HTTP_STATUS.OK).json({ message: 'otp verified, logged in successfuly' })

    } catch (error) {

        next(error);
    }
}

export const checkAuthSession = (req, res) => {

    if (!req.session || !req.session.user) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Not logged in" });
    }

    res.status(HTTP_STATUS.OK).json({
        user: req.session.user
    });
};


export const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Logout failed" });
        }

        res.clearCookie("magic_clay_session");
        res.status(HTTP_STATUS.OK).json({ message: "Logged out" });
    });
};

