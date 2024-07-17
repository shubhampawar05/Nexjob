const userModel = require("./../models/user");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    if (!name && !email && !password) {
      return res.status(400).json({
        message: "all fields are required",
      });
    }

    let user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        error: "User already exists",
      });
    }

    let newUser = new userModel({
      name,
      email,
      password,
    });
    await newUser.save();

    res.status(201).json({
      msg: "account crated succsfully",
    });
    console.log("done");
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!email && !password) {
      return res.status(400).json({
        message: "all fields are required",
      });
    }

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const payload = { userId: user._id };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });

    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({
      message: "Login successful",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server error",
    });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Logout successful",
  });
};

const authController = {
  signup,
  login,
  logout,
};


module.exports = authController;
