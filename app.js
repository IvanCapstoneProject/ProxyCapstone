const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Middleware to parse JSON body
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/send-data', async (req, res) => {
  try {
    // Extract 'data' from the request body
    const { data } = req.body; 

    // Firebase URL
    const firebaseUrl = 'https://arduino-data-4c961-default-rtdb.europe-west1.firebasedatabase.app/data.json';

    // Make a POST request to Firebase with 'data' as plain text
    // Axios will send the request with 'Content-Type': 'text/plain' by default for plain text
    const response = await axios.post(firebaseUrl, data.toString());

    // Send back a response
    res.status(200).json({ message: 'Data sent to Firebase', response: response.data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error sending data to Firebase', error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
