// controllers/authController.js
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

// for creating user
const addUser = async (req,res, active) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({ name, email, password , role, isActive : active});
  const token = generateToken(user._id);
  

 return res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role : user.role,
    token: active === true ? token : null,
    Message : (active === true) ? "Welcome Admin" : 'Your Request Is Sent To The Admin for Approval'
  });
  
};


// @desc Register a new user
// @route POST /api/auth/signup
const registerUser = async (req, res) => {
  
  const {  email, role } = req.body;

  try {


    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    if(role === 'admin')
    {
      const existsAdmin = await User.findOne({role : 'admin'});
      if(!existsAdmin)
      {
        addUser(req, res, true);
      }
      else
      {
        addUser(req, res, false);
        
      }
    }
    else
    {
      addUser(req, res, false);
    }


   
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
    if (!user) {
      return res.status(401).json({ message: 'User not found ' });
    }

    

    // Validate password
    if (user && (await user.matchPassword(password))) {

      if(user?.isActive === false)
        {
         return res.status(200).json({ message: 'Please wait or talk to admin to approve your request' });
        }
        else{
          return res.json({
             _id: user._id,
             name: user.name,
             email: user.email,
             isActive : user.isActive,
             token: generateToken(user._id),
           });

        }
      // Send back a token and user details
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) =>{
  
  try {
    const existingUser = await User.findById(req.params.id);
    if(!existingUser || existingUser.role === 'admin') {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = await User.findByIdAndUpdate(req.params.id, {
      name: existingUser.name,
      email: existingUser.email,
      password: existingUser.password,
      role: existingUser.role,
      isActive : req.body.isActive
    }, {
      new: true,
      runValidators: true,
    });
    
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


const getUserApprovalRequest = async (req, res) =>{
  try {
    const items = await User.find({isActive : false , role : req.body.role});
    if(!items.length) { 
      return res.status(404).json({ message: "No Approval Request Available" });
    }
    res.status(200).json(items); // Respond with the list of items
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle server errors
  }
}


const getUser = async (req, res) =>{
  try {
    const items = await User.find(); // Retrieve all items from the database
    res.status(200).json(items); // Respond with the list of items
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle server errors
  }
}

module.exports = { registerUser, authUser ,updateUser,getUser,getUserApprovalRequest};


