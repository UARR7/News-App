
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// import * as dotenv from 'dotenv';
// dotenv.config();
// // Initialize the Express app
// const app = express();
// app.use(express.json()); // To parse incoming JSON requests
// app.use(cors()); // Enable CORS for all routes

// // MongoDB connection URI (replace <your-password> with your actual password)

// // Connect to MongoDB
// mongoose
//     .connect(process.env.URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => console.log('MongoDB connected'))
//     .catch((err) => {
//         console.error('MongoDB connection error:', err);
//     });

// // Define the schema for the News articles
// const newsSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     url: { type: String, required: true },
//     timestamp: { type: Date, default: Date.now },
// });

// // Create a model for the News collection
// const News = mongoose.model('News', newsSchema);

// // Define routes

// // POST route to save a news article
// app.post('/api/news', async (req, res) => {
//     try {
//         const { title, url } = req.body;

//         // Validate the input
//         if (!title || !url) {
//             return res.status(400).json({ error: 'Title and URL are required' });
//         }

//         // Create a new article document
//         const newArticle = new News({ title, url });

//         // Save the article to the database
//         const savedArticle = await newArticle.save();

//         res.status(201).json(savedArticle);
//     } catch (error) {
//         console.error('Error saving news article:', error);
//         res.status(500).json({ error: 'An error occurred while saving the article' });
//     }
// });

// // GET route to fetch all news articles
// app.get('/api/news', async (req, res) => {
//     try {
//         const articles = await News.find();
//         res.json(articles);
//     } catch (error) {
//         console.error('Error fetching news articles:', error);
//         res.status(500).json({ error: 'An error occurred while fetching the articles' });
//     }
// });

// // Start the server
// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Configure dotenv to load environment variables
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware for parsing JSON and enabling CORS
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
    .connect(process.env.URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Define the schema for the News articles
const newsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

// Create a model for the News collection
const News = mongoose.model('News', newsSchema);

// Define API routes

// POST route to save a news article
app.post('/api/news', async (req, res) => {
    try {
        const { title, url } = req.body;

        // Validate the input
        if (!title || !url) {
            return res.status(400).json({ error: 'Title and URL are required' });
        }

        // Create and save a new news article
        const newArticle = new News({ title, url });
        const savedArticle = await newArticle.save();

        res.status(201).json(savedArticle);
    } catch (error) {
        console.error('Error saving news article:', error);
        res.status(500).json({ error: 'An error occurred while saving the article' });
    }
});

// GET route to fetch all news articles
app.get('/api/news', async (req, res) => {
    try {
        const articles = await News.find();
        res.json(articles);
    } catch (error) {
        console.error('Error fetching news articles:', error);
        res.status(500).json({ error: 'An error occurred while fetching the articles' });
    }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
