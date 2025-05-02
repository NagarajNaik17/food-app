const express = require('express');
   const jwt = require('jsonwebtoken');
   const DonationPost = require('../models/DonationPost');
   const router = express.Router();

   // Middleware to verify JWT
   const auth = (req, res, next) => {
     const token = req.header('Authorization')?.replace('Bearer ', '');
     if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

     try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       req.user = decoded;
       next();
     } catch (err) {
       res.status(401).json({ msg: 'Token is not valid' });
     }
   };

   // Create Donation Post (Donor only)
   router.post('/', auth, async (req, res) => {
     if (req.user.role !== 'Donor') return res.status(403).json({ msg: 'Access denied' });

     const { foodQuantity, contactNumber, email, location } = req.body;
     try {
       const post = new DonationPost({
         donor: req.user.id,
         foodQuantity,
         contactNumber,
         email,
         location
       });
       await post.save();
       res.json(post);
     } catch (err) {
       res.status(500).json({ msg: 'Server error' });
     }
   });

   // Get All Available Donation Posts (NGO only)
   router.get('/', auth, async (req, res) => {
     if (req.user.role !== 'NGO') return res.status(403).json({ msg: 'Access denied' });

     try {
       const posts = await DonationPost.find({
         $or: [{ acceptedBy: null }, { acceptedBy: req.user.id }]
       }).populate('donor', 'email').populate('acceptedBy', 'ngoName');
       res.json(posts);
     } catch (err) {
       res.status(500).json({ msg: 'Server error' });
     }
   });

   // Accept Donation Post (NGO only)
   router.put('/:id/accept', auth, async (req, res) => {
     if (req.user.role !== 'NGO') return res.status(403).json({ msg: 'Access denied' });

     try {
       const post = await DonationPost.findById(req.params.id);
       if (!post) return res.status(404).json({ msg: 'Post not found' });
       if (post.acceptedBy) return res.status(400).json({ msg: 'Post already selected' });

       post.acceptedBy = req.user.id;
       await post.save();
       res.json(post);
     } catch (err) {
       res.status(500).json({ msg: 'Server error' });
     }
   });

   // Get Donor's Donation History (Donor only)
   router.get('/history', auth, async (req, res) => {
     if (req.user.role !== 'Donor') return res.status(403).json({ msg: 'Access denied' });

     try {
       const posts = await DonationPost.find({ donor: req.user.id }).populate('acceptedBy', 'ngoName');
       res.json(posts);
     } catch (err) {
       res.status(500).json({ msg: 'Server error' });
     }
   });

   module.exports = router;