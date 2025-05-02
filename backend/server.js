const express = require('express');
   const mongoose = require('mongoose');
   const cors = require('cors');
   const dotenv = require('dotenv');
   const authRoutes = require('./routes/auth');
   const donationRoutes = require('./routes/donations');

   // Load environment variables
   dotenv.config({ path: './config/.env' });

   // Debug: Log MONGO_URI to verify it's loaded
   console.log('MONGO_URI:', process.env.MONGO_URI);

   const app = express();

   // Middleware
   app.use(cors());
   app.use(express.json());

   // MongoDB Connection
   if (!process.env.MONGO_URI) {
     console.error('Error: MONGO_URI is not defined in .env file');
     process.exit(1);
   }

   mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
     .then(() => console.log('MongoDB connected'))
     .catch(err => console.error('MongoDB connection error:', err));

   // Routes
   app.use('/auth', authRoutes);
   app.use('/donations', donationRoutes);

   const PORT = process.env.PORT || 5000;
   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));