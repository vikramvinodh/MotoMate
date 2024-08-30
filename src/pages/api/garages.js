const express = require('express');

// Use dynamic import for node-fetch
let fetch;
(async () => {
  fetch = (await import('node-fetch')).default;
})();

const router = express.Router();

// Replace with your API key
const GOOGLE_API_KEY = 'AIzaSyAYrruisrt0G9K835Bu0NhzkdopirzxJKE';

router.get('/garages', async (req, res) => {
  const { location, radius, type } = req.query;

  if (!location || !radius || !type) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&key=${GOOGLE_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching garages:', error);
    res.status(500).json({ error: 'Failed to fetch garages' });
  }
});

module.exports = router;
