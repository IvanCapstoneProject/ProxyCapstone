const express = require('express');
const axios = require('axios');
const app = express();

// Middleware to parse JSON body
app.use(express.json());

app.get('/', (req, res) => {
  console.log('Received GET request at /');
  res.send('Hello World!');
});

app.post('/send-data', async (req, res) => {
  console.log('Received POST request at /send-data with data:', req.body);
  try {
    // Extract 'data' from the request body
    const { data } = req.body;

    // Log the data to be sent
    console.log('Sending data to Firebase:', data);

    // Firebase URL
    const firebaseUrl = 'https://arduino-data-4c961-default-rtdb.europe-west1.firebasedatabase.app/data.json';

    // Make a POST request to Firebase with 'data' as plain text
    const response = await axios.post(firebaseUrl, data.toString());

    // Log the response from Firebase
    console.log('Received response from Firebase:', response.data);

    // Send back a response
    res.status(200).json({ message: 'Data sent to Firebase', response: response.data });
  } catch (error) {
    console.error('Error sending data to Firebase:', error);
    res.status(500).json({ message: 'Error sending data to Firebase', error: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening at http://:${port}`);
});
