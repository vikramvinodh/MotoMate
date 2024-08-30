const express = require('express');
const app = express();
const port = 3001;

// Import the garages route
const garagesRoute = require('./garages');

// Use the garages route
app.use('/api/garages', garagesRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
