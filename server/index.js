const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const apiRoutes = require('./routes/api');
const loginRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', apiRoutes);
app.use('/auth', loginRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static files (optional, for production)
// app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
