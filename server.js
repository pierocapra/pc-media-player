import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

let accessToken = null;  // Store the token here

// Function to get the access token from Spotify using Client Credentials Flow
const getAccessToken = async () => {
  const tokenUrl = 'https://accounts.spotify.com/api/token';
  
  // Use the correct parameters
  const data = 'grant_type=client_credentials';  // Required for Client Credentials Flow

  try {
    const response = await axios.post(tokenUrl, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',  // Required for form data
        Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),  // Base64 encoding
      },
    });

    accessToken = response.data.access_token;  // Store access token
    console.log('Access token retrieved successfully!');
  } catch (error) {
    console.error('Error retrieving access token:', error);
  }
};

// Call the function to retrieve the token at the start
getAccessToken();

// Refresh the token every hour (Spotify tokens expire in 1 hour)
setInterval(getAccessToken, 3600 * 1000); // 1 hour

// API endpoint to fetch public playlists
app.get('/api/public-data/playlists/', async (req, res) => {
  const { query } = req.query; // For example, this could be a search query

  try {
    const response = await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=playlist`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching data from Spotify API' });
  }
});

// API endpoint to fetch a single playlist data
app.get('/api/public-data/playlist/', async (req, res) => {
  const { query } = req.query; // For example, this could be a search query
  const { id } = req.query;

  try {
    const response = await axios.get(`https://api.spotify.com/v1/playlists/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching data from Spotify API' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});