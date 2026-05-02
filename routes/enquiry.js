// const express = require('express');
// const router = express.Router();
// const Enquiry = require('../models/Enquiry');

// // POST API to save contact form data
// router.post('/enquiry', async (req, res) => {
//   try {
//     console.log("Incoming Data:", req.body);

//     const { name, email, phone, message } = req.body;

//     // ✅ Validation
//     if (!name || !email || !phone || !message) {
//       return res.status(400).send("All fields are required");
//     }

//     // ✅ Create new document
//     const newEnquiry = new Enquiry({
//       name,
//       email,
//       phone,
//       message
//     });

//     // ✅ Save to MongoDB
//     await newEnquiry.save();

//     console.log("Data saved successfully ✅");

//     res.status(200).send("Form submitted successfully");
    
//   } catch (error) {
//     console.log("Error:", error);
//     res.status(500).send("Server Error");
//   }
// });

// module.exports = router;
// backend/routes/enquiry.js


const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// ✅ Define schema inline (or import from separate model file)
const enquirySchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String,
}, { timestamps: true });

const Enquiry = mongoose.model('Enquiry', enquirySchema);

router.post('/', async (req, res) => {
    try {
        const enquiry = new Enquiry(req.body);
        await enquiry.save();
        res.status(201).json({ message: 'Enquiry saved successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving enquiry', error: error.message });
    }
});

module.exports = router;