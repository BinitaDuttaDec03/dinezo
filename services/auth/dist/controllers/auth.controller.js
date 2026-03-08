import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const loginUser = async (req, res) => {
    try {
        const { name, email, picture } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                name,
                email,
                image: picture,
            });
        }
        const token = jwt.sign({ user }, process.env.JWT_SECRET, {
            expiresIn: "15d",
        });
        res.status(201).json({
            message: "Login success",
            token,
            user,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
