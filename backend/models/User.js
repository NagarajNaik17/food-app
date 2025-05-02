const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  role: { type: String, enum: ['Donor', 'NGO'], required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Optional for Google Sign-In
  ngoName: { type: String }, // Only for NGOs
  googleId: { type: String }, // For Google Sign-In
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);