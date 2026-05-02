// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// const enquiryRoutes = require('./routes/enquiry');

// // ✅ Use proper API prefix
// app.use('/api', enquiryRoutes);

// // MongoDB connection
// mongoose.connect('mongodb://127.0.0.1:27017/preschoolDB')
// .then(() => console.log("MongoDB Connected"))
// .catch(err => console.log(err));

// // Server
// app.listen(5000, () => console.log("Server running on port 5000"));
const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');

const app = express();

// ── Middleware ──
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes ── 
const enquiryRoutes = require('./routes/enquiry');
const authRoutes    = require('./routes/auth');

app.use('/api', enquiryRoutes); // POST /api/enquiry
app.use('/api/auth',    authRoutes);      // POST /api/auth/register  |  POST /api/auth/login

// ── MongoDB connection ──
mongoose.connect('mongodb://127.0.0.1:27017/bhagwatiPropertyDB')
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.log('❌ MongoDB error:', err));

// ── Start server ──
app.listen(5000, () => console.log('🚀 Server running on http://localhost:5000'));