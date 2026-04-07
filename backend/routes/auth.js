const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const setupAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@minicrm.com' });
    if (!adminExists) {
      await User.create({ email: 'admin@minicrm.com', password: 'password123' });
      console.log('Default admin created: admin@minicrm.com / password123');
    }
  } catch (err) {
    console.error('Error creating admin:', err);
  }
};
router.setupAdmin = setupAdmin;

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (user && user.password === password) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
      res.json({ token, email: user.email });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
