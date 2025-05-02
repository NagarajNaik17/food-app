const express = require('express');
   const bcrypt = require('bcryptjs');
   const jwt = require('jsonwebtoken');
   const Donor = require('../models/Donor');
   const NGO = require('../models/NGO');
   const dotenv = require('dotenv');
   const router = express.Router();

   dotenv.config();

   // Register Donor
   router.post('/donor/register', async (req, res) => {
     const { email, password } = req.body;
     try {
       let donor = await Donor.findOne({ email });
       if (donor) return res.status(400).json({ msg: 'Donor already exists' });

       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password, salt);

       donor = new Donor({ email, password: hashedPassword });
       await donor.save();

       res.json({ msg: 'Donor registered successfully' });
     } catch (err) {
       res.status(500).json({ msg: 'Server error' });
     }
   });

   // Register NGO
   router.post('/ngo/register', async (req, res) => {
     const { email, password, ngoName } = req.body;
     try {
       let ngo = await NGO.findOne({ email });
       if (ngo) return res.status(400).json({ msg: 'NGO already exists' });

       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password, salt);

       ngo = new NGO({ email, password: hashedPassword, ngoName });
       await ngo.save();

       res.json({ msg: 'NGO registered successfully' });
     } catch (err) {
       res.status(500).json({ msg: 'Server error' });
     }
   });

   // Login Donor
   router.post('/donor/login', async (req, res) => {
     const { email, password } = req.body;
     try {
       const donor = await Donor.findOne({ email });
       if (!donor) return res.status(400).json({ msg: 'Invalid credentials' });

       const isMatch = await bcrypt.compare(password, donor.password);
       if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

       const token = jwt.sign({ id: donor._id, role: 'Donor' }, process.env.JWT_SECRET, { expiresIn: '1h' });
       res.json({ token });
     } catch (err) {
       res.status(500).json({ msg: 'Server error' });
     }
   });

   // Login NGO
   router.post('/ngo/login', async (req, res) => {
     const { email, password } = req.body;
     try {
       const ngo = await NGO.findOne({ email });
       if (!ngo) return res.status(400).json({ msg: 'Invalid credentials' });

       const isMatch = await bcrypt.compare(password, ngo.password);
       if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

       const token = jwt.sign({ id: ngo._id, role: 'NGO' }, process.env.JWT_SECRET, { expiresIn: '1h' });
       res.json({ token });
     } catch (err) {
       res.status(500).json({ msg: 'Server error' });
     }
   });

   module.exports = router;