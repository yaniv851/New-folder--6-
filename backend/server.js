const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const qs = require('qs');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add CORS headers middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://astroiris.co.il');
  // res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/api/geolocations', (req, res) => {
  const birthCityInput = req.body.birthCityInput;
  console.log(birthCityInput)

  let data = qs.stringify({

  });

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url : `https://www.astropro.co.il/service/geonames.php?featureClass=P&username=astropro&style=full&maxRows=12&name_startsWith=${birthCityInput}`,
    headers: {
      'authority': 'www.astropro.co.il',
      'accept': 'application/json, text/javascript, */*; q=0.01',
      'accept-language': 'he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7',
      'cache-control': 'no-cache',
      'cookie': 'ssid=b7a97c999baa2e5efaa8128227dd3a30; _ga=GA1.3.607954226.1684314307; _gid=GA1.3.428611806.1685428146; _gat=1; ssid=7f8feaaa351f26d5d7a35b2b52e38d5a',
      'pragma': 'no-cache',
      'referer': 'https://www.astropro.co.il/user-reg-free',
      'sec-ch-ua': '"Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
      'sec-ch-ua-mobile': '?1',
      'sec-ch-ua-platform': '"Android"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Mobile Safari/537.36',
      'x-requested-with': 'XMLHttpRequest'
    },
    data: data
  };

  axios
  .request(config)
  .then((response) => {
    console.log(response.data);
    res.send(response.data); // Send the response data to the client
  })
  .catch((error) => {
    console.log(error);
    res.status(500).send('An error occurred while fetching geolocations.');
  });
});


app.post('/api/proxy', (req, res) => {
  const url = 'https://www.astropro.co.il/birth-chart-free';
  console.log(req.body)

  axios.post(url, new URLSearchParams(req.body).toString(), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
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
