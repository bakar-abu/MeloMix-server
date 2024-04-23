const { UserModel } = require("../model");
const jwt = require('jsonwebtoken');

class User {
  signup = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    const user = new UserModel({ name, email, password });
    try {
      await user.save();
      res.status(200).send({
        status: 200,
        data: null,
        message: "User created successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        status: 500,
        data: null,
        message: "Error occurred while creating user",
      });
    }
  };

  login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email, password });
      if (!user) {
        return res.status(404).json({ message: "Invalid email or password" });
      }
      
      // Generate JWT token
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      
      // Respond with token
      return res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred" });
    }
  };

  logout = async (req, res) => {
    // You may need additional logic here, depending on your requirements
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  };
}

module.exports = User;
