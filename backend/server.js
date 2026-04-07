const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// We will create these routes shortly
const authRoutes = require('./routes/auth');
const leadRoutes = require('./routes/leads');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 2000 });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log('Local MongoDB not found. Using fallback in-memory MongoDB...');
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    console.log('Connected to In-Memory MongoDB');
  }
};

connectDB().then(() => {
  if (authRoutes.setupAdmin) authRoutes.setupAdmin();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
