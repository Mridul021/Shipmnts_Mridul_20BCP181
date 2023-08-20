import { User } from "../model/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// import { sendCookie } from '../util/sendCookie.js';

const salt = bcrypt.genSaltSync(10);

export const register = async (req, res) => {
    const { username, password } = req.body;

    try {
        await User.create({ username, password: await bcrypt.hashSync(password, salt) });
        res.status(200).json({
            message: 'User Created',
            success: true
        })
    }
    catch (e) {
        res.status(400).json({
            message: e,
            success: false
        });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            res.status(400).json({
                message: "User not found",
                success: false
            });
            return;
        }

        const passOk = bcrypt.compareSync(password, user.password);

        if (passOk) {
            // sendCookie(user, res, username);
            return res.status(200).json({
                message: 'Login successful',
                success: true
            });
        } else {
            return res.status(400).json({
                message: "Invalid credentials",
                success: false
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


export const profile = (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, info) => {
        if (err) throw err;
        res.status(200).json({
            user: info });
    })
};

export const logout = (req, res) => {
    res.cookie('token', '').json({
        message: `Logout Success`,
        success: true
    });
};