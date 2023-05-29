const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add CORS headers middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://6474afd56b5fe21236931bb3--lucent-cuchufli-9cea17.netlify.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/api/proxy', (req, res) => {
  const url = 'https://www.astropro.co.il/birth-chart-free';

  axios.post(url, new URLSearchParams(req.body).toString(), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then(response => response.data)
    .then(data => {
      const $ = cheerio.load(data);
      const imgElements = $('center img');
      const src = imgElements.eq(0).attr('src');
      const src2 = imgElements.eq(1).attr('src');

      // Send the src and src2 values in the response
      res.send({ src, src2 });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('An error occurred while proxying the request.');
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
