// pages/api/nearbyShops.js

import axios from 'axios';

export default async function handler(req, res) {
    const { location, radius, type } = req.query;

    const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&key=${API_KEY}`;

    try {
        const response = await axios.get(url);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching nearby shops:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
