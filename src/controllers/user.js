// controllers/authController.js
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '2m' });
  // await User.updateOne({ _id: userId }, { token: token });

  return token;
};


// @desc Register a new user
// @route POST /api/auth/signup
const registerUser = async (req, res) => {


  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const user = await User.create({ name, email, password });

    const token = generateToken(user._id);
    

    // Send back a token and user details
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token,
    });
    await User.updateOne({ _id: userId }, { token: token})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Authenticate user (Sign-in)
// @route POST /api/auth/signin
const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });

    // Validate password
    if (user && (await user.matchPassword(password))) {
      // Send back a token and user details
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getUser = async (req, res) =>{
  try {
    const items = await User.find(); // Retrieve all items from the database
    res.status(200).json(items); // Respond with the list of items
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle server errors
  }
}

module.exports = { registerUser, authUser ,getUser};


