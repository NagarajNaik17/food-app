const mongoose = require('mongoose');

   const donationPostSchema = new mongoose.Schema({
     donor: { type: mongoose.Schema.Types.ObjectId, ref: 'Donor', required: true },
     foodQuantity: { type: String, required: true },
     contactNumber: { type: String, required: true },
     email: { type: String, required: true },
     location: { type: String, required: true },
     acceptedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'NGO' }
   });

   module.exports = mongoose.model('DonationPost', donationPostSchema);