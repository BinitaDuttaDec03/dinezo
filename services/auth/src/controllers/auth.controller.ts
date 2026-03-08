import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import TryCatch from "../middlewares/tryCatch.middleware.js";

export const loginUser = TryCatch(async (req, res) => {
  const { name, email, picture } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name,
      email,
      image: picture,
    });
  }

  const token = jwt.sign({ user }, process.env.JWT_SECRET as string, {
    expiresIn: "15d",
  });

  res.status(201).json({
    message: "Login success",
    token,
    user,
  });
});
