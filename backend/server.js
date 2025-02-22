// backend/server.js (Node.js/Express)
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3001;

app.use(express.json());

// Store API key in environment variables
const API_KEY = process.env.API_SECRET_KEY;

// Create proxy endpoint
app.post('/api/ask', async (req, res) => {
  try {
    const response = await axios.post('https://api.example.com/v1/chat', {
      prompt: req.body.prompt
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'API request failed' });
  }
});

app.listen(PORT, () => console.log(`Secure proxy running on port ${PORT}`));
