import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

// @desc Create new user
// @route POST /users
// @access Public
const createUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Malformed request, required fields are missing!" });
  }

  const duplicate = await User.findOne({ username }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate username!" });
  }

  const hashedPassword = await bcrypt.hash(password, 15);

  const userObject = { username, password: hashedPassword };
  const user = await User.create(userObject);

  if (user) {
    res.status(201).json({ message: `New user ${username} created` });
  } else {
    res.status(400).json({ message: "Invalid project data recieved" });
  }
});

export default {
  createUser,
};
