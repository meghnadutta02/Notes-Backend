import User from "../models/UserModel.js";
import { hashPassword, comparePasswords } from "../utils/hashPassword.js";
import { generateAuthToken } from "../utils/generateAuthToken.js";

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).send("All input fields are required");
    const hashedPassword = hashPassword(password);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format!" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ error: "User already exists!" });
    } else {
      const user = await User.create({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
      });

      res
        .cookie(
          "access_token",
          generateAuthToken(user._id, user.name, user.email, user.isAdmin),
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          }
        )
        .status(201)
        .json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        });
    }
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password, doNotLogout } = req.body;
    if (!email || !password)
      res.status(400).json({ error: "All input fields are required" });

    const user = await User.findOne({ email }).orFail();

    if (user && comparePasswords(password, user.password)) {
      let cookieParams = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      };
      if (doNotLogout) {
        cookieParams = { ...cookieParams, maxAge: 1000 * 60 * 60 * 24 * 7 };
      }
      return res
        .cookie(
          "access_token",
          generateAuthToken(
            user._id,
            user.name,
            user.email,
            user.isAdmin,
            doNotLogout
          ),
          cookieParams
        )
        .status(200)
        .json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          doNotLogout,
        });
    } else {
      res.status(401).json({ error: "Wrong Credentials" });
    }
  } catch (err) {
    if (err.name === "DocumentNotFoundError") {
      res.status(400).json({ error: "Account does not exist, please sign up" });
    } else {
      next(err);
    }
  }
};

export { registerUser, loginUser };
